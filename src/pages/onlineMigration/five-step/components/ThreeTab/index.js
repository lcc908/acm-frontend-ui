import React, { useRef, useState } from 'react';
import { Card, Table, Button, Progress , Row,Col, message, Form } from 'antd';
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';
import styles from './style.less';
import {red} from "mockjs/src/mock/random/color_dict";

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    // render: text => <span style={{color:'red'}}>{text}</span>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

export default (props) => {
  const { oneFormRef, form, stepData } = props;
  return (
  <div className={styles.cardList}>
    <Row gutter={24}>
      <Col span={12}>
        <Card
          title="源主机"
          headStyle={{ fontWeight: 'bold' }}
          // style={{height:300}}
          className={styles.leftCard}
        >
          <ProFormText
            name="project"
            // width="md"
            disabled
            label="IP地址"
            initialValue=""
          />
          <ProFormText
            name="project"
            // width="md"
            disabled
            label="系统版本"
            initialValue=""
          />
          <ProFormText
            name="project"
            // width="md"
            disabled
            label="系统盘文件大小"
            initialValue=""
          />
          <Row>
            <Col span="24">
              数据盘个数和大小
            </Col>
            <Col span="24">
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                showHeader={false}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="目标主机"
          // style={{height:300}}
          className={styles.rightCard}
          headStyle={{ fontWeight: 'bold' }}
        >
          <ProFormText
            name="project"
            // width="md"
            disabled
            label="IP地址"
            initialValue=""
          />
          <ProFormText
            name="project"
            // width="md"
            disabled
            label="系统版本"
            initialValue=""
          />
          <ProFormText
            name="project"
            // width="md"
            disabled
            label="系统盘文件大小"
            initialValue=""
          />
          <Row>
            <Col span="24">
              数据盘个数和大小
            </Col>
            <Col span="24">
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                showHeader={false}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} className={styles.footButton}>
        <Button type="primary">数据校验</Button>
      </Col>
    </Row>
    </div>
  );
};
