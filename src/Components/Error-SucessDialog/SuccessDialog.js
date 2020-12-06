import React from 'react'

const SuccessDialog = ({ children, color = "green" }) => {
    return (
        <h3 style={ {
            color: color,
            fontWeight: "400",
            border: `2px dashed ${color}`,
            padding: "10px",
            marginBottom: "10px"
        } }>{ children }</h3>
    )
}

export default SuccessDialog
