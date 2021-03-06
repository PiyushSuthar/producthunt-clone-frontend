import React from 'react'
import PropTypes from 'prop-types'
import styles from './ShareBox.module.css'
import Button from '../Button'

const ShareBox = ({ text = "Vastu Khoj - An Incredibale Product", url = "https://vastukhoj.com" }) => {
    return (
        <div className={ styles.sharebox_container }>
            <a target="_blank" rel="noopener noreferrer" href={ `https://twitter.com/intent/tweet?text=${text}&tw_p=tweetbutton&url=${url}&via=piyushsthr` }>
                <Button style={ { borderColor: "#00acee", color: "#00acee " } }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z" /><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" fill="rgba(0,172,238,1)" /></svg> Tweet
                </Button>
            </a>
            <a target="_blank" rel="noopener noreferrer" href={ `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}` }>
                <Button style={ { borderColor: "#3b5998 ", color: "#3b5998  " } }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z" /><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" fill="rgba(59,89,152,1)" /></svg> Share
                </Button>
            </a>
        </div>
    )
}

ShareBox.propTypes = {
    text: PropTypes.string,
    url: PropTypes.string
}

export default ShareBox
