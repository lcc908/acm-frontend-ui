import { request } from 'umi';
/** 登录接口 POST /api/v1/login */
export async function login(params) {
  console.log(params);
  return request('/api/api/v1/login', {
    method: 'POST',
    params: { ...params },
  });
}

/** 退出登录接口 POST /api/v1/logout */

export async function outLogin(params) {
  return request('/api/api/v1/logout', {
    method: 'POST',
    params: { ...params },
  });
}
