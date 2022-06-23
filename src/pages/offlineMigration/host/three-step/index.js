import React, {useEffect, useRef, useState} from 'react';
import { Card, Timeline, Button, Progress, Row, Col, Table, Space } from 'antd';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
  ProFormRadio,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import styles from '../style.less';
import source_host from '../../../../assets/source_host.png'
import target_host from '../../../../assets/target_host.png'

export default (props) => {
  const { threeFormRef, taskId, stepData,data } = props;
  const [percent,setPercent] = useState(50);
  // const [data,setData] = useState({});
  // useEffect(()=>{
  //   getData();
  // },[])
  // const getData = async () => {
  //   const taskId = localStorage.getItem('host_task_id') || '62972194759b7432c4000001'
  //   const res = await getTemporaryMigrationTask({id:taskId});
  //   console.log(res);
  //   if(res.data.length) {
  //     setData({...res.data[0]})
  //   }
  // }
  useEffect(() =>{
    // console.log(data);
  },[data])
  const ProgressStatus = (val) => {
    const {status} = JSON.parse(val) || {};
    let str = '';
    switch (status) {
      case "DATA_MIGRATING":
        str = "active"
        break;
      case "DATA_MIGRATED":
        str = "success";
        break;
      default:
        str = "exception"
    }
    return str;
  }
  const percentNum = (val) => {
    const {status} = JSON.parse(val) || {};
    if(status &&　status === "DATA_MIGRATED") {
      return 100;
    }
    return 50;
  }
  return (
    <>
      <ProCard title="数据迁移" headerBordered bordered>
        {
          data.sub_task ? data.sub_task.map((item,index) => {
            return (
              <Row gutter={24} align={'middle'} className={styles.threeStep}>
                <Col span={9}>
                  <img src={source_host} alt="" />
                  <ProFormText
                    name="b"
                    label="源主机地址"
                    disabled
                    initialValue={item.source_host.ip_address}
                  />
                </Col>
                <Col span={6}>
                  <Progress
                    // strokeColor={{
                    //   '0%': '#108ee9',
                    //   '100%': '#87d068',
                    // }}
                    percent={percentNum(item.migration_info)}
                    showInfo={false}
                    size="small"
                    status={ProgressStatus(item.migration_info)}
                    // status={"exception"}
                    strokeWidth={20}
                    className={styles.progress}
                  />
                  {/*{*/}
                  {/*  item.migration_info === "DATA_MIGRATED" ?*/}
                  {/*}*/}
                </Col>
                <Col span={9}>
                  <img src={target_host} alt="" />
                  <ProFormText
                    name="c"
                    label="目标存储信息"
                    disabled
                    initialValue="NFS文件存储"
                  />
                </Col>
              </Row>
            )
          }) : null
        }
      </ProCard>
    </>
  );
};
