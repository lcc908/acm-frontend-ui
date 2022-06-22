import React, {useEffect, useRef, useState} from 'react';
import {Card, Row, Col, Descriptions, Divider, message, Form, Timeline, Button, Progress} from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormSwitch, ProFormUploadButton,
} from '@ant-design/pro-form';
import styles from '../style.less';
import ProCard from '@ant-design/pro-card';
import {postOpenstackImg,getTemporaryMigrationTask} from "@/pages/offlineMigration/host/service";
export default (props) => {
  const { fourFormRef, fourData } = props;
  const rules = [{ required: true}];
  const [updateState,setUpdateState] = useState({}); //上传状态

  useEffect(() => {
    if(fourData) {
      fourFormRef?.current?.setFieldsValue({
        ...fourData
      });
      if(fourData.status === "IMAGE_UPLOADED") {
        // message.success("上传成功！")
      }
      setUpdateState(fourData.status)
    }

  },[fourData])

  const handleClick = async () => {
    console.log('这是第四步', fourFormRef?.current?.getFieldValue());
    const val = fourFormRef?.current?.getFieldValue();
    const taskId = localStorage.getItem('host_task_id')
    val.task_id = taskId;
    const res = await postOpenstackImg(val);
    if(res.code === 200) {
      message.success('已提交上传！');
      const res = await getTemporaryMigrationTask({id:taskId});
      if(res.data.length) {
        const current_step = res.data[0].sub_task[0].current_step;
        // if(current_step === 'IMAGE_UPLOADING') {
        //   //上传中
        //   console.log('上传中');
        // }
        // if(current_step === 'IMAGE_UPLOADED') {
        //   //上传已完成
        //   console.log('上传已完成');
        // }
        // if(current_step === 'IMAGE_UPLOAD_FAILED') {
        //   //上传已完成
        //   console.log('上传失败');
        // }
        // setData({...res.data[0]})
      }
    }
  }
  return (
    <>
      <ProCard
        title="目标主机配置与迁移"
        headerBordered
        bordered
        actions={updateState === 'IMAGE_UPLOADING' ? [<Button type="primary" key="1" onClick={handleClick} loading>上传中</Button>] : [<Button type="primary" key="2" onClick={handleClick}>上传成功</Button>]}
      >
        <Row gutter={24} justify={'center'} align={'middle'}>
          <Col span={12}>
            <ProFormText
              name="image_name_prefix"
              label="镜像名称"
              rules={rules}
            />
            <ProFormSelect
              name="source_format"
              label="源格式"
              options={[
                {
                  value: '.raw',
                  label: '.raw',
                },
                {
                  value: '.qcow2',
                  label: '.qcow2',
                },
                {
                  value: '.vhdx',
                  label: '.vhdx',
                },
              ]}
            />
            <ProFormSelect
              name="target_format"
              label="目标格式"
              options={[
                {
                  value: '.raw',
                  label: '.raw',
                },
                {
                  value: '.qcow2',
                  label: '.qcow2',
                },
                {
                  value: '.vhdx',
                  label: '.vhdx',
                },
              ]}
            />
            <ProFormSwitch name="if_trans" label="转换镜像格式" />
            {/*<ProFormSelect*/}
            {/*  name="d"*/}
            {/*  label="存储位置"*/}
            {/*  options={[*/}
            {/*    {*/}
            {/*      value: '1',*/}
            {/*      label: '1',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*/>*/}
            {/*<ProFormSelect*/}
            {/*  name="e"*/}
            {/*  label="目标平台"*/}
            {/*  options={[*/}
            {/*    {*/}
            {/*      value: '1',*/}
            {/*      label: '1',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*/>*/}
          </Col>
          <Col span={12} style={{textAlign:'center'}}>
            {/*<p>镜像上传进度</p>*/}
            {/*<Progress*/}
            {/*  strokeColor={{*/}
            {/*    '0%': '#108ee9',*/}
            {/*    '100%': '#87d068',*/}
            {/*  }}*/}
            {/*  type="circle"*/}
            {/*  percent={70}*/}
            {/*  size="small"*/}
            {/*  status="active"*/}
            {/*  strokeWidth={10}*/}
            {/*  className={styles.progress}*/}
            {/*/>*/}
          </Col>
          {/*<Col>*/}
          {/*  <Button type="primary" onClick={handleClick}>上传镜像</Button>*/}
          {/*</Col>*/}
        </Row>
      </ProCard>
    </>
  );
};
