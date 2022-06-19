import React, { useRef, useState } from 'react';
import {Card, Tag, Button, Progress, Row, Col, message, Form, Timeline} from 'antd';
import ProForm, {
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-form';
import styles from './style.less';


export default (props) => {
  const { applyList } = props;
  const handleClickstart = () => {
    if(!applyList.length) {
      message.error('请先到源应用停止页面选择应用！');
      return false;
    }
  }
  return (
  <div>
    <Row gutter={24}>
      <Col span={12}>
        <Card
          title="应用列表"
          headStyle={{ fontWeight: 'bold' }}
          bodyStyle={{height:'245px'}}
          actions={[<Button type="primary" onClick={handleClickstart}>启动应用</Button>]}
        >
          {
            applyList.map(item => {
              return <p><Tag color="success" key={item}>{item}</Tag></p>
            })
          }
          {/*<Tag color="success">success</Tag>*/}

          {/*<ProFormCheckbox.Group*/}
          {/*  layout="vertical"*/}
          {/*  name="spare"*/}
          {/*  options={[*/}
          {/*    {*/}
          {/*      label: 'item 1',*/}
          {/*      value: 'a',*/}
          {/*    },*/}
          {/*    {*/}
          {/*      label: 'item 2',*/}
          {/*      value: 'b',*/}
          {/*    },*/}
          {/*    {*/}
          {/*      label: 'item 3',*/}
          {/*      value: 'c',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*/>*/}
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="日志记录"
          bodyStyle={{height:'300px'}}
          headStyle={{ fontWeight: 'bold' }}
        >
          <Timeline pending="loading..." className={styles.timeLine}>
            {/*<Timeline>*/}
            <Timeline.Item color="green">2022-03-1 10:13:15 连接目标主机成功</Timeline.Item>
            <Timeline.Item color="green">2022-03-1 11:13:30  操作系统配置基线检查完成</Timeline.Item>
            <Timeline.Item color="green">2022-03-2 12:13:45  目标主机硬件环境检查完成</Timeline.Item>
            <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>
            <Timeline.Item color="gray">2022-03-5 14:13:11 警告状态</Timeline.Item>
            <Timeline.Item color="red">2022-03-5 14:13:11 失败状态</Timeline.Item>
          </Timeline>
        </Card>
      </Col>
    </Row>
    </div>
  );
};
