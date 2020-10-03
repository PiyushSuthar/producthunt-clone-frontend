import React from 'react'
import WhiteBgContainer from '../WhiteBackContainer'

const ErrorPage = () => {
    return (
        <WhiteBgContainer style={ { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } }>
            <h2 style={ { fontSize: "70px" } }>404</h2>
        </WhiteBgContainer>
    )
}

export default ErrorPage
