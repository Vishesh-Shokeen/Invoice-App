import { useState, useEffect } from "react";
import context from "./ContextAPI";

const state = (props) => {

    const [darkModeToggle, setDarkModeToggle] = useState(false)
    const [slideCreator, setSlideCreator] = useState(false)
    const [editInvoice, setEditInvoice] = useState(false)

    const localStorageBoards = localStorage.getItem('DB')

    const DB = [

        {
            BillFrom: {
                street: '',
                city: '',
                postCode: '',
                country: ''
            },
    
            BillTo: {
                name: '',
                email: '',
                street: '',
                city: '',
                postCode: '',
                country: ''
            },
    
            Item: [
                {
                    id: 0,
                    name: '',
                    qty: 1,
                    price: 0,
                }
            ],
    
            invoiceDate: '',
            paymentTerms: 'Net 1 Day',
            desc: '',
            status: '',
            id: ''
        }    
    ]


    const Checker = localStorageBoards ? JSON.parse(localStorageBoards) : DB

    const [invoiceDB, setInvoiceDB] = useState(Checker)







    useEffect(() => {
        localStorage.setItem('DB', JSON.stringify(invoiceDB))
    }, [invoiceDB])


    function toggleMode() {
        setDarkModeToggle(prev => !prev)
    }

    function toggleSlider() {
        setSlideCreator(prev => !prev)
    }

    function toggleEdit() {
        setEditInvoice(prev => !prev)
    }



    function createInvoice(invoice) {
        setInvoiceDB(prev => [invoice, ...prev])
    }

    function editInvoice_FN(invoice) {
        setInvoiceDB(prev => {
            return prev.map(x => {
                if (x.id === invoice.id) {
                    x = { ...invoice }
                }
                return x
            })
        })
    }


    function markAsPaid(id) {
        const updatedArray = invoiceDB.map(invoice => {
            invoice.id === id ? invoice.status = 'Paid' : null
            return invoice
        })

        setInvoiceDB(updatedArray)
    }

    function deleteInvoice(id) {
        setInvoiceDB(prev => {
            const newArray = prev.filter(x => x.id !== id)
            return newArray
        })
    }






    return (
        <context.Provider value={{ invoiceDB, darkModeToggle, slideCreator, editInvoice, toggleMode, toggleSlider, toggleEdit, createInvoice, markAsPaid, deleteInvoice, editInvoice_FN }}>
            {props.children}
        </context.Provider>
    )
}

export default state