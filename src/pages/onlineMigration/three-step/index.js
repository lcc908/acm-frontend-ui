import React, { useRef, useState } from 'react';
import { Card, Timeline, Button, Progress, Row, Col, Table, Space } from 'antd';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
  ProFormRadio,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import styles from '../style.less';

export default (props) => {
  const { oneFormRef, form, stepData } = props;
  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '磁盘名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '挂载点',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '容量(GB)',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle" style={{ display: 'inline-flex' }}>
          <a>编辑</a>
          <a>Delete</a>
        </Space>
      ),
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
      <Card title="目标主机信息" headStyle={{ fontWeight: 'bold' }}>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText name="name" label="主机名" placeholder="由诊断报告信息自动填入" />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="chapter"
              label="镜像名称"
              options={[
                {
                  value: 'chapter',
                  label: '盖章后生效',
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="unusedMode"
              label="租户名称"
              options={[
                {
                  value: 'time',
                  label: '履行完终止',
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="name"
              label="操作人员"
              placeholder="由登陆用户自动填入，可手动修改"
            />
          </Col>
          <Col span={8}>
            <ProFormText name="chapter" label="系统账号" placeholder="默认为root" />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="unusedMode"
              label="网络名称"
              options={[
                {
                  value: 'time',
                  label: '履行完终止',
                },
              ]}
              placeholder="根据租户自动填入网络名称"
            />
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} pagination={false} title={() => '磁盘列表'} />
      </Card>
    </>
  );
};
