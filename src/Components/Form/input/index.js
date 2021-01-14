import React from 'react'
import styles from './input.module.css'

const FormInput = ({
    label,
    name,
    type,
    placeholder,
    parentStyle,
    isTextArea = false,
    rows,
    cols,
    ...args
}) => {

    return (
        <div style={ parentStyle } className={ styles.input_container }>
            <label htmlFor={ name }>{ label }</label>
            {isTextArea ? (
                <textarea className={ styles.input_main } name={ name } { ...args } placeholder={ placeholder } cols={ cols || "30" } rows={ rows || "10" }></textarea>
            ) : (
                    <input className={ styles.input_main } type={ type } { ...args } name={ name } placeholder={ placeholder } />
                ) }
        </div>
    )
}

export default FormInput
