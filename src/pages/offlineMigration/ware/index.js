import React, {useEffect, useRef, useState} from 'react';
import { Card, Result, Button, Divider, Modal, Form } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ProFormSwitch, ProFormText, StepsForm } from '@ant-design/pro-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import OneStep from './one-step';
import TwoStep from './two-step';
import ThreeStep from './three-step';
import FourStep from './four-step';
import styles from './style.less';
import {useHistory, Prompt, history} from "umi";
import {RouterPrompt} from '@/usehooks/RouterPrompt'
import {postCreateVmware} from "@/pages/offlineMigration/ware/service";

const StepResult = (props) => {
  const handleBlack = () => {
    props.onFinish();
    clearLocalStorage()
  }
  return (
    <Result
      status="success"
      title="迁移任务完成"
      subTitle="点击返回按钮，返回第一步"
      extra={
        <>
          <Button type="primary" onClick={handleBlack}>
            返回
          </Button>
        </>
      }
      className={styles.result}
    ></Result>
  );
};

const clearLocalStorage = () => {
  localStorage.removeItem('vmStep');
  localStorage.removeItem('vmTwoStepFormData');
  localStorage.removeItem('vmOneStepRowKeys');
  localStorage.removeItem('vmThreeVmData');
  localStorage.removeItem('vm_task_id');
};

