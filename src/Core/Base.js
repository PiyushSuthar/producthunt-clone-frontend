import React from 'react'
import { Container } from '@material-ui/core'

const Base = ({ children }) => {
    return (
        <Container maxWidth="md">
            {children }
        </Container>
    )
}

export default Base
