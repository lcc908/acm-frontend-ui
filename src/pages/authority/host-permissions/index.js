import React, {useState, useEffect, useRef} from 'react';
// import {getStorageAPI, check_oses} from './service';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {message, Button, Popconfirm, Menu, Modal} from 'antd';
import AddAndEdit from "@/pages/authority/host-permissions/addAndEdit";
import {getHostPermission,deleteHostPermission} from "@/pages/authority/host-permissions/service";

const waitTime = (time = 100) => {
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
    id: '',
    ip_address: '',
  })
  const actionRef = useRef();
  const columns = [
    {
      title: '主机地址',
      dataIndex: 'ip_address',
      align: 'center',
    },
    {
      title: '系统类型',
      dataIndex: 'os_type',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '账号',
      dataIndex: 'account',
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
        // <a key="2" onClick={() => handleClickDelete(record)}>删除</a>,
        <Popconfirm
          title={'确定要删除该数据吗？'}
          onConfirm={() => handleClickDelete(record)}
          key="2"
        >
          <a>删除</a>
        </Popconfirm>
      ],
    },
  ]
  const handleOnClickEdit = (record) => {
    setModalVisit(true);
    setEditorRowData({...record});
  }
  const handleClickDelete = async (record) => {
    // let formData = new FormData();
    // formData.append('id',record.id)
    const res = await deleteHostPermission({ids:[record.id]})
    if (res.code === 200) {
      message.success('删除成功');
      actionRef.current.reload();
    }
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

  useEffect(() => {
    // const x = async () => {
    //   const res = await getHostPermission()
    //   console.log(res);
    // }
    // x()
  }, [])
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

  const handleClickModalOk = (par) => {
    setModalVisit(false);
    if (par) actionRef.current.reload();
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
        // request={async () => {
        //   const data = await getHostPermission(params)
        //   return {
        //     data: [
        //       ...data
        //     ],
        //     success: true,
        //   };
        // }}
        request={(par) => {
          return getHostPermission(params)
        }}
        // dataSource={data}
        // cardProps={{ title: '用户列表', bordered: true }}
        headerTitle='主机列表'
        search={false}
        pagination={false}
        toolBarRender={() => [
          <Button
            key="Schedule"
            type="primary"
            onClick={showModal}
          >
            添加主机
          </Button>
        ]}
      />
      <AddAndEdit
        isModalVisible={isModalVisible}
        setModalVisit={setModalVisit}
        editData={editorRowData}
        handleClickModalOk={handleClickModalOk}
      />
    </PageContainer>
  );
};
