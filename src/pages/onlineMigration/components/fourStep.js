import React, { useRef, useState } from 'react';
import { Card, Result, Button, Descriptions, Divider, message, Form } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import styles from '../style.less';

export default (props) => {
  const { oneFormRef, form, stepData } = props;
  return (
    <div className={styles.cardList}>
      <Card
        title="源主机诊断"
        headStyle={{ fontWeight: 'bold' }}
        style={{width:600,height:556}}
        // bordered={false}
      >

      </Card>
      <Card
        title="安装客户端"
        style={{width:600,height:556}}
        className={styles.rightCard}
        headStyle={{ fontWeight: 'bold' }}
      >
        <ProFormSelect
          name="machine_type1"
          label="平台类型"
          options={[
            { value: 'SR650', label: 'SR650' },
            { value: 'X3650M5', label: 'X3650M5' },
          ]}
        />
      </Card>
    </div>
  );
};
