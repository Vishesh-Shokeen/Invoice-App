import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Invoice from './Components/Invoice/Invoice'
import Layout from './Components/Layout/Layout'
import InvoiceBoard from './Components/InvoiceBoard/InvoiceBoard'


export default function App() {


  return (
    <Routes>

      <Route element={<Layout />} >
        <Route path='/' element={<InvoiceBoard />} />
        <Route path=':id' element={<Invoice />} />
      </Route>

    </Routes>
  )
}
