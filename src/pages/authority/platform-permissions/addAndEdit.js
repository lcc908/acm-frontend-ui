import React, { useEffect, useState, useRef } from 'react';
import { Form, message } from 'antd';
import { ModalForm, ProFormText, ProFormSwitch, ProFormSelect,ProFormTextArea } from '@ant-design/pro-form';
import {addPermission,editorPermission} from './service'
const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const {isModalVisible,setModalVisit,editData,reloadTable} = props;
  const [platformType, setPlatformType] = useState('openstack');
  const formRef  = useRef();

  useEffect(() => {
    // if(formType === 'Add') {
    //   return false;
    // }
    formRef?.current?.resetFields();
  }, [editData]);

  const titleText = editData?.id ? '编辑表单' : '新建表单';

  const changeValues = (val) => {
    const {platform_name} = val;
    if(platform_name) {
      setPlatformType(platform_name);
      formRef?.current?.resetFields();
    }
  }
  const onFinish = async (values) => {
    await waitTime(1000);
    console.log(values);
    const obj = {...values};
    if(obj.platform_name === "physical_server") {
      console.log(1);
      obj.platform_type = "Physical Server";
    }
    if(obj.platform_name === "vmware_vcenter") {
      obj.platform_type = "VMware vCenter";
      obj.extra = {
        ip:obj.ip,
        username:obj.username,
        password:obj.password,
      }
    }
    if(obj.platform_name === "hyper_v") {
      obj.platform_type = "Hyper-V";
      obj.extra = {
        ip:obj.ip,
        username:obj.username,
        password:obj.password,
      }
    }
    if(obj.platform_name === "openstack") {
      obj.platform_type = "OpenStack";
      obj.extra = {
        auth_url:obj.auth_url,
        project_name:obj.project_name,
        user_domain_name:obj.user_domain_name,
        project_domain_name:obj.project_domain_name,
        username:obj.username,
        password:obj.password,
        region_name:obj.region_name,
      }
    }
    for(let i in obj) {
      if(obj.extra &&　obj.extra[i]) {
        delete obj[i]
      }
    }
    obj.extra = JSON.stringify(obj.extra);
    if(editData?.id) {
      obj.id = editData.id;
      const res = await addPermission(obj);
      if(res.code === 200) {
        message.success('编辑成功');
        return true;
      }
    } else {
      const res = await addPermission(obj);
      console.log(res);
      if(res.code === 200) {
        message.success('添加成功');
        reloadTable()
        return true;
      }
    }
  }
  const onInit = (values) => {
    if(editData.id) {
      console.log(editData);
      const {extra} = editData;
      const res = JSON.parse(extra);

      formRef?.current?.setFieldsValue({
        ...editData,
        ...res
      });
    }
  }
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
      <ProFormSelect
        name="platform_name"
        label="平台类型"
        width='xl'
        initialValue={platformType}
        request={async () =>
          [
            {
              "label": "OpenStack",
              "value": "openstack"
            },
            {
              "label": "VMware vCenter",
              "value": "vmware_vcenter"
            },
            {
              // "label": "Physical Server",
              "label": "物理服务器",
              "value": "physical_server"
            },
            {
              "label": "Hyper-V",
              "value": "hyper_v"
            },
          ]
        }
        rules={[{ required: true}]}
      />
      {
        (platformType === 'vmware_vcenter' || platformType === 'hyper_v') && (
          <ProFormText
            width='xl'
            name="ip"
            label="IP地址"
            placeholder="请输入IP地址"
            rules={[{ required: true}]}
          />
        )
      }
      {
        (platformType === 'vmware_vcenter' || platformType === 'openstack' || platformType === 'hyper_v') && (
          <>
            <ProFormText
              width='xl'
              name="username"
              label="用户名"
              placeholder="请输入用户名"
              fieldProps={{
                autoComplete:"new-password"
              }}
              rules={[{ required: true}]}
            />
            <ProFormText.Password
              width='xl'
              name="password"
              label="密码"
              fieldProps={{
                autoComplete:"new-password"
              }}
              placeholder="请输入密码"
              rules={[{ required: true}]}
            />
          </>
        )
      }
      {
        platformType === 'openstack' && (
          <>
            <ProFormText
              width='xl'
              name="auth_url"
              label="访问地址"
              rules={[{ required: true}]}
            />
            <ProFormText
              width='xl'
              name="project_name"
              label="租户名称"
              rules={[{ required: true}]}
            />
            <ProFormText width='xl' name="project_domain_name" label="租户域" />
            <ProFormText width='xl' name="user_domain_name" label="用户域" />
            <ProFormText width='xl' name="region_name" label="区域" />
          </>
        )
      }
      <ProFormText
        width='xl'
        name="location"
        label="DC位置"
        placeholder="请输入DC所在区域"
      />
      <ProFormSwitch name="switch" label="是否激活" />
      <ProFormTextArea
        width='xl'
        name="description"
        label="描述"
        placeholder="请输入"
      />
    </ModalForm>
  );
};
