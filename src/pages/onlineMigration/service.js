import { request } from 'umi';

//第一步 基础信息配置
//查询源平台 GET /api/v1/hot_migration/host
export async function getHotMigration(params) {
  return request('/api/v1/hot_migration/host', {
    params,
  });
}
// POST /api/v1/hot_migration/host
export async function postHotMigration(params) {
  return request('/api/v1/hot_migration/host', {
    method: 'POST',
    data: { ...params},
  });
}
// 第二步 源主机诊断
// GET /api/v1/hot_migration/report_analysis
export async function getReportAnalysis(params) {
  return request('/api/v1/hot_migration/report_analysis', {
    params
  });
}

// 安装Agent
// POST /api/v1/hot_migration/agent_installation
export async function postInstallAgent(params) {
  return request('/api/v1/hot_migration/agent_installation', {
    method: 'POST',
    data: { ...params},
  });
}

// //第二步 创建任务
// //暂存 POST /api/v1/migration_task
// export async function temporaryMigrationTask(params) {
//   return request('/api/v1/migration_task', {
//     method: 'put',
//     data: { ...params},
//   });
// }
// //暂存 POST /api/v1/migration_task
// export async function getTemporaryMigrationTask(params) {
//   return request('/api/v1/migration_task', {
//     params
//   });
// }
