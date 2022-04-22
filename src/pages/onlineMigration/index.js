import React, { useRef, useState } from 'react';
import { Card, Result, Button, Divider, message, Form } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {ProFormSwitch, ProFormText, StepsForm} from '@ant-design/pro-form';
// import OneStep from "@/pages/onlineMigration/components/oneStep";
import OneStep from './components/oneStep';
import TwoStep from './components/twoStep';
import ThreeStep from './components/threeStep';
import FourStep from './components/fourStep';
import styles from './style.less';
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

const StepForm = () => {
  const [stepData, setStepData] = useState({
    id1: '5001',
  });
  const [current, setCurrent] = useState(3); //当前表单的步骤数，从 0 开始
  const [form] = Form.useForm();

  const formMapRef = useRef();
  const oneFormRef = useRef();
  const twoFormRef = useRef();
  const threeFormRef = useRef();
  const fourFormRef = useRef();
  const fiveFormRef = useRef();

  const handleSubmitZanCun = (props) => {
    const { step, form } = props;
    if (step === 0) {
      console.log('这是第一步', oneFormRef.current.getFieldValue());
    }
    if (step === 1) {
      console.log('这是第二步', twoFormRef?.current?.getFieldValue());
    }
    if (step === 2) {
      console.log('这是第三步', threeFormRef?.current?.getFieldValue());
    }
    if (step === 3) {
      console.log('这是第四步', fourFormRef?.current?.getFieldValue());
    }
    // console.log(form);

    // console.log(formRef.current.getFieldValue());
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
    props.onSubmit?.();
    // console.log(props.form.getFieldValue());
  };
  return (
    <PageContainer content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
      <Card bordered={false} className={styles.spacrFrom}>
        <StepsForm
          formMapRef={formMapRef}
          current={current}
          form={form}
          onCurrentChange={setCurrent} //current 发生改变的事件
          // onFinish={async (values) => {
          //   console.log(values);
          //   await waitTime(1000);
          //   message.success('提交成功');
          // }}
          submitter={{
            //提交按钮相关配置
            render: (props, dom) => {
              if (props.step === 0) {
                return (
                  [
                    <Button type="primary" key="goToTree33" onClick={() => handleSubmitZanCun(props)}>
                      暂存
                    </Button>,
                    <Button type="primary" key="asd2123" onClick={() => props.onSubmit?.()}>
                    下一步
                  </Button>
                  ]
                );
              }
              if (props.step < 5) {
                return [
                  <Button key="pre1" onClick={() => props.onPre?.()}>
                    上一步
                  </Button>,
                  <Button type="primary" key="goToTree" onClick={() => handleSubmitZanCun(props)}>
                    暂存
                  </Button>,
                  // <Button type="primary" key="goToTree3" onClick={() => handleSubmit2(props)}>
                  <Button type="primary" key="goToTree3" onClick={() => handleSubmit(props)}>
                    下一步
                  </Button>,
                ];
              }
              // if (props.step < 2) {
              //   return [
              //     <Button key="pre1" onClick={() => props.onPre?.()}>
              //       上一步
              //     </Button>,
              //     <Button type="primary" key="goToTree" onClick={() => handleSubmit(props)}>
              //       暂存
              //     </Button>,
              //     <Button type="primary" key="goToTree3" onClick={() => props.onSubmit?.()}>
              //       下一步
              //     </Button>,
              //   ];
              // }
              if (props.step === 5) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm
            formRef={oneFormRef}
            title="第一步"
            layout="horizontal"
            name={'one'}
            stepProps={{
              description: '基础配置信息',
            }}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={stepData}
            onFinish={async (values) => {
              console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <OneStep />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            formRef={twoFormRef}
            title="第二步"
            layout="horizontal"
            name="two"
            stepProps={{
              description: '源主机诊断',
            }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <TwoStep />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="第三步"
            formRef={threeFormRef}
            stepProps={{
              description: '目标主机LiveCD',
            }}
            // layout="horizontal"
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <ThreeStep />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="第四步"
            formRef={fourFormRef}
            stepProps={{
              description: '信息校验',
            }}
            // layout="horizontal"
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <FourStep />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            title="第五步"
            formRef={fiveFormRef}
            stepProps={{
              description: '增量数据迁移',
            }}
            // layout="horizontal"
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <FourStep />
          </StepsForm.StepForm>

          {/*<StepsForm.StepForm*/}
          {/*  title="第四步"*/}
          {/*  // formRef={twoFormRef}*/}
          {/*  stepProps={{*/}
          {/*    description: '源主机诊断',*/}
          {/*  }}*/}
          {/*  onFinish={async (values) => {*/}
          {/*    // console.log(values);*/}
          {/*    // setStepData(values);*/}
          {/*    return true;*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <ProFormText width="sm" name="id2" label="主合同编号2" />*/}
          {/*</StepsForm.StepForm>*/}

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
          {/*<h4>转账到支付宝账户</h4>*/}
          <p>1. 输入源主机信息和目标系统信息，并且校验通过才能进行下一步。</p>
          {/*<h4>转账到银行卡</h4>*/}
          <p>2. 本页面仅适用于离线迁移方案，暂不适用于在线迁移。</p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default StepForm;
