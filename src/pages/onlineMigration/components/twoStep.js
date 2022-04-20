import React, { useRef, useState } from 'react';
import { Card, Result, Button, Descriptions, Divider, message, Form } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormDigit, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-form';
import styles from '../style.less';

export default (props) => {
  const { oneFormRef, form, stepData } = props;
  return (
    <StepsForm.StepForm
      formRef={oneFormRef}
      form={form}
      title="第二步"
      name={'one'}
      stepProps={{
        description: '基础配置信息',
      }}
      initialValues={stepData}
      onFinish={async (values) => {
        // console.log(values);
        // setStepData(values);
        return true;
      }}
    >
      <ProFormText width="sm" name="id1" label="主合同编号1" />
    </StepsForm.StepForm>
  );
};
