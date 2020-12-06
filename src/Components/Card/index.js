import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../Auth/helper'
import { API } from '../../config'
import { upvoteProduct } from '../../Core/Product/helper'
import styles from './card.module.css'

const ProductCard = ({
    id = "12345678890",
    name = "Toolzar",
    description = "Toolzar is an awesome app with some really awesome web... Probably a awesome app!",
    logo = "https://www.gravatar.com/avatar/e31205ff3c84df50c69103c2e9700ec9?s=200",
    upvotes = 123,
    link = "https://toolzar.js.org",
    history
}) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        setCount(upvotes)
    }, [upvotes])
    const UPVoteBUtton = () => {
        return (
            <button onClick={ (e) => {
                e.preventDefault()
                if (isAuthenticated()) {
                    const { token } = isAuthenticated()
                    upvoteProduct(id, token).then(resData => {
                        if (resData.error) {
                            console.log(resData.error)
                            return
                        }
                        if (resData.type === "upvote") {
                            setCount(prev => prev + 1)
                        } else {
                            setCount(prev => prev - 1)
                        }
                    })
                } else {
                    history.push("/signin")
                }
            } } style={ { cursor: "pointer", pointerEvents: "initial" } } className={ styles.card_upvote_counter }>
                <div className="arrow">&#x25B2;</div>
                <div className="number">{ count }</div>
            </button>
        )
    }
    return (
        <Link className={ styles.cardouter_link } to={ `/product/${id}` }>
            <div className={ styles.card_outer }>
                <div className={ styles.card_product_logo }>
                    <img style={ { width: "80px", height: "80px" } } src={ `${API.slice(0, -3)}${logo}` } alt={ name } />
                </div>
                <div className={ styles.card_product_info }>
                    <div className={ styles.card_product_name }>
                        <h3>{ name }</h3>
                        <p>{ description.substr(0, 100) + "..." }</p>
                    </div>
                    <div style={ { position: "relative", zIndex: "1" } } className={ styles.card_product_meta }>
                        <button onClick={ (e) => {
                            e.preventDefault()
                            window.open(link)
                        } } style={ { cursor: "pointer", padding: "3px" } }>visit <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==" alt="" /></button>
                    </div>
                </div>
                <UPVoteBUtton />
            </div>
        </Link>
    )
}

export default withRouter(ProductCard)
