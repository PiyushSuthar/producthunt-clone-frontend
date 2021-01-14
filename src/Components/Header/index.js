import React, { useRef } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, SignOut } from '../../Auth/helper'
import Button from '../Button'
import styles from './header.module.css'

function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = React.useState(
        initialIsVisible
    );
    const ref = useRef(null);

    const handleHideDropdown = (event) => {
        if (event.key === "Escape") {
            setIsComponentVisible(false);
        }
    };

    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", handleHideDropdown, true);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("keydown", handleHideDropdown, true);
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return [ ref, isComponentVisible, setIsComponentVisible ];
}

const Header = ({ history }) => {
    const NavMenuRef = useRef()
    // const [dropdownShow, setDropDownShow] = React.useState(false)
    // const DropDownRef = useRef()
    const [ DropDownRef, dropdownShow, setDropDownShow ] = useComponentVisible(false);

    // React.useEffect(()=> {
    //     function handleClickOutside(event) {
    //         if (dropdownShow && DropDownRef.current && !DropDownRef.current.contains(event.target)) {
    //             alert("You clicked outside of me!");
    //         }
    //     }

    //     // Bind the event listener
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         // Unbind the event listener on clean up
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // })

    const Logo = () => (
        <div className={ styles.header_logo }>
            <Link to="/">
                <h1 style={ { color: "black" } }>वस्तु खोज</h1>
            </Link>
        </div>
    )

    const HamBurger = ({ onClick, clicked = false }) => (
        <div onClick={ onClick } className={ clicked ? [styles.hamburger_menu, styles.hamburder_menu_clicked, styles.hamBugerSide].join(" ") : styles.hamburger_menu }>
            <div className={ styles.ham_bar }></div>
            <div className={ styles.ham_bar }></div>
            <div className={ styles.ham_bar }></div>
        </div>
    )

    return (
        <div className={ styles.header_container }>
            <div className={ styles.header_inner }>
                <Logo />
                <div ref={ NavMenuRef } className={ styles.header_links }>
                    <Link to="/" className={ styles.header_link }>Home</Link>
                    <Link to="/products" className={ styles.header_link }>Products</Link>
                    <Link to="/users" className={ styles.header_link }>Users</Link>
                    { isAuthenticated() ? (
                        <>
                            <div className={ styles.dropdown }>
                                <img
                                    src={ isAuthenticated().user.userImageUrl }
                                    style={ { height: "100%", width: "auto", borderRadius: "50%", maxHeight: "40px", marginRight: "10px" } }
                                    alt={ isAuthenticated().user.name }
                                    onClick={ () => setDropDownShow(prev => !prev) }
                                    ref={ DropDownRef }
                                />
                                <div style={ { display: dropdownShow ? "flex" : "none" } } className={ styles.dropdownContent }>
                                    <Link className={ styles.dropdown_child } to={ `/user/${isAuthenticated().user.username}` }>
                                        My Profile
                                    </Link>
                                    <Link className={ styles.dropdown_child } to="/dashboard/user">Dashboard</Link>
                                    <Link className={ styles.dropdown_child } to="/create/product">Post</Link>
                                    <Button onClick={ () => {
                                        SignOut(() => {
                                            history.push("/")
                                        })
                                    } } >Sign Out</Button>
                                </div>

                            </div>

                        </>
                    ) : (
                            <div ref={ DropDownRef } className={ [styles.dropdown, styles.showDropOnPC].join(' ') }>
                                <HamBurger onClick={ () => setDropDownShow(prev => !prev) } clicked={ false } />
                                <div style={ { display: dropdownShow ? "flex" : "none" } } className={ [styles.dropdownContent, styles.showDropOnPC].join(' ') }>
                                    <Link to="/signin" className={ styles.header_link_button }>Sign in</Link>
                                    <Link to="/signup" className={ styles.header_link_button }>Sign up</Link>
                                </div>
                            </div>
                        ) }
                </div>
            </div>
        </div>
    )
}

// const BackUp = () => (
//     <div className={ styles.header_container }>
//             <div className={ styles.header_inner }>
//                 <Logo />
//                 <HamBurger />
//                 <div ref={ NavMenuRef } className={ styles.header_links }>
//                     <Link to="/" className={ styles.header_link }>Home</Link>
//                     <Link to="/products" className={ styles.header_link }>Products</Link>
//                     <Link to="/users" className={ styles.header_link }>Users</Link>
//                     <div onClick={ (e) => {
//                         if (NavMenuRef.current.style.display === "flex") {
//                             NavMenuRef.current.style.display = "none"
//                         } else {
//                             NavMenuRef.current.style.display = "flex"
//                         }
//                     } } className={ [styles.hamburger_menu, styles.hamburder_menu_clicked, styles.hamBugerSide].join(" ") }>
//                         <div className={ styles.ham_bar }></div>
//                         <div className={ styles.ham_bar }></div>
//                         <div className={ styles.ham_bar }></div>
//                     </div>
//                     { isAuthenticated() ? (
//                         <>
//                             <Button onClick={ () => {
//                                 SignOut(() => {
//                                     history.push("/")
//                                 })
//                             } } className={ styles.header_link_button }>Sign Out</Button>
//                             <Link to="/create/product"><Button>Post</Button></Link>
//                             <Link to="/dashboard/user"><Button>Dashboard</Button></Link>
//                             <Link className={ styles.user_IMAGE } to={ `/user/${isAuthenticated().user.username}` }><img src={ isAuthenticated().user.userImageUrl } style={ { height: "100%", width: "auto", borderRadius: "50%", maxHeight: "40px" } } alt={ isAuthenticated().user.name } /></Link>
//                         </>
//                     ) : (
//                             <>
//                                 <Link to="/signin" className={ styles.header_link_button }>Sign in</Link>
//                                 <Link to="/signup" className={ styles.header_link_button }>Sign up</Link>
//                             </>
//                         ) }
//                 </div>
//             </div>
//         </div>
// )
export default withRouter(Header)
