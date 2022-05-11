import React, { useRef, useState } from 'react';
import {Card, Table, Button, Progress, Row, Col, message, Form, Timeline} from 'antd';
import ProForm, {
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-form';
import styles from './style.less';


export default (props) => {
  const { sixFormRef, form, stepData } = props;
  const handleClick = () => {
    console.log('这是第六步', sixFormRef?.current?.getFieldValue());
  }
  return (
  <div>
    <Row gutter={24}>

    </Row>
    </div>
  );
};
