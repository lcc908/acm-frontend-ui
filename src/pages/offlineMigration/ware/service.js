import { request } from 'umi';
// GET 虚拟机列表 /api/v1/vmware_list_vm
export async function getVmWareListVm(params) {
  return request('/api/v1/vmware_list_vm', {
    params,
  });
}
//第三步
//POST vmware迁移任务验证 /api/v1/vmware_task_validate
export async function postVmwareTaskValidate(params) {
  return request('/api/v1/vmware_task_validate', {
    method: 'POST',
    data: { ...params},
  });
}

// /api/v1/vmware_task_create
export async function postCreateVmware(params) {
  return request('/api/v1/vmware_task_create', {
    method: 'POST',
    data: { ...params},
  });
}
//第四步 /api/v1/vmware_task_log
export async function postVmwareLog(params) {
  return request('/api/v1/vmware_task_log', {
    method: 'POST',
    data: { ...params},
  });
}

