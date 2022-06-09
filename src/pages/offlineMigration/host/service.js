import { request } from 'umi';

//第一步 liveCD制作
//查询源平台 GET /api/v1/live_cd
export async function getLiveCd(params) {
  return request('/api/v1/live_cd', {
    params,
  });
}
// POST /api/v1/live_cd
export async function makeLiveCd(params) {
  return request('/api/v1/live_cd', {
    method: 'POST',
    data: { ...params},
  });
}

//第二步 创建任务
//暂存 POST /api/v1/migration_task
export async function temporaryMigrationTask(params) {
  return request('/api/v1/migration_task', {
    method: 'put',
    data: { ...params},
  });
}
//暂存 POST /api/v1/migration_task
export async function getTemporaryMigrationTask(params) {
  return request('/api/v1/migration_task', {
    params
  });
}
