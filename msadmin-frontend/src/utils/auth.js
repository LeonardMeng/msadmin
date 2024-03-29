/**
 * Created by KanadeM on 17/1/2024
 */
import Cookies from 'js-cookie'

const TokenKey = 'Token'
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
