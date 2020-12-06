import React from 'react'
import styles from './LoadingIndicator.module.css'

const LoadingIndicator = () => {
    return (
        <div className={ styles.outer } >
            <div className={ styles.ldsRipple }><div></div><div></div></div>
        </div>
    )
}

export default LoadingIndicator
