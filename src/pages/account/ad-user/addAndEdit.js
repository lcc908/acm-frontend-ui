import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { ModalForm, ProFormText, ProFormRadio, ProFormSelect } from '@ant-design/pro-form';

const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const {isModalVisible,setModalVisit} = props;
  // const [isModalVisible, setModalVisit] = useState(false);
  return (
    <ModalForm
      title="新建表单"
      visible={isModalVisible}
      submitter={{
        searchConfig: {
          submitText: '确认',
          resetText: '取消',
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true;
      }}
      layout={'horizontal'}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onVisibleChange={setModalVisit}
    >
      <ProFormText
        width='xl'
        name="name"
        label="用户名"
        placeholder="请输入名称"
      />
      <ProFormText.Password
        width='xl'
        name="ipmi_password"
        label="密码"
        autoComplete="off"
      />
      <ProFormText.Password
        width='xl'
        name="ipmi_password2"
        label="确认密码"
        autoComplete="off"
      />
      <ProFormText
        width='xl'
        name="name"
        label="邮箱"
        placeholder="请输入名称"
      />
      <ProFormRadio.Group
        name="radio"
        label="激活账号"
        options={[
          {
            label: '是',
            value: 'a',
          },
          {
            label: '否',
            value: 'b',
          },
        ]}
      />
    </ModalForm>
  );
};
