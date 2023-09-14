import React from 'react'
import styles from './Status.module.css'

export default function Status(props) {
    const { status } = styles
    return (

        <div
            className={`${status} ${props.status}`}
        >
            <span
            className='span'
            ></span>
            <p>{props.status}</p>
        </div>
    )
}
