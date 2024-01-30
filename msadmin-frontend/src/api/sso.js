import request from "../utils/request";

/**
 * Created by KanadeM on 30/1/2024
 */
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        params: data
    })
}

