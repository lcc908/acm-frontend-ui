import React, { useEffect, useState,useRef } from 'react';
import { Form, message } from 'antd';
import { ModalForm, ProFormText, ProFormRadio, ProFormSelect } from '@ant-design/pro-form';
import {addHostPermission, putHostPermission} from "@/pages/authority/host-permissions/service";
import {getAlldictList} from '@/pages/offlineMigration/source/service'
import {getPermission} from "@/pages/authority/platform-permissions/service";
const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const request = async (params) => {
  console.log(params);
  const {data} = await getAlldictList()
  const arr = data.map(item =>{
    return {label:item.name,value:item.id}
  });
  return arr;
};

export default (props) => {
  const {isModalVisible,setModalVisit,editData,handleClickModalOk} = props;
  const [form] = Form.useForm();
  // const [isModalVisible, setModalVisit] = useState(false);
  useEffect(() => {
    // if(formType === 'Add') {
    //   return false;
    // }
    // console.log(editData);
    form.resetFields();
    form.setFieldsValue({ ...editData });
  }, [editData]);

  const handleOk = async (values) => {
    let res;
    const val = {...values}
    if(editData?.id) {
      val.id = editData.id;
      res = await putHostPermission(val);
    }else {
      res = await addHostPermission(values);
    }
    // const res = await addHostPermission(values);
    // console.log(res);
    if (res.code === 200) {
      message.success('提交成功');
      handleClickModalOk(true);
    }
  }
  const titleText = editData?.id ? '编辑表单' : '新建表单';
  return (
    <ModalForm
      title={titleText}
      visible={isModalVisible}
      form={form}
      onFinish={async (values) => {
        await waitTime(2000);
        handleOk(values);
      }}
      layout={'horizontal'}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onVisibleChange={setModalVisit}
    >
      <ProFormSelect
        name="os_type"
        label="主机类型"
        width='xl'
        request={async () =>
          [
            {
              "label":"CentOS Linux release 7.9.2009",
              "value":"centos7.9"
            },
            {
              "label":"Redhat Enterprice Linux release 7.9",
              "value":"redhat7.9"
            },
            {
              "label":"Windows Server 2016 CH std",
              "value":"windows2016cn"
            },
            {
              "label":"Windows Server 2022 CH std",
              "value":"windows2022cn"
            },
            {
              "label":"SUSE Linux Enterprise Server 15 SP2 for SAP (x86_64)",
              "value":"sles15sp2"
            },
            {
              "label":"Ubuntu 20.04 LTS",
              "value":"ubuntu20.04lts"
            }
          ]
      }
        // placeholder="Please select a country"
        // rules={[{ required: true, message: '请选择系统类型！' }]}
      />
      <ProFormText
        width='xl'
        name="ip_address"
        label="主机地址"
        placeholder="请输入主机地址"
        // rules={[{ required: true, message: '请输入主机地址！' }]}
      />
      <ProFormText
        width='xl'
        name="port"
        label="端口号"
        placeholder="请输入端口号"
        // rules={[{ required: true, message: '请输入端口号！' }]}
      />
      <ProFormText
        width='xl'
        name="account"
        label="账号"
        placeholder="请输入账号"
        fieldProps={{
          autoComplete:"new-password"
        }}
      />
      <ProFormText.Password
        width='xl'
        name="password"
        label="密码"
        fieldProps={{
          autoComplete:"new-password"
        }}
        // autoComplete="off"
      />
      <ProFormSelect
        name="connect_type"
        label="连接类型"
        width='xl'
        rules={[{ required: true, message: '请选择连接类型！' }]}
        request={request}
        // placeholder="Please select a country"
        // rules={[{ required: true, message: 'Please select your country!' }]}
      />
      <ProFormSelect
        name="connect_type1"
        label="所属平台"
        width='xl'
        initialValue={'SSH'}
        rules={[{ required: true, message: '请选择所属平台！' }]}
        request={async () => [
          { label: 'SSH', value: 'SSH' },
          { label: 'WINRM', value: 'WINRM' },
          { label: 'JDBC', value: 'JDBC' },
        ]}
        // placeholder="Please select a country"
        // rules={[{ required: true, message: 'Please select your country!' }]}
      />
    </ModalForm>
  );
};
