import React, {useEffect, useRef, useState} from 'react';
import {Card, Row, Col, Descriptions, Divider, message, Form, Timeline} from 'antd';
import styles from '../style.less';
import { ClockCircleOutlined } from '@ant-design/icons';
import {getTask} from '@/pages/onlineMigration/service'
export default (props) => {
  const { oneFormRef, form, stepData } = props;
  const [lineList, setLineList] = useState([]);
  const [loading, setLoading] = useState('');
  const id = localStorage.getItem('onlineTask_id');
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const {data} = await getTask({task_id: localStorage.getItem('onlineTask_id')});
    setLineList([...data]);
    for (let i of data) {
      if(i.status === 'running') {
        setLoading('加载中...');
      }
    }
    // oneFormRef?.current?.setFieldsValue({
    //   ...data
    // });
  }
  const lineColor = (status) => {
    let str = '';
    if(status === 'error' || status === 'timeout') {
      str = 'red';
    } else if(status === 'sucess') {
      str = 'green';
    } else if (status === 'running') {

    }
    return str;
  }
  return (
    <>
      <Card
        title="迁移日志记录"
        headStyle={{ fontWeight: 'bold' }}
        // style={{minWidth:960,maxWidth:1200,height:556}}
        // className={styles.leftCard}
        // headerBordered
        // bordered
        // colSpan={12}
      >
        <Row>
          <Col span={24}>
            <Timeline pending={loading} className={styles.timeLine}>
              {
                lineList.length > 0 && lineList.map((item, index) => {
                  return <Timeline.Item key={index} dot={item.status === 'timeout' ? <ClockCircleOutlined className="timeline-clock-icon" /> : null} color={lineColor(item.status)}>{item.time} {item.description}</Timeline.Item>
                })
              }
            </Timeline>
          </Col>
        </Row>
      </Card>
    </>
  );
};
