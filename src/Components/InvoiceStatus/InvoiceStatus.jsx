import React, { useContext } from 'react'
import styles from './InvoiceStatus.module.css'

import Status from '../Status/Status'
import context from '../../ContextAPI/ContextAPI'

export default function Skills({ invoice, deleteInvoice, mode } = props) {
    const { statusPanel, darkStatusPanel, deleteBtn, editBtn, changeStatusBtn, deletePopUp } = styles
    const status = `${statusPanel} ${mode ? darkStatusPanel : null}`
    const contextDB = useContext(context)


    function fn_MarkAsPaid(e) {
        contextDB.markAsPaid(invoice.id)
    }


    function DeletePopUp() {
        const deleteDialog = document.querySelector(`.${deletePopUp}`)
        deleteDialog.showModal()
    }


    function confirm(e) {
        const deleteDialog = document.querySelector(`.${deletePopUp}`)
        const decision = e.target.innerText

        decision == 'Yes' ? deleteInvoice() : null
        deleteDialog.close()
    }



    function editInvoice() {
        contextDB.toggleEdit()
    }


    return (
        <>
            <div className={status}>
                <span>Status</span>
                <Status
                    status={invoice.status}
                />


                <button
                    onClick={DeletePopUp}
                    className={deleteBtn}
                >Delete
                </button>


                {invoice.status !== 'Paid' ?
                    <button
                        onClick={editInvoice}
                        className={editBtn}
                    >Edit
                    </button>


                    : null}

                {invoice.status !== 'Paid' ?
                    <button
                        onClick={fn_MarkAsPaid}
                        className={changeStatusBtn}
                    >Mark As Paid
                    </button>
                    : null}
            </div>

            <dialog
                className={deletePopUp}
            >
                <h2>Are you sure ?</h2>

                <div>
                    <button onClick={confirm} >Yes</button>
                    <button onClick={confirm} >No</button>
                </div>


            </dialog>
        </>
    )
}
