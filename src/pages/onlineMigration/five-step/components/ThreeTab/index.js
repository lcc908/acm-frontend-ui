import React, {useEffect, memo, useState} from 'react';
import { Card, Table, Empty , Input , Row,Col, message, Form } from 'antd';
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';
import styles from './style.less';
import {getValidate,postValidate} from "@/pages/onlineMigration/service";

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'file_amount',
  },
  {
    title: '住址',
    dataIndex: 'block_size',
  },
];

export default (props) => {
  const { fiveFormRef, activeTabKey, stepData } = props;
  const [source_host,setSourceHost] = useState([]);
  const [data,setData] = useState({});
  const task_id = localStorage.getItem('onlineTask_id') || '62b57de088acba1387000001';
  useEffect(() => {
    getData()
  },[])
  const getData = async () => {
    const res = await getValidate({
      task_id,
      task_type:"increase_data",
    })
    const data = res?.data[0];
    setData({...data});
    let arr = []
    if(data?.source_host) {
      for (let i in data.source_host) {
        for (let j in data.target_host) {
          if(data.source_host[i] !== data.target_host[j]) {
            arr.push(i)
          }
        }
      }
    }
    setSourceHost(arr);
  }
  return (
  <div>
    <Row gutter={24}>
      <Col span={12}>
        <Card
          title="源主机"
          headStyle={{ fontWeight: 'bold' }}
          className={styles.leftCard}
        >
        {
          data.source_host ? (
            <>
              <ProFormText
                name="source_host_ip"
                label="IP地址"
                initialValue={data?.source_host?.ip}
                className={styles.borderRed}
                fieldProps={source_host.includes("ip") ? {
                  status:"error",
                  readOnly:true
                } : {disabled:true}}
              />
              <ProFormText
                name="source_host_os_release"
                disabled
                label="系统版本"
                initialValue={data?.source_host?.os_release}
                fieldProps={source_host.includes("os_release") ? {
                  status:"error",
                  readOnly:true
                } : {disabled:true}}
              />
              <ProFormText
                name="source_host_system_disk"
                disabled
                label="系统盘文件大小"
                initialValue={data?.source_host?.system_disk}
                fieldProps={source_host.includes("system_disk") ? {
                  status:"error",
                  readOnly:true
                } : {disabled:true}}
              />
              <Row>
                <Col span="24">
                  数据盘个数和大小
                </Col>
                <Col span="24">
                  <Table
                    className={styles.tableStyle}
                    dataSource={data?.source_host?.data_disk}
                    columns={columns}
                    pagination={false}
                    showHeader={false}
                    rowClassName={record => {
                      console.log(record);
                      for (let i of data.target_host.data_disk) {
                        if(i.order_no === record.order_no) {
                          if(i.name !== record.name ||　i.file_amount !== record.file_amount || i.block_size !== record.block_size) {
                            return styles.table_color_dust
                          }
                        }
                      }
                    }}
                  />
                </Col>
              </Row>
            </>
          ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="目标主机"
          className={styles.rightCard}
          headStyle={{ fontWeight: 'bold' }}
        >
        {
          data.target_host ? (
           <>
              <ProFormText
                name="target_host_ip"
                // disabled
                label="IP地址"
                initialValue={data?.target_host?.ip}
                fieldProps={source_host.includes("ip") ? {
                  status:"error",
                  readOnly:true
                } : {disabled:true}}
              />
              <ProFormText
                name="target_host_os_release"
                disabled
                label="系统版本"
                initialValue={data?.target_host?.os_release}
                fieldProps={source_host.includes("os_release") ? {
                  status:"error",
                  readOnly:true
                } : {disabled:true}}
              />
              <ProFormText
                name="target_host_system_disk"
                // width="md"
                disabled
                label="系统盘文件大小"
                initialValue={data?.target_host?.system_disk}
                fieldProps={source_host.includes("system_disk") ? {
                  status:"error",
                  readOnly:true
                } : {disabled:true}}
              />
              <Row>
                <Col span="24">
                  数据盘个数和大小
                </Col>
                <Col span="24">
                  <Table
                    className={styles.tableStyle}
                    dataSource={data?.target_host?.data_disk}
                    columns={columns}
                    pagination={false}
                    showHeader={false}
                    rowClassName={record => {
                      for (let i of data?.source_host?.data_disk) {
                        if(i.order_no === record.order_no) {
                          if(i.name !== record.name ||　i.file_amount !== record.file_amount || i.block_size !== record.block_size) {
                            return styles.table_color_dust
                          }
                        }
                      }
                    }}
                  />
                </Col>
              </Row>
           </>
          ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
        </Card>
      </Col>
      {/*<Col span={24} className={styles.footButton}>*/}
      {/*  <Button type="primary">数据校验</Button>*/}
      {/*</Col>*/}
    </Row>
    </div>
  );
};
