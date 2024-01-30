/**
 * Created by KanadeM on 16/1/2024
 */

import { legacy_createStore, applyMiddleware } from 'redux'
// 用于支持异步action
import {thunk} from 'redux-thunk'
// 合并后的reducer
import allReducer from './reducers/index'
import {composeWithDevTools} from "redux-devtools-extension";


// export default legacy_createStore(allReducer, applyMiddleware(thunk))
export default legacy_createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))

