import React, { useRef, useState } from 'react';
import { Card, Timeline, Button, Progress , Row,Col, message, Form } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormSwitch,
  ProFormRadio,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card'
import styles from '../style.less';

export default (props) => {
  const { oneFormRef, form, stepData } = props;
  return (
  <div className={styles.cardList}>
    <Row gutter={24}>
      <Col span={12}>
        <Card
          title="源主机诊断"
          headStyle={{ fontWeight: 'bold' }}
          style={{height:556}}
          className={styles.leftCard}
        >
          <Timeline pending="Recording...">
            {/*<Timeline>*/}
            <Timeline.Item color="green">2022-03-1 10:13:15 连接目标主机成功</Timeline.Item>
            <Timeline.Item color="green">2022-03-1 11:13:30  操作系统配置基线检查完成</Timeline.Item>
            <Timeline.Item color="green">2022-03-2 12:13:45  目标主机硬件环境检查完成</Timeline.Item>
            <Timeline.Item color="green">2022-03-3 11:13:45  网络连通性检查正常，能够访问ETL存储</Timeline.Item>
            <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>
            <Timeline.Item color="gray">2022-03-5 14:13:11 警告状态</Timeline.Item>
            <Timeline.Item color="red">2022-03-5 14:13:11 失败状态</Timeline.Item>
          </Timeline>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="安装客户端"
          style={{height:556}}
          className={styles.rightCard}
          headStyle={{ fontWeight: 'bold' }}
          actions={[<Button type="primary">安装Agent</Button>]}
        >
          <ProFormSelect
            name="machine_type1"
            label="软件包列表"
            options={[
              { value: 'SR650', label: 'SR650' },
              { value: 'X3650M5', label: 'X3650M5' },
            ]}
          />
          <ProFormSelect
            name="machine_type2"
            label="安装位置"
            options={[
              { value: 'SR650', label: 'SR650' },
              { value: 'X3650M5', label: 'X3650M5' },
            ]}
          />
          <ProFormRadio.Group
            label="服务启动"
            name="invoiceType"
            initialValue="a"
            options={[
              { label: '一次性', value: 'a' },
              { label: '加入系统服务', value: 'b' },
            ]}
          />
          <ProFormSwitch name="switch" label="防火墙启用" />
          <div style={{marginTop:80,textAlign:"center"}}>
            <Progress
              // type="circle"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={70}
              size="small"
              status="active"
              strokeWidth={20}
              style={{fontSize:22}}
            />
          </div>
        </Card>
      </Col>
    </Row>
    </div>
  );
};
