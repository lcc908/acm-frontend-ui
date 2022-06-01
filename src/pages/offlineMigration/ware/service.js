import { request } from 'umi';
// GET 虚拟机列表 /api/v1/vmware_list_vm
export async function getVmWareListVm(params) {
  return request('/api/v1/vmware_list_vm', {
    params,
  });
}
// export async function removeFakeList(params) {
//   return request('/api/post_fake_list', {
//     method: 'POST',
//     data: { ...params, method: 'delete' },
//   });
// }
