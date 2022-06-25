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
export async function postreportAnalysis(params) {
  return request('/api/v1/hot_migration/report_analysis', {
    method: 'POST',
    data: { ...params},
  });
}

//安装 Agent 进度
// GET /api/v1/hot_migration/agent_installation
export async function getInstallAgentPercent(params) {
  return request('/api/v1/hot_migration/agent_installation', {
    params
  });
}
//第三部 目标主机
// GET /api/v1/hot_migration/generate_data
export async function getGenerateData(params) {
  return request('/api/v1/hot_migration/generate_data', {
    params
  });
}
export async function postGenerateData(params) {
  return request('/api/v1/hot_migration/generate_data', {
    method: 'POST',
    data: { ...params},
  });
}
//第四步 信息校验
// 获取在线迁移任务状态 GET /api/v1/hot_migration/task
export async function getTask(params) {
  return request('/api/v1/hot_migration/task', {
    params
  });
}

//第五步 增量数据迁移
//源应用停止 GET /api/v1/hot_migration/stop_app
export async function getStopApp(params) {
  return request('/api/v1/hot_migration/manage_app', {
    params
  });
}
// POST /api/v1/hot_migration/stop_app
export async function postStopApp(params) {
  return request('/api/v1/hot_migration/manage_app', {
    method: 'POST',
    data: { ...params},
  });
}
// 增量数据快照
//GET /api/v1/hot_migration/snapshot
export async function getSnapshot(params) {
  return request('/api/v1/hot_migration/snapshot', {
    params
  });
}
export async function postSnapshot(params) {
  return request('/api/v1/hot_migration/snapshot', {
    method: 'POST',
    data: { ...params},
  });
}
//目标数据校验
//GET /api/v1/hot_migration/validate
export async function getValidate(params) {
  return request('/api/v1/hot_migration/validate', {
    params
  });
}
export async function postValidate(params) {
  return request('/api/v1/hot_migration/validate', {
    method: 'POST',
    data: { ...params},
  });
}
//目标应用启动
export async function postHotMigrationTask(params) {
  return request('/api/v1/hot_migration/manage_app', {
    method: 'POST',
    data: { ...params},
  });
}
export async function getHotMigrationTask(params) {
  return request('/api/v1/hot_migration/manage_app', {
    params
  });
}
// http://10.122.140.39:9001/api/v1/hot_migration/task
