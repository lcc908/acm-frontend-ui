import React, {useEffect, useState, useRef} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card'
import {ProForm, ProFormDatePicker, ProFormText} from '@ant-design/pro-form';
import {Button} from 'antd';
// import {useIntl} from 'umi';
// import {Pie} from '@ant-design/charts';
// import {getPieData} from './service'
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef();
  const onFill = () => {

  }
  return (
    <PageContainer>
      <ProCard layout="center" style={{textAlign:'center'}}>
        <ProForm
          title="新建表单"
          formRef={formRef}
          submitter={{
            render: (props, doms) => {
              return [
                <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                  提交
                </Button>,
                <Button type="primary" onClick={onFill} key="edit" disabled={true}>
                  编辑
                </Button>,
              ];
            },
          }}
          onFinish={async (values) => {
            await waitTime(2000);
            console.log(values);
            message.success('提交成功');
            return true;
          }}
          layout={'horizontal'}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <ProFormText
            name="name"
            label="Domain Name"
            placeholder="请输入"
          />
          <ProFormText
            name="name"
            label="Domain controller"
            placeholder="请输入"
          />
          <ProFormText
            name="name"
            label="Bind DN"
            placeholder="请输入"
          />
          <ProFormText
            name="name"
            label="Bind Password"
            placeholder="请输入"
          />

          <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
