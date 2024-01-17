/**
 * Created by KanadeM on 17/1/2024
 */
import {getToken} from './auth'
import Cookies from 'js-cookie'




const UserInfoKey = 'userInfo'
export function setUerInfo(data){
    return Cookies.set(UserInfoKey, data)
}

export function getUerInfo(){
    return Cookies.get(UserInfoKey)
}

export function deleteUerInfo(){
    return Cookies.remove(UserInfoKey)
}
