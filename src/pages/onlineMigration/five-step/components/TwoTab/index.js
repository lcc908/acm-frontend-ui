import React, { useRef, useState } from 'react';
import {Card, Progress, Button, Row, Col, message, Form, Timeline} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ForwardOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormUploadDragger,
  ProFormSelect,
  ProFormCheckbox,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import styles from './style.less';

export default (props) => {
  const { oneFormRef, form, stepData,fiveFormRef } = props;
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
              // await waitTime(2000);
              console.log(values);
              message.success('提交成功');
              return true;
            }}
          >
            <ProFormText name="ip" label="源主机" />
            <ProFormText name="name" label="目标主机  " />
            <ProFormSelect
              name="machine_type"
              label="系统类型"
              options={[
                { value: 'SR650', label: 'SR650' },
                { value: 'X3650M5', label: 'X3650M5' },
              ]}
            />
            <ProFormText name="name" label="仓库地址" />
            <ProFormRadio.Group
              label="迁移方式"
              name="invoiceType"
              initialValue="a"
              // options={['发票', '普票', '无票']}
              options={[
                { label: '块级', value: 'a' },
                { label: '文件级', value: 'b' },
              ]}
            />
          </ProForm>
        </Col>
        <Col span={12} className={styles.rightBox}>
          <Progress type="circle" percent={75} className={styles.progres}/>
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
