import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import styles from './userDashProduct.module.css'
import { Link } from 'react-router-dom'
import { getAllProductsByUsername, deleteProduct } from '../../../Core/Product/helper'
import { isAuthenticated } from '../../../Auth/helper'
import LoadingIndicator from '../../../Components/LoadingIcon'

const UserDashProducts = () => {

    const [data, setData] = useState([])
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)

    const { user, token } = isAuthenticated()
    useEffect(() => {
        getAllProductsByUsername(isAuthenticated().user.username).then(resData => {
            if (resData.error) {
                console.log(resData.error)
                return
            }
            setLoading(false)
            setData(resData)
        })
    }, [])



    return (
        <div className={ styles.userdash_products_container }>
            <div className={ styles.userdash_manage_buttons }>
                <h3>Manage Products</h3>
                <Link to="/create/product"><Button>Create Products</Button></Link>
            </div>
            <div style={ { width: '100%', paddingTop: "10px" } } className="products">
                { loading ? (
                    <LoadingIndicator />
                ) : data.length > 0 ? data.map((product, index) => (
                    <SingleProduct username={ user.username } setReload={ setReload } token={ token } id={ product._id } name={ product.name } key={ index } />
                )) : (
                            <h3>No Products</h3>
                        ) }
            </div>
            {reload ? "" : "" }
        </div>
    )
}

export default UserDashProducts

const SingleProduct = ({ name, id, username, token, setReload }) => (
    <div className={ styles.manageProduct_single }>
        <div className={ styles.product_name }>
            <h5>{ name }</h5>
        </div>
        <div className={ styles.product_links }>
            <Link to={ `/product/${id}` }><Button>View</Button></Link>
            <Button style={ { borderColor: "blue", color: "blue" } }>Update</Button>
            <Button style={ { borderColor: "red", color: "red" } } onClick={ () => {
                deleteProduct(username, id, token).then(resData => {
                    if (resData.error) {
                        console.log(resData.error)
                        return
                    }
                    setReload(prev => !prev)
                })
            } } >Delete</Button>
        </div>
    </div>
)