import React, { useState, useEffect, useRef } from 'react';
// import {getStorageAPI, check_oses} from './service';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { message, Button, Popconfirm, Dropdown, Menu, Modal } from 'antd';
// import { message, Button, Popconfirm, Menu, Modal } from 'antd';
import AddAndEdit from '@/pages/account/general-user/addAndEdit';
import { getUser, deleteUser } from '@/pages/account/general-user/service';
import {removeFakeList} from "@/pages/dashboard/service";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [isModalVisible, setModalVisit] = useState(false);
  const [editorRowData, setEditorRowData] = useState({}); //编辑数据
  const [params, setParams] = useState({
    // page_number: 1,
    // page_size: 10,
    // sort: "+id",
  });
  const ref = useRef();
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '创建日期',
      dataIndex: 'created_at',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      valueType: 'option',
      render: (text, record) => [
        <a key="1" onClick={() => handleOnClickEdit(record)}>
          编辑
        </a>,
        <Popconfirm
          key={'3'}
          title="确认删除该数据吗？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteData(record)}
        >
          <a key="2">删除</a>
        </Popconfirm>,
      ],
    },
  ];
  const handleOnClickEdit = (record) => {
    console.log(record);
    setModalVisit(true);
    setEditorRowData({ ...record });
  };
  /*
   * 分页*/
  const onChangePagination = (page, pageSize) => {
    console.log(page, pageSize);
    // setParams(val => {
    //   return {...val, page_number: page, page_size: pageSize,}
    // })
  };
  const showModal = () => {
    setEditorRowData({});
    setModalVisit(true);
  };
  // 删除用户
  const deleteData = async ({id}) => {
    const {code} = await deleteUser({ids:[id]});
    if(code === 200) {
      message.success("删除成功");
      reloadTable();
    }
  };
  const reloadTable = () => {
    ref.current.reload();
  };

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        columns={columns}
        rowKey="id"
        params={params}
        request={() => {
          return getUser(params);
        }}
        headerTitle="用户列表"
        search={false}
        pagination={false}
        toolBarRender={() => [
          <Button key="1" type="primary" onClick={showModal}>
            添加
          </Button>,
        ]}
      />
      <AddAndEdit
        isModalVisible={isModalVisible}
        setModalVisit={setModalVisit}
        editData={editorRowData}
        reloadTable={reloadTable}
      />
    </PageContainer>
  );
};
