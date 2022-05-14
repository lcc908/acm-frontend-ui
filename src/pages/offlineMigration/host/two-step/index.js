import React, { useRef, useState } from 'react';
import { Card, Timeline, Button, Progress, Row, Col, message, Form } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormCheckbox,
  ProFormUploadButton,
  ProFormText,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import styles from './style.less';

export default (props) => {
  const { twoFormRef, form, handleNextState } = props;
  const rules = [{ required: true, message: '这是必填项' }];
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
            <ProFormText
              name="b"
              label="创建时间"
              disabled
              // rules={rules}
            />
          </Col>
          <Col span={24}>
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
            </ProForm.Group>
          </Col>
        </Row>
      </ProCard>
      <ProCard title="源主机配置" headerBordered bordered className={styles.lastCard}>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="d"
              label="序列号"
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="e"
              label="主机名称"
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="f"
              label="服务器厂商"
              // rules={rules}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="f"
              label="服务器厂商"
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="g"
              label="MEM配置"
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="h"
              label="操作系统"
              // rules={rules}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="i"
              label="网络信息"
              // rules={rules}
            />
          </Col>
        </Row>
        <ProForm.Group label="行业分布" />
        <Row className={styles.checkboxGroup}>
          <Col>
            <ProFormCheckbox.Group
              name="checkbox-group"
              options={[
                {
                  value: '1',
                  label: '系统盘',
                },
              ]}
              addonAfter={<ProFormText name="c" />}
            />
          </Col>
          <Col span={24} style={{ margin: 5 }}></Col>
          <Col>
            <ProFormCheckbox.Group
              name="checkbox-group"
              options={[
                {
                  value: '2',
                  label: '数据盘',
                },
              ]}
              addonAfter={<ProFormText name="c" />}
            />
          </Col>
        </Row>
      </ProCard>
    </>
  );
};