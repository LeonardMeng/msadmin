/**
 * Created by KanadeM on 17/1/2024
 */
import {
    SET_USER_SETTINGS, GET_USER_SETTINGS, DELETE_USER_SETTINGS
} from '../actions/actionTypes';

const initSettings = {
    darkMode: false,
}

const userSettingsReducer = (state = initSettings, action) => {
    switch (action.type) {
        case SET_USER_SETTINGS:
            return {
                ...state,
                ...action.payload
            };
        case GET_USER_SETTINGS:
            return state; // In a real app, this might fetch data from an API
        case DELETE_USER_SETTINGS:
            return initSettings; // Resets to initial state
        default:
            return state;
    }
};

export default userSettingsReducer;
