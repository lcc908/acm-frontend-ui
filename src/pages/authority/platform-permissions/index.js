import React, {useState, useEffect, useRef} from 'react';
// import {getStorageAPI, check_oses} from './service';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {message, Button, Popconfirm, Menu, Modal} from 'antd';
import AddAndEdit from "@/pages/authority/platform-permissions/addAndEdit";
import {getPermission,deletePermission} from "@/pages/authority/platform-permissions/service";

const waitTime = (time=100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const [isModalVisible, setModalVisit] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [editorRowData, setEditorRowData] = useState({}); //编辑数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectRowsData, setSelectRowsData] = useState([]);
  const [params, setParams] = useState({
    // page_number: 1,
    // page_size: 10,
    // sort: "+id",
  })
  const ref = useRef();
  const columns = [
    {
      title: '权限ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '平台类型',
      dataIndex: 'platform_type',
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
      dataIndex: 'platform_name',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        1: { text: '激活', status: 'Success' },
        0: { text: '禁用', status: 'Error' },
      },
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
        <Popconfirm
          key={"3"}
          title="确认删除该数据吗？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteData([record.id])}
        >
          <a key="2">删除</a>
        </Popconfirm>
        // <a key="2">删除</a>,
      ],
    },
  ]
  const handleOnClickEdit = (record) => {
    setModalVisit(true);
    setEditorRowData({ ...record });
  }
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

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // setButtonDisableds(true)
    setSelectRowsData([...selectedRows]);
    setSelectedRowKeys([...selectedRowKeys]);
    console.log(selectedRowKeys);
    if(selectedRowKeys.length > 0) {
      setDeleteDisabled(false);
      return false;
    }
    setDeleteDisabled(true);
  }

  // const clickDelete = () => {
  //   deleteData(selectedRowKeys)
  // }
  // const dataClickDelete = (id) => {
  //   deleteData([id])
  // }
  const deleteData = async (ids) => {
    const res = await deletePermission({ids:ids});
    if(res.code === 200) {
      message.success('删除成功');
      setDeleteDisabled(true);
      reloadTable()
    }
  }
  const reloadTable = () => {
    ref.current.reload();
  }
  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        columns={columns}
        rowKey="id"
        params={
          params
        }
        request={() => {
          return getPermission(params)
        }}
        headerTitle='主机列表'
        search={false}
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          pageSize: 10,
        }}
        revalidateOnFocus={false}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
          // alwaysShowAlert:true
        }}
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
            disabled={deleteDisabled}
          >
            批量禁用
          </Button>,
          <Popconfirm
            key={"3"}
            title="确认删除选中的数据吗？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteData(selectedRowKeys)}
          >
            <Button
              type="primary"
              danger
              // onClick={clickDelete}
              disabled={deleteDisabled}
            >
              批量删除
            </Button>
          </Popconfirm>
        ]}
      >
      </ProTable>
      <AddAndEdit
        isModalVisible={isModalVisible}
        setModalVisit={setModalVisit}
        editData={editorRowData}
        reloadTable={reloadTable}
      />
    </PageContainer>
  );
};
