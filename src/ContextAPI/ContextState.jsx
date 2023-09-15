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
                street: '19 Union Terrace',
                city: 'London',
                postCode: 'E1 3EZ',
                country: 'UK'
            },
    
            BillTo: {
                name: 'Alex Grim',
                email: 'alexgrim@gmail.com',
                street: '84 Church Way',
                city: 'Bradford',
                postCode: 'Bd1 9Pb',
                country: 'Uk'
            },
    
            Item: [
                {
                    id: 0,
                    name: 'Banner Design',
                    qty: 1,
                    price: 200,
                },
                {
                    id: 0,
                    name: 'Email Design',
                    qty: 1,
                    price: 600,
                }
            ],
    
            invoiceDate: ' 2-4-23',
            paymentTerms: 'Net 7 Day',
            desc: 'Grapghic Design',
            status: 'Paid',
            id: '745866'
        },    
        {
            BillFrom: {
                street: '19 Union Terrace',
                city: 'London',
                postCode: 'E1 3EZ',
                country: 'UK'
            },
    
            BillTo: {
                name: 'Alex Grim',
                email: 'alexgrim@gmail.com',
                street: '84 Church Way',
                city: 'Bradford',
                postCode: 'Bd1 9Pb',
                country: 'Uk'
            },
    
            Item: [
                {
                    id: 0,
                    name: 'Banner Design',
                    qty: 1,
                    price: 200,
                },
                {
                    id: 0,
                    name: 'Email Design',
                    qty: 1,
                    price: 600,
                }
            ],
    
            invoiceDate: ' 2-4-23',
            paymentTerms: 'Net 7 Day',
            desc: 'Grapghic Design',
            status: 'Paid',
            id: '313947'
        },    
        {
            BillFrom: {
                street: '19 Union Terrace',
                city: 'London',
                postCode: 'E1 3EZ',
                country: 'UK'
            },
    
            BillTo: {
                name: 'John Smith',
                email: 'Johnsmith@gmail.com',
                street: '84 Church Way',
                city: 'Bradford',
                postCode: 'Bd1 9Pb',
                country: 'Uk'
            },
    
            Item: [
                {
                    id: 0,
                    name: 'Website Design',
                    qty: 1,
                    price: 5000,
                },
                {
                    id: 0,
                    name: 'Email Design',
                    qty: 1,
                    price: 600,
                }
            ],
    
            invoiceDate: ' 8-5-23',
            paymentTerms: 'Net 7 Day',
            desc: 'Design',
            status: 'Paid',
            id: '986569'
        },    
        {
            BillFrom: {
                street: '19 Union Terrace',
                city: 'London',
                postCode: 'E1 3EZ',
                country: 'UK'
            },
    
            BillTo: {
                name: 'Anand Mukherjee',
                email: 'anandmukherjee@gmail.com',
                street: 'Churchgate',
                city: 'kolkota',
                postCode: '2655',
                country: 'India'
            },
    
            Item: [
                {
                    id: 0,
                    name: 'Web Devoploment',
                    qty: 1,
                    price: 20000,
                },
                {
                    id: 0,
                    name: 'Graphic Design',
                    qty: 1,
                    price: 1000,
                }
            ],
    
            invoiceDate: ' 7-6-23',
            paymentTerms: 'Net 7 Day',
            desc: 'Development',
            status: 'Paid',
            id: '343983'
        },    
        {
            BillFrom: {
                street: '19 Union Terrace',
                city: 'London',
                postCode: 'E1 3EZ',
                country: 'UK'
            },
    
            BillTo: {
                name: 'Alex Grim',
                email: 'alexgrim@gmail.com',
                street: '84 Church Way',
                city: 'Bradford',
                postCode: 'Bd1 9Pb',
                country: 'Uk'
            },
    
            Item: [
                {
                    id: 0,
                    name: 'Banner Design',
                    qty: 1,
                    price: 200,
                },
                {
                    id: 0,
                    name: 'Email Design',
                    qty: 1,
                    price: 600,
                }
            ],
    
            invoiceDate: ' 2-4-23',
            paymentTerms: 'Net 7 Day',
            desc: 'Grapghic Design',
            status: 'Paid',
            id: '365995'
        },    
        {
            BillFrom: {
                street: '19 Union Terrace',
                city: 'London',
                postCode: 'E1 3EZ',
                country: 'UK'
            },
    
            BillTo: {
                name: 'Alex Grim',
                email: 'alexgrim@gmail.com',
                street: '84 Church Way',
                city: 'Bradford',
                postCode: 'Bd1 9Pb',
                country: 'Uk'
            },
    
            Item: [
                {
                    id: 0,
                    name: 'Banner Design',
                    qty: 1,
                    price: 200,
                },
                {
                    id: 0,
                    name: 'Email Design',
                    qty: 1,
                    price: 600,
                }
            ],
    
            invoiceDate: ' 2-4-23',
            paymentTerms: 'Net 7 Day',
            desc: 'Grapghic Design',
            status: 'Paid',
            id: '548641'
        },    
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