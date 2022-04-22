export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: '首页',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  {
    path: '/index',
    name: '首页',
    icon: 'home',
    component: './index',
  },
  {
    path: '/welcome122',
    name: '仪表盘',
    icon: 'dashboard',
    component: './404',
  },
  {
    path: '/welcome1',
    name: '任务中心',
    disabled: true,
    icon: 'menu',
    // component: './Welcome',
  },
  {
    path: '/onlineMigration',
    name: '在线迁移',
    icon: 'InsertRowAbove',
    component: './onlineMigration',
  },
  {
    path: '/welcome14',
    name: '离线迁移',
    icon: 'InsertRowRight',
    component: './404',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    // routes: [
    //   {
    //     path: '/admin/sub-page',
    //     name: 'sub-page',
    //     icon: 'smile',
    //     component: './Welcome',
    //   },
    //   {
    //     component: './404',
    //   },
    // ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    component: './404',
  },
];
