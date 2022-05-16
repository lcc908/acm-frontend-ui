import React, { useRef, useState } from 'react';
import {Card, Timeline, Button, Progress, Row, Col, message, Form, Popconfirm, Space, Table} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormCheckbox,
  ProFormUploadButton,
  ProFormText,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
// import styles from './style.less';

export default (props) => {
  const { threeFormRef, form, handleNextState } = props;
  const columns = [
    {
      title: '虚拟名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'IP地址',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '硬件配置',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '主机类型',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: '磁盘配置',
      key: 'tags',
      dataIndex: 'tags',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <>
      <ProCard title="源平台" headerBordered bordered>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="a"
              label="区域"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="b"
              label="权限认证"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="b"
              label="平台名称"
              disabled
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="b"
              label="平台类型"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="b"
              label="共享文件存储"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="b"
              label="注入脚本"
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} pagination={false} title={() => '磁盘列表'} />
          </Col>
        </Row>
      </ProCard>
      <ProCard title="目标平台" headerBordered bordered >
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="d"
              label="区域"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="d"
              label="权限认证"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="f"
              label="平台名称"
              disabled
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="f"
              label="平台类型"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="g"
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
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="f"
              label="认证URL"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="f"
              label="租户ID"
              disabled
            />
          </Col>
        </Row>
      </ProCard>
    </>
  );
};
