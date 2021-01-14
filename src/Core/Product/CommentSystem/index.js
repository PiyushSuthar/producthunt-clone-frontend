import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../../Auth/helper';
import Button from '../../../Components/Button';
import FormInput from "../../../Components/Form/input";
import WhiteBgContainer from '../../../Components/WhiteBackContainer';
import SingleComment from './singleComment';
import { SuccessDialog } from "./../../../Components/Error-SucessDialog";
import { createComment, getCommentsForProduct } from "./helper";

const CommentSystem = ({ productid }) => {
    const [data, setData] = useState({
        comment: "",
        success: false,
        error: "false"
    })
    const [commentsArr, setComments] = useState([])
    const [wasLastComment, setLastComment] = useState(false)
    const [nextPage, setNextPage] = useState(1)

    useEffect(() => {
        getCommentsForProduct(productid, nextPage).then(resData => {
            if (resData.error) {
                console.log(resData.error)
                return
            }
            if (resData.isLastPage) {
                setLastComment(true)
                return
            }
            setComments(prev => [...prev, ...resData])
        })
    }, [productid, nextPage])

    const handleSubmit = e => {
        e.preventDefault()
        createComment(productid, isAuthenticated().token, { comment: data.comment }).then(resData => {
            if (resData.error) {
                console.log(resData)
                return
            }
            console.log(resData)
            setData(prev => ({ ...prev, comment: "", success: true, error: false }))
            setComments(prev => ([...prev, resData]))
        }).catch(err => console.log(err))
    }
    const handleInput = e => {
        setData({ ...data, comment: e.target.value })
    }

    // Components
    // const CommentBox = () => 

    return (
        <WhiteBgContainer style={ { marginTop: "20px", padding: "20px" } }>
            <div className="comment_container">
                <h3>Discussion</h3>

                {/* <CommentBox /> */ isAuthenticated() ? (
                    <div className="comment_input" style={ { display: "flex", flexDirection: "row", alignItems: "flex-start", marginTop: "10px" } } >
                        <img loading="lazy" src={ isAuthenticated().user.userImageUrl } style={ { borderRadius: "50%", width: "50px", height: "auto" } } alt={ isAuthenticated().user.name } />
                        <form style={ { width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start" } } onSubmit={ handleSubmit }>
                            <FormInput required value={data.comment} onInput={ handleInput } parentStyle={ { width: "100%" } } rows="5" cols={5} isTextArea={ true } placeholder="Enter Your Comment!" />
                            <Button style={ { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" } }>Send <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" /></svg></Button>
                        </form>
                    </div>

                ) : (
                        <Link to={ `/signin?redirect=/product/${productid}` }>
                            <SuccessDialog color="purple">
                                <p style={ { textAlign: 'center' } }>Please Sign In to comment.</p>
                            </SuccessDialog>
                        </Link>
                    ) }

                { commentsArr.map((commentData, index) => (
                    <SingleComment
                        key={ index }
                        name={ commentData.user.name }
                        username={ commentData.user.username }
                        comment={ commentData.comment }
                        replies={ commentData.replies }
                        avatar={ commentData.user.userImageUrl }
                        id={ commentData._id }
                        productId={ productid }
                        removeFromArr={ () => {
                            setComments(prev => {
                                let filtered = prev.filter((value, i, a) => {
                                    return value._id !== commentData._id
                                })
                                console.log(filtered)
                                return filtered
                            })
                        } }
                    />
                )) }
                <div className="loadMoreButton" style={ { display: "flex", alignItems: "center", justifyContent: "center" } }>
                    <Button style={ { cursor: !wasLastComment ? "pointer" : "not-allowed" } } onClick={ () => {
                        !wasLastComment && setNextPage(prev => prev + 1)
                    } }>{ !wasLastComment ? "Load More" : "No More Left" }</Button>
                </div>
            </div>

        </WhiteBgContainer>
    )
}

export default CommentSystem