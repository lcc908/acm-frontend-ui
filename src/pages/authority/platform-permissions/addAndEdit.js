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
        name="os_type"
        label="平台类型"
        width='xl'
        request={async () => [
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ]}
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
