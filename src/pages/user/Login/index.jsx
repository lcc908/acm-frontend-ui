import React, { useState } from 'react';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs, Carousel } from 'antd';
import { ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/login';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState('user');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log(userInfo);
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      // const msg = await login({ ...values });
      console.log(msg);
      if (msg.code === 200) {
        message.success('登录成功');
        localStorage.setItem('userToken',msg.data.token)
        // await fetchUserInfo(); //获取用户信息
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        console.log(history);
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }

      console.log(msg); // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      // const defaultLoginFailureMessage = intl.formatMessage({
      //   id: 'pages.login.failure',
      //   defaultMessage: '登录失败，请重试！',
      // });
      // message.error(defaultLoginFailureMessage);
    }
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
        <div className={styles.headerLogo}>
          <a href="">
            <img src="https://p4.lefile.cn/fes/cms/2021/09/24/skz7mq0zavm0hd8xfaq0nrofxcwje3959207.png" alt=""/>
          </a>
        </div>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.leftBanner}>
              {/*<Banner />*/}
              <Carousel
                autoplay
              >
                {/*autoplay*/}
                <img
                  src="https://p4.lefile.cn/fes/cms/2022/04/06/ctoq1epe04eask33vk0lg5lykmt1m4817538.png"
                  // className={styles.contentStyle}
                  alt=""
                />
                <img
                  src="https://p3.lefile.cn/fes/cms/2022/04/06/0wwrkvxfpqa8iko3o67sz0ag6cxzm5362790.png"
                  // className={styles.contentStyle}
                  alt=""
                />
              </Carousel>
            </div>
            <div className={styles.rightLogin}>
              <LoginForm
                // logo={<img alt="logo" src="/logo.svg" />}
                title="联想智能迁移平台"
                subTitle={'打造一款方便实用的快速上云工具平台'}
                initialValues={{
                  autoLogin: true,
                }}
                onFinish={async (values) => {
                  await handleSubmit(values);
                }}
              >
                <Tabs activeKey={type} onChange={setType}>
                  <Tabs.TabPane key="user" tab={'默认登录'} />
                  <Tabs.TabPane key="ldap" tab={'企业AD登录'} />
                </Tabs>
                {status === 'error' && loginType === 'account' && (
                  <LoginMessage
                    content={intl.formatMessage({
                      id: 'pages.login.accountLogin.errorMessage',
                      defaultMessage: '账户或密码错误(admin/ant.design)',
                    })}
                  />
                )}
                <>
                  <ProFormText
                    name="username"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.login.username.placeholder',
                      defaultMessage: '用户名: admin or user',
                    })}
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.login.username.required"
                            defaultMessage="请输入用户名!"
                          />
                        ),
                      },
                    ]}
                  />
                  <ProFormText.Password
                    name="password"
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.login.password.placeholder',
                      defaultMessage: '密码: ant.design',
                    })}
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.login.password.required"
                            defaultMessage="请输入密码！"
                          />
                        ),
                      },
                    ]}
                  />
                </>
                {/*<div*/}
                {/*  style={{*/}
                {/*    marginBottom: 24,*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <ProFormCheckbox noStyle name="autoLogin">*/}
                {/*    <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />*/}
                {/*  </ProFormCheckbox>*/}
                {/*  <a*/}
                {/*    style={{*/}
                {/*      float: 'right',*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    /!*<FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />*!/*/}
                {/*  </a>*/}
                {/*</div>*/}
              </LoginForm>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default Login;
