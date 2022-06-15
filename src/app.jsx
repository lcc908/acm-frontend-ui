import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { SettingDrawer } from '@ant-design/pro-layout';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { message } from 'antd';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
//拦截器-请求前拦截
const authHeaderInterceptor = (url, options) => {
  const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : 'https://acm.lenovo.com:9001';
  const token = localStorage.getItem('userToken');
  const o = options;
  // if (history.location.pathname !== loginPath &&　token) {
  if (history.location.pathname !== loginPath) {
    // if(o.method === "post") {
    //   o.headers = {
    //     'username': 'liucc10',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     ...o.headers
    //   };
    //   o.body = JSON.stringify(o.body);
    // } else {
    //   o.headers = {
    //     'username': 'liucc10',
    //   };
    // }
    o.headers = {
      'username': 'liucc10',
    };
    // o.headers = {
    //   'username': 'liucc10',
    // };
    // return {
    //   url: baseUrl + url,
    //   options: o
    // }
  }
  console.log(baseUrl,url);
  return {
    url: baseUrl + url,
    options:o
  }
}
//拦截器-响应后拦截
const demoResponseInterceptors = async (response, options) => {
  // if (history.location.pathname !== loginPath) {
  const res = await response.clone().json();
  // console.log(res);
  // console.log(res);
  if(res?.code && res?.code === 200) {
    // const {sacpresult} = res.result;
    const {data} = res;
    // console.log(data);
    return res;
    // if(sacpresult) {
    //   if (sacpresult.code !== 0) {
    //     message.error(sacpresult.message || 'Error')
    //     return res.result.sacpresult.message;
    //   }
    //   if(sacpresult.total_number) {
    //     const {total_number} = sacpresult;
    //     sacpresult.total = total_number;
    //   }
    //   // console.log('响应拦截,接口数据:',sacpresult);
    //   return data;
    // } else {
    //   // message.error(res.result.sacpinfo || 'Error')
    // }
  } else {
    // message.error(res.message)
  }
  return response
};
//统一错误处理
const errorHandler = (error) =>{
  console.log(error);
  // const { response } = error;
  // console.log(response);
}
export const request = {
  errorConfig:{
    adaptor: (resData) => {
      // console.log(resData)
      return {
        ...resData,
        success: resData.success,
        errorMessage: resData.message,
      };
    },
  },
  // errorHandler:errorHandler,
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors:[demoResponseInterceptors]
};

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      // const msg = await queryCurrentUser();
      // console.log(msg);
      // return msg.data;
    } catch (error) {
      // history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    // const currentUser = await fetchUserInfo(); //获取用户信息
    return {
      fetchUserInfo,
      currentUser:{name:localStorage.getItem('userToken')},
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login
      if (!localStorage.getItem('userToken')) {
        history.push(loginPath);
      }
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    menu: {
      // type: 'group',
      locale:false,
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
