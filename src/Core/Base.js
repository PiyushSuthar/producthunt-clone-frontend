import React from 'react'
import Header from '../Components/Header'

const Base = ({ children }) => {
    return (
        <>
            <Header />
            <div style={{
                maxWidth: "1000px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "10px"
            }} className="container">
                { children }
            </div>
        </>
    )
}

export default Base