const StepForm = (props) => {
  // 是否启用Prompt
  const [current, setCurrent] = useState(()=>{
    const setNum = localStorage.getItem('vmStep');
    return setNum ? parseInt(setNum) : 0;
  }); //当前表单的步骤数，从 0 开始
  const [disabled, setDisabled] = useState(true);
  const [threeNextBt, setThreeNextBt] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); //第一步：选择的虚拟机列表名称
  const history = useHistory();

  const [form] = Form.useForm();

  const formMapRef = useRef();
  const oneFormRef = useRef();
  const twoFormRef = useRef();
  const threeFormRef = useRef();
  const fourFormRef = useRef();
  const changeCurrent = (val) => {
    setCurrent(val);
    localStorage.setItem('vmStep',val);
    console.log(val);
  }
  const handleSubmitZanCun = (props) => {
    const { step, form } = props;
    if (step === 0) {
      console.log('这是第一步', oneFormRef.current.getFieldValue());
    }
    if (step === 1) {
      console.log('这是第二步', twoFormRef?.current?.getFieldsFormatValue());
      console.log(twoFormRef?.current?.getFieldsFormatValue().datetime);
    }
    if (step === 2) {
      console.log('这是第三步', threeFormRef?.current?.getFieldValue());
    }
    if (step === 3) {
      console.log('这是第四步', fourFormRef?.current?.getFieldValue());
    }
    if (step === 4) {
      console.log('这是第五步', fiveFormRef?.current?.getFieldValue());
    }
    if (step === 5) {
      console.log('这是第六步', sixFormRef?.current?.getFieldValue());
    }
    // console.log(form);

    // console.log(formRef.current.getFieldValue());
  };

  const handleNextState = () => {
    setDisabled(false);
  };
  const handleSubmit = async (props) => {
    // console.log(formMapRef.current);
    // console.log(props.form.getFieldValue());
    let Arr = [];
    formMapRef.current.forEach((item) => {
      // console.log(item.current.getFieldValue());
      Arr.push({
        ...item.current.getFieldValue(),
      });
    });
    let obj = {};
    for (let i of Arr) {
      for (let j in i) {
        obj[j] = i[j];
      }
    }
    console.log(obj);
    if (props.step === 1) {
      const obj = await twoFormRef?.current?.validateFieldsReturnFormatValue();
      console.log(obj);
      localStorage.setItem('vmTwoStepFormData',JSON.stringify(obj));
      // return false;
    }
    if(props.step === 2) {
      const {platform_id} = history?.location?.query;
      const {name, target_platform_id} = JSON.parse(localStorage.getItem('vmTwoStepFormData'));
      const vm_infos = JSON.parse(localStorage.getItem('vmThreeVmData'));
      let obj = {
        name,
        target_platform_id,
        source_platform_id:platform_id,
        vm_infos:vm_infos
      }
      const {code,data:{task_id}} = await postCreateVmware(obj);
      if(code === 200) {
        // props.onSubmit?.();
        localStorage.setItem('vm_task_id',task_id);
      } else {
        return false;
      }
    }
    props.onSubmit?.();
    // console.log(props.form.getFieldValue());
  };
  //第一步方法：控制下一步按钮和存储选择的虚拟机
  const onChangeDisabled = (par,selectedRowKeys) => {
    setSelectedRowKeys([...selectedRowKeys])
    setDisabled(par)
  }
  const ButtonArray = (props,disabled) => {
    return [
      <Button key="pre1" style={{ marginTop: 35 }} onClick={() => props.onPre?.()}>
        上一步
      </Button>,
      <Button
        type="primary"
        style={{ marginTop: 35 }}
        key="goToTree3"
        onClick={() => handleSubmit(props)}
        disabled={disabled}
      >
        下一步
      </Button>,
    ]
  }

  return (
    <PageContainer content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
      {/*<RouterPrompt*/}
      {/*  when={true}*/}
      {/*  title="是否要离开页面？"*/}
      {/*  onOK={() => true}*/}
      {/*  clearLocalStorage={clearLocalStorage}*/}
      {/*  onCancel={() => false}*/}
      {/*/>*/}
      <Prompt
        message={(location) => {
          clearLocalStorage()
        }}
      />
      <Card bordered={false} className={styles.spacrFrom}>
        <StepsForm
          formMapRef={formMapRef}
          current={current}
          form={form}
          onCurrentChange={changeCurrent} //current 发生改变的事件
          submitter={{
            //提交按钮相关配置
            render: (props, dom) => {
              if (props.step === 0) {
                return [
                  <Button
                    style={{ marginTop: 35 }}
                    type="primary"
                    key="asd2123"
                    onClick={() => props.onSubmit?.()}
                    disabled={disabled}
                  >
                    下一步
                  </Button>,
                ];
              }
              if (props.step === 2) {
                return ButtonArray(props,threeNextBt)
              }
              if (props.step === 3 || props.step === 1) {
                return ButtonArray(props,false)
              }
              if (props.step === 4) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm
            formRef={oneFormRef}
            title="第一步"
            stepProps={{
              description: '主机列表',
            }}
            layout="horizontal"
          >
            <OneStep
              oneFormRef={oneFormRef}
              handleNextState={handleNextState}
              onChangeDisabled={onChangeDisabled}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            formRef={twoFormRef}
            title="第二步"
            name="two"
            stepProps={{
              description: '创建任务',
            }}
            // labelCol={{span: 6}}
            // wrapperCol={{span: 18}}
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <TwoStep
              twoFormRef={twoFormRef}
              selectedRowKeys={selectedRowKeys}
              current={current}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="第三步"
            formRef={threeFormRef}
            stepProps={{
              description: '汇总信息',
            }}
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <ThreeStep
              threeFormRef={threeFormRef}
              selectedRowKeys={selectedRowKeys}
              setThreeNextBt={setThreeNextBt}
              current={current}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="第四步"
            formRef={fourFormRef}
            stepProps={{
              description: '任务日志',
            }}
            layout="horizontal"
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <FourStep fourFormRef={fourFormRef} current={current}/>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="完成">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                // formMapRef.current?.resetFields();
                oneFormRef.current?.resetFields();
                return true;
              }}
            >
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider
          style={{
            margin: '40px 0 24px',
          }}
        />
        <div className={styles.desc}>
          <h3>温馨提示</h3>
          <p>1. livecd挂载到物理主机，启动之后再点击下一步</p>
          <p>2. 点击下一步时，服务端会检测livecd是否挂载成功，心跳机制</p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default StepForm;
