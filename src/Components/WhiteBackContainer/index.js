import React from 'react'
import styles from "./container.module.css";

const WhiteBgContainer = ({ children, ...args }) => {
    return (
        <div {...args} className={ styles.container }>
            {children }
        </div>
    )
}

export default WhiteBgContainer
