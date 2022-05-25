import React, {useState, useEffect, useRef} from 'react';
// import {getStorageAPI, check_oses} from './service';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {message, Button, Dropdown, Menu, Modal} from 'antd';
import AddAndEdit from "@/pages/account/ad-user/addAndEdit";

const waitTime = (time=100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const [isModalVisible, setModalVisit] = useState(false);
  const [params, setParams] = useState({
    page_number: 1,
    page_size: 10,
    sort: "+id",
  })
  const actionRef = useRef();
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '管理员',
      dataIndex: 'user',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '创建日期',
      dataIndex: 'time',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'time',
      align: 'center',
      hideInSearch: true,
      // render
    },
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
        dataSource={[]}
        // cardProps={{ title: '用户列表', bordered: true }}
        headerTitle='用户列表'
        search={false}
        pagination={false}
        toolBarRender={() => [
          <Button
            key="Schedule"
            type="primary"
            onClick={showModal}
          >
            添加
          </Button>
        ]}
      >
      </ProTable>
      <AddAndEdit
        isModalVisible={isModalVisible}
        setModalVisit={setModalVisit}
      />
    </PageContainer>
  );
};
