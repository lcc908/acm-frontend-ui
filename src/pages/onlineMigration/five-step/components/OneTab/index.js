import React, {useEffect, useRef, useState} from 'react';
import {Select, Form, Button, message, Row, Col} from 'antd';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import styles from './style.less'
import {getStopApp,postStopApp} from '@/pages/onlineMigration/service';
import TimelinePage from '@/components/Timeline'
import {waitTime} from "@/utils"
const {Option} = Select;

export default (props) => {
  const {setApplyList} = props;
  const [children, setChildren] = useState(['docker-ce-20.10.14', 'keepalived-1.3.5-19','nginx-1.21.5']);
  const [selectValue, setSelectValue] = useState(['a10', 'c12']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const task_id = localStorage.getItem('onlineTask_id') || '62a96668678f29a3cfe23de0';

  useEffect(() => {
    // fiveFormRef?.current?.setFieldsValue({
    //   switch: ['a10', 'c12']
    // })
  }, [])
  const handleClickStopButton = async () => {
    // console.log(fiveFormRef?.current?.getFieldValue());
    console.log(selectValue);
    setLoadings(true);
    await waitTime(2000);
    let obj = {
      task_id,
      application_type:[...selectValue],
      "action": "stop",
    }
    const {code} = await postStopApp(obj);
    if(code === 200) {
      message.success("应用已停止");
      getData()
    }
    setLoadings(false);
  }
  useEffect(() => {
    getData()
  },[])
  const getData = async () => {
    const res = await getStopApp({
      task_id,
      task_type:'increase_data'
    });
    console.log(res);
  }
  const handleChange = (value) => {
    setSelectValue(value)
    setApplyList(value);
  }
  const showModal = () => {
    setIsModalVisible(true);
  }
  const handleCancel = () => {
    console.log('run')
    setIsModalVisible(false);
  };
  return (
    <>
      <div className={styles.oneTabContainer}>
        <Row gutter={8}>
          <Col md={18} lg={18} xl={18} xxl={20}>
            <Form.Item shouldUpdate>
              {(form) => {
                return (
                  <Form.Item name="switch">
                    <Select
                      mode="multiple"
                      allowClear
                      name="plication_type"
                      placeholder="请选择应用"
                      onChange={handleChange}
                    >
                      {
                        children.map((item,index) => {
                          return <Option key={item}>{item}</Option>
                        })
                      }
                    </Select>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Col>
          <Col md={6} lg={6} xl={6} xxl={4}>
            <Button danger onClick={handleClickStopButton} loading={loadings}>
              停止应用
            </Button>
            {/*<Button type="primary" style={{marginLeft: 10}} onClick={showModal}>*/}
            {/*  上传脚本*/}
            {/*</Button>*/}
          </Col>
        </Row>
      </div>
      <TimelinePage lineList={[]} loading={''}/>
      {/*<Timeline pending="loading..." className={styles.timeLine}>*/}
      {/*  /!*<Timeline>*!/*/}
      {/*  <Timeline.Item color="green">2022-03-1 10:13:15 连接目标主机成功</Timeline.Item>*/}
      {/*  <Timeline.Item color="green">2022-03-1 11:13:30 操作系统配置基线检查完成</Timeline.Item>*/}
      {/*  <Timeline.Item color="green">2022-03-2 12:13:45 目标主机硬件环境检查完成</Timeline.Item>*/}
      {/*  <Timeline.Item color="green">2022-03-3 11:13:45 网络连通性检查正常，能够访问ETL存储</Timeline.Item>*/}
      {/*  <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>*/}
      {/*  <Timeline.Item color="red">2022-03-5 14:13:11 失败状态</Timeline.Item>*/}
      {/*</Timeline>*/}
      <ModalForm
        title="上传脚本"
        visible={isModalVisible}
        autoFocusFirstInput
        modalProps={{
          onCancel: () => handleCancel(),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
          return true;
        }}
        layout="horizontal"
      >
          <ProFormText
            width="md"
            name="name"
            label="应用名称"
            placeholder="请输入名称"
          />
      </ModalForm>
    </>
  )
};
