/**
 * Created by KanadeM on 2/2/2024
 */
import Cookies from 'js-cookie'

const userInfoKdey = 'userInfo'
export const setUserInfo = (userInfo) => {
    const menuList = userInfo.menuList
    userInfo.menuList = []
    Cookies.set(userInfoKdey, JSON.stringify(userInfo))
    localStorage.setItem('menuList', JSON.stringify(menuList))
}

export const removeUserInfo = () => {
    Cookies.remove(userInfoKdey)
}

export const getUserMenu = () => {

    return JSON.parse(localStorage.getItem('menuList'))
        // localStorage.getItem('menuList')
}
