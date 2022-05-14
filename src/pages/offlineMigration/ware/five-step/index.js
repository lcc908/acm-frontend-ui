import React, {useEffect, useRef, useState} from 'react';
import { Popconfirm, Timeline, Button, Progress , Row, Col, Table,Space } from 'antd';
import {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
  ProFormRadio, ProFormUploadButton,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card'
import { EditableProTable } from '@ant-design/pro-table';

import styles from '../style.less';

const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


export default (props) => {
  const { fiveFormRef, form, stepData } = props;
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
      readonly:true
    },
    {
      title: '磁盘名称',
      dataIndex: 'age',
      key: 'age',
      readonly:true
    },
    {
      title: '挂载点',
      dataIndex: 'address',
      key: 'address',
      readonly:true
    },
    {
      title: '容量(GB)',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.key);
          }}
        >
          编辑
        </a>,
        <Popconfirm title="确定删除此行数据?" onConfirm={() => {
          setDataSource(dataSource.filter((item) => item.key !== record.key));
        }}>
          <a>删除</a>
        </Popconfirm>
      ],
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: '1 Lake Park',
      tags: 2,
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'Lake Park',
      tags: 1,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: '1 Lake Park',
      tags: 3,
    },
  ];
  useEffect(() => {
    // console.log(editableKeys);
    console.log(dataSource);
  },[dataSource])
  return (
    <>
      <ProCard
        // title="创建虚拟机"
        headerBordered
        bordered
        // gutter={8}
        split={'vertical'}
        // gutter={[0, 8]}
      >
        <ProCard
          title="创建虚拟机"
          colSpan="60%"
          headerBordered
          // bordered
        >
          <ProFormText
            name="a"
            label="平台名称"
            // rules={rules}
          />
          <ProFormSelect
            name="b"
            label="主机名"
            options={[
              {
                value: '1',
                label: '1',
              },
            ]}
          />
          <ProFormText
            name="c"
            label="镜像名称"
            disabled
            // rules={rules}
          />
          <ProFormSelect
            name="d"
            label="套餐大小"
            options={[
              {
                value: '1',
                label: '1',
              },
            ]}
          />
          <ProFormSelect
            name="d"
            label="网络名称"
            options={[
              {
                value: '1',
                label: '1',
              },
            ]}
          />
          {/*<Table columns={columns} dataSource={data} pagination={false} title={() => '磁盘列表'}/>*/}
          <EditableProTable
            rowKey="key"
            headerTitle="磁盘列表"
            columns={columns}
            // scroll={{
            //   x: 960,
            // }}
            request={async () => ({
              data: data,
              total: 3,
              success: true,
            })}
            value={dataSource}
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
              }
            }}
            recordCreatorProps={false}
          />
        </ProCard>
        <ProCard
          headerBordered
          // bordered
          title="流量占用情况"
        >
          <Timeline pending="loading..." className={styles.timeLine}>
            {/*<Timeline>*/}
            <Timeline.Item color="green">2022-03-1 10:13:15 连接目标主机成功</Timeline.Item>
            <Timeline.Item color="green">2022-03-1 11:13:30  操作系统配置基线检查完成</Timeline.Item>
            <Timeline.Item color="green">2022-03-2 12:13:45  目标主机硬件环境检查完成</Timeline.Item>
            <Timeline.Item color="green">2022-03-3 11:13:45  网络连通性检查正常，能够访问ETL存储</Timeline.Item>
            <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>
            <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>
            <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>
            <Timeline.Item color="gray">2022-03-5 14:13:11 警告状态</Timeline.Item>
            <Timeline.Item color="red">2022-03-5 14:13:11 失败状态</Timeline.Item>
          </Timeline>
        </ProCard>
      </ProCard>
    </>
  );
};
