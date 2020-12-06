import { API } from "../../../../config"

export const getCommentsForProduct = (productId, pageNo) => {
    return fetch(`${API}/comments/product/${productId}?perpage=2&page=${pageNo || 1}`).then(res => res.json())
}


export const createComment = (productId, token, data) => {
    return fetch(`${API}/comment/create/${productId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}
export const replyToComment = (commentId, token, reply) => {
    return fetch(`${API}/comment/reply/${commentId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reply)
    }).then(res => res.json())
}

export const deleteTheComment = (commentId, token) => {
    return fetch(`${API}/comment/delete/${commentId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json())
}