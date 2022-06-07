import { request } from 'umi';
// GET 查询源平台 /api/v1/alldict
export async function getAlldictList(params) {
  return request('/api/v1/alldict', {
    params:{
      group_code:'platform_type'
    },
  });
}
// export async function removeFakeList(params) {
//   return request('/api/post_fake_list', {
//     method: 'POST',
//     data: { ...params, method: 'delete' },
//   });
// }
