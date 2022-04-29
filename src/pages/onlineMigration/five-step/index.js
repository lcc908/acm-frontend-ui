import React, {useEffect, useRef, useState} from 'react';
import {Card, Result, Button, Descriptions, Divider, message, Form, Timeline, Select} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';

const { Option } = Select;
import styles from './style.less';
import OneTab from "@/pages/onlineMigration/five-step/components/OneTab";

const tabList = [
  {
    key: 'tab1',
    tab: '源应用停止',
  },
  {
    key: 'tab2',
    tab: '增量数据快照',
  },
  {
    key: 'tab3',
    tab: '目标数据校验',
  },
  {
    key: 'tab4',
    tab: '目标应用启动',
  },
];
export default (props) => {
  const { oneFormRef, form, stepData,fiveFormRef } = props;
  const [activeTabKey, setActiveTabKey] = useState('tab1');

  const contentList = {
    tab1: <OneTab fiveFormRef={fiveFormRef}/>,
    tab2: <p>content2</p>,
    tab3: <p>content3</p>,
    tab4: <p>content4</p>,
  };
  const onTab1Change = key => {
    setActiveTabKey(key);
  };
  return (
      <Card
        // style={{minWidth:960,maxWidth:1200,height:556}}
        style={{width:'100%'}}
        title="增量数据导入"
        // extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={key => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey]}
      </Card>
  );
};
