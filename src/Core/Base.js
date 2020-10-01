import React from 'react'
import Header from '../Components/Header'
import Helmet from 'react-helmet'

const Base = ({ children, title }) => {
    return (
        <>
            <Helmet>
                <title>{ title ? title+ " - वस्तु खोज" : "वस्तु खोज" }</title>
            </Helmet>
            <Header />
            <div style={ {
                maxWidth: "1000px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "10px"
            } } className="container">
                { children }
            </div>
        </>
    )
}

export default Base
