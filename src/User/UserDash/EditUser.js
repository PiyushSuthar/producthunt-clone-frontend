import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../Auth/helper'
import Button from '../../Components/Button'
import FormInput from '../../Components/Form/input'
import { getUserByUsername } from '../Helper'
import { ErrorDialog, SuccessDialog } from '../../Components/Error-SucessDialog'

const EditUser = () => {

    const [data, setData] = useState({
        name: "",
        userBio: "",
        userImageUrl: "",
        success: false,
        error: "",
        formData: ""
    })

    const { user, token } = isAuthenticated()

    useEffect(() => {
        getUserByUsername(user.username).then(resData => {
            if (resData.error) {
                setData(prev => { return { ...prev, error: resData.error, success: false } })
            }
            setData(prev => { return { ...prev, name: resData.name, userBio: resData.userBio, formData: new FormData() } })
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleInput = name => event => {
        const value = name === "userImageUrl" ? event.target.files[0] : event.target.value
        data.formData.set(name, value)
        setData({ ...data, [name]: value })
    }

    return (
        <>
            {data.error ? <ErrorDialog>Failed to Update!, { data.error }</ErrorDialog> : "" }
            {data.success ? <SuccessDialog>User Updated Sucessfully!</SuccessDialog> : "" }
            <form onSubmit={ handleSubmit }>
                <FormInput type="text" onChange={ handleInput("name") } placeholder="Your Name" value={ data.name } name="name" label="Your Name" />
                <FormInput type="text" onChange={ handleInput("userBio") } placeholder="Your Bio" value={ data.userBio } name="bio" label="Your Bio" />
                <FormInput type="file" onChange={ handleInput("userImageUrl") } name="userImageUrl" label="Your Avatar" />
                <p style={ { fontSize: "12px", } }>*Initialy, we grab your image from gavatar...</p>
                <Button type="submit" style={ { width: "100%" } } >Update</Button>
            </form>
        </>
    )
}

export default EditUser
