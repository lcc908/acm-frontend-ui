import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Card, Timeline, Button, Progress, Row, Col, message, Form } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormCheckbox,
  ProFormUploadButton,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import styles from './style.less';
import HostInfo from "@/pages/offlineMigration/host/two-step/hostInfo";
import {getTemporaryMigrationTask} from '../service'
import {getPermission,getHostData} from "@/pages/authority/platform-permissions/service";
import {history} from "umi";

export default (props) => {
  const { twoFormRef, current } = props;
  const [xitGb,setXitGb] = useState(true);
  const [sjGb,setSjGb] = useState(true);
  const [systemDisk,setSystemDisk] = useState(false);
  const [dataDisk,setDataDisk] = useState(false);
  const [hostInfo,setHostInfo] = useState({}) //源主机配置
  const [diskArray,setDiskArray] = useState([]) //磁盘信息
  const rules = [{ required: true}];
  const handleChange = (val) => {
    if(val[0]) {
      setXitGb(false);
      return false;
    }
    setXitGb(true);
  }
  const handleChangeSJ = (val) => {
    if(val[0]) {
      setSjGb(false);
      return false;
    }
    console.log(val);
    setSjGb(true);
  }
  const handleChangeDisk = (val) => {
    console.log(val);
    localStorage.setItem("data_disk",JSON.stringify(val));
  }
  useEffect(()=>{
    getData();
  },[current])
  const getData = async () => {
    const {host_id} = history?.location?.query;
    const {data} = await getTemporaryMigrationTask({host_id:host_id});
    const res = await getHostData({id:host_id});
    const par = res?.data[0];
    setHostInfo(par);
    // setDiskArray([...par.volume]);
    if(par.volume.length) {
      const arr = par.volume.map(item =>{
        return {label:item.name,value:item.name}
      });
      setDiskArray([...arr]);
    }
    if(data.length) {
      const res = data[0];
      const {target_platform_id} = res?.sub_task[0];
      const {system_disk} = res.extra && JSON.parse(res.extra) || {};
      const data_disk = JSON.parse(localStorage.getItem("data_disk")) || [];
      localStorage.setItem('host_task_id',res.id)
      twoFormRef.current?.setFieldsValue({
        ...res,
        target_platform_id,
        system_disk,
        data_disk,
      })
      if(system_disk) setSystemDisk(true)
      if(data_disk.length) setDataDisk(true)
    }
  }
  const checkboxData = async () =>{
    console.log(diskArray);
  }
  return (
    <>
      <ProCard title="任务信息" headerBordered bordered>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="name"
              label="任务名称"
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="target_platform_id"
              label="目标平台"
              request={async () => {
                const {data} = await getPermission();
                const arr = data.map((item) => {
                  return { label: item.platform_name, value: item.id };
                });
                return arr
              }}
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormTextArea
              name="description"
              label="描述"
              placeholder="请输入描述"
              fieldProps={{
                rows:1
              }}
            />
          </Col>
        </Row>
      </ProCard>
      <ProCard title="源主机配置" headerBordered bordered className={styles.lastCard}>
        <HostInfo twoFormRef={twoFormRef} hostInfo={hostInfo}/>
        <ProForm.Group label="磁盘信息(GiB)" />
        <Row className={styles.checkboxGroup}>
          <Col>
            <ProFormCheckbox.Group
              name="checkbox-group1"
              options={[
                {
                  value: '1',
                  label: '系统盘',
                },
              ]}
              addonAfter={<ProFormSelect
                name="system_disk"
                width="xl"
                options={diskArray}
                disabled={xitGb}
              />}
              fieldProps={{
                onChange:handleChange
              }}
              disabled={systemDisk}
            />
          </Col>
          <Col span={24} style={{ margin: 5 }}></Col>
          <Col>
            <ProFormCheckbox.Group
              name="checkbox-group2"
              options={[
                {
                  value: '2',
                  label: '数据盘',
                },
              ]}
              addonAfter={<ProFormSelect
                name="data_disk"
                width="xl"
                options={diskArray}
                fieldProps={{
                  mode: 'multiple',
                  onChange:handleChangeDisk
                }}
                disabled={sjGb}
              />}
              fieldProps={{
                onChange:handleChangeSJ
              }}
              disabled={dataDisk}
            />
          </Col>
        </Row>
      </ProCard>
    </>
  );
};
