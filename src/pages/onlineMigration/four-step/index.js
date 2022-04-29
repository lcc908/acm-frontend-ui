import React, { useRef, useState } from 'react';
import {Card, Row, Col, Descriptions, Divider, message, Form, Timeline} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import styles from '../style.less';
import ProCard from '@ant-design/pro-card'
export default (props) => {
  const { oneFormRef, form, stepData } = props;
  return (
    <>
      <Card
        title="目标主机配置与迁移"
        headStyle={{ fontWeight: 'bold' }}
        // style={{minWidth:960,maxWidth:1200,height:556}}
        // className={styles.leftCard}
        // headerBordered
        // bordered
        // colSpan={12}
      >
        <Row>
          <Col span={24}>
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
      </Card>
    </>
  );
};
