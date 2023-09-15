import React, { useContext } from 'react'
import styles from './Bar.module.css'

import Lotus from '/Logo.svg'

import sunIcon from '/sunIcon.svg'
import moonIcon from '/moonIcon.svg'
import avatar from '/avatar.jpg'
import context from '../../ContextAPI/ContextAPI'


export default function Bar() {
    const { header, logoWrapper } = styles
    const contextDB = useContext(context)
    const mode = contextDB.darkModeToggle

    function toggleMode() {
        contextDB.toggleMode()
        document.body.classList.toggle('darkMode')
    }

    return (
        <header className={header}>

            <div className={logoWrapper}>
                <img
                    src={Lotus}
                    alt="logo" />
            </div>

            <img
                onClick={toggleMode}
                src={mode ? moonIcon : sunIcon}
                alt="darkModeToggle" />


            <img
                src={avatar}
                alt="Avatar"
            />
        </header>
    )
}
