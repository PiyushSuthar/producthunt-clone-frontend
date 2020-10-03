const { API } = require("../../../config");

export const createProduct = (username, token, data) => {
    return fetch(`${API}/product/create/${username}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: data
    }).then(res => res.json()).catch(err => console.log(err))
}

export const deleteProduct = (username, productId, token) => {
    return fetch(`${API}/product/delete/${productId}/${username}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    }).then(res => res.json()).catch(err => console.log(err))
}

export const getSingleProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    }).then(res => res.json()).catch(err => console.log(err))
}

export const upvoteProduct = (productId, token) => {
    return fetch(`${API}/product/upvote/${productId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json()).catch(err => console.log(err))
}
export const unUpvoteProduct = (productId, token) => {
    return fetch(`${API}/product/unupvote/${productId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json()).catch(err => console.log(err))
}

export const getAllProductsByUsername = username => {
    return fetch(`${API}/products/${username}`, {
        method: "GET"
    }).then(res => res.json()).catch(err => console.log(err))
}

export const getProductsForHomepage = (perpage = 8, page = 1) => {
    return fetch(`${API}/homepage/products?perpage=${perpage}&page=${page}`, {
        method: "GET"
    }).then(res => res.json()).catch(err => console.log(err))
}