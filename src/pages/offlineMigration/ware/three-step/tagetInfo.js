import React, {useEffect, useState, useRef} from 'react';
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';
import {Row, Col} from 'antd';
import ProCard from '@ant-design/pro-card';
import {getPermission} from "@/pages/authority/platform-permissions/service";

export default (props) => {
  const {current, hostInfo} = props;
  const [data, setData] = useState({})
  const {name, target_platform_id} = JSON.parse(localStorage.getItem('vmTwoStepFormData')) || {}

  const formRef = useRef();
  // useEffect(() => {
  //   function renderData() {
  //     const {target_platform_id} = JSON.parse(localStorage.getItem('vmTwoStepFormData'))
  //     if (target_platform_id) {
  //       getData()
  //     }
  //   }
  //   window.addEventListener('storage', renderData)
  //
  //   return () => {
  //     window.removeEventListener('storage', renderData)
  //   }
  // }, [])

  useEffect(() =>{
    getData()
  },[current])

  const getData = async () => {
    console.log(1);
    const obj = JSON.parse(localStorage.getItem('vmTwoStepFormData'))
    if(obj?.target_platform_id) {
      const {target_platform_id} = obj;
      const {data} = await getPermission({id:target_platform_id});
      const credential = JSON.parse(data[0].credential)

      formRef?.current?.setFieldsValue({
        ...data[0],
        ...credential
      });
    }
  };
  return (
    <ProCard title="目标平台" headerBordered bordered>
      <ProForm
        formRef={formRef}
        submitter={false}
      >
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="datacenter"
              label="区域"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="platform_type"
              label="平台类型"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="platform_name"
              label="平台名称"
              disabled
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="project_name"
              label="租户信息"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="h"
              label="网络信息"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="auth_url"
              label="认证URL"
              disabled
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="project_id"
              label="租户ID"
              disabled
            />
          </Col>
        </Row>
      </ProForm>
    </ProCard>
  );
};
