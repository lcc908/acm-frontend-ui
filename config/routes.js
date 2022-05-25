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
    icon: 'dashboard',
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
    path: '/account',
    name: '个人中心',
    icon: 'user',
    // component: './account',
    routes: [
      {
        path: '/account',
        redirect: '/account/general-user',
      },
      {
        name: '普通用户列表',
        path: '/account/general-user',
        component: './account/general-user',
      },
      {
        name: '集成企业AD',
        path: '/account/ad-user',
        component: './account/ad-user',
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
