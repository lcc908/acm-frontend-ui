import React, {useEffect, useRef, useState} from 'react';
import { Row, Col, Cascader , Form, Select} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormUploadButton,
  ProFormText, ProFormSwitch,
  ProFormCascader
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import styles from './style.less';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];


export default (props) => {
  const { twoFormRef, selectedRowKeys, handleNextState } = props;
  const [showDateTime,setShowDateTime] = useState(false)
  const rules = [{ required: true, message: '这是必填项' }];
  const onChange = (value) => {
    console.log(value);
    // setSelectValue(value)
  }
  const displayRender = (label) => {
    return label[label.length - 1];
  }
  const changeSwitch = (val) => {
    setShowDateTime(val)
  }
  useEffect(()=>{
    console.log(selectedRowKeys);
  },[selectedRowKeys])
  return (
    <>
      <ProCard title="任务信息" headerBordered bordered>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="a"
              label="任务名称"
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="b"
              label="网络名称"
              options={[
                {
                  value: '1',
                  label: '1',
                },
                {
                  value: '2',
                  label: '2',
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <ProFormCascader
              name="area"
              label="区域"
              fieldProps={{
                options: [
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                      {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                          {
                            value: 'xihu',
                            label: 'West Lake',
                          },
                        ],
                      },
                    ],
                  },
                ],
                displayRender:displayRender
              }}
            />
            {/*<Form.Item label="后端存储" shouldUpdate>*/}
            {/*  {(form) => {*/}
            {/*    return (*/}
            {/*      <Form.Item name="switch">*/}
            {/*        <Cascader*/}
            {/*          options={options}*/}
            {/*          expandTrigger="hover"*/}
            {/*          displayRender={displayRender}*/}
            {/*          onChange={onChange}*/}
            {/*        />*/}
            {/*      </Form.Item>*/}
            {/*    );*/}
            {/*  }}*/}
            {/*</Form.Item>*/}
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="b1"
              label="目标平台权限"
              options={[
                {
                  value: '1',
                  label: '1',
                },
                {
                  value: '2',
                  label: '2',
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <ProForm.Group label="自定义脚本">
              <ProFormSelect
                width="md"
                name="b"
                label="脚本类型"
                options={[
                  {
                    value: '1',
                    label: '1',
                  },
                ]}
                addonAfter={
                  <div className={styles.upload}>
                    <ProFormUploadButton name="upload" max={1} action="/upload.do" />
                  </div>
                }
              />
              <ProFormSelect
                width="md"
                name="b"
                label="脚本类型2"
                options={[
                  {
                    value: '1',
                    label: '1',
                  },
                ]}
                addonAfter={
                  <div className={styles.upload}>
                    <ProFormUploadButton name="upload" max={1} action="/upload.do" />
                  </div>
                }
              />
            </ProForm.Group>
          </Col>
          <Col span={24}>
            <ProFormSwitch
              name="switch1"
              label="定时任务"
              onChange={changeSwitch}
            />
            {
              showDateTime ? <ProFormDateTimePicker
                // fieldProps={{
                //   format:"YYYY-MM-DD HH:mm:ss"
                // }}
                name="datetime"
                label="日期时间"
              /> : null
            }
          </Col>
        </Row>
      </ProCard>
      {/*<ProCard title="源主机配置" headerBordered bordered className={styles.lastCard}>*/}
      {/* */}
      {/*</ProCard>*/}
    </>
  );
};
