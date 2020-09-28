import React, { useState } from 'react'
import { isAuthenticated, Signup } from '../Auth/helper'
import Button from '../Components/Button'
import FormInput from '../Components/Form/input'
import Base from '../Core/Base'
import { Link, Redirect } from 'react-router-dom'

const SignUp = () => {

    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        error: "",
        success: false,
        redirect: false
    })

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { name, username, email, password } = data
        Signup({
            name,
            username,
            email,
            password
        }).then(resData => {
            if (resData.error) {
                setData({ ...data, error: resData.error, success: false })
                return;
            }
            setData({ ...data, success: true })
            setTimeout(() => {
                setData({...data, redirect: true})
            }, 2000);
        })
    }

    const errorDialog = () => {
        if (data.error) {
            return (
                <h3 style={ { color: "red", fontWeight: "400", border: "2px dashed red", padding: "10px", marginBottom: "10px" } } >Failed To Register, {data.error }</h3>
            )
        }
    }
    const successDialog = () => {
        if (data.success) {
            return (
                <>
                    <h3 style={ { color: "green", fontWeight: "400", border: "2px dashed green", padding: "10px", marginBottom: "10px" } }>Sign Up successfully! Redirecting to SignIn Page...</h3>
                </>
            )
        }
    }

    const performRedirect = () => {
        if (data.redirect) {
            return <Redirect to="/signin" />
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    return (
        <Base title="Register">
            <div style={ {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%"
            } }>
                <div style={ {
                    backgroundColor: "white",
                    padding: "30px 40px",
                    boxShadow: "0 0 12px 0 rgba(0,0,0,0.15)",
                    width: "100%"
                } }>
                    { successDialog() }
                    { errorDialog() }
                    { performRedirect() }
                    <h3 style={ { fontWeight: "500", fontSize: "25px" } }>Register Yourself Here!</h3>
                    <p>Already registered? <Link to="/signin">Sign In &rarr;</Link></p>
                    <form onSubmit={ handleSubmit }>
                        <FormInput name="name" onChange={ handleChange("name") } placeholder="Ex. Piyush Suthar" label="Your Name" type="text" required/>
                        <FormInput type="text" onChange={ handleChange("username") } name="username" placeholder="Ex. piyush" label="Your Username" required/>
                        <FormInput type="email" onChange={ handleChange("email") } name="email" placeholder="Ex. piyush@mysite.com" label="Your Email" required/>
                        <FormInput type="password" onChange={ handleChange("password") } name="password" placeholder="********" label="Your Password" required/>
                        <Button type="submit">Register</Button>
                    </form>
                </div>
            </div>
        </Base>
    )
}

export default SignUp
