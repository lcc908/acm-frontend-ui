import React, {useEffect, useRef, useState} from 'react';
import {Card, Row, Col, Tag, Divider, message, Form, Timeline} from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

export default (props) => {
  const {lineList,loading} = props;
  const lineColor = (status) => {
    let str = '';
    if (status === 'error' || status === 'timeout') {
      str = 'red';
    } else if (status === 'success') {
      str = 'green';
    } else if (status === 'running') {
      str = 'red';
    }
    return str;
  }
  const setStatusText = (status) => {
    let str = '';
    switch (status) {
      case "error":
        str = <Tag icon={<CloseCircleOutlined />} color="error">错误</Tag>
        break;
      case "timeout":
        str = <Tag icon={<ExclamationCircleOutlined />} color="red">超时</Tag>
        break;
      case "running":
        str = <Tag icon={<SyncOutlined spin />} color="processing">运行中</Tag>
        break;
      default:
        str = <Tag icon={<CheckCircleOutlined />} color="success">成功</Tag>
    }
    return str;
  }
  return (
    <>
      <Timeline pending={loading}>
        {
          lineList.length > 0 && lineList.map((item, index) => {
            return (
              <Timeline.Item
                key={index}
                dot={item.status === 'timeout' ? <ClockCircleOutlined/> : null}
                color={lineColor(item.status)}
              >
                {item.time} {item.description} ------ {setStatusText(item.status)}
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    </>
  );
};
