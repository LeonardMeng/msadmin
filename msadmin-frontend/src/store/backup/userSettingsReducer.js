/**
 * Created by KanadeM on 17/1/2024
 */
import {
    SET_USER_SETTINGS, GET_USER_SETTINGS, DELETE_USER_SETTINGS
} from '../actionTypes';

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

export default userSettingsReducer;
