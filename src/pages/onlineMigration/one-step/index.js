import React, { useRef, useState } from 'react';
import { Card, Result, Button, Row, Col, message, Form } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ForwardOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormUploadDragger,
  ProFormSelect,
  ProFormCheckbox,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import styles from '../style.less';

export default (props) => {
  const { oneFormRef, form, stepData } = props;
  return (
    <div className={styles.cardList}>
      <Row>
        <Col span={11}>
          <Card
            title="源主机信息"
            actions={[<Button type="primary">连通性检查</Button>]}
            headStyle={{ fontWeight: 'bold' }}
            style={{height:556}}
            className={styles.leftCard}
          >
            {/*<ProFormText name="xitong" label="系统类型"/>*/}
            <ProFormSelect
              name="machine_type"
              label="系统类型"
              options={[
                { value: 'SR650', label: 'SR650' },
                { value: 'X3650M5', label: 'X3650M5' },
              ]}
            />
            <ProFormText name="ip" label="ip地址" />
            <ProFormText name="name" label="用户名" />
            <ProFormText.Password name="password" label="密码" />
            <ProFormText name="name" label="端口" />
            <ProFormRadio.Group
              label="迁移方式"
              name="invoiceType"
              initialValue="a"
              // options={['发票', '普票', '无票']}
              options={[
                { label: '块级', value: 'a' },
                { label: '文件级', value: 'b' },
              ]}
            />
            <ProFormCheckbox.Group
              name="spare"
              label="数据加密"
              options={[{ label: '', value: '1' }]}
            />
          </Card>
        </Col>
        <Col span={2} className={styles.iconCent}>
            <ForwardOutlined className={styles.centerIcon} />
        </Col>
        <Col span={11}>
          <Card
            title="目标平台"
            // actions={[<p>支持三种格式上传: .txt，.sh和.yaml</p>]}
            style={{height:556}}
            className={styles.rightCard}
            headStyle={{ fontWeight: 'bold' }}
            // bordered={false}
          >
            <ProFormSelect
              name="machine_type1"
              label="平台类型"
              options={[
                { value: 'SR650', label: 'SR650' },
                { value: 'X3650M5', label: 'X3650M5' },
              ]}
            />
            <ProFormUploadDragger
              max={1}
              label="上传"
              name="upload"
              tooltip="上传目标平台认证文件"
              description="仅支持三种格式上传: .txt，.sh和.yaml"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
