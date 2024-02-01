/**
 * Created by KanadeM on 30/1/2024
 */

import * as types from "../actionTypes";
import {removeToken, setToken} from "../../utils/auth";
import {DELETE_USER_SETTINGS, GET_USER_SETTINGS, SET_USER_SETTINGS} from "../actionTypes";

const initUserInfo = {
    username: "",
    role: "",
    avatar:"",
    menuList: []
}

export function userTokenReducer(preState, action) {
    if (preState === undefined) {
        preState = ''
    }

    const { type, data } = action

    switch (type) {
        case types.SET_USER_TOKEN:
            setToken(data)
            return data
        case types.DELETE_USER_TOKEN:
            removeToken()
            return ''
        default:
            return preState
    }
}

export const userInfoReducer = (state = initUserInfo, action) => {
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


const initSettings = {
    theme: 'light',
}
export const userSettingsReducer = (preState = initSettings, action) => {
    const { type, data } = action
    switch (type) {
        case SET_USER_SETTINGS:
            return {
                theme: data
            };
        case GET_USER_SETTINGS:
            return preState; // In a real app, this might fetch data from an API
        case DELETE_USER_SETTINGS:
            return initSettings; // Resets to initial state
        default:
            return preState;
    }
};


