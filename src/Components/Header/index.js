import React, { useRef } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, SignOut } from '../../Auth/helper'
import Button from '../Button'
import styles from './header.module.css'

const Header = ({ history }) => {
    const NavMenuRef = useRef()
    return (
        <div className={ styles.header_container }>
            <div className={ styles.header_inner }>
                <div className={ styles.header_logo }>
                    <Link to="/">
                        <h1 style={ { color: "black" } }>वस्तु खोज</h1>
                    </Link>
                </div>
                <div onClick={ (e) => {
                    if (NavMenuRef.current.style.display === "flex") {
                        NavMenuRef.current.style.display = "none"
                    } else {
                        NavMenuRef.current.style.display = "flex"
                    }
                } } className={ styles.hamburger_menu }>
                    <div className={ styles.ham_bar }></div>
                    <div className={ styles.ham_bar }></div>
                    <div className={ styles.ham_bar }></div>
                </div>
                <div ref={ NavMenuRef } className={ styles.header_links }>
                    <Link to="/" className={ styles.header_link }>Home</Link>
                    <Link to="/products" className={ styles.header_link }>Products</Link>
                    <Link to="/users" className={ styles.header_link }>Users</Link>
                    <div onClick={ (e) => {
                        if (NavMenuRef.current.style.display === "flex") {
                            NavMenuRef.current.style.display = "none"
                        } else {
                            NavMenuRef.current.style.display = "flex"
                        }
                    } } className={ [styles.hamburger_menu, styles.hamburder_menu_clicked, styles.hamBugerSide].join(" ") }>
                        <div className={ styles.ham_bar }></div>
                        <div className={ styles.ham_bar }></div>
                        <div className={ styles.ham_bar }></div>
                    </div>
                    { isAuthenticated() ? (
                        <>
                            <Button onClick={ () => {
                                SignOut(() => {
                                    history.push("/")
                                })
                            } } className={ styles.header_link_button }>Sign Out</Button>
                            <Link to="/create/product"><Button>Post</Button></Link>
                            <Link to="/dashboard/user"><Button>Dashboard</Button></Link>
                            <Link className={ styles.user_IMAGE } to={ `/user/${isAuthenticated().user.username}` }><img src={ isAuthenticated().user.userImageUrl } style={ { height: "100%", width: "auto", borderRadius: "50%", maxHeight: "40px" } } alt={ isAuthenticated().user.name } /></Link>
                        </>
                    ) : (
                            <>
                                <Link to="/signin" className={ styles.header_link_button }>Sign in</Link>
                                <Link to="/signup" className={ styles.header_link_button }>Sign up</Link>
                            </>
                        ) }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)
