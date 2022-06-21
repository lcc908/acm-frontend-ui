import React, {useEffect, useRef, useState} from 'react';
import {Card, Timeline, Button, Progress, Row, Col, Table, Space, Popconfirm} from 'antd';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
  ProFormRadio, ProFormTextArea,
} from '@ant-design/pro-form';
import {getGenerateData} from "@/pages/onlineMigration/service";
import { EditableProTable } from '@ant-design/pro-table';
import styles from '../style.less';

const waitTime = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const { threeFormRef, form, stepData } = props;
  const rules = [{required: true}];
  const [dataSource,setDataSource] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState([]);
  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
      readonly: true,
      render:(_, record,index) => <span>{index + 1}</span>
    },
    {
      title: '磁盘名称',
      readonly: true,
      dataIndex: 'disk_name',
    },
    {
      title: '挂载点',
      dataIndex: 'mount_point',
    },
    {
      title: '容量(GB)',
      dataIndex: 'size',
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      render: (text, record, _, action) => (
        <Space size="middle" style={{ display: 'inline-flex' }}>
          <a
            onClick={() => {
            action?.startEditable?.(record.disk_id);
          }}
          >
            编辑
          </a>
          <Popconfirm title="确定删除此行数据?" onConfirm={() => {
            setDataSource(dataSource.filter((item) => item.disk_id !== record.disk_id));
          }}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getData()
  },[])
  useEffect(() => {
    console.log(editableKeys);
    console.log(dataSource);
  },[editableKeys])
  const getData = async () => {
    const {code,data} = await getGenerateData({task_id:localStorage.getItem('onlineTask_id')});
    const {host} = data;
    setDataSource([...host.disk])
    threeFormRef?.current?.setFieldsValue({
      ...data,
      ...host
    })
  }
  return (
    <>
      <Card title="目标主机信息" headStyle={{ fontWeight: 'bold' }}>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="task_name"
              label="任务名称"
              rules={rules}
            />
          </Col>
          <Col span={8}>
            {/*<ProFormText name="name" label="description" placeholder="" />*/}
            <ProFormTextArea
              name="description"
              label="描述"
              fieldProps={{
                rows:1
              }}
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="network"
              label="网络名称"
              initialValue="network_10.120.79"
              options={[
                {
                  value: 'network_10.120.79',
                  label: 'network_10.120.79',
                },
              ]}
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="host_name"
              label="主机名"
              placeholder="由诊断报告信息自动填入"
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="image_name"
              label="镜像名称"
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="username"
              initialValue={localStorage.getItem('userToken')}
              label="操作人员"
              rules={rules}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormSelect
              name="project_name"
              label="租户名称"
              options={[
                {
                  value: 'peko1-10.120.76',
                  label: 'peko1-10.120.76',
                },
                {
                  value: 'peko1-10.120.77',
                  label: 'peko1-10.120.77',
                },
                {
                  value: 'peko1-10.120.78',
                  label: 'peko1-10.120.78',
                },
                {
                  value: 'peko1-10.120.79',
                  label: 'peko1-10.120.79',
                },
                {
                  value: 'peko1-10.120.80',
                  label: 'peko1-10.120.80',
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="account"
              label="系统账号"
            />
          </Col>
          <Col span={8}>
            <ProFormText name="created_at" label="日期" disabled />
          </Col>
          <Col style={{display:'none'}}>
            <ProFormText name="source_host_id" />
          </Col>
        </Row>
        {/*<Table columns={columns} dataSource={dataList} pagination={false} title={() => '磁盘列表'} />*/}
        <EditableProTable
          rowKey="disk_id"
          headerTitle="磁盘列表"
          columns={columns}
          value={dataSource}
          // value={dataSource}
          onChange={setDataSource}
          editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
              console.log(rowKey, data, row);
              await waitTime(2000);
            },
            onChange: setEditableRowKeys,
            onDelete:(Key, row) => {
              console.log(Key);
              console.log(row);
            }
          }}
          recordCreatorProps={false}
        />
      </Card>
    </>
  );
};
