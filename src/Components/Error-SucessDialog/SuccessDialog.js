import React from 'react'

const SuccessDialog = ({ children }) => {
    return (
        <h3 style={ {
            color: "green",
            fontWeight: "400",
            border: "2px dashed green",
            padding: "10px",
            marginBottom: "10px"
        } }>{ children }</h3>
    )
}

export default SuccessDialog
