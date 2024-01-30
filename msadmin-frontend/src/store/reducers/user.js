/**
 * Created by KanadeM on 30/1/2024
 */

import * as types from "../actions/actionTypes";

export default function userTokenReducer(preState, action) {
    if (preState === undefined) {
        preState = ''
    }

    const { type, data } = action

    switch (type) {
        case types.SET_USER_TOKEN:
            return data
        case types.GET_USER_TOKEN:
            return preState
        case types.DELETE_USER_TOKEN:
            return ''
        default:
            return preState
    }
}
