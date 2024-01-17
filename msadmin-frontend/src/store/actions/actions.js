/**
 * Created by KanadeM on 17/1/2024
 */
import {
    SET_USER_DETAILS, GET_USER_DETAILS, DELETE_USER_DETAILS,
    SET_USER_SETTINGS, GET_USER_SETTINGS, DELETE_USER_SETTINGS
} from './actionTypes';

// User Details Actions
export const setUserDetails = userDetails => ({
    type: SET_USER_DETAILS,
    payload: userDetails
});

export const getUserDetails = () => ({
    type: GET_USER_DETAILS
});

export const deleteUserDetails = () => ({
    type: DELETE_USER_DETAILS
});

// User Settings Actions
export const setUserSettings = userSettings => ({
    type: SET_USER_SETTINGS,
    payload: userSettings
});

export const getUserSettings = () => ({
    type: GET_USER_SETTINGS
});

export const deleteUserSettings = () => ({
    type: DELETE_USER_SETTINGS
});
