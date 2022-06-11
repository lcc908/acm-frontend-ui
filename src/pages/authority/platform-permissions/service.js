import { request } from 'umi';
//平台权限列表 GET /api/v1/platform/permission
export async function getPermission(params) {
  return request('/api/v1/platform/permission',{
    params:{...params}
  });
}
//平台权限列表 POST /api/v1/platform/permission
export async function addPermission(params) {
  return request('/api/v1/platform/permission',{
    method: 'POST',
    data: params,
  });
}
//平台权限列表 POST /api/v1/platform/permission
export async function editorPermission(params) {
  return request('/api/v1/platform/permission',{
    method: 'PUT',
    data: params,
  });
}

// //查询主机 get /api/v1/host
// export async function getHostData(params) {
//   return request(`/api/v1/host`,{
//     params:{...params}
//   });
// }
// //添加主机 POST /api/v1/host_permission
// export async function addHostPermission(params) {
//   return request('/api/v1/host',{
//     method: 'POST',
//     data: params,
//   });
// }
// //删除主机 DELETE /api/v1/host
// export async function deleteHostPermission(params) {
//   return request(`/api/v1/host`,{
//     method: 'DELETE',
//     data:params,
//   });
// }
// //更新主机 PUT /api/v1/host
// export async function putHostPermission(params) {
//   return request(`/api/v1/host`,{
//     method: 'PUT',
//     data:params,
//   });
// }

