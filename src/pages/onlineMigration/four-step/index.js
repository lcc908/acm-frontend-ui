import React, {useEffect, useRef, useState} from 'react';
import {Card, Row, Col, Tag, Divider, message, Form, Timeline} from 'antd';
import styles from '../style.less';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {getTask} from '@/pages/onlineMigration/service'
import TimelinePage from '@/components/Timeline'

export default (props) => {
  const {oneFormRef, form, stepData} = props;
  const [lineList, setLineList] = useState([]);
  const [loading, setLoading] = useState('');
  const task_id = localStorage.getItem('onlineTask_id');
  useEffect(() => {
    if(task_id) {
      getData()
    }
  }, [])
  const getData = async () => {
    const {data} = await getTask({task_id});
    setLineList([...data]);
    const res = data.some(item => {
      return item.status === 'running'
    })
    if (res) {
      setLoading('加载中...')
    } else {
      setLoading('')
    }
  }
  const lineColor = (status) => {
    let str = '';
    if (status === 'error' || status === 'timeout') {
      str = 'red';
    } else if (status === 'success') {
      str = 'green';
    } else if (status === 'running') {
      str = 'red';
    }
    return str;
  }
  const setStatusText = (status) => {
    let str = '';
    switch (status) {
      case "error":
        str = <Tag icon={<CloseCircleOutlined />} color="error">错误</Tag>
        break;
      case "timeout":
        str = <Tag icon={<ExclamationCircleOutlined />} color="red">超时</Tag>
        break;
      case "running":
        str = <Tag icon={<SyncOutlined spin />} color="processing">运行中</Tag>
        break;
      default:
        str = <Tag icon={<CheckCircleOutlined />} color="success">成功</Tag>
    }
    return str;
  }
  return (
    <>
      <Card
        title="迁移日志记录"
        headStyle={{fontWeight: 'bold'}}
        // style={{minWidth:960,maxWidth:1200,height:556}}
        // className={styles.leftCard}
        // headerBordered
        // bordered
        // colSpan={12}
      >
        <Row className={styles.timeLine}>
          <Col span={24}>
            <TimelinePage loading={loading} lineList={lineList}/>
          </Col>
        </Row>
      </Card>
    </>
  );
};
