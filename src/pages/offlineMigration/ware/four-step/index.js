import React, {useEffect, useRef, useState} from 'react';
import {Collapse ,Spin , Button} from 'antd';
import ProForm,{
  ProFormSelect,
} from '@ant-design/pro-form';
import { LoadingOutlined,CloseCircleTwoTone,CheckCircleTwoTone } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card'
import {postVmwareLog} from "@/pages/offlineMigration/ware/service";

const { Panel } = Collapse;

export default (props) => {
  const { fourFormRef, form, current } = props;
  const task_id = localStorage.getItem('vm_task_id');
  const [vmNameList,setVmNameList] = useState([]);
  const [selectVal,setSelectVal] = useState('');
  const [loading,setLoading] = useState(false);
  const [logData,setLogData] = useState({});
  const callback = (key) => {
    // console.log(key);
  }
  const genExtra = (data) => {
    if(data === 1) {
      return <LoadingOutlined
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    }
    if(data === 2) {
      return <CloseCircleTwoTone twoToneColor="#ff4d4f"
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    }
    return <CheckCircleTwoTone twoToneColor="#52c41a"
      onClick={event => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  };
  useEffect(() => {
    if(task_id) {
      getData()
    }
  },[current])
  const getData = async () => {
    setLoading(true)
    const {code,data:{log_info}} = await postVmwareLog({
      migration_batch_task_id:"629ef4f055e4720a23000003"
    });
    // vmNameList
    // console.log(log_info["suse12-sp4-node2"]);
    let vm_name_list = [];
    for (let i in log_info) {
      vm_name_list.push({
        label:i,
        value:i
      });
    }
    setLoading(false)
    setVmNameList([...vm_name_list])
    if(selectVal) {
      setLogData({...log_info[selectVal]})
    } else {
      setLogData({...log_info[vm_name_list[0].value]})
    }
  }
  useEffect(() => {
    console.log(logData);
  },[logData])

  const handleRender = () => {
    getData();
  }
  // const handleChange = (val) => {
  //   console.log(val);
  //   setSelectVal()
  // }
  return (
    <Spin spinning={loading}>
      <ProCard
        title="任务日志"
        headerBordered
        bordered
      >
        <ProForm.Group>
          {
            vmNameList.length &&　(
              <ProFormSelect
                width="md"
                // fieldProps={{
                //   labelInValue: true,
                // }}
                initialValue={vmNameList[0].value}
                options={vmNameList}
                name="useMode"
                label="vmName"
                addonAfter={
                  <Button type="primary" onClick={handleRender}>更新</Button>
                }
                fieldProps={{
                  onChange:setSelectVal
                }}
              />
            )
          }
        </ProForm.Group>
        <Collapse onChange={callback}>
          {
            logData.logs && logData.logs.map((item,index) => {
              return (
                <Panel header={item.step} key={index} extra={genExtra(3)}>
                  <p>{item.message}</p>
                </Panel>
              )
            })
          }
          {/*<Panel header="This is panel header 2" key="2" extra={genExtra(2)}>*/}
          {/*  <p>{text}</p>*/}
          {/*</Panel>*/}
          {/*<Panel header="This is panel header 3" key="3" extra={genExtra(3)}>*/}
          {/*  <p>{text}</p>*/}
          {/*</Panel>*/}
        </Collapse>
      </ProCard>
    </Spin>
  );
};
