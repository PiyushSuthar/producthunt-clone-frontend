import React from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base'

const SingleProduct = () => {
    const { productId } = useParams()

    return (
        <Base>
            <h3>{ productId }</h3>
        </Base>
    )
}

export default SingleProduct
