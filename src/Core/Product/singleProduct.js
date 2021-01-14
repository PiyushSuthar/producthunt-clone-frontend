import React, { useState, useEffect, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import Base from '../Base'
import WhiteBackgroundDiv from '../../Components/WhiteBackContainer'
import { getSingleProduct, upvoteProduct } from './helper'
import { API } from '../../config'
import Button from '../../Components/Button'
import { isAuthenticated } from '../../Auth/helper'
import LoadingIndicator from '../../Components/LoadingIcon'
import ShareBox from '../../Components/ShareBox'
import styles from './singleproduct.module.css'
const CommentSystem = React.lazy(() => import('./CommentSystem'))

const SingleProduct = () => {
    const { productId } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        getSingleProduct(productId).then(resData => {
            if (resData.error) {
                console.log(resData.error)
                setIsError(resData.error)
                setLoading(false)
                return
            }
            setData(resData)
            setIsError(false)
            setLoading(false)
        })
    }, [productId])

    const isMobile = window.matchMedia("(max-width: 600px)").matches

    function getCurrentUrl() {
        if (typeof window !== 'undefined') {
            return window.location.host + window.location.pathname
        }
    }

    const OpenLink = () => (
        <a target="_blank" rel="noopener noreferrer" href={ data.link }>
            <Button style={ { padding: "12px", width: "100%" } }>Visit  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==" alt="" /></Button>
        </a>
    )

    const ProductInfo = () => (
        <>
            <div className={ styles.product_info_container }>
                <div className="image">
                    <img style={ { width: "80px", height: "auto" } } src={ `${API.slice(0, -3)}${data.logo}` } alt={ data.name } />
                </div>
                <div style={ { padding: "10px", flex: "1" } } className="info">
                    <h3 style={ { fontWeight: 500 } }>{ data.name }</h3>
                </div>
                <div className={ styles.buttonContainer }>
                    <div className="upvote_button">
                        <Button onClick={ () => {
                            if (isAuthenticated()) {
                                const { token } = isAuthenticated()
                                upvoteProduct(data._id, token).then(resData => {
                                    if (resData.error) {
                                        console.log(resData.error)
                                        return
                                    }
                                    if (resData.type === "upvote") {
                                        setData(prev => ({ ...prev, upvoteCount: prev.upvoteCount + 1 }))
                                    } else {
                                        setData(prev => ({ ...prev, upvoteCount: prev.upvoteCount - 1 }))
                                    }
                                })
                            } else {
                                // history.push("/signin")
                                console.log("error")
                            }
                        } } style={ { padding: "10px" } }>&#x25B2; UPVOTE <span style={ { fontWeight: "600", marginLeft: "4px" } }>{ data.upvoteCount }</span></Button>
                    </div>
                    { isMobile && <OpenLink /> }
                </div>
            </div>
            <div className={ styles.product_image_and_desc_container }>
                <WhiteBackgroundDiv style={ { display: "flex", flexDirection: "column", marginTop: "10px", padding: "20px" } }>
                    <div style={ { display: "flex", flexDirection: "row", overflowY: "auto" } }>
                        { data.images.map((imgSrc, index) => (
                            <img style={ { width: "100%" } } key={ index } loading="lazy" src={ `${API.slice(0, -3)}${imgSrc}` } alt={ data.name + index } />
                        )) }
                    </div>
                    <p>
                        { data.description }
                    </p>
                    <ShareBox url={ getCurrentUrl() } text={ data.name } />
                </WhiteBackgroundDiv>
                <div className={ styles.product_make_info_and_link }>
                    { !isMobile && <OpenLink /> }
                    <WhiteBackgroundDiv className={ styles.product_maker } style={ { display: "flex", flexDirection: "column" } }>
                        <h5 style={ { color: " rgb(146, 146, 146)" } }>MAKER</h5>
                        <Link to={ "/user/" + data.creator.username }>
                            <div style={ { display: "flex", flexDirection: "row", alignItems: "center" } }>
                                <img style={ { borderRadius: "50%", width: "50px" } } src={ data.creator.userImageUrl } alt={ data.creator.name } />
                                <h3 style={ { fontSize: "17px", padding: "5px" } }>{ data.creator.name }</h3>
                            </div>
                        </Link>
                    </WhiteBackgroundDiv>
                </div>
            </div>
        </>
    )

    return (
        <Base title={ loading ? undefined : isError ? "नहीं मिला" : data.name }>
            {loading ? (
                <LoadingIndicator />
            ) : isError ? (
                <WhiteBackgroundDiv>
                    <h2 style={ { fontSize: "40px", textAlign: "center" } }>404</h2>
                    <p style={ { textAlign: "center" } }>We tried our best, but... failed to find the product you were looking for...</p>
                    <br />
                    <p style={ { textAlign: "center" } }>Would you mind visiting our Homepage instead?</p>
                    <div style={ { display: "flex", justifyContent: "center", flexDirection: "row" } }>
                        <Link to="/"><Button>Home</Button></Link>
                    </div>
                </WhiteBackgroundDiv>
            ) : (<>
                <ProductInfo />
                <Suspense fallback={ <LoadingIndicator /> }>
                    <CommentSystem productid={ data._id } />
                </Suspense>
            </>) }
        </Base>
    )
}

export default SingleProduct
