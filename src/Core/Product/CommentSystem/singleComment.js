import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../../Auth/helper'
import Button from '../../../Components/Button'
import { SuccessDialog } from '../../../Components/Error-SucessDialog'
import FormInput from '../../../Components/Form/input'
import { deleteTheComment, replyToComment } from './helper'
import styles from './SingleComment.module.css'

const SingleComment = ({
    name = "Piyush Suthar",
    comment = "Awesome App! Loved it!",
    avatar = "",
    replies = [],
    id = "",
    username = "",
    productId
}) => {

    const [showReply, setShowReply] = useState(false)

    const [repliesArr, setReplies] = useState([])
    const [replyData, setReplyData] = useState({
        comment: ""
    })
    useEffect(() => {
        setReplies(replies)
    }, [])

    const handleInput = e => {
        setReplyData({ comment: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        replyToComment(id, isAuthenticated().token, replyData)
            .then(resData => {
                if (resData.error) {
                    throw new Error(JSON.stringify(resData.message))
                }
                setReplies(prev => [...prev, resData])
            }).catch(err => {
                throw new Error(err)
            })
    }

    function handleDelete() {
        deleteTheComment(id, isAuthenticated() && isAuthenticated().token).then(resData => {
            if (resData.error) {
                console.log(resData.error)
                return
            }
        })
    }

    const CommentReply = ({ replierName, replierAvatar, replierComment, replierUsername, replierId }) => (
        <div className={ styles.comment_reply }>
            <div className={ styles.commentor_avatar }>
                <Link to={ `/user/${replierUsername}` }><img loading="lazy" src={ replierAvatar } alt={ replierName } /></Link>
            </div>
            <div className={ styles.reply_data }>
                <Link to={ `/user/${replierUsername}` }><h2 className={ styles.commentor_name }>{ replierName }</h2></Link>
                <p>{ replierComment }</p>
                <div className={ styles.comment_moderation }>
                    <Button>Reply</Button>
                    { isAuthenticated() && isAuthenticated().user._id === replierId && (
                        <Button>Delete</Button>
                    ) }
                </div>
            </div>
        </div>
    )
    return (
        <div className={ styles.singleComment }>
            <div className={ styles.commentor_avatar }>
                <Link to={ `/user/${username}` }><img loading="lazy" src={ avatar } alt={ name } /></Link>
            </div>
            <div className={ styles.comment_data }>
                <Link to={ `/user/${username}` }><h2 className={ styles.commentor_name }>{ name }</h2></Link>
                <p>{ comment }</p>
                <div className={ styles.comment_moderation }>
                    <Button onClick={ () => {
                        setShowReply(prev => !prev)
                    } }>Reply</Button>
                    { isAuthenticated() && isAuthenticated().user.username === username && (
                        <Button onClick={ handleDelete }>Delete</Button>
                    ) }
                </div>

                { showReply ? isAuthenticated() ? (

                    <form onSubmit={ handleSubmit } style={ { display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: 'flex-start', width: "100%" } }>
                        <img loading="lazy" src={ isAuthenticated().user.userImageUrl } style={ { borderRadius: "50%", width: "50px", height: "auto" } } alt={ isAuthenticated().user.name } />
                        <FormInput required onInput={ handleInput } parentStyle={ { width: "100%" } } row={ 5 } placeholder="Reply comment..." type="text" isTextArea={ true } />
                        <Button>Send</Button>
                    </form>
                ) : (
                        <Link to={ `/signin?redirect=/product/${productId}` }>
                            <SuccessDialog color="purple">
                                <p style={ { textAlign: "center" } }>Please Sign in to reply!</p>
                            </SuccessDialog>
                        </Link>
                    ) : "" }
                { repliesArr.map((replyData, index) => (
                    <CommentReply
                        key={ index }
                        replierName={ replyData.user.name }
                        replierAvatar={ replyData.user.userImageUrl }
                        replierId={ replyData.user._id }
                        replierComment={ replyData.comment }
                        replierUsername={ replyData.user.username }
                    />
                )) }
            </div>
        </div>
    )
}

export default SingleComment
