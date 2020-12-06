import { API } from "../../config"

export const getUserByUsername = username => {
    return fetch(`${API}/user/${username}`, {
        method: "GET",
    }).then(res => res.json()).catch(err => console.error(err))
}

export const followUser = (userToFollowUsername, token) => {
    return fetch(`${API}/user/follow/${userToFollowUsername}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json()).catch(err => console.error(err))
}
export const unFollowUser = (userToUnFollowUsername, token) => {
    return fetch(`${API}/user/unFollow/${userToUnFollowUsername}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json()).catch(err => console.error(err))
}
export const updateUser = (username, token, data) => {
    return fetch(`${API}/user/${username}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).catch(err => console.error(err))
}