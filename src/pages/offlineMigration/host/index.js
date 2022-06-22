import { ExclamationCircleOutlined } from '@ant-design/icons';
import { StepsForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Divider, Form, message, Modal, Result } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { history, Prompt } from 'umi';
import FiveStep from './five-step';
import FourStep from './four-step';
import OneStep from './one-step';
import { createMigrationTask, getTemporaryMigrationTask, temporaryMigrationTask } from './service';
import SixStep from './six-step';
import styles from './style.less';
import ThreeStep from './three-step';
import TwoStep from './two-step';
// import FourStep from "@/pages/onlineMigration/components/fourStep";

const { confirm } = Modal;
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
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const StepForm = (props) => {
  const [stepData, setStepData] = useState({
    id1: '5001',
  });
  const [current, setCurrent] = useState(() => {
    const setNum = localStorage.getItem('hostStep');
    return setNum ? parseInt(setNum) : 0;
  }); //当前表单的步骤数，从 0 开始
  const [disabled, setDisabled] = useState(true);
  const [fourNextBt, setFourNextBt] = useState(true);
  const [fiveNextBt, setFiveNextBt] = useState(true);
  const [temporaryButton, setTemporaryButton] = useState(false);
  const [threeData, setData] = useState({}); //第三步的数据
  const [fourData, setFourData] = useState({}); //第四步的数据
  const [fiveData, setFiveData] = useState({}); //第五的数据
  const [isRunning, setIsRunning] = useState(true);
  const { host_id } = history?.location?.query;
  const [form] = Form.useForm();

  // useInterval(() => {
  //   getData();;
  // }, isRunning ? 5000 : null);

  useEffect(() => {
    getData();
    console.log(history.location.query.host_id);
  }, []);

  const formMapRef = useRef();
  const oneFormRef = useRef();
  const twoFormRef = useRef();
  const threeFormRef = useRef();
  const fourFormRef = useRef();
  const fiveFormRef = useRef();
  const sixFormRef = useRef();
  const changeCurrent = (val) => {
    setCurrent(val);
    localStorage.setItem('hostStep', val);
  };
  const getData = async () => {
    const taskId = localStorage.getItem('offlineTask_id') || '62972194759b7432c4000001';
    const res = await getTemporaryMigrationTask({ id: taskId });
    if (res.data.length) {
      const fourData = JSON.parse(res.data[0].sub_task[0].image_info);
      const fiveData = JSON.parse(res.data[0].sub_task[0].platform_info);
      // const fourState = res.data[0].sub_task[0].current_step;
      // const fourState = res.data[0].sub_task[0].current_step;
      console.log(fiveData);
      setData({ ...res.data[0] });
      setFourData({ ...fourData });
      setFiveData({ ...fiveData });
      //镜像上传中或者失败下一步不可点击
      if (fourData?.status === 'IMAGE_UPLOADING' || fourData?.status === 'IMAGE_UPLOAD_FAILED') {
        setFourNextBt(true);
      }
      if (fourData?.status === 'IMAGE_UPLOADED') {
        setFourNextBt(false);
      }
      // if(fourData.status === 'IMAGE_UPLOADED') {
      //   setIsRunning(false);
      // }
      // if(fourData.status === 'IMAGE_UPLOAD_FAILED') {
      //   console.log('上传失败');
      // }
      //虚拟机创建中或者失败下一步不可点击
      if (
        fiveData?.status === 'OPENSTACK_VM_CREATING' ||
        fiveData?.status === 'OPENSTACK_VM_CREATE_FAILED'
      ) {
        setFiveNextBt(true);
      }
      if (fiveData?.status === 'OPENSTACK_VM_CREATED') {
        setFiveNextBt(false);
      }
    }
  };
  const handleSubmitZanCun = async (props) => {
    const { step } = props;
    setTemporaryButton(true); //设置暂存按钮loading 避免多次提交
    const a = await waitTime(1000);
    if (a) setTemporaryButton(false); //1秒之后loading消失
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
      response = { ...res };
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
    if (response.code === 200) {
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
    const taskId = localStorage.getItem('offlineTask_id');
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
      obj.source_host_ids = host_id;
      const res = await createMigrationTask(obj);
      console.log(res);
    }
    props.onSubmit?.();
    // console.log(props.form.getFieldValue());
  };
  const ButtonArray = (props, disabled) => {
    return [
      <Button key="pre1" style={{ marginTop: 35 }} onClick={() => props.onPre?.()}>
        上一步
      </Button>,
      // <Button
      //   type="primary"
      //   style={{ marginTop: 35 }}
      //   key="goToTree"
      //   onClick={() => handleSubmitZanCun(props)}
      //   loading={temporaryButton}
      // >
      //   暂存
      // </Button>,
      <Button
        type="primary"
        style={{ marginTop: 35 }}
        key="goToTree3"
        onClick={() => handleSubmit(props)}
        disabled={disabled}
      >
        下一步
      </Button>,
    ];
  };
  const showConfirm = (props) => {
    confirm({
      title: '请确认',
      icon: <ExclamationCircleOutlined />,
      content: 'LiveCD是否已挂载到物理机?',
      onOk() {
        props.onSubmit?.();
      },
    });
  };
  const showTwoConfirm = (props) => {
    confirm({
      title: '是否创建任务?',
      icon: <ExclamationCircleOutlined />,
      content: '点击下一步，开始创建',
      onOk() {
        handleSubmit(props);
      },
    });
  };
  return (
    <PageContainer content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
      <Prompt
        message={(location) => {
          localStorage.removeItem('hostStep');
          localStorage.removeItem('offlineTask_id');
        }}
      />
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
                  <Button
                    style={{ marginTop: 35 }}
                    type="primary"
                    key="asd2123"
                    // onClick={() => props.onSubmit?.()}
                    onClick={() => showConfirm(props)}
                    disabled={host_id ? false : true}
                  >
                    下一步
                  </Button>,
                ];
              }
              if (props.step === 1) {
                return [
                  <Button key="pre1" style={{ marginTop: 35 }} onClick={() => props.onPre?.()}>
                    上一步
                  </Button>,
                  <Button
                    type="primary"
                    style={{ marginTop: 35 }}
                    key="goToTree3"
                    // onClick={() => handleSubmit(props)}
                    onClick={() => showTwoConfirm(props)}
                  >
                    下一步
                  </Button>,
                ];
              }
              if (props.step === 3) {
                return ButtonArray(props, fourNextBt);
              }
              if (props.step === 4) {
                return ButtonArray(props, fiveNextBt);
              }
              if (props.step < 6) {
                return [
                  <Button key="pre1" style={{ marginTop: 35 }} onClick={() => props.onPre?.()}>
                    上一步
                  </Button>,
                  // <Button
                  //   type="primary"
                  //   style={{ marginTop: 35 }}
                  //   key="goToTree"
                  //   onClick={() => handleSubmitZanCun(props)}
                  //   loading={temporaryButton}
                  // >
                  //   暂存
                  // </Button>,
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
            // initialValues={stepData}
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
            <TwoStep twoFormRef={twoFormRef} />
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
            <ThreeStep threeFormRef={threeFormRef} data={threeData} />
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
            <FourStep fourFormRef={fourFormRef} fourData={fourData} />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            title="第五步"
            formRef={fiveFormRef}
            layout="horizontal"
            // layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            stepProps={{
              description: '创建虚拟机',
            }}
            onFinish={async (values) => {
              // console.log(values);
              // setStepData(values);
              return true;
            }}
          >
            <FiveStep fiveFormRef={fiveFormRef} fiveData={fiveData} />
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
