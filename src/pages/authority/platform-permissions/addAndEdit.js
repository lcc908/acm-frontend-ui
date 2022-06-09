import React, { useEffect, useState,useRef } from 'react';
import { Form, message } from 'antd';
import { ModalForm, ProFormText, ProFormSwitch, ProFormSelect } from '@ant-design/pro-form';

const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const {isModalVisible,setModalVisit,editData} = props;
  const [form] = Form.useForm();
  const [platformType, setPlatformType] = useState('vmware_vcenter');
  useEffect(() => {
    // if(formType === 'Add') {
    //   return false;
    // }
    form.resetFields();
    form.setFieldsValue({ ...editData });
  }, [editData]);

  const titleText = editData?.id ? '编辑表单' : '新建表单';

  const changeValues = (val) => {
    const {platform_type} = val;
    if(platform_type) {
      console.log(1);
      setPlatformType(platform_type)
    }
  }
  return (
    <ModalForm
      title={titleText}
      visible={isModalVisible}
      form={form}
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
      onValuesChange={(val) => changeValues(val)}
    >
      <ProFormSelect
        name="platform_type"
        label="平台类型"
        width='xl'
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
              "label": "Physical Server",
              "value": "physical_server"
            },
            {
              "label": "Hyper-V",
              "value": "hyper_v"
            },
          ]
        }
        // placeholder="Please select a country"
        // rules={[{ required: true, message: 'Please select your country!' }]}
      />
      <ProFormText
        width='xl'
        name="ip_address"
        label="区域"
        placeholder="请输入IP地址"
      />
      <ProFormText
        width='xl'
        name="ip_address"
        label="IP地址"
        placeholder="请输入IP地址"
      />
      <ProFormText
        width='xl'
        name="name2"
        label="用户名"
        placeholder="请输入用户名"
      />
      <ProFormText
        width='xl'
        name="name"
        label="用户名"
        placeholder="请输入用户名"
        fieldProps={{
          autoComplete:"new-password"
        }}
      />
      <ProFormText.Password
        width='xl'
        name="ipmi_password"
        label="密码"
        fieldProps={{
          autoComplete:"new-password"
        }}
        placeholder="请输入密码"
      />
      <ProFormText
        width='xl'
        name="name12"
        label="DataStore"
      />
      <ProFormSwitch name="switch" label="是否激活" />
      {/*<ProFormRadio.Group*/}
      {/*  name="radio"*/}
      {/*  label="是否激活"*/}
      {/*  options={[*/}
      {/*    {*/}
      {/*      label: '是',*/}
      {/*      value: 'a',*/}
      {/*    },*/}
      {/*    {*/}
      {/*      label: '否',*/}
      {/*      value: 'b',*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
    </ModalForm>
  );
};
