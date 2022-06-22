import React, {useEffect, useRef, useState} from 'react';
import {Row, Col, Cascader, Form, Select} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormUploadButton,
  ProFormText, ProFormSwitch,
  ProFormCascader, ProFormTextArea
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import styles from './style.less';
import {getPermission} from "@/pages/authority/platform-permissions/service";

export default (props) => {
  const {twoFormRef, selectedRowKeys, handleNextState} = props;
  const [showDateTime, setShowDateTime] = useState(false)
  const rules = [{required: true}];
  const changeSwitch = (val) => {
    setShowDateTime(val)
  }
  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem('vmTwoStepFormData')) || {}
    twoFormRef?.current?.setFieldsValue({
      ...obj
    });
  }, [selectedRowKeys])
  return (
    <>
      <ProCard title="任务信息" headerBordered bordered>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="name"
              label="任务名称"
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="target_platform_id"
              label="目标平台"
              request={async () => {
                const {data} = await getPermission();
                const arr = [];
                if(data.length) {
                  for (let i of data) {
                    if (i.platform_type &&　i.platform_type.toLowerCase() === "openstack") {
                      console.log(i.platform_name);
                      arr.push({
                        label: i.platform_name, value: i.id
                      })
                    }
                  }
                }
                return arr
              }}
              rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="network_name"
              label="网络名称"
              initialValue="network_10.120.79"
              options={[
                {
                  value: 'network_10.120.79',
                  label: 'network_10.120.79',
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="datacenter"
              label="区域"
              initialValue="shenyang"
              options={[{
                label: "Shenyang",
                value: "shenyang"
              },
                {
                  label: "BJ-Beiyan",
                  value: "bj-beiyan"
                }
              ]}
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
            <ProFormTextArea
              name="description"
              label="描述"
              placeholder="请输入描述"
              fieldProps={{
                rows:1
              }}
              // rules={rules}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          {/*<Col span={12}>*/}
          {/*  <ProForm.Group label="自定义脚本">*/}
          {/*    <ProFormSelect*/}
          {/*      width="md"*/}
          {/*      name="b"*/}
          {/*      label="脚本类型"*/}
          {/*      options={[*/}
          {/*        {*/}
          {/*          value: '1',*/}
          {/*          label: '1',*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*      addonAfter={*/}
          {/*        <div className={styles.upload}>*/}
          {/*          <ProFormUploadButton name="upload" max={1} action="/upload.do" />*/}
          {/*        </div>*/}
          {/*      }*/}
          {/*    />*/}
          {/*    <ProFormSelect*/}
          {/*      width="md"*/}
          {/*      name="b"*/}
          {/*      label="脚本类型2"*/}
          {/*      options={[*/}
          {/*        {*/}
          {/*          value: '1',*/}
          {/*          label: '1',*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*      addonAfter={*/}
          {/*        <div className={styles.upload}>*/}
          {/*          <ProFormUploadButton name="upload" max={1} action="/upload.do" />*/}
          {/*        </div>*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </ProForm.Group>*/}
          {/*</Col>*/}
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
