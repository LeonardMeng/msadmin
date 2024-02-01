/**
 * Created by KanadeM on 17/1/2024
 */
import { combineReducers } from 'redux';
import {userTokenReducer, userInfoReducer, userSettingsReducer} from "./user";

const allReducer = combineReducers({
    userToken: userTokenReducer,
    userSettings: userSettingsReducer,
    userInfo: userInfoReducer,
});

export default allReducer;
