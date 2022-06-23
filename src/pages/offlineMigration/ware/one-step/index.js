import React, {useEffect, useRef, useState} from 'react';
import {Card, Button, message, Row, Col, Popconfirm} from 'antd';
import ProCard from '@ant-design/pro-card';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {CloudDownloadOutlined} from '@ant-design/icons';
import styles from './style.less'
import {history} from "umi";
import {getVmWareListVm} from "@/pages/offlineMigration/ware/service"

export default (props) => {
  const {platform_id} = history?.location?.query;
  const {oneFormRef, handleNextState,onChangeDisabled} = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectRowsData, setSelectRowsData] = useState([]);
  const [params, setParams] = useState({
    platform_id:platform_id,
    vm_name: '',
    ip: '',
  })

  const columns = [
    {
      title: 'OS类型',
      dataIndex: 'os',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '虚机名称',
      dataIndex: 'vmname',
      align: 'center',
      ellipsis: true,
      // hideInSearch: true,
    },
    {
      title: 'CPU配置',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '内存配置',
      dataIndex: 'tags',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'power_state',
      align: 'center',
      valueEnum: {
        poweredOn: { text: '运行中', status: 'Success' },
        poweredOff: { text: '已关闭', status: 'Error' },
      },
      hideInSearch: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      align: 'center',
    },
  ];
  useEffect(()=>{
    // console.log(params);
  },[params])
  const onChangePagination = (page, pageSize) => {
    console.log(page, pageSize);
  }

  const requestData = async () => {
    if(!platform_id) {
      message.error("请先去源平台界面，选择一台主机")
      return [];
    }
    return await getVmWareListVm(params)
  }

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log(selectedRowKeys);
    localStorage.setItem('vmOneStepRowKeys',JSON.stringify(selectedRowKeys));
    setSelectRowsData([...selectedRows])
    setSelectedRowKeys([...selectedRowKeys])
    if(selectedRowKeys.length > 0) {
      onChangeDisabled(false,selectedRowKeys)
    } else {
      onChangeDisabled(true,[])
    }
  }

  const beforeSearchSubmit = (val) => {
    const {vmname,ip} = val;
    setParams({...params,vm_name:vmname,ip})
  }

  return (
    <ProCard
      title="虚拟机列表"
      headerBordered
      bordered
      className={styles.oneStep}
    >
        <ProTable
        columns={columns}
        rowKey="vmname"
        revalidateOnFocus={false}
        params={
          params
        }
        beforeSearchSubmit={beforeSearchSubmit}
        search={{
          // labelWidth: 100,
          labelWidth: 'auto',
          // span: 8,
          optionRender: ({searchText, resetText}, {form}, dom) => [
            <Button
              key="searchText"
              type="primary"
              onClick={() => {
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
          ]
        }}
        // columnsStateMap={columnsStateMap}
        // request={(par) => {
        //   return getVmWareListVm(params)
        // }}
        request={requestData}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }}
        toolBarRender={false}
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
