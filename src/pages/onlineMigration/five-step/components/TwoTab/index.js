import React, {useEffect, useRef, useState} from 'react';
import {Progress, Row, Col, message, Form, Timeline, Card} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import styles from './style.less';
import {waitTime} from "@/utils"
import TimelinePage from '@/components/Timeline'

import {getSnapshot, postSnapshot} from "@/pages/onlineMigration/service";

export default (props) => {
  const {fiveFormRef} = props;
  const rules = [{required: true}];
  const [lineList, setLineList] = useState([]);
  const [loading, setLoading] = useState('');
  const task_id = localStorage.getItem('onlineTask_id') || '62b57de088acba1387000001'
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const {data} = await getSnapshot({task_id, task_type: "snapshot"});
    setLineList([...data]);
    const res = data.some(item => {
      return item.status === 'running'
    })
    if (res) {
      setLoading('加载中...')
    } else {
      setLoading('')
    }
    console.log(res);
  }
  return (
    <div className={styles.cardList}>
      <Row gutter={24}>
        <Col span={12}>
          <Card
            title="同步数据"
            bodyStyle={{height: '520px'}}
            headStyle={{fontWeight: 'bold'}}
          >
            <ProForm
              formRef={fiveFormRef}
              layout="horizontal"
              labelCol={{span: 4}}
              wrapperCol={{span: 14}}
              submitter={{
                searchConfig: {
                  resetText: '重置',
                  submitText: '同步数据',
                },
              }}
              onFinish={async (values) => {
                await waitTime(2000);
                const val = {...values, task_id}
                const {code} = await postSnapshot(val);
                if (code === 200) {
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
                  {value: 'linux', label: 'Linux'},
                  {value: 'windows', label: 'Windows'},
                ]}
                rules={rules}
              />
              <ProFormText name="nfs_address" label="NFS地址系统类型" rules={rules}/>
              <ProFormRadio.Group
                label="迁移方式"
                name="method"
                initialValue="block"
                options={[
                  {label: '块级', value: 'block'},
                  {label: '文件级', value: 'file'},
                ]}
              />
            </ProForm>
          </Card>
        </Col>
        <Col span={12} className={styles.rightBox}>
          <Card
            title="日志记录"
            bodyStyle={{height: '520px'}}
            headStyle={{fontWeight: 'bold'}}
          >
            <TimelinePage loading={loading} lineList={lineList}/>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
