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

export const getSingleProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    }).then(res => res.json()).catch(err => console.log(err))
}