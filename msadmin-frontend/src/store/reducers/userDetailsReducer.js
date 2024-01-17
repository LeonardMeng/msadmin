/**
 * Created by KanadeM on 17/1/2024
 */
import {
    SET_USER_DETAILS, GET_USER_DETAILS, DELETE_USER_DETAILS
} from '../actions/actionTypes';

const initUserInfo = {
    username: "",
    role: "",
    avatar:"",
}

const userDetailsReducer = (state = initUserInfo, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                ...action.payload
            };
        case GET_USER_DETAILS:
            return state; // In a real app, this might fetch data from an API
        case DELETE_USER_DETAILS:
            return initUserInfo; // Resets to initial state
        default:
            return state;
    }
};

export default userDetailsReducer;
