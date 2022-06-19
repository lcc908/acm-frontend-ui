import React, {useEffect, useState, useRef} from 'react';
import {Button, message} from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import {getPermission, getHostData} from "@/pages/authority/platform-permissions/service";
// import {getHostData} from "@/pages/authority/platform-permissions/service";
// const waitTime = (time) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };

export default (props) => {
  const {modalVisit, closeModal, clickId, addCheck, handleOk, platform_type} = props;
  const [fromVisit, setFromVisit] = useState(false)
  const [selectList, setSelectList] = useState([])
  const [hostList, setHostList] = useState([])
  const formRef = useRef();
  const handleChangeValue = (value) => {
    console.log(value);
    if (platform_type === 'physical_host') {
      getHostList(value);
    }
    // if(value === '2') {
    //   setFromVisit(true)
    // } else {
    //   setFromVisit(false)
    // }
  }
  const request = async (params) => {
    const {data} = await getPermission({platform_type});
    const arr = data.map(item => {
      return {label: item.platform_name, value: item.id}
    });
    arr.push({value: '2', label: '自定义'});
    console.log(arr);
    if (platform_type === 'physical_host') {
      getHostList(arr[0].value);
      formRef?.current?.setFieldsValue({
        typePlaList: arr[0].value,
      });
    } else {
      formRef?.current?.setFieldsValue({
        typeList: arr[0].value,
      });
    }
    return arr;
  };
  const getHostList = async (host_id) => {
    const {data} = await getHostData({platform_id: host_id})
    const arr = data.map(item => {
      return {label: item.ip_address, value: item.id}
    });
    setHostList([...arr]);
    return arr;
  }
  useEffect(() => {
    console.log(selectList);
  }, [selectList]);
  const title = platform_type === 'physical_host' ? "源平台" : "源平台认证";
  return (
    <ModalForm
      title={title}
      visible={modalVisit}
      autoFocusFirstInput
      formRef={formRef}
      modalProps={{
        onCancel: () => closeModal(),
        destroyOnClose: true
      }}
      // onValuesChange={(changeValues) => handleChangeValue(changeValues)}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values);
        const {typeList} = values;
        // message.success('提交成功');
        addCheck(clickId, {id: typeList});
        handleOk()
        return true;
      }}
    >
      {
        platform_type === 'physical_host' ? (
          <>
            <ProFormSelect
              name="typePlaList"
              label="物理机平台列表"
              request={request}
              onChange={(changeValues) => handleChangeValue(changeValues)}
              rules={[{ required: true}]}
            />
            <ProFormSelect
              name="typeList"
              label="主机列表"
              // initialValue={hostList[0]}
              options={hostList}
              onChange={(changeValues) => handleChangeValue(changeValues)}
              rules={[{ required: true}]}
            />
          </>
        ) : (
          <ProFormSelect
            name="typeList"
            label="权限列表"
            request={request}
            // options={[
            //   { value: '1', label: '1' },
            //   { value: '2', label: '自定义' },
            // ]}
            // initialValue={'629db04f99387effeb02b325'}
            onChange={(changeValues) => handleChangeValue(changeValues)}
            rules={[{ required: true}]}
          />
        )
      }
      {/*<ProFormSelect*/}
      {/*  name="typeList"*/}
      {/*  label="权限列表"*/}
      {/*  request={request}*/}
      {/*  // options={[*/}
      {/*  //   { value: '1', label: '1' },*/}
      {/*  //   { value: '2', label: '自定义' },*/}
      {/*  // ]}*/}
      {/*  // initialValue={'629db04f99387effeb02b325'}*/}
      {/*  onChange={(changeValues) => handleChangeValue(changeValues)}*/}
      {/*/>*/}
      {
        fromVisit ? (
          <>
            <ProFormSelect
              name="vs"
              label="vSphere版本"
              options={[
                {value: '1', label: '1'},
                {value: '2', label: '自定义'},
              ]}
            />
            <ProFormText name="ip" label="ip地址"/>
            <ProFormText name="name" label="用户名"/>
            <ProFormText.Password name="password" label="密码"/>
            <ProFormText name="Datastore" label="Datastore"/>
          </>
        ) : null
      }
      {/*<ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目"/>*/}
      {/*<ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途"/>*/}
    </ModalForm>
  );
};
