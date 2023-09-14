import React, { useContext, useEffect, useState } from 'react'
import styles from './Invoice.module.css'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import context from '../../ContextAPI/ContextAPI'


import InvoiceStatus from '../InvoiceStatus/InvoiceStatus'
import InvoiceBody from '../InvoiceBody/InvoiceBody'
import ItemDetails from '../ItemDetails/ItemDetails'

export default function Invoice() {
  const { Invoice, disappear, goBackBtn } = styles

  const navigate = useNavigate()


  const { id } = useParams()
  const contextDB = useContext(context)
  const mode = contextDB.darkModeToggle
  const boardDB = contextDB.invoiceDB

  const [invoice, setInvoice] = useState(boardDB.filter(x => x.id === id)[0])

  useEffect(() => {
    setInvoice(boardDB.filter(x => x.id === id)[0])
  }, [contextDB])


  function handleDelete() {
    const x = document.querySelector(`.${Invoice}`)
    x.classList.add(`${disappear}`)
    setTimeout(() => {
      contextDB.deleteInvoice(invoice.id)
      navigate('/')
    }, 700);
  }



  return (
    <>
      {
        invoice
          ?
          < div
            className={Invoice}
          >
            <NavLink
              className={goBackBtn}
              to='/'
            >
              🔙
            </NavLink>

            <InvoiceStatus
              deleteInvoice={() => handleDelete()}
              invoice={invoice}
              mode={mode}
            />


            <InvoiceBody
              invoice={invoice}
              mode={mode}
            />

            <ItemDetails
              invoice={invoice}
            />

          </div >
          : <h1>Invoice Deleted.</h1>}


    </>
  )
}
