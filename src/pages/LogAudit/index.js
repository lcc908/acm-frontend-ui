import React, {useEffect, useState} from 'react';
import { Space, Table, Card } from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import './style.less'
import {useModel} from "umi";
// import {Card} from 'antd';
// import {useIntl} from 'umi';
// import {Pie} from '@ant-design/charts';
// import {getPieData} from './service'
const columns = [
  {
    title: 'Date',
    dataIndex: 'name',
    key: 'name',
    className:'titleBg'
  },
  {
    title: 'Time',
    dataIndex: 'age',
    key: 'age',
    className:'titleBg'
  },
  {
    title: 'IP Adress',
    dataIndex: 'address',
    key: 'address',
    className:'titleBg'
  },
  {
    title: 'User',
    key: 'tags',
    dataIndex: 'tags',
    className:'titleBg'
  },
  {
    title: 'Section',
    key: 'tags',
    dataIndex: 'tags',
    className:'titleBg'
  },
  {
    title: 'Action',
    key: 'action',
    className:'titleBg',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: '2022/5/1',
    age: '6:30:01 PM',
    address: '10.1.1.35',
    tags: 'User Twele',
    Section:'Policles'
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

const Os = () => {
  const {diskList,setDisKList} = useModel('onlineDiskList',(model) => {
    return {
      diskList: model.disKList,
      setDisKList: model.setDisKList
    }
  });
  useEffect(() => {
    console.log(diskList);
  },[])
  return (
    <PageContainer title={'日志审计记录'}>
      <Card>
        <Table
          columns={columns}
          dataSource={data}
          bordered
        />
      </Card>
    </PageContainer>
  );
};
export default Os;
