import React, {useEffect, useRef, useState} from 'react';
import {Card, Result, Button, Descriptions, Divider, message, Form, Timeline, Select} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';

const {Option} = Select;

import OneTab from "@/pages/onlineMigration/five-step/components/OneTab";
import TwoTab from "@/pages/onlineMigration/five-step/components/TwoTab";
import ThreeTab from "@/pages/onlineMigration/five-step/components/ThreeTab";
import FourTab from "@/pages/onlineMigration/five-step/components/FourTab";

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
  const { fiveFormRef,setFiveNextBt } = props;
  const [activeTabKey, setActiveTabKey] = useState('tab1');
  const [applyList, setApplyList] = useState([]);
  const [tabTwoFormData, setTabTwoFormData] = useState({});

  const contentList = {
    tab1: <OneTab fiveFormRef={fiveFormRef} setApplyList={setApplyList}/>,
    tab2: <TwoTab fiveFormRef={fiveFormRef} setTabTwoFormData={setTabTwoFormData} tabTwoFormData={tabTwoFormData}/>,
    tab3: <ThreeTab activeTabKey={activeTabKey}/>,
    tab4: <FourTab applyList={applyList}/>,
  };
  const onTab1Change = key => {
    setActiveTabKey(key);
  };
  useEffect(() => {
    if(activeTabKey === 'tab4') {
      setFiveNextBt(false);
    } else {
      setFiveNextBt(true);
    }
  },[activeTabKey]);

  useEffect(() =>{
    console.log(tabTwoFormData);
  },[tabTwoFormData])
  return (
    <Card
      // style={{minWidth:960,maxWidth:1200,height:556}}
      style={{width: '100%'}}
      title="增量数据导入"
      // extra={<a href="#">More</a>}
      tabList={tabList}
      tabProps={{
        destroyInactiveTabPane:false,
      }}
      activeTabKey={activeTabKey}
      onTabChange={key => {
        onTab1Change(key);
      }}
    >
      {contentList[activeTabKey]}
    </Card>
  );
};
