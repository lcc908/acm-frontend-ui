import React, {useEffect, useState} from 'react';
import {Card, Row, Col} from 'antd';
import styles from '../style.less';
import {getTask} from '@/pages/onlineMigration/service'
import TimelinePage from '@/components/Timeline'
// import {useInterval} from "@/utils"

export default (props) => {
  const [lineList, setLineList] = useState([]);
  const [loading, setLoading] = useState('');
  const task_id = localStorage.getItem('onlineTask_id');
  const [isRunning, setIsRunning] = useState(true);

  // useInterval(() => {
  //   getData();
  // }, isRunning ? 10000 : null);

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    if(!task_id) return;
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
