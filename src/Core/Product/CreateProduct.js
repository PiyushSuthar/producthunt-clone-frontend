import React, { useState } from 'react'
import Base from '../Base'
import FormInput from '../../Components/Form/input'
import Button from '../../Components/Button'
import { createProduct } from './helper'
import { isAuthenticated } from '../../Auth/helper'
import { Link } from 'react-router-dom'

const CreateProduct = () => {
    const [data, setData] = useState({
        name: "",
        description: "",
        link: "",
        logo: "",
        images: "",
        formData: new FormData(),
        error: "",
        success: false
    })

    const handleInput = name => event => {
        const value = name === "logo" ? event.target.files[0] : name === "images" ? event.target.files : event.target.value
        setData({ ...data, [name]: value })
        if (name === "images") {
            for (const key of Object.keys(value)) {
                data.formData.set('images', value[key])
            }
        } else {
            data.formData.set(name, value)
        }
    }

    const { token, user } = isAuthenticated()

    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(user.username, token, data.formData).then(resData => {
            if (resData.error) {
                setData({ ...data, error: resData.error, success: false })
                return
            }
            setData({ ...data, success: true, error: "" })
        })
    }

    const errorDialog = () => {
        if (data.error) {
            return (
                <h3 style={ { color: "red", fontWeight: "400", border: "2px dashed red", padding: "10px", marginBottom: "10px" } } >Failed To Create Product, {data.error }</h3>
            )
        }
    }
    const successDialog = () => {
        if (data.success) {
            return (
                <>
                    <h3 style={ { color: "green", fontWeight: "400", border: "2px dashed green", padding: "10px", marginBottom: "10px" } }>Product Created Successfully!</h3>
                </>
            )
        }
    }


    return (
        <Base title="उत्पाद बनाएँ">
            <div style={ {
                backgroundColor: "white",
                padding: "20px 40px",
                width: "100%",
                height: "100%",
                boxShadow: "0 0 12px 0 rgba(0,0,0,0.1)",
            } } className="container">
                { errorDialog() }
                { successDialog() }
                <div style={ { display: "flex", flexDirection: "row", justifyContent: "space-between" } }>
                    <div>
                        <h3>Create Product!</h3>
                        <p>Fill the fields correctly!</p>
                    </div>
                    <Link to="/dashboard/user/products">
                        <Button>Manage Products</Button>
                    </Link>
                </div>
                <form onSubmit={ handleSubmit }>
                    <FormInput onChange={ handleInput("name") } type="text" placeholder="Name" label="Product Name" name="name" required />
                    <FormInput onChange={ handleInput("logo") } type="file" placeholder="Select Below 1mb" label="Product Logo" name="logo" required />
                    <FormInput onChange={ handleInput("description") } isTextArea={ true } placeholder="Description" label="Product Description" name="description" required />
                    <FormInput onChange={ handleInput("link") } type="url" placeholder="Link to Product" label="Product URL" name="link" required />
                    <FormInput onChange={ handleInput("images") } max={ 4 } type="file" placeholder="Select Below 1mb" multiple label="Product Images (Upto 4)" name="images" required />
                    <Button type="submit">Create</Button>
                </form>
            </div>
        </Base>
    )
}

export default CreateProduct
