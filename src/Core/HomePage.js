import React from 'react'
import Header from '../Components/Header'
import styled from 'styled-components'

const Container = styled.div`
    background-color: #f3f3f3;
    height: 100%;
`

const HomePage = () => {
    return (
        <Container>
            <Header />
        </Container>
    )
}

export default HomePage
