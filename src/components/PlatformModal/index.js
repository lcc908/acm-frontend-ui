import React, {useState} from 'react';
import {Button, message} from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';

const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const {modalVisit,closeModal,clickId,addCheck,handleOk} = props;
  const [fromVisit,setFromVisit] = useState(false)
  const handleChangeValue = (value) => {
    if(value === '2') {
      setFromVisit(true)
    } else {
      setFromVisit(false)
    }
  }
  return (
    <ModalForm
      title="源平台认证"
      visible={modalVisit}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => closeModal(),
      }}
      // onValuesChange={(changeValues) => handleChangeValue(changeValues)}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        addCheck(clickId);
        handleOk()
        return true;
      }}
    >
      <ProFormSelect
        name="typeList"
        label="权限列表"
        options={[
          { value: '1', label: '1' },
          { value: '2', label: '自定义' },
        ]}
        onChange={(changeValues) => handleChangeValue(changeValues)}
      />
      {
        fromVisit ? (
          <>
            <ProFormSelect
              name="vs"
              label="vSphere版本"
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '自定义' },
              ]}
            />
            <ProFormText name="ip" label="ip地址" />
            <ProFormText name="name" label="用户名" />
            <ProFormText.Password name="password" label="密码" />
            <ProFormText name="Datastore" label="Datastore" />
          </>
        ) : null
      }
      {/*<ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目"/>*/}
      {/*<ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途"/>*/}
    </ModalForm>
  );
};
