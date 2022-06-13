import React, {useEffect, useRef, useState} from 'react';
import { Card, Result, Button, Divider, message, Form } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ProFormSwitch, ProFormText, StepsForm } from '@ant-design/pro-form';
import OneStep from './one-step';
import TwoStep from './two-step';
import ThreeStep from './three-step';
import FourStep from './four-step';
import FiveStep from './five-step';
import SixStep from './six-step';
import styles from './style.less';
import { history,Prompt } from 'umi';
import {temporaryMigrationTask} from './service'
// import FourStep from "@/pages/onlineMigration/components/fourStep";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const StepResult = (props) => {
  return (
    <Result
      status="success"
      title="流程结束"
      subTitle="。。。"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            返回
          </Button>
        </>
      }
      className={styles.result}
    ></Result>
  );
};

const StepForm = (props) => {
  const [stepData, setStepData] = useState({
    id1: '5001',
  });
  const [current, setCurrent] = useState(()=>{
    const setNum = localStorage.getItem('offset');
    return setNum ? parseInt(setNum) : 0;
  }); //当前表单的步骤数，从 0 开始
  const [disabled, setDisabled] = useState(true);
  const [temporaryButton, setTemporaryButton] = useState(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    console.log(history);
  },[])
  const formMapRef = useRef();
  const oneFormRef = useRef();
  const twoFormRef = useRef();
  const threeFormRef = useRef();
  const fourFormRef = useRef();
  const fiveFormRef = useRef();
  const sixFormRef = useRef();
  const changeCurrent = (val) => {
    setCurrent(val);
    localStorage.setItem('offset',val);
  }

  const handleSubmitZanCun = async (props) => {
    const { step } = props;
    setTemporaryButton(true); //设置暂存按钮loading 避免多次提交
    const a = await waitTime(1000);
    if(a) setTemporaryButton(false); //1秒之后loading消失
    let response = {};
    if (step === 0) {
      console.log('这是第一步', oneFormRef.current.getFieldValue());
    }
    if (step === 1) {
      // console.log('这是第二步', twoFormRef?.current?.validateFields());
      const obj = await twoFormRef?.current?.validateFieldsReturnFormatValue();
      setTemporaryButton(false);
      console.log(obj);
      obj.source_host_ids = '629743c71e90bc07b4000001'; //临时写死
      obj.migration_method = 'block';
      obj.migration_type = 'offline';
      obj.migration_category = 'full';
      const res = await temporaryMigrationTask(obj);
      response = {...res};
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
    if(response.code === 200) {
      message.success('暂存成功');
    }
    // console.log(form);

    // console.log(formRef.current.getFieldValue());
  };

  const handleNextState = () => {
    setDisabled(false);
  };
  const handleSubmit = async (props) => {
    const { step } = props;
    const taskId = localStorage.getItem('offlineTask_id')
    console.log(step);
    // console.log(formMapRef.current);
    // console.log(props.form.getFieldValue());
    let Arr = [];
    formMapRef.current.forEach((item) => {
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
    // console.log(props.step);
    if (step === 1) {
      // console.log('这是第二步', twoFormRef?.current?.validateFields());
      const obj = await twoFormRef?.current?.validateFieldsReturnFormatValue();
      obj.migration_method = 'block';
      obj.migration_type = 'offline';
      obj.migration_category = 'full';
      obj.migration_status = 'RUNNING';
      obj.id = taskId;
      const res = await temporaryMigrationTask(obj);
      console.log(res);
    }
    props.onSubmit?.();
    // console.log(props.form.getFieldValue());
  };
  return (
    <PageContainer content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
      <Prompt message={(location) => {
        localStorage.removeItem('offset')
      }}  />
      <Card bordered={false} className={styles.spacrFrom}>
        <StepsForm
          formMapRef={formMapRef}
          current={current}
          form={form}
          onCurrentChange={changeCurrent} //current 发生改变的事件
          // onFinish={async (values) => {
          //   console.log(values);
          //   await waitTime(1000);
          //   message.success('提交成功');
          // }}
          submitter={{
            //提交按钮相关配置
            render: (props, dom) => {
              if (props.step === 0) {
                return [
                  // <Button
                  //   style={{ marginTop: 35 }}
                  //   type="primary"
                  //   key="goToTree33"
                  //   onClick={() => handleSubmitZanCun(props)}
                  // >
                  //   暂存
                  // </Button>,
                  // <Button disabled={disabled} style={{marginTop:35}} type="primary" key="asd2123" onClick={() => props.onSubmit?.()}>
                  <Button
                    style={{ marginTop: 35 }}
                    type="primary"
                    key="asd2123"
                    onClick={() => props.onSubmit?.()}
                  >
                    下一步
                  </Button>,
                ];
              }
              if (props.step < 6) {
                return [
                  <Button key="pre1" style={{ marginTop: 35 }} onClick={() => props.onPre?.()}>
                    上一步
                  </Button>,
                  <Button
                    type="primary"
                    style={{ marginTop: 35 }}
                    key="goToTree"
                    onClick={() => handleSubmitZanCun(props)}
                    loading={temporaryButton}
                  >
                    暂存
                  </Button>,
                  // <Button disabled={disabled} type="primary" style={{marginTop:35}} key="goToTree3" onClick={() => handleSubmit(props)}>
                  <Button
                    type="primary"
                    style={{ marginTop: 35 }}
                    key="goToTree3"
                    onClick={() => handleSubmit(props)}
                  >
                    下一步
                  </Button>,
                ];
              }
              if (props.step === 6) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm
            formRef={oneFormRef}
            title="第一步"
            // layout="horizontal"
            name={'one'}
            stepProps={{
              description: 'LiveCD制作与挂载',
            }}
            // labelCol={{span: 4}}
            // wrapperCol={{span: 18}}
            initialValues={stepData}
            onFinish={async (values) => {
              console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <OneStep oneFormRef={oneFormRef} handleNextState={handleNextState} />
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
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="第三步"
            formRef={threeFormRef}
            stepProps={{
              description: '数据迁移',
            }}
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <ThreeStep threeFormRef={threeFormRef} />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="第四步"
            formRef={fourFormRef}
            stepProps={{
              description: '上传镜像',
            }}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            layout="horizontal"
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <FourStep fourFormRef={fourFormRef} />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            title="第五步"
            formRef={fiveFormRef}
            layout="horizontal"
            // layout="horizontal"
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 20 }}
            stepProps={{
              description: '创建虚拟机',
            }}
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <FiveStep fiveFormRef={fiveFormRef} />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            title="第六步"
            formRef={sixFormRef}
            stepProps={{
              description: '应用切换',
            }}
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <SixStep sixFormRef={sixFormRef} />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="完成">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                console.log(1);
                // formMapRef.current?.resetFields();
                oneFormRef.current?.resetFields();
                return true;
              }}
            >
              {/*<StepDescriptions stepData={stepData} />*/}
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
