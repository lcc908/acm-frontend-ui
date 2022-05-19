import React, { useRef, useState } from 'react';
import {Card, Button, Progress, Row, Col, message} from 'antd';
import ProCard from '@ant-design/pro-card';
import { ProFormText, ProFormSelect, ProFormSwitch, ProFormRadio } from '@ant-design/pro-form';
import { CloudDownloadOutlined } from '@ant-design/icons';
import styles from './style.less';

export default (props) => {
  const { oneFormRef, form, handleNextState } = props;
  const rules = [{ required: true, message: '这是必填项' }];
  const handleClick = async () => {
    console.log(oneFormRef.current);
    // console.log(oneFormRef.current.validateFields());
    // const val1 = await oneFormRef.current?.validateFields();
    // console.log(val1);
    // console.log('我点击了暂存按钮', oneFormRef.current.getFieldValue());
    oneFormRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      console.log('校验表单并返回格式化后的所有数据：', values);
      message.success('提交成功')
    });
    // handleNextState()
  };
  return (
    <>
      <ProCard title="目标主机信息" headerBordered bordered>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="a"
              label="IP地址"
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="b"
              label="网卡"
              options={[
                {
                  value: '1',
                  label: '1',
                },
              ]}
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="c"
              label="子网掩码"
              rules={rules}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="d"
              label="网关"
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="e"
              label="镜像名称"
              rules={rules}
            />
          </Col>
        </Row>
        <Row>
          <ProFormRadio.Group
            name="radio-group"
            rules={rules}
            options={[
              {
                label: '上传到共享文件存储',
                value: 'a',
              },
              {
                label: '下载到本地',
                value: 'b',
              },
            ]}
          />
        </Row>
        <Row justify={'center'} style={{ height: 60 }}>
          <Progress
            // type="circle"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={70}
            size="small"
            status="active"
            strokeWidth={20}
            className={styles.progress}
          />
        </Row>
        <Row style={{ textAlign: 'center' }}>
          <Col span={24}>
            <Button type="primary" onClick={handleClick}>
              开始制作
            </Button>
          </Col>
          <Col span={24} style={{ paddingTop: 20 }}>
            当LiveCD镜像制作完成，点击下载{' '}
            <a href="">
              <CloudDownloadOutlined />
            </a>{' '}
            按钮
          </Col>
        </Row>
      </ProCard>
    </>
  );
};
