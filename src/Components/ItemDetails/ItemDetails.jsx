import React from 'react'
import styles from './ItemDetails.module.css'

export default function Skills({ invoice } = props) {
    const { items} = styles


    const Items = invoice.Item.map((item, key) => <div
        key={key}
    >
        <p>{item.name}</p>
        <p>{item.qty}</p>
        <p>{item.price}</p>
    </div>)

    const totalPrice = invoice.Item.reduce((acc , item) => acc  += item.price * item.qty,0)

    return (
        <div
            className={items}
        >
            <div>
                <p>Item Name</p>
                <p>QTY.</p>
                <p>Price</p>
            </div>

            {Items}


            <div>
                <p>Amount Due</p>
                <p>{totalPrice}</p>
            </div>

        </div>
    )
}
