import React, { useState, useEffect } from 'react'
import { getProductsForHomepage } from '../Core/Product/helper'

const data = {
    products: [],
    page_info: {}
}

const HomeContext = React.createContext(data)

export const Consumer = HomeContext.Consumer
export const Provider = HomeContext.Provider

export const useHomePageContext = () => {
    const context = React.useContext(HomeContext)
    return context
}

export const useHomePageDataFetch = () => {
    const [products, setProducts] = useState({
        products: [],
        page_info: {}
    })
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState({
        total_products: 0,
        perpage: 4,
        pageNo: 1,
        total_pages: 0,
    })

    useEffect(() => {
        setLoading(true)
        getProductsForHomepage(pageData.perpage, pageData.pageNo).then(resData => {
            if (resData.error) {
                console.log(resData.error)
                return
            }
            console.log(resData);
            setProducts(prev => ({ ...prev, products: [...prev.products, ...resData.products], page_info: resData.page_info }))
            setLoading(false)
        })
    }, [pageData])
    const isLastPage = () => products.page_info.total_pages !== pageData.pageNo

    return {
        isLoading: loading,
        pageData,
        setPageData,
        products,
        isLastPage
    }
}
export default HomeContext