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
    path: '/dashboard',
    name: '仪表盘',
    icon: 'smile',
    component: './dashboard',
  },
  {
    path: '/onlineMigration',
    name: '在线迁移',
    icon: 'InsertRowAbove',
    component: './onlineMigration',
  },
  {
    path: '/offline',
    name: '离线迁移',
    icon: 'InsertRowRight',
    routes:[
      {
        path: '/offline',
        redirect: '/offline/source',
      },
      {

        name: '选择源主机',
        icon: 'smile',
        path: '/offline/source',
        component: './offlineMigration/source',
      },
      {
        name: '物理主机',
        icon: 'smile',
        path: '/offline/host',
        component: './offlineMigration/host',
      },
      {
        name: 'VMware',
        icon: 'smile',
        path: '/offline/vm',
        component: './offlineMigration/ware',
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    component: './404',
  },
];
