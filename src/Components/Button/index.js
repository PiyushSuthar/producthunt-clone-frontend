import React from 'react'
import styles from './button.module.css'

const Button = ({ children, ...args }) => {
    return (
        <>
            <button { ...args } className={ styles.button }>{ children }</button>
        </>
    )
}

export default Button
