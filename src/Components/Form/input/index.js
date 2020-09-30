import React from 'react'
import styles from './input.module.css'

const FormInput = ({
    label,
    name,
    type,
    placeholder,
    isTextArea = false,
    ...args
}) => {

    return (
        <div className={ styles.input_container }>
            <label htmlFor={ name }>{ label }</label>
            {isTextArea ? (
                <textarea className={ styles.input_main } ame={ name } { ...args } placeholder={ placeholder } cols="30" rows="10"></textarea>
            ) : (
                    <input className={ styles.input_main } type={ type } { ...args } name={ name } placeholder={ placeholder } />
                ) }
        </div>
    )
}

export default FormInput
