import React, { useState, useEffect } from 'react'
import Base from '../../Core/Base'
import { Link, useParams } from 'react-router-dom'
import Button from '../../Components/Button'
import Card from '../../Components/Card'
import { followUser, getUserByUsername, unFollowUser } from '../Helper'
import { isAuthenticated } from '../../Auth/helper'
import WhiteBgContainer from '../../Components/WhiteBackContainer'
import ErrorPage from '../../Components/Error-SucessDialog/ErrorPage'

const UserPage = () => {
    const { username } = useParams()

    const [data, setData] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        getUserByUsername(username).then(resData => {
            if (resData.error) {
                console.log(resData.error)
                setError(resData.error)
                setLoaded(true)
                return
            }
            setData(resData)
            setLoaded(true)
        })
    }, [username])

    const FollowButton = () => {
        const followThisUser = (next) => {
            isAuthenticated() && followUser(data.username, isAuthenticated().token).then(resData => {
                if (resData.error) {
                    console.log(resData.error)
                    return
                }
                next && next()

            })
        }
        const unFollowThisUser = (next) => {
            isAuthenticated() && unFollowUser(data.username, isAuthenticated().token).then(resData => {
                if (resData.error) {
                    console.log(resData.error)
                    return
                }
                next && next()
            })
        }
        if (isAuthenticated() && isAuthenticated().user._id !== data._id) {
            if (typeof data.followers && data.followers.includes(isAuthenticated().user._id)) {
                return (
                    <Button onClick={ () => {
                        unFollowThisUser(() => {
                            setData(prev => {
                                return {
                                    ...prev,
                                    followers: [...data.followers.filter(data => data !== isAuthenticated().user._id)]
                                }
                            })
                        })
                    } }>unFollow</Button>
                )
            } else {
                return (
                    <Button onClick={ () => {
                        followThisUser(() => {
                            setData(prev => {
                                return {
                                    ...prev,
                                    followers: [...prev.followers, isAuthenticated().user._id]
                                }
                            })
                        })

                    } }>Follow</Button>
                )
            }
        } else {
            return (
                <Link to="/dashboard/user"><Button>Dashboard</Button></Link>
            )
        }
    }

    const UserProfile = () => (
        <WhiteBgContainer>
            <div style={ {
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexWrap: "wrap"
            } } className="profile_container">
                <div className="profile_user_img">
                    <img src={ data.userImageUrl.includes("https://www.gravatar.com") ? data.userImageUrl + "?s=200" : data.userImageUrl } style={ {
                        borderRadius: "50%"
                    } } alt={ data.name } />
                </div>
                <div className="profile_user_information">
                    <h3 style={ { fontSize: "25px", marginBottom: "0", paddingBottom: 0 } } className="proflle_user_name">{ data.name }</h3>
                    <p style={ { color: "grey", marginTop: "0" } } className="profile_user_username">@{ data.username }</p>
                    <p style={ { marginTop: "5px" } }>{ data.userBio ? data.userBio : "" }</p>
                    <div style={ {
                        marginTop: "10px"
                    } } className="profile_user_buttons">
                        { isAuthenticated().user ? <FollowButton /> : <Link to="/signin"><Button>Login To Follow</Button></Link> }
                    </div>
                </div>
            </div>
        </WhiteBgContainer>
    )



    return (
        <Base title={ data.name ? "श्रीमान " + data.name : undefined }>
            {loaded ? error? (
                <ErrorPage/>
            ):(
                <>
                    <UserProfile />
                    <div style={ { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" } }>
                        <h3 style={ {
                            fontSize: "25px",
                            fontWeight: "500",
                            margin: "5px 10px"
                        } }>Products</h3>
                        { isAuthenticated() && isAuthenticated().user._id === data._id && (
                            <Link to="/create/product"><Button  >Create Product</Button></Link>
                        ) }
                    </div>
                    {data.products.map((product, index) => (
                        <Card key={ index }
                            name={ product.name }
                            logo={ product.logo }
                            upvotes={ product.upvoteCount }
                            id={ product._id }
                            description={ product.description }
                            link={ product.link }
                        />
                    )) }
                </>
            ) : (
                    <h3 style={ {
                        textAlign: "center",
                        margin: "10px",
                        fontWeight: "400"
                    } }>Loading</h3>
                ) }
        </Base>
    )
}

export default UserPage
