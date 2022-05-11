import React, { useRef, useState } from 'react';
import {Card, Row, Col, Descriptions, Divider, message, Form, Timeline, Button, Progress} from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormSwitch, ProFormUploadButton,
} from '@ant-design/pro-form';
import styles from '../style.less';
import ProCard from '@ant-design/pro-card'
export default (props) => {
  const { fourFormRef, form, stepData } = props;
  const rules = [{ required: true, message: '这是必填项' }];
  const handleClick = () => {
    console.log('这是第四步', fourFormRef?.current?.getFieldValue());
  }
  return (
    <>
      <ProCard
        title="目标主机配置与迁移"
        headerBordered
        bordered
        actions={[<Button type="primary" onClick={handleClick}>上传镜像</Button>]}
      >
        <Row gutter={24} justify={'center'} align={'middle'}>
          <Col span={12}>
            <ProFormText
              name="a"
              label="镜像名称"
              // rules={rules}
            />
            <ProFormText
              name="b"
              label="源格式"
              disabled
              // rules={rules}
            />
            <ProFormSwitch name="switch" label="转换镜像格式" />
            <ProFormSelect
              name="c"
              label="目标格式"
              options={[
                {
                  value: '1',
                  label: '1',
                },
              ]}
            />
            <ProFormSelect
              name="d"
              label="存储位置"
              options={[
                {
                  value: '1',
                  label: '1',
                },
              ]}
            />
            <ProFormSelect
              name="e"
              label="目标平台"
              options={[
                {
                  value: '1',
                  label: '1',
                },
              ]}
            />
          </Col>
          <Col span={12} style={{textAlign:'center'}}>
            <p>镜像上传进度</p>
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              type="circle"
              percent={70}
              size="small"
              status="active"
              strokeWidth={10}
              className={styles.progress}
            />
          </Col>
          {/*<Col>*/}
          {/*  <Button type="primary" onClick={handleClick}>上传镜像</Button>*/}
          {/*</Col>*/}
        </Row>
      </ProCard>
    </>
  );
};
