import React, {useRef, useState} from 'react';
import {Card, Result, Button, Divider, message, Form} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import {ProFormSwitch, ProFormText, StepsForm} from '@ant-design/pro-form';
// import OneStep from "@/pages/onlineMigration/components/oneStep";
import OneStep from './one-step';
import TwoStep from './two-step';
import ThreeStep from './three-step';
import FourStep from './four-step';
import FiveStep from './five-step';
import styles from './style.less';
import {postHotMigration,postGenerateData} from "@/pages/onlineMigration/service";
import {Prompt} from "umi";
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
  // const [current, setCurrent] = useState(4); //当前表单的步骤数，从 0 开始
  // const [current, setCurrent] = useState(4); //当前表单的步骤数，从 0 开始
  const [current, setCurrent] = useState(()=>{
    const setNum = localStorage.getItem('onlineStep');
    // return setNum ? parseInt(setNum) : 3;
    return 3;
  }); //当前表单的步骤数，从 0 开始
  const [twoNextBt, setTwoNextBt] = useState(true); //当前表单的步骤数，从 0 开始
  const [oneDisabled, setOneDisabled] = useState(()=>{
    const data = JSON.parse(localStorage.getItem('onlineOne'));
    if(data) {
      return false
    }
    return true
  }); //当前表单的步骤数，从 0 开始
  const [form] = Form.useForm();

  const formMapRef = useRef();
  const oneFormRef = useRef();
  const twoFormRef = useRef();
  const threeFormRef = useRef();
  const fourFormRef = useRef();
  const fiveFormRef = useRef();

  const handleSubmitZanCun = (props) => {
    const {step, form} = props;
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
    if (step === 4) {
      console.log('这是第五步', fiveFormRef?.current?.getFieldValue());
    }
    // console.log(form);

    // console.log(formRef.current.getFieldValue());
  };

  const handleSubmit = async (props) => {
    // console.log(formMapRef.current);
    // console.log(props.form.getFieldValue());
    const { step } = props;
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
    // console.log(obj);
    if(step === 0) {
      const obj = await oneFormRef?.current?.validateFieldsReturnFormatValue();
      console.log(obj);
      obj.extra = {
        typeList: obj.typeList,
      }
      delete obj.machine_type1;
      delete obj.method;
      delete obj.encrypt;
      delete obj.typeList;
      obj.extra = JSON.stringify(obj.extra);
      const res = await postHotMigration(obj);
      if(res.code !== 200) {
        return false;
      }
      localStorage.setItem('onlineTask_id',res.data.id)
    }
    if(step === 2) {
      const val = await threeFormRef?.current?.validateFieldsReturnFormatValue();
      // val.task_id = localStorage.getItem('onlineTask_id')
      val.task_id = localStorage.getItem('onlineTask_id')
      val.host = {
        host_name:val.host_name,
        image_name:val.image_name,
        account:val.account,
        network_name:val.network_name,
        source_host_id:val.source_host_id,
      }
      for(let i in val) {
        if(val.host &&　val.host[i]) {
          delete val[i]
        }
      }
      const res = await postGenerateData(val);
      console.log(res);
      if(res.code !== 200) {
        return false;
      }
    }
    props.onSubmit?.();
  };
  const oneNextButtonState = (par) => {
    setOneDisabled(par);
  }
  const ButtonArray = (props,disabled) => {
    return [
      <Button key="pre1" style={{marginTop:35}} onClick={() => props.onPre?.()}>
        上一步
      </Button>,
      <Button type="primary" style={{marginTop:35}} key="goToTree" onClick={() => handleSubmitZanCun(props)}>
        暂存
      </Button>,
      // <Button type="primary" key="goToTree3" onClick={() => handleSubmit2(props)}>
      <Button disabled={disabled} type="primary" style={{marginTop:35}} key="goToTree3" onClick={() => handleSubmit(props)}>
        下一步
      </Button>,
    ]
  }
  const changeCurrent = (val) => {
    setCurrent(val);
    localStorage.setItem('onlineStep',val);
  }
  return (
    <PageContainer content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
      <Prompt message={(location) => {
        localStorage.removeItem('onlineStep');
        localStorage.removeItem('onlineTask_id');
        localStorage.removeItem('onlineOne');
        localStorage.removeItem('installAgentID');
      }} />
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
                return (
                  [
                    <Button disabled={oneDisabled} style={{marginTop:35}} type="primary" key="2" onClick={() => handleSubmit(props)}>
                      下一步
                    </Button>
                  ]
                );
              }
              if(props.step === 1) {
                return ButtonArray(props,twoNextBt)
              }
              if (props.step < 5) {
                return [
                  <Button key="pre1" style={{marginTop:35}} onClick={() => props.onPre?.()}>
                    上一步
                  </Button>,
                  <Button type="primary" style={{marginTop:35}} key="goToTree" onClick={() => handleSubmitZanCun(props)}>
                    暂存
                  </Button>,
                  // <Button type="primary" key="goToTree3" onClick={() => handleSubmit2(props)}>
                  <Button type="primary" style={{marginTop:35}} key="goToTree3" onClick={() => handleSubmit(props)}>
                    下一步
                  </Button>,
                ];
              }
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
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            initialValues={stepData}
            onFinish={async (values) => {
              console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <OneStep
              oneFormRef={oneFormRef}
              setOneDisabled={oneNextButtonState}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            formRef={twoFormRef}
            title="第二步"
            layout="horizontal"
            name="two"
            stepProps={{
              description: '源主机诊断',
            }}
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <TwoStep
              twoFormRef={twoFormRef}
              setTwoNextBt={setTwoNextBt}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="第三步"
            formRef={threeFormRef}
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            stepProps={{
              description: '创建任务',
            }}
            // layout="horizontal"
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <ThreeStep
              threeFormRef={threeFormRef}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="第四步"
            formRef={fourFormRef}
            stepProps={{
              description: '任务执行',
            }}
            // layout="horizontal"
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <FourStep/>
          </StepsForm.StepForm>

          <StepsForm.StepForm
            title="第五步"
            formRef={fiveFormRef}
            // layout="horizontal"
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 20 }}
            stepProps={{
              description: '增量数据迁移',
            }}
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <FiveStep fiveFormRef={fiveFormRef}/>
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
