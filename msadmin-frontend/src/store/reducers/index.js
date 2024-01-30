/**
 * Created by KanadeM on 17/1/2024
 */
import { combineReducers } from 'redux';
import userTokenReducer from "./user";
import userSettingsReducer from "./userSettingsReducer";
import userDetailsReducer from "./userDetailsReducer";

const allReducer = combineReducers({
    userToken: userTokenReducer,
    userSettings: userSettingsReducer,
    userDetails: userDetailsReducer,
});

export default allReducer;
