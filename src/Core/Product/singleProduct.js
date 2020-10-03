import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base'
import WhiteBackgroundDiv from '../../Components/WhiteBackContainer'
import { getSingleProduct } from './helper'
import { API } from '../../config'

const SingleProduct = () => {
    const { productId } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSingleProduct(productId).then(resData => {
            if (resData.error) {
                console.log(resData.error)
                return
            }
            setData(resData)
            setLoading(false)
        })
    }, [productId])

    const ProductInfo = () => (
        <WhiteBackgroundDiv style={ { display: "flex", flexDirection: "row", alignItems: "center" } }>
            <div className="image">
                <img style={ { width: "130px", height: "auto" } } src={ `${API.slice(0, -3)}${data.logo}` } alt={ data.name } />
            </div>
            <div className="info">
                <h3>{ data.name }</h3>
                <p>{ data.description }</p>
            </div>
        </WhiteBackgroundDiv>
    )

    return (
        <Base title={ loading ? undefined : data.name }>
            {loading ? (
                <h4>Loading</h4>
            ) : (
                    <ProductInfo />
                ) }
        </Base>
    )
}

export default SingleProduct
