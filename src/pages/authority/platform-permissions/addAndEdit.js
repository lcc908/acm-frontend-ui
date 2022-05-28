import React, { useEffect, useState,useRef } from 'react';
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
  const {isModalVisible,setModalVisit,editData} = props;
  const [form] = Form.useForm();
  // const [isModalVisible, setModalVisit] = useState(false);
  useEffect(() => {
    // if(formType === 'Add') {
    //   return false;
    // }
    console.log(editData);
    form.resetFields();
    form.setFieldsValue({ ...editData });
  }, [editData]);

  const titleText = editData?.id ? '编辑表单' : '新建表单';
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
    >
      <ProFormSelect
        name="platform_type"
        label="系统类型"
        width='xl'
        request={async () =>
          [
            {
              "label": "CentOS Linux release 7.9.2009",
              "value": "centos7.9"
            },
            {
              "label": "Redhat Enterprice Linux release 7.9",
              "value": "redhat7.9"
            },
            {
              "label": "Windows Server 2016 CH std",
              "value": "windows2016cn"
            },
            {
              "label": "Windows Server 2022 CH std",
              "value": "windows2022cn"
            },
            {
              "label": "SUSE Linux Enterprise Server 15 SP2 for SAP (x86_64)",
              "value": "sles15sp2"
            },
            {
              "label": "Ubuntu 20.04 LTS",
              "value": "ubuntu20.04lts"
            }
          ]
        }
        // placeholder="Please select a country"
        // rules={[{ required: true, message: 'Please select your country!' }]}
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
        placeholder="请输入账号"
      />
      <ProFormText.Password
        width='xl'
        name="ipmi_password"
        label="密码"
        // autoComplete="off"
      />
      <ProFormRadio.Group
        name="radio"
        label="是否激活"
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
