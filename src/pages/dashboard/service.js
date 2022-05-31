import { request } from 'umi';
// GET 任务列表 /api/v1/migration_task
export async function queryFakeList(params) {
  return request('/api/get_list', {
    params,
  });
}
export async function removeFakeList(params) {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addFakeList(params) {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateFakeList(params) {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
