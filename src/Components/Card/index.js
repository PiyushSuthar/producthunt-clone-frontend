import React from 'react'
import { Link } from 'react-router-dom'
import styles from './card.module.css'

const ProductCard = ({
    id = "12345678890",
    name = "Toolzar",
    description = "Toolzar is an awesome app with some really awesome web... Probably a awesome app!",
    logo = "https://www.gravatar.com/avatar/e31205ff3c84df50c69103c2e9700ec9?s=200",
    upvotes = "123",
    link = "https://toolzar.js.org"
}) => {
    return (
        <Link className={ styles.cardouter_link } to={ `/product/${id}` }>
            <div className={ styles.card_outer }>
                <div className={ styles.card_product_logo }>
                    <img style={ { width: "80px", height: "80px" } } src={ logo } alt={ name } />
                </div>
                <div className={ styles.card_product_info }>
                    <div className={ styles.card_product_name }>
                        <h3>{ name }</h3>
                        <p>{ description }</p>
                    </div>
                    <div className={ styles.card_product_meta }>
                        <a target="_blank" rel="noopener noreferrer" href={ link }>visit &rarr;</a>
                    </div>
                </div>
                <div className={ styles.card_upvote_counter }>
                    <div className="arrow">&#x25B2;</div>
                    <div className="number">{ upvotes }</div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
