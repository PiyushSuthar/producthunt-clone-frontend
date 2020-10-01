import React from 'react'

const ErrorDialong = ({ children }) => {
    return (
        <h3 style={ {
            color: "red",
            fontWeight: "400",
            border: "2px dashed red",
            padding: "10px",
            marginBottom: "10px"
        } } >{ children }</h3>
    )
}

export default ErrorDialong
