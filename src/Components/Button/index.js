import React from 'react'
import styles from './button.module.css'

const Button = ({ children, style, ...args }) => {
    return (
        <>
            <button style={ style } { ...args } className={ styles.button }>{ children }</button>
        </>
    )
}

export default Button
