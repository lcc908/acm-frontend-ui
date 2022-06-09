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
import {getTemporaryMigrationTask} from "@/pages/offlineMigration/host/service";

export default (props) => {
  const { threeFormRef, taskId, stepData } = props;
  useEffect(()=>{
    getData();
  },[])
  const getData = async () => {
    const taskId = localStorage.getItem('task_id')
    const {data} = await getTemporaryMigrationTask({id:taskId});
    console.log(data);
  }
  return (
    <>
      <ProCard title="数据迁移" headerBordered bordered>
        <Row gutter={24} align={'middle'} className={styles.threeStep}>
          <Col span={9}>
            <img src="https://modao.cc/uploads5/images/8377/83775738/v2_r9fwdo.png" alt="" />
            <ProFormText
              name="b"
              label="源主机地址"
              disabled
              // rules={rules}
            />
          </Col>
          <Col span={6}>
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={70}
              size="small"
              status="active"
              strokeWidth={20}
              className={styles.progress}
            />
          </Col>
          <Col span={9}>
            <img src="https://modao.cc/uploads5/images/8377/83775738/v2_r9fwdo.png" alt="" />
            <ProFormText
              name="b"
              label="目标存储信息"
              disabled
              // rules={rules}
            />
          </Col>
        </Row>
      </ProCard>
    </>
  );
};
