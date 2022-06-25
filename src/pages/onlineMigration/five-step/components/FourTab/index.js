import React, {useEffect, useRef, useState} from 'react';
import {Card, Tag, Button, Empty, Row, Col, message, Form, Timeline} from 'antd';
import TimelinePage from '@/components/Timeline'
import styles from './style.less';
import {getHotMigrationTask,postHotMigrationTask} from "@/pages/onlineMigration/service";

export default (props) => {
  const { applyList } = props;
  const [lineList, setLineList] = useState([]);
  const task_id = localStorage.getItem('onlineTask_id') || '62b57de088acba1387000001';
  useEffect(async () =>{
    const res = await getHotMigrationTask({task_id,task_type:"increase_data",})
    setLineList(res.data)
  },[])
  const handleClickstart = async () => {
    if(!applyList.length) {
      message.error('请先到源应用停止页面选择应用！');
      return false;
    }
    console.log(applyList);
    const res = await postHotMigrationTask({
      task_id,
      task_type:"increase_data",
      application_type: [...applyList],
      action: "start",
    })
    if(res.code === 200) {
      message.success("目标应用启动成功")
      const res = await getHotMigrationTask({task_id,task_type:"increase_data",})
      setLineList(res.data)
      console.log(res);
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
          actions={[<Button type="primary" disabled={applyList.length ? false : true} onClick={handleClickstart}>启动应用</Button>]}
        >
          {
            applyList.length ? applyList.map(item => {
              return <p><Tag color="success" key={item}>{item}</Tag></p>
            }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="日志记录"
          bodyStyle={{height:'300px'}}
          headStyle={{ fontWeight: 'bold' }}
        >
          <TimelinePage lineList={lineList} loading={''}/>
        </Card>
      </Col>
    </Row>
    </div>
  );
};
