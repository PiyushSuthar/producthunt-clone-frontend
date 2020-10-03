import React, { useEffect, useState } from 'react'
import Base from './Base'
import Card from "../Components/Card";
import { getProductsForHomepage } from './Product/helper';

const HomePage = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getProductsForHomepage().then(resData => {
            if (resData.error) {
                console.log(resData.error)
                return
            }
            setData(resData)
        })
    }, [])
    return (
        <Base>
            {data.map((product, index) => (
                <Card key={ index }
                    name={ product.name }
                    logo={ product.logo }
                    upvotes={ product.upvoteCount }
                    id={ product._id }
                    description={ product.description }
                    link={ product.link }
                />
            )) }
        </Base>
    )
}

export default HomePage
