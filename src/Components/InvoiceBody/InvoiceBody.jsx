import React from 'react'
import styles from './InvoiceBody.module.css'

export default function Skills({ invoice ,mode } = props) {

    const { body , darkBody ,billFrom ,billTo ,date , email ,id} = styles


    const invoiceDetails = `${body} ${mode ? darkBody : null}`

    return (
        <>
            <div className={invoiceDetails}>

                <div className={id}>
                    <p>{invoice.id}</p>
                    <p>{invoice.desc}</p>
                </div>



                <div className={billFrom}>
                    <p>{invoice.BillFrom.street}</p>
                    <p>{invoice.BillFrom.city}</p>
                    <p>{invoice.BillFrom.postCode}</p>
                    <p>{invoice.BillFrom.country}</p>
                </div>



                <div className={date}>
                    <p>Invoice Date</p>
                    <p>{invoice.invoiceDate}</p>


                    <p>Payment Due</p>
                    <p>{` ${invoice.paymentTerms} days later`}</p>
                </div>



                <div className={billTo}>
                    <p>Bill To</p>
                    <p>{invoice.BillTo.name}</p>
                    <p>{invoice.BillTo.street}</p>
                    <p>{invoice.BillTo.city}</p>
                    <p>{invoice.BillTo.postCode}</p>
                    <p>{invoice.BillTo.country}</p>
                </div>



                <div className={email}>
                    <p>Sent To</p>
                    <p>{invoice.BillTo.email}</p>
                </div>
                
                </div>
        </>
    )
}
