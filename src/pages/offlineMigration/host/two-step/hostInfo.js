import React, {useEffect, useState,useRef} from 'react';
import ProForm,{
  ProFormText,
} from '@ant-design/pro-form';
import {Row, Col} from 'antd';
import ProCard from '@ant-design/pro-card';
import styles from './style.less';
import {getHostData} from "@/pages/authority/platform-permissions/service";
import {history} from "umi";

export default (props) => {
  const { twoFormRef,hostInfo } = props;
  const [data,setData] = useState({})
  const formRef = useRef();
  useEffect(()=>{
    formRef.current?.setFieldsValue({
      ...hostInfo,
    })
  },[hostInfo])
  const getData = async () => {
    // const {host_id} = history?.location?.query;
    // const res = await getHostData({id:host_id});
    // const par = res?.data[0];
    // formRef.current?.setFieldsValue({
    //   ...hostInfo,
    // })
  }
  return (
      <ProForm
        formRef={formRef}
        submitter={false}
      >
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="sn"
              label="序列号"
              disabled
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="name"
              label="主机名称"
              disabled
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="server_manufacturer"
              label="服务器厂商"
              disabled
              // rules={rules}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="cpu"
              label="CPU个数"
              disabled
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="mem"
              label="内存"
              disabled
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="os_type"
              label="操作系统"
              disabled
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="network_num"
              label="网卡数量"
              disabled
              // rules={rules}
            />
          </Col>
        </Row>
      </ProForm>
  );
};
