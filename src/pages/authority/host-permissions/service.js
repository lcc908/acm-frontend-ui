import { request } from 'umi';
// /api/v1/host_permission
export async function getHostPermission(params) {
  return request('/api/v1/host',{
    params:{...params}
  });
}

//添加主机 POST /api/v1/host_permission
export async function addHostPermission(params) {
  return request('/api/v1/host',{
    method: 'POST',
    data: params,
  });
}
//删除主机 DELETE /api/v1/host
export async function deleteHostPermission(params) {
  return request(`/api/v1/host`,{
    method: 'DELETE',
    data:params,
  });
}
//更新主机 PUT /api/v1/host
export async function putHostPermission(params) {
  return request(`/api/v1/host`,{
    method: 'PUT',
    data:params,
  });
}

