import { API } from '../../config'

export const Signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

export const SignIN = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

export const SignOut = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        if (next) {
            next()
        }
        return fetch(`${API}/signout`, {
            method: "GET",
        }).then(response => console.log("LogOut")).catch(err => console.log(err))
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        if (next) {
            next()
        }
    }
}
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    return false
}