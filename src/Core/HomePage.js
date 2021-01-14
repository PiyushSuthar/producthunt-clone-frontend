import React from 'react'
import Base from './Base'
import Card from "../Components/Card";
// import { getProductsForHomepage } from './Product/helper';
import LoadingIndicator from '../Components/LoadingIcon';
import Button from '../Components/Button';
import HomePageHero from '../Components/HomePageHero';
import { isAuthenticated } from '../Auth/helper';
import { useHomePageContext } from '../Context/HomePage.context'

const HomePage = () => {
    const { isLoading, setPageData, products, isLastPage } = useHomePageContext()

    return (
        <Base>
            { !isAuthenticated() && <HomePageHero /> }
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
            {isLoading ? (
                <LoadingIndicator />
            ) : "" }
            <div style={ { display: "flex", alignItems: "center", justifyContent: "center" } } className="load_more_button">
                <Button style={ { cursor: isLastPage() ? "pointer" : "not-allowed" } } onClick={ () => {
                    isLastPage() && setPageData(prev => ({ ...prev, pageNo: prev.pageNo + 1 }))
                } }>{ isLastPage() ? "Load More" : "No More Left" }</Button>
            </div>
        </Base>
    )
}

export default HomePage
