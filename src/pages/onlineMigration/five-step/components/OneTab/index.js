import React, {useEffect, useRef, useState} from 'react';
import {Select, Form, Button, Timeline, Row, Col} from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import styles from './style.less'

const {Option} = Select;

const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
export default (props) => {
  const {fiveFormRef} = props;
  const [selectValue, setSelectValue] = useState(['a10', 'c12']);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fiveFormRef?.current?.setFieldsValue({
      switch: ['a10', 'c12']
    })
  }, [])
  const handleClickStopButton = () => {
    // console.log(fiveFormRef?.current?.getFieldValue());
    console.log(selectValue);
  }
  const handleChange = (value) => {
    setSelectValue(value)
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
            <Form.Item label="应用类型" shouldUpdate>
              {(form) => {
                return (
                  <Form.Item name="switch">
                    <Select
                      mode="multiple"
                      allowClear
                      // style={{width: '100%'}}
                      placeholder="请选择应用"
                      onChange={handleChange}
                    >
                      {children}
                    </Select>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Col>
          <Col md={6} lg={6} xl={6} xxl={4}>
            <Button danger onClick={handleClickStopButton}>
              停止应用
            </Button>
            <Button type="primary" style={{marginLeft: 10}} onClick={showModal}>
              上传脚本
            </Button>
          </Col>
        </Row>
      </div>
      <Timeline pending="loading..." className={styles.timeLine}>
        {/*<Timeline>*/}
        <Timeline.Item color="green">2022-03-1 10:13:15 连接目标主机成功</Timeline.Item>
        <Timeline.Item color="green">2022-03-1 11:13:30 操作系统配置基线检查完成</Timeline.Item>
        <Timeline.Item color="green">2022-03-2 12:13:45 目标主机硬件环境检查完成</Timeline.Item>
        <Timeline.Item color="green">2022-03-3 11:13:45 网络连通性检查正常，能够访问ETL存储</Timeline.Item>
        <Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>
        <Timeline.Item color="red">2022-03-5 14:13:11 失败状态</Timeline.Item>
      </Timeline>
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
