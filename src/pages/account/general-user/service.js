import { request } from 'umi';
//用户列表 GET /api/v1/user
export async function getUser(params) {
  return request('/api/v1/user', {
    params: { ...params },
  });
}
//用户列表 POST /api/v1/user
export async function addUser(params) {
  return request('/api/v1/user', {
    method: 'POST',
    data: params,
  });
}
//用户列表 POST /api/v1/user
export async function editorPermission(params) {
  return request('/api/v1/user', {
    method: 'PUT',
    data: params,
  });
}

//用户列表 DELETE /api/v1/user
export async function deleteUser(params) {
  return request('/api/v1/user', {
    method: 'DELETE',
    data: params,
  });
}
