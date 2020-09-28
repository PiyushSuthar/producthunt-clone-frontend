import React from 'react'
import styles from './input.module.css'

const FormInput = ({
    label,
    name,
    type,
    placeholder,
    ...args
}) => {
    return (
        <div className={styles.input_container}>
            <label htmlFor={name}>{label}</label>
            <input className={styles.input_main} type={type} {...args} name={name} placeholder={placeholder} />
        </div>
    )
}

export default FormInput
