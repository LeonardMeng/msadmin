import request from "../utils/request";

export function register(data) {
    return request({
        url: "/user/register",
        method: "post",
        data
    });
}

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  });
}

export function generateToken() {
  return request({
    url: "/user/generateToken",
    method: "post"
  });
}
