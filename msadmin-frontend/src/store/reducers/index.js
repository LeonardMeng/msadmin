/**
 * Created by KanadeM on 17/1/2024
 */
import { combineReducers } from 'redux';
import userDetailsReducer from './userDetailsReducer';
import userSettingsReducer from './userSettingsReducer';

const rootReducer = combineReducers({
    userDetails: userDetailsReducer,
    userSettings: userSettingsReducer
});

export default rootReducer;
