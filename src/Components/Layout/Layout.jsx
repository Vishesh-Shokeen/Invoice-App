import React from 'react'
import Bar from '../Bar/Bar'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'
import CreateInvoice from '../CreateInvoice/CreateInvoice'

export default function Skills() {
  const { layout } = styles

  return (

    <div className={layout}>
      <Bar />
      <Outlet />
      <CreateInvoice/>
    </div>


  )
}
