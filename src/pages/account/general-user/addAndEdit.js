import React, { useEffect, useState, useRef } from 'react';
import { Form, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { addUser, editorUser } from './service';
const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const { isModalVisible, setModalVisit, editData, reloadTable } = props;

  const [platformType, setPlatformType] = useState('openstack');
  const formRef = useRef();

  const titleText = editData?.id ? '编辑表单' : '新建表单';

  const changeValues = (val) => {
    const { platform_name } = val;
    if (platform_name) {
      setPlatformType(platform_name);
      formRef?.current?.resetFields();
    }
  };
  const onInit = (values) => {
    if (editData.id) {
      formRef?.current?.setFieldsValue({
        ...editData,
      });
    }
  };
  const onFinish = async (values) => {
    // await waitTime(2000);
    console.log(values);
    const obj = { ...values };

    obj.name = obj.name;
    obj.password = obj.password;
    obj.extra = {
      // auth_url: obj.auth_url,
      // project_name: obj.project_name,
      // user_domain_name: obj.user_domain_name,
      // project_domain_name: obj.project_domain_name,
      // username: obj.username,
      // password: obj.password,
      // region_name: obj.region_name,
    };
    // }
    for (let i in obj) {
      if (obj.extra && obj.extra[i]) {
        delete obj[i];
      }
    }
    console.log(obj);
    // NOTE: handle extra to json
    obj.extra = JSON.stringify(obj.extra);

    console.log('editData?.id', editData.id);
    if (editData?.id) {
      console.log('edit....');
      obj.id = editData.id;
      const res = await editorUser(obj);
      if (res.code === 200) {
        message.success('编辑成功');
        return true;
      }
    } else {
      console.log('add....');

      // NOTE: add user
      const res = await addUser(obj);
      console.log(res);
      if (res.code === 200) {
        message.success('添加成功');
        reloadTable();
        return true;
      }
    }
  };
  return (
    <ModalForm
      title={titleText}
      visible={isModalVisible}
      formRef={formRef}
      onFinish={onFinish}
      layout={'horizontal'}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onVisibleChange={setModalVisit}
      onValuesChange={(val) => changeValues(val)}
      modalProps={{
        destroyOnClose: true,
      }}
      onInit={(values) => onInit(values)}
    >
      <ProFormText width="xl" name="name" label="用户名" placeholder="请输入用户名" />

      {/* 控制密码框是否可见。新增的时候可见；编辑的时候不可见； */}

      {editData?.id ? null : (
        <>
          <ProFormText.Password
            width="xl"
            name="password"
            label="密码"
            fieldProps={{
              autoComplete: 'new-password',
            }}
          />
          <ProFormText.Password
            width="xl"
            name="password_new"
            label="确认密码"
            placeholder="请再次确认密码"
            fieldProps={{
              autoComplete: 'new-password',
            }}
          />
        </>
      )}
      <ProFormText width="xl" name="email" label="邮箱" placeholder="请输邮箱" />
      <ProFormSwitch name="switch" label="是否激活" />
    </ModalForm>
  );
};
