import React, { useEffect, memo, useRef } from 'react';
import { Form, message } from 'antd';
import { ModalForm, ProFormText, ProFormSwitch, ProFormSelect,ProFormTextArea } from '@ant-design/pro-form';
import {putFakeList} from "@/pages/dashboard/service";

const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default memo((props) => {
  const {visible,setVisible,editData,reloadTable} = props;
  const formRef  = useRef();
  useEffect(() => {
    // if(formType === 'Add') {
    //   return false;
    // }

    formRef?.current?.resetFields();
    formRef?.current?.setFieldsValue({
      ...editData,
    });
  }, [editData]);

  console.log(1);

  const titleText = editData?.id ? '编辑表单' : '新建表单';

  const onFinish = async (values) => {
    await waitTime(1000);
    const {code} = await putFakeList({id:editData.id,...values})
    if(code === 200) {
      message.success("保存成功");
      setVisible(false);
      reloadTable();
    }
  }
  const onInit = (values) => {
    console.log(values);
    console.log(editData);
    if(editData.id) {
      formRef?.current?.setFieldsValue({
        ...editData,
      });
    }
  }
  return (
    <ModalForm
      title={titleText}
      visible={visible}
      formRef={formRef}
      onFinish={onFinish}
      layout={'horizontal'}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true,
      }}
      onInit={(values) => onInit(values)}
    >
      <ProFormText
        name="name"
        label="任务名称"
        placeholder="请输入"
        width='xl'
      />
      <ProFormTextArea
        width='xl'
        name="description"
        label="描述"
        placeholder="请输入"
      />
    </ModalForm>
  );
});
