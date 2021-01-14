import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../Auth/helper'
import Button from '../../Components/Button'
import FormInput from '../../Components/Form/input'
import { getUserByUsername, updateUser } from '../Helper'
import { ErrorDialog, SuccessDialog } from '../../Components/Error-SucessDialog'
import LoadingIndicator from '../../Components/LoadingIcon'
import styles from './userDash.module.css'

const EditUser = () => {

    const [data, setData] = useState({
        name: "",
        userBio: "",
        username: "",
        success: false,
        error: "",
        loading: true
    })

    const { user, token } = isAuthenticated()

    useEffect(() => {
        getUserByUsername(user.username).then(resData => {
            if (resData.error) {
                setData(prev => { return { ...prev, error: resData.error, success: false, loading: false } })
            }
            setData(prev => { return { ...prev, name: resData.name, userBio: resData.userBio, username: resData.username, loading: false } })
        })
        return ()=> setData({})
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateUser(data.username, token, { name: data.name, userBio: data.userBio })
            .then(resData => {
                if (resData.error) {
                    setData(prev => ({ ...prev, error: resData.error, success: false }))
                    return
                }
                setData(prev => ({ ...prev, success: true, error: false }))
            })
    }

    const handleInput = name => event => {
        const value = event.target.value
        setData({ ...data, [name]: value })
    }

    return data.loading ? <LoadingIndicator /> : (
        <div className={styles.edit_user_container}>
            {data.error ? <ErrorDialog>Failed to Update!, { data.error }</ErrorDialog> : "" }
            {data.success ? <SuccessDialog>User Updated Sucessfully!</SuccessDialog> : "" }
            <form onSubmit={ handleSubmit }>
                <FormInput type="text" onChange={ handleInput("name") } placeholder="Your Name" value={ data.name } name="name" label="Your Name" />
                <FormInput type="text" onChange={ handleInput("userBio") } isTextArea={ true } placeholder="Your Bio" value={ data.userBio } name="bio" label="Your Bio" />
                <label style={ { padding: "10px" } }>Your Avatar</label>
                <p style={ { fontSize: "15px", padding: "10px" } }>Please update it in your Gravatar Profile.</p>
                <Button type="submit" style={ { width: "100%" } } >Update</Button>
            </form>
        </div>
    )
}

export default EditUser
