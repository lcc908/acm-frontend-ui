import React, {useEffect, useRef, useState} from 'react';
import {Progress, Row, Col, message, Form, Timeline} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import styles from './style.less';
import {waitTime} from "@/utils"
import {getSnapshot,postSnapshot} from "@/pages/onlineMigration/service";
export default (props) => {
  const { fiveFormRef } = props;
  const rules = [{ required: true, message: '这是必填项' }];
  const task_id = localStorage.getItem('onlineTask_id') || '62a96668678f29a3cfe23de0'
  useEffect(() => {
    getData()
  },[])
  const getData = async () => {
    const res = await getSnapshot({task_id})
    console.log(res);
  }
  return (
    <div className={styles.cardList}>
      <Row>
        <Col span={12}>
          <ProForm
            formRef={fiveFormRef}
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            submitter={{
              searchConfig: {
                resetText: '重置',
                submitText: '同步数据',
              },
            }}
            onFinish={async (values) => {
              await waitTime(2000);
              const val = {...values,task_id}
              const {code} = await postSnapshot(val);
              if(code === 200) {
                message.success('提交成功');
                getData()
              }
              return true;
            }}
          >
            <ProFormText name="source_host" label="源主机" rules={rules}/>
            <ProFormText name="target_host" label="目标主机" rules={rules}/>
            <ProFormSelect
              name="os_type"
              label="系统类型"
              initialValue="linux"
              options={[
                { value: 'linux', label: 'Linux' },
                { value: 'windows', label: 'Windows' },
              ]}
              rules={rules}
            />
            <ProFormText name="nfs_address" label="NFS地址系统类型" rules={rules}/>
            <ProFormRadio.Group
              label="迁移方式"
              name="method"
              initialValue="block"
              options={[
                { label: '块级', value: 'block' },
                { label: '文件级', value: 'file' },
              ]}
            />
          </ProForm>
        </Col>
        <Col span={12} className={styles.rightBox}>
          {/*<Progress type="circle" percent={75} className={styles.progres}/>*/}
          <Timeline pending="loading..." className={styles.timeLine}>
            {/*<Timeline>*/}
            <Timeline.Item color="green">2022-03-1 10:13:15 连接目标主机成功</Timeline.Item>
            <Timeline.Item color="green">2022-03-1 11:13:30  操作系统配置基线检查完成</Timeline.Item>
            <Timeline.Item color="green">2022-03-2 12:13:45  目标主机硬件环境检查完成</Timeline.Item>
            <Timeline.Item color="green">2022-03-3 11:13:45  网络连通性检查正常，能够访问ETL存储</Timeline.Item>
            <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>
            <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>
            <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>
            <Timeline.Item color="gray">2022-03-5 14:13:11 警告状态</Timeline.Item>
            <Timeline.Item color="red">2022-03-5 14:13:11 失败状态</Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </div>
  );
};
