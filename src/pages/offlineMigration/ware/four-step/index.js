import React, {useEffect, useRef, useState} from 'react';
import {Collapse, Spin, Button, Select, Empty} from 'antd';
import ProForm, {
  ProFormSelect,
} from '@ant-design/pro-form';
import {LoadingOutlined, CloseCircleTwoTone, CheckCircleTwoTone} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card'
import {postVmwareLog, postVmwareTaskRetr} from "@/pages/offlineMigration/ware/service";

const {Panel} = Collapse;
const {Option} = Select;

export default (props) => {
  const {fourFormRef, current} = props;
  const task_id = localStorage.getItem('vm_task_id');
  const [vmNameList, setVmNameList] = useState([]);
  const [vmtaskId, setVmtaskId] = useState([]);
  const [selectVal, setSelectVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [logData, setLogData] = useState({});
  const [allData, setAllData] = useState({});
  const genExtra = (data) => {
    if (data === 1) {
      return <LoadingOutlined
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    }
    if (data === "failed") {
      return (
        <CloseCircleTwoTone
          twoToneColor="#ff4d4f"
          onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
          }}
        />
      )
    }
    return (
      <CheckCircleTwoTone
        twoToneColor="#52c41a"
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    )
  };
  useEffect(() => {
    if (task_id) {
      console.log(1);
      getData()
    }
  }, [current])

  const getData = async () => {
    setLoading(true)
    const {data: {log_info}} = await postVmwareLog({
      migration_batch_task_id: task_id
      // migration_batch_task_id: "629ef4f055e4720a23000003"
    });
    if (Object.getOwnPropertyNames(log_info).length !== 0) {
      let vm_name_list = [];
      for (let i in log_info) {
        vm_name_list.push({
          label: i,
          value: log_info[i].task_id
        });
      }
      setVmNameList([...vm_name_list])
      if(vm_name_list.length) {
        setVmtaskId(vm_name_list[0].value);
      }
      setAllData({...log_info});
      if (selectVal) {
        setLogData({...log_info[selectVal]})
      } else {
        setLogData({...log_info[vm_name_list[0].label]});
        // fourFormRef.
        fourFormRef?.current?.setFieldsValue({
          useMode: vm_name_list[0].value
        });
      }
    }
    setLoading(false)
  }
  useEffect(() => {
    console.log(vmNameList);
    if (vmNameList.length) {
      console.log(vmNameList[0].value);
    }
  }, [vmNameList])

  const handleRender = () => {
    getData();
  }
  const handleReload = async () => {
    const res = await postVmwareTaskRetr({migration_task_id: vmtaskId});
    console.log(res);
  }
  const handleChange = (val, option) => {
    setSelectVal(option.label);
    setVmtaskId(val)
    setLogData({...allData[option.label]})
  }
  return (
    <Spin spinning={loading}>
      <ProCard
        title="任务日志"
        headerBordered
        bordered
      >
        <ProForm.Group>
          {
            vmNameList.length > 0 ? (
                <ProFormSelect
                  width="md"
                  // initialValue={vmNameList[0].value}
                  options={vmNameList}
                  name="useMode"
                  label="vmName"
                  addonAfter={
                    <Button type="primary" onClick={handleRender}>更新</Button>
                  }
                  fieldProps={{
                    onChange: handleChange,
                  }}
                />
              ) :
              <ProFormSelect
                width="md"
                options={[]}
                name="useMode"
                label="vmName"
                addonAfter={
                  <Button type="primary" onClick={handleRender}>更新</Button>
                }
                fieldProps={{
                  onChange: setSelectVal
                }}
              />
          }
          <Button type="primary" onClick={handleReload}>任务重试</Button>
        </ProForm.Group>
        {
          logData.logs ? logData.logs.map((item, index) => {
            return (
              <Collapse>
                <Panel header={item.step} key={index} extra={genExtra(item.result)}>
                  <p>{item.message}</p>
                </Panel>
              </Collapse>
              )
            })
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
      </ProCard>
    </Spin>
  );
};
