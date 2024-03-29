import request from "../utils/request";

/**
 * Created by KanadeM on 2/2/2024
 */
export function getAllUsers() {
    return request({
        url: '/user/list',
        method: 'get'
    })
}

export function queryUsers(data) {
    return request({
        url: '/user/query',
        method: 'post',
        data
    })
}

