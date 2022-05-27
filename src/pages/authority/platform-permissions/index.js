import React, {useState, useEffect, useRef} from 'react';
// import {getStorageAPI, check_oses} from './service';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {message, Button, Dropdown, Menu, Modal} from 'antd';
import AddAndEdit from "@/pages/authority/platform-permissions/addAndEdit";

const waitTime = (time=100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const [isModalVisible, setModalVisit] = useState(false);
  const [editorRowData, setEditorRowData] = useState({}); //编辑数据
  const [params, setParams] = useState({
    page_number: 1,
    page_size: 10,
    sort: "+id",
  })
  const actionRef = useRef();
  const columns = [
    {
      title: '权限ID',
      dataIndex: 'ip_address',
      align: 'center',
    },
    {
      title: '平台类型',
      dataIndex: 'os_type',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'account',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'updated_at',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'updated_at',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '更新日期',
      dataIndex: 'updated_at',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      valueType: 'option',
      render: (text, record) => [
        <a key="1" onClick={() => handleOnClickEdit(record)}>编辑</a>,
        <a key="2">删除</a>,
      ],
    },
  ]
  const handleOnClickEdit = (record) => {
    setModalVisit(true);
    setEditorRowData({ ...record });
  }
  const data = [
    {
      "id": "628ca5363cf4476053000001",
      "os_type": "centos7",
      "ip_address": "10.122.1.1",
      "name": null,
      "common_account_id": null,
      "account": "test",
      "password_hash": "Decryption failed",
      "port": 22,
      "connect_type": "SSH",
      "extra": "ds",
      "enabled": "1",
      "description": "sd",
      "deleted": "0",
      "created_by": "liusl12",
      "created_at": "2022-05-24 00:00:00",
      "updated_by": "liusl12",
      "updated_at": "2022-05-24 00:00:00"
    }
  ]
  /*
* 分页*/
  const onChangePagination = (page, pageSize) => {
    console.log(page, pageSize);
    // setParams(val => {
    //   return {...val, page_number: page, page_size: pageSize,}
    // })
  }
  const showModal = () => {
    setEditorRowData({})
    setModalVisit(true);
  }
  const handleOk = () => {
    setModalVisit(false);
  };

  const handleCancel = () => {
    setModalVisit(false);
  };

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        params={
          params
        }
        // request={() => {
        //   return getWhiteDataList(params)
        // }}
        dataSource={data}
        // cardProps={{ title: '用户列表', bordered: true }}
        headerTitle='主机列表'
        search={false}
        pagination={false}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={showModal}
          >
            添加
          </Button>,
          <Button
            key="2"
            type="primary"
            danger
            onClick={showModal}
          >
            批量禁用
          </Button>,
          <Button
            key="3"
            type="primary"
            danger
            onClick={showModal}
          >
            批量删除
          </Button>
        ]}
      >
      </ProTable>
      <AddAndEdit
        isModalVisible={isModalVisible}
        setModalVisit={setModalVisit}
        editData={editorRowData}
      />
    </PageContainer>
  );
};
