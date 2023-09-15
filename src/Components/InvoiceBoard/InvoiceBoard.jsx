import React, { useContext, useEffect, useState } from 'react'
import styles from './InvoiceBoard.module.css'
import context from '../../ContextAPI/ContextAPI'
import { Link } from 'react-router-dom'
import Status from '../Status/Status'



export default function InvoiceBoard() {
    const { manageInvoices, darkInvoiceBoard, invoiceBoard, stripInvoice, darkStripInvoice, invoiceID,
        invoiceDue,
        invoiceClient,
        invoiceTotal,
        emptyFolder
    } = styles



    const contextDB = useContext(context)
    const mode = contextDB.darkModeToggle
    const boardDB = contextDB.invoiceDB
    const invoiceStripClassName = `${stripInvoice} ${mode ? darkStripInvoice : null}`

    const [boardData, setBoardData] = useState([])


    useEffect(() => {
        setBoardData(boardDB)
    }, [boardDB])

    const invoiceStrips = boardData.map((invoice, i) => <Link
        key={i}
        to={'/' + invoice.id}
        className={invoiceStripClassName}
    >
        <span className={invoiceID}>{invoice.id}</span>
        <span className={invoiceClient}>{invoice.BillTo.name}</span>
        <span className={invoiceDue}>{invoice.invoiceDate.split('-').reverse().join('-')}</span>

        <span className={invoiceTotal}> &#x20B9; {invoice.Item.reduce((acc, x) => acc += x.price * x.qty, 0)}</span>

        <Status
            status={invoice.status}
        />
    </Link>
    )



    function refreshBoard(e) {
        if (!e.target.value == '') {
            setBoardData(prev => boardDB.filter(invoice => invoice.status === e.target.value))
        }
        else {
            setBoardData(boardDB)
        }
    }



    function slideCreator() {
        if (!contextDB.slideCreator)
            contextDB.toggleSlider()
    }




    return (
        <div className={`${invoiceBoard} ${mode ? darkInvoiceBoard : null}`}>
            <div
                className={manageInvoices}
            >
                <div>
                    <h1>Invoices</h1>
                    <p>There are {invoiceStrips.length} {invoiceStrips.length > 1 ? 'invoices' : 'invoice'}</p>
                </div>

                <div>


                    <select
                        onChange={refreshBoard}
                    >
                        <option value="">All</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Draft">Draft</option>
                    </select>


                    <button
                        onClick={slideCreator}
                    >➕Invoice</button>

                </div>
            </div>

            {
                invoiceStrips.length >= 1
                    ?
                    invoiceStrips

                    : <h1 className={emptyFolder}>No Invoice 📑 </h1>
            }

        </div>
    )
}
