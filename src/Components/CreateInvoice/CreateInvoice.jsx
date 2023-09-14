import React, { useContext, useEffect, useState } from 'react'
import styles from './CreateInvoice.module.css'
import context from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'



export default function CreateInvoice() {

    const { dialogContainer, darkDialog, window, BillFrom, BillTo, other, buttonsDiv, slide, darkInput, input, itemInputWrapper, addItemBtn, itemSlot, itemPrice, itemQty, itemTotal } = styles



    const { id } = useParams()
    const contextDB = useContext(context)

    const mode = contextDB.darkModeToggle
    const editInvoice = contextDB.editInvoice
    const showCreator = editInvoice ? editInvoice : contextDB.slideCreator


    const inputClassName = `${input} ${mode ? darkInput : null}`
    const invoiceToEdit = contextDB.invoiceDB.filter(x => x.id === id)[0]


    const [randomID, setRandomID] = useState('')

    const template = {
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


    const [invoiceState, setInvoiceState] = useState(editInvoice ? invoiceToEdit : template)


    const itemList = invoiceState.Item.map((item, key) => <div

        className={itemSlot}

        id={Number(key)}
        key={key}
    >

        <label htmlFor="ItemName">
            Item Name
            <input
                name='name'
                id={key}
                onChange={updateItem}
                value={invoiceState.Item[key].name}
                type="text"
                className={inputClassName}
            />
        </label>

        <label htmlFor="ItemQuantity" className={itemQty}>
            Qty.
            <input
                name='qty'
                id={key}
                onChange={updateItem}
                value={invoiceState.Item[key].qty}
                type="number"
                min={1}
                className={inputClassName} />
        </label>

        <label htmlFor="ItemPrice" className={itemPrice}>
            Price
            <input
                name='price'
                id={key}
                onChange={updateItem}
                value={invoiceState.Item[key].price}
                type="number"
                min={0}
                className={inputClassName} />
        </label>

        <label className={itemTotal}>
            Total
            <span
                id={key}
            >{item.price * item.qty}</span>

        </label>

        <span onClick={deleteItem}>🗑️</span>
    </div>)


    useEffect(() => {
        let charNum = '1478523690'
        let charLetter = 'AZXSWQEDCVRTGFBYNHUJMKILOP'
        let randomMIX = ''

        for (let i = 0; i <= 2; i++) {
            const randomLetter = charLetter[Math.floor(Math.random() * charLetter.length)]
            const randomNum = charNum[Math.floor(Math.random() * charNum.length)]

            randomMIX += randomLetter + randomNum
        }
        setRandomID(prev => randomMIX)
        setInvoiceState(editInvoice ? invoiceToEdit : template)
    }, [contextDB.invoiceDB])


    useEffect(() => {
        setInvoiceState(editInvoice ? invoiceToEdit : template)
    }, [editInvoice])




    function updateBillFrom(e) {
        setInvoiceState(prev => ({
            ...prev,
            'BillFrom': {
                ...prev.BillFrom,
                [e.target.name]: e.target.value
            }
        }))
    }


    function updateBillTo(e) {
        setInvoiceState(prev => ({
            ...prev,
            'BillTo': {
                ...prev.BillTo,
                [e.target.name]: e.target.value
            }
        }))
    }

    function updateItem(e) {
        const { name, value } = e.currentTarget
        const objId = e.currentTarget.parentElement.parentElement.id

        const updatedArray = invoiceState.Item.map(item => item.id == objId ? item = { ...item, [name]: value } : item
        )

        setInvoiceState(prev => ({
            ...prev,
            Item: updatedArray
        }))
    }


    function updateDetails(e) {
        setInvoiceState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    function additem(e) {
        setInvoiceState(prev => ({
            ...prev,
            Item: [...prev.Item, {
                id: prev.Item.length,
                name: '',
                qty: 1,
                price: 0
            }]
        }))
    }


    function deleteItem(e) {

        const objId = e.currentTarget.parentElement.id

        const updatedArray = invoiceState.Item.filter(item => item.id != objId)

        setInvoiceState(prev => {
            return {
                ...prev,
                Item: updatedArray
            }

        })
    }




    function discardInvoice() {
        contextDB.toggleSlider()
        setInvoiceState(template)

    }

    function saveDraft() {
        contextDB.createInvoice({ ...invoiceState, status: 'Draft', id: randomID })
    }

    function saveInvoice() {
        contextDB.createInvoice({ ...invoiceState, status: 'Pending', id: randomID })
    }

    function saveEdit() {
        contextDB.toggleEdit()
        contextDB.editInvoice_FN(invoiceState)
    }




    return (
        <div
            className={`${dialogContainer} ${mode ? darkDialog : null} ${showCreator ? slide : null}`}>
            <h1>Create Invoice</h1>
            <form

                className={window}>
                <p>Bill From</p>
                <div className={BillFrom}>
                    <label>
                        Street Address
                        <input
                        placeholder='110254 avenue '
                            className={inputClassName}
                            name='street'
                            value={invoiceState.BillFrom.street}
                            onChange={updateBillFrom}
                            type="text" />
                    </label>

                    <label>
                        City
                        <input
                            className={inputClassName}
                            placeholder='New York'
                            name='city'
                            value={invoiceState.BillFrom.city}
                            onChange={updateBillFrom}
                            type="text" />
                    </label>

                    <label>
                        Post Code
                        <input
                            className={inputClassName}
                            placeholder='1055'
                            name='postCode'
                            value={invoiceState.BillFrom.postCode}
                            onChange={updateBillFrom}
                            type="text" />
                    </label>

                    <label>
                        Country
                        <input
                            className={inputClassName}
                            placeholder='USA'
                            name='country'
                            value={invoiceState.BillFrom.country}
                            onChange={updateBillFrom}
                            type="text" />
                    </label>

                </div>

                <p>Bill To</p>
                <div className={BillTo}>

                    <label>
                        Client's Name
                        <input
                            className={inputClassName}
                            placeholder='Vishesh Shokeen'
                            name='name'
                            maxLength={16}
                            value={invoiceState.BillTo.name}
                            onChange={updateBillTo}
                            type="text" />
                    </label>

                    <label>
                        Client's Email
                        <input
                            className={inputClassName}
                            placeholder = 'Visheshshokeen1@gmail.com'
                            name='email'
                            value={invoiceState.BillTo.email}
                            onChange={updateBillTo}
                            type="text" />
                    </label>

                    <label>
                        Street Address
                        <input
                            className={inputClassName}
                            placeholder='221 Baker Street '
                            name='street'
                            value={invoiceState.BillTo.street}
                            onChange={updateBillTo}
                            type="text" />
                    </label>

                    <label>
                        City
                        <input
                            className={inputClassName}
                            name='city'
                            placeholder='London'
                            value={invoiceState.BillTo.city}
                            onChange={updateBillTo}
                            type="text" />
                    </label>

                    <label>
                        Post Code
                        <input
                            className={inputClassName}
                            name='postCode'
                            placeholder='1105'
                            value={invoiceState.BillTo.postCode}
                            onChange={updateBillTo}
                            type="text" />

                    </label>

                    <label>
                        Country
                        <input
                            className={inputClassName}
                            name='country'
                            value={invoiceState.BillTo.country}
                            onChange={updateBillTo}
                            type="text" />
                    </label>

                </div>

                <div className={other}>

                    <label>
                        Invoice Date
                        <input
                            className={inputClassName}
                            name='invoiceDate'
                            value={invoiceState.invoiceDate}
                            onChange={updateDetails}
                            type='date'
                        />
                    </label>


                    <label>
                        Payment Terms
                        <select
                            name='paymentTerms'
                            value={invoiceState.paymentTerms}
                            onChange={updateDetails}
                        >
                            <option value="1">Net 1 day</option>
                            <option value="7">Net 7 days</option>
                            <option value="14">Net 14 days</option>
                            <option value="30">Net 30 days</option>
                        </select>
                    </label>


                    <label>
                        Description
                        <input
                            className={inputClassName}
                            name='desc'
                            value={invoiceState.desc}
                            onChange={updateDetails}
                            type="text" placeholder='e.g Design Service ' />
                    </label>

                </div>



                <div
                    className={itemInputWrapper}
                >
                    <p>Item List</p>
                    {itemList ? itemList : null}
                </div>

                <button
                    type='button'
                    className={addItemBtn}
                    onClick={additem}
                >
                    Add Item +
                </button>

            </form>



            <div className={buttonsDiv}>

                {
                    !editInvoice ?

                        <button
                            onClick={discardInvoice}
                        >
                            Discard
                        </button>

                        : null
                }

                {!editInvoice ?


                    <button
                        onClick={saveDraft}
                    >Draft</button>

                    : null
                }

                {!editInvoice ?

                    <button
                        onClick={saveInvoice}
                    >Save</button>

                    : null
                }

                {
                    editInvoice
                        ?
                        <button
                            onClick={saveEdit}
                        >Save Edit</button>
                        : null
                }

            </div>

        </div>
    )
}
