/**
 * Created by KanadeM on 17/1/2024
 */
import * as types from '../actionTypes';


const initUserInfo = {
    username: "",
    role: "",
    avatar:"",
    menuList: []
}

const userDetailsReducer = (state = initUserInfo, action) => {
    switch (action.type) {
        case types.SET_USER_INFO:
            return {
                ...state,
                username: action.username,
                role: action.role,
                avatar: action.avatar,
            };
        case types.GET_USER_INFO:
            return state; // In a real app, this might fetch data from an API
        case types.DELETE_USER_DETAILS:
            return initUserInfo; // Resets to initial state
        default:
            return state;
    }
};

//
// export function setUerInfo(data){
//     return Cookies.set(UserInfoKey, data)
// }
//
// export function getUerInfo(){
//     return Cookies.get(UserInfoKey)
// }
//
// export function deleteUerInfo(){
//     return Cookies.remove(UserInfoKey)
// }

export default userDetailsReducer;
