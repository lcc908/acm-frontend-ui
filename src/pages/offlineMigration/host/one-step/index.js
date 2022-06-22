import React, {useEffect, useRef, useState} from 'react';
import {Card, Button, Progress, Row, Col, message} from 'antd';
import ProCard from '@ant-design/pro-card';
import {ProFormText, ProFormSelect, ProFormSwitch, ProFormRadio} from '@ant-design/pro-form';
import {CloudDownloadOutlined} from '@ant-design/icons';
import styles from './style.less';
import {getLiveCd, makeLiveCd} from '../service'
import {history} from "umi";

export default (props) => {
  const {oneFormRef, form, handleNextState} = props;
  const [downLoad,setDownLoad] = useState('');
  const rules = [{required: true}];
  const {host_id} = history?.location?.query;
  const handleClick = async () => {
    // console.log(oneFormRef.current);
    // console.log(oneFormRef.current.validateFields());
    const val = await oneFormRef.current?.validateFieldsReturnFormatValue();
    console.log(val);
    val.host_id = host_id;
    val.nic_index = parseInt(val.nic_index);
    const res = await makeLiveCd(val);
    if (res.code === 200) {
      message.success('制作成功！');
      getData();
    }
    // console.log('我点击了暂存按钮', oneFormRef.current.getFieldValue());
    // oneFormRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
    //   console.log('校验表单并返回格式化后的所有数据：', values);
    //   message.success('提交成功')
    //   // const res = await makeLiveCd()
    // }).catch(error=> {
    //   console.log(error);
    // });
    // handleNextState()
  };
  useEffect(async () => {
    // console.log(res);
    if(host_id) {
      getData();
    } else {
      message.error("请先去选择源平台界面，选择一台主机")
    }
  },[]);
  const getData = async () => {
    const res = await getLiveCd({host_id:host_id});
    if(res.code === 200) {
      setDownLoad(res.data.url)
      oneFormRef?.current?.setFieldsValue({
        ...res.data
      });
    }
  }

  return (
    <>
      <ProCard title="目标主机信息" headerBordered bordered>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="ip"
              label="IP地址"
              rules={
                [
                  {
                    required: true,
                    message: '请输入合法的IP地址',
                    // pattern:/^((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))$/
                  },
                ]
              }
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="nic_index"
              label="网卡"
              options={[
                {
                  value: '0',
                  label: '0',
                },
                {
                  value: '1',
                  label: '1',
                },
                {
                  value: '2',
                  label: '2',
                },
                {
                  value: '3',
                  label: '3',
                },
                {
                  value: '4',
                  label: '4',
                },
              ]}
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="netmask"
              label="子网掩码"
              rules={rules}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="gateway"
              label="网关"
              rules={rules}
            />
          </Col>
          {/*<Col span={8}>*/}
          {/*  <ProFormText*/}
          {/*    name="e"*/}
          {/*    label="镜像名称"*/}
          {/*    // rules={rules}*/}
          {/*  />*/}
          {/*</Col>*/}
        </Row>
        {/*<Row>*/}
        {/*  <ProFormRadio.Group*/}
        {/*    name="radio-group"*/}
        {/*    rules={rules}*/}
        {/*    options={[*/}
        {/*      {*/}
        {/*        label: '上传到共享文件存储',*/}
        {/*        value: 'a',*/}
        {/*      },*/}
        {/*      {*/}
        {/*        label: '下载到本地',*/}
        {/*        value: 'b',*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*  />*/}
        {/*</Row>*/}
        {/*<Row justify={'center'} style={{ height: 60 }}>*/}
        {/*  <Progress*/}
        {/*    // type="circle"*/}
        {/*    strokeColor={{*/}
        {/*      '0%': '#108ee9',*/}
        {/*      '100%': '#87d068',*/}
        {/*    }}*/}
        {/*    percent={70}*/}
        {/*    size="small"*/}
        {/*    status="active"*/}
        {/*    strokeWidth={20}*/}
        {/*    className={styles.progress}*/}
        {/*  />*/}
        {/*</Row>*/}
        <Row style={{textAlign: 'center'}}>
          <Col span={24}>
            <Button type="primary" onClick={handleClick}>
              开始制作
            </Button>
          </Col>
          {
            downLoad && <Col span={24} style={{paddingTop: 20}}>
              当LiveCD镜像制作完成，点击下载{' '}
              <a href={downLoad}>
                <CloudDownloadOutlined />
              </a>{' '}
              按钮
            </Col>
          }
        </Row>
      </ProCard>
    </>
  );
};
