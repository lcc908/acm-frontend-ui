import React, {useEffect, useRef, useState} from 'react';
import {Card, Button, Progress, Row, Col, Popconfirm} from 'antd';
import ProCard from '@ant-design/pro-card';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {CloudDownloadOutlined} from '@ant-design/icons';
import styles from './style.less'

export default (props) => {
  const {oneFormRef, form, handleNextState} = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectRowsData, setSelectRowsData] = useState([]);
  const [params, setParams] = useState({
    page_number: 1,
    page_size: 10,
    sort: "+id",
  })

  const columns = [
    {
      title: 'OS类型',
      dataIndex: 'name',
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '实例名称',
      dataIndex: 'age',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '挂载点',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '套餐配置',
      dataIndex: 'tags',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'type',
      align: 'center',
      valueEnum: {
        running: { text: '运行中', status: 'Processing' },
        close: { text: '已关闭', status: 'Default' },
        error: { text: '异常', status: 'Error' },
      },
    },
    {
      title: 'IP地址',
      dataIndex: 'tags',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      align: 'center',
      // render: (text, record, _, action) => [
      //   <a
      //     key="editable"
      //     onClick={() => {
      //       action?.startEditable?.(record.key);
      //     }}
      //   >
      //     编辑
      //   </a>,
      //   <Popconfirm title="确定删除此行数据?" onConfirm={() => {
      //     setDataSource(dataSource.filter((item) => item.key !== record.key));
      //   }}>
      //     <a>删除</a>
      //   </Popconfirm>
      // ],
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: '1 Lake Park',
      tags: 2,
      type: "running"
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'Lake Park',
      tags: 1,
      type: "close"
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: '1 Lake Park',
      tags: 3,
      type: "error"
    },

  ];

  useEffect(()=>{
    console.log(params);
  },[params])
  const onChangePagination = (page, pageSize) => {
    console.log(page, pageSize);
  }

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // if (selectedRows.length > 0) {
    //   setButtonDisableds(false);
    // } else {
    //   setButtonDisableds(true)
    // }
    // // setButtonDisableds(true)
    setSelectRowsData([...selectedRows])
    setSelectedRowKeys([...selectedRowKeys])
  }

  return (
    <ProCard
      title="主机列表"
      headerBordered
      bordered
      className={styles.oneStep}
    >
      <ProTable
        columns={columns}
        rowKey="key"
        params={
          params
        }
        // rowKey={record => record.vm_uuid}
        // params={
        //   params
        // }
        // scroll={{x: 2000}}
        // beforeSearchSubmit={beforeSearchSubmit}
        search={{
          // labelWidth: 100,
          // span: 8,
          optionRender: ({searchText, resetText}, {form}, dom) => [
            <Button
              key="searchText"
              type="primary"
              onClick={() => {
                // console.log(params);
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
            // <Button
            //   key="resetText"
            //   onClick={() => {
            //     form?.resetFields();
            //   }}
            // >
            //   {resetText}
            // </Button>
          ]
        }}
        // columnsStateMap={columnsStateMap}
        // request={(par) => {
        //   return getStorageAPI(params)
        // }}
        // rowSelection={{
        //   selectedRowKeys: selectedRowKeys,
        //   onChange: onSelectChange
        // }}
        toolBarRender={false}
        // dataSource={data}
        request={async (params ) => {
          console.log(params);
          return {
            data: data,
            total: 3,
            success: true,
          }
        }}
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          onChange: onChangePagination,
          pageSize: 10,
        }}
      />
    </ProCard>
  );
};
