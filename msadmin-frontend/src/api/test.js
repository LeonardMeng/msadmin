/**
 * Created by KanadeM on 29/1/2024
 */
import request from '../utils/request'

export function testHello() {
    return request({
        url: '/test/hello',
        method: 'get'
    })
}

export function testPost() {
    return request({
        url: '/test/post',
        method: 'post'
    })
}

