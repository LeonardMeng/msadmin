/**
 * Created by KanadeM on 17/1/2024
 */
import * as types from './actionTypes';

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


export const setUserDetails = userDetails => ({
    type: types.SET_USER_DETAILS,
    payload: userDetails
});

export const getUserDetails = () => ({
    type: types.GET_USER_DETAILS
});

export const deleteUserDetails = () => ({
    type: types.DELETE_USER_DETAILS
});

// User Settings Actions
export const setUserSettings = userSettings => ({
    type: types.SET_USER_SETTINGS,
    payload: userSettings
});

export const getUserSettings = () => ({
    type: types.GET_USER_SETTINGS
});

export const deleteUserSettings = () => ({
    type: types.DELETE_USER_SETTINGS
});
