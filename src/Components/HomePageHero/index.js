import React from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePageHero.module.css'

const HomePageHero = () => {
    return (
        <div className={ styles.hero_outer }>
            <div className={ styles.hero_header }>
                <h1>क्या आप अपने उत्पाद का प्रदर्शन करना चाहते हैं?</h1>
                <p>आज ही साइन अप करें!</p>
                <Link to="/signup"><button className={ styles.action_button }>Get Started!</button></Link>
            </div>
        </div>
    )
}

export default HomePageHero
