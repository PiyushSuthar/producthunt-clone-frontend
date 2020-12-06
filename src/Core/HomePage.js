import React, { useEffect, useState } from 'react'
import Base from './Base'
import Card from "../Components/Card";
import { getProductsForHomepage } from './Product/helper';
import LoadingIndicator from '../Components/LoadingIcon';
import Button from '../Components/Button';

const HomePage = () => {

    const [products, setProducts] = useState({
        products: [],
        page_info: {}
    })
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState({
        total_products: 0,
        perpage: 8,
        pageNo: 1,
        total_pages: 0,
    })

    useEffect(() => {
        getProductsForHomepage(pageData.perpage, pageData.pageNo).then(resData => {
            if (resData.error) {
                console.log(resData.error)
                return
            }
            setProducts(prev => ({ ...prev, products: [...prev.products, ...resData.products], page_info: resData.page_info }))
            setLoading(false)
        })
    }, [pageData])
    const isLastPage = () => {
        return products.page_info.total_pages !== pageData.pageNo
    }
    return (
        <Base>
            {loading ? (
                <LoadingIndicator />
            ) : (
                    <>
                        {products.products.map((product, index) => (
                            <Card key={ index }
                                name={ product.name }
                                logo={ product.logo }
                                upvotes={ product.upvoteCount }
                                id={ product._id }
                                description={ product.description }
                                link={ product.link }
                            />
                        )) }
                        <div style={ { display: "flex", alignItems: "center", justifyContent: "center" } } className="load_more_button">
                            <Button style={ { cursor: isLastPage() ? "pointer" : "not-allowed" } } onClick={ () => {
                                isLastPage() && setPageData(prev => ({ ...prev, pageNo: prev.pageNo + 1 }))
                            } }>{ isLastPage() ? "Load More" : "No More Left" }</Button>
                        </div>
                    </>

                ) }
        </Base>
    )
}

export default HomePage
