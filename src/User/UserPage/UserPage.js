import React, { useState, useEffect } from 'react'
import Base from '../../Core/Base'
import { useParams } from 'react-router-dom'
import Button from '../../Components/Button'
import Card from '../../Components/Card'
import { followUser, getUserByUsername, unFollowUser } from '../Helper'
import { isAuthenticated } from '../../Auth/helper'

const UserPage = () => {
    const { username } = useParams()

    const [data, setData] = useState({})
    const [loaded, setLoaded] = useState(false)

    const { user, token } = isAuthenticated()

    useEffect(() => {
        getUserByUsername(username).then(resData => {
            if (resData.error) {
                console.log(resData.error)
                return
            }
            setData(resData)
            setLoaded(true)
        })
    }, [username])

    const FollowButton = () => {
        const followThisUser = () => {
            followUser(data.username, token).then(resData => {
                if (resData.error) {
                    console.log(resData.error)
                    return
                }

            })
        }
        const unFollowThisUser = () => {
            unFollowUser(data.username, token).then(resData => {
                if (resData.error) {
                    console.log(resData.error)
                    return
                }

            })
        }
        if (user._id !== data._id) {
            if(data.followers.includes(user._id)){
                return(
                    <Button onClick={ () => unFollowThisUser() }>unFollow</Button>
                )
            }else{
                return (
                    <Button onClick={ () => followThisUser() }>Follow</Button>
                )
            }
        }else{
            return (
                <Button onClick={ () => console.log("Click") }>Edit</Button>
            )
        }
    }

    const UserProfile = () => (
        <div style={ {
            backgroundColor: "white",
            padding: "10px",
            width: "100%",
            height: "100%",
            boxShadow: "0 0 12px 0 rgba(0,0,0,0.1)",
        } } className="container">
            <div style={ {
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexWrap: "wrap"
            } } className="profile_container">
                <div className="profile_user_img">
                    <img src={ data.userImageUrl } style={ {
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
                        <FollowButton />
                    </div>
                </div>
            </div>
        </div>
    )



    return (
        <Base title="Piyush Suthar">
            {loaded ? (
                <>
                    <UserProfile />
                    <h3 style={ {
                        fontSize: "25px",
                        fontWeight: "500",
                        margin: "5px 10px"
                    } }>Products</h3>
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
