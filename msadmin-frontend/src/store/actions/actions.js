/**
 * Created by KanadeM on 17/1/2024
 */
import * as types from '../actionTypes';

// User Details Actions

export const setUserToken = (data) => {
    return { type: types.SET_USER_TOKEN, data }
}

export const getUserToken = () => {
    return { type: types.GET_USER_TOKEN }
}

export const removeUserToken = () => {
    return { type: types.DELETE_USER_TOKEN }
}


export const setUserDetails = userInfo => ({
    type: types.SET_USER_INFO,
    userInfo
});

export const getUserInfo = () => ({
    type: types.GET_USER_INFO
});

export const deleteUserDetails = () => ({
    type: types.DELETE_USER_DETAILS
});

// User Settings Actions
export const setUserSettings = data => ({
    type: types.SET_USER_SETTINGS,
    data
});

export const getUserSettings = () => ({
    type: types.GET_USER_SETTINGS
});

export const deleteUserSettings = () => ({
    type: types.DELETE_USER_SETTINGS
});
