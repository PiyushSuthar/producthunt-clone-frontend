import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { authenticate, isAuthenticated, SignIN } from '../Auth/helper'
import Button from '../Components/Button'
import FormInput from '../Components/Form/input'
import Base from '../Core/Base'

const Signin = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        success: false,
        error: "",
        redirect: false
    })

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { email, password } = data
        SignIN({
            email,
            password
        }).then(resData => {
            if (resData.error) {
                setData({ ...data, error: resData.error, success: false })
                return;
            }
            authenticate(resData, () => {
                setData({ ...data, success: true })
            })
            setTimeout(() => {
                setData({ ...data, redirect: true })
            }, 2000);
        })
    }

    const successDialog = () => {
        if (data.success) {
            return (
                <>
                    <h3 style={ { color: "green", fontWeight: "400", border: "2px dashed green", padding: "10px", marginBottom: "10px" } }>Sign IN successfully! Redirecting to Home Page...</h3>
                </>
            )
        }
    }
    const errorDialog = () => {
        if (data.error) {
            return (
                <h3 style={ { color: "red", fontWeight: "400", border: "2px dashed red", padding: "10px", marginBottom: "10px" } } >Failed To Sign In, {data.error }</h3>
            )
        }
    }

    const performRedirect = () => {
        if (data.redirect) {
            return <Redirect to="/" />
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    return (
        <Base title="Sign In">
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
                    <h3 style={ { fontWeight: "500", fontSize: "25px" } }>Log in!</h3>
                    <p>Not registered? <Link to="/signin">Register &rarr;</Link></p>
                    <form onSubmit={ handleSubmit }>
                        <FormInput type="email" onChange={ handleChange("email") } name="email" placeholder="Ex. piyush@mysite.com" label="Your Email" required />
                        <FormInput type="password" onChange={ handleChange("password") } name="password" placeholder="********" label="Your Password" required />
                        <Button type="submit">Sign IN</Button>
                    </form>
                </div>
            </div>
        </Base>
    )
}

export default Signin
