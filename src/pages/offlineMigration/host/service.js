import { request } from 'umi';
// GET 查询源平台 /api/v1/live_cd
export async function getLiveCd(params) {
  return request('/api/v1/live_cd', {
    params,
  });
}

//第一步liveCD制作
// POST /api/v1/live_cd
export async function makeLiveCd(params) {
  return request('/api/v1/live_cd', {
    method: 'POST',
    data: { ...params},
  });
}
