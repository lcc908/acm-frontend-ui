import { request } from 'umi';
import {Base64} from "js-base64";
/** 登录接口 POST /api/v1/login */
// Base64.encode(password)
export async function login(params) {
  return request('/api/v1/login', {
    method: 'POST',
    data: { ...params,password: Base64.encode(params.password)},
    // params: { ...params},
  });
}

/** 退出登录接口 POST /api/v1/logout */

export async function outLogin(params) {
  return request('/api/v1/logout', {
    method: 'POST',
    params: { ...params },
  });
}
