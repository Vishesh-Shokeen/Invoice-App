import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import ContextState from './ContextAPI/ContextState.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
<ContextState>
    <BrowserRouter>
    <App />
    </BrowserRouter>
</ContextState>
    


)
