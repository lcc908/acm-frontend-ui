import React, {useEffect, useRef, useState} from 'react';
import { Card, Result, Button, Row, Col, message, Form } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ForwardOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormUploadDragger,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import styles from '../style.less';
import {getHotMigration} from "@/pages/onlineMigration/service";

export default (props) => {
  const { oneFormRef, setOneDisabled, stepData } = props;
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('onlineOne'));
    if(data) {
      oneFormRef?.current?.setFieldsValue({
        ...data
      });
    }
  })
  const checkUp = async () => {
    // console.log(oneFormRef?.current.);
    const val = await oneFormRef.current?.validateFieldsReturnFormatValue();
    delete val.machine_type1;
    console.log(val);
    const res = await getHotMigration(val);
    if (res.code === 200) {
      message.success('连通性检查已完成！');
      localStorage.setItem('onlineOne',JSON.stringify(val));
      setOneDisabled(false);
    }
  }
  const handleChange = (info) => {
    console.log(info);
  }
  return (
    <div className={styles.cardList}>
      <Row>
        <Col span={11}>
          <Card
            title="源主机信息"
            headStyle={{ fontWeight: 'bold' }}
            // style={{height:556}}
            // className={styles.leftCard}
            bodyStyle={{height:460}}
            actions={[<Button type="primary" onClick={checkUp}>连通性检查</Button>]}
          >
            {/*<ProFormText name="xitong" label="系统类型"/>*/}
            <ProFormSelect
              name="os_type"
              label="系统类型"
              options={[
                { value: 'linux', label: 'Linux' },
                { value: 'windows', label: 'Windows' },
              ]}
            />
            <ProFormText name="ip_address" label="ip地址" />
            <ProFormText
              name="username"
              label="用户名"
              fieldProps={{
                autoComplete:"new-password"
              }}
            />
            <ProFormText.Password
              name="password"
              label="密码"
              fieldProps={{
                autoComplete:"new-password"
              }}
            />
            <ProFormText name="port" label="端口" />
            <ProFormSelect
              name="connect_type"
              label="连接接类型"
              options={[
                { value: 'ssh', label: 'SSH' },
                { value: 'winrm', label: 'WINRM' },
                { value: 'jdbc', label: 'JDBC驱动' },
              ]}
            />
            <ProFormRadio.Group
              label="迁移方式"
              name="method"
              initialValue="block"
              // options={['发票', '普票', '无票']}
              options={[
                { label: '块级', value: 'block' },
                { label: '文件级', value: 'file' },
              ]}
            />
            <ProFormSwitch name="encrypt" label="数据加密" />
          </Card>
        </Col>
        <Col span={2} className={styles.iconCent}>
            <ForwardOutlined className={styles.centerIcon} />
        </Col>
        <Col span={11}>
          <Card
            title="目标平台"
            // actions={[<p>支持三种格式上传: .txt，.sh和.yaml</p>]}
            style={{height:556}}
            className={styles.rightCard}
            headStyle={{ fontWeight: 'bold' }}
            // bordered={false}
          >
            <ProFormSelect
              name="machine_type1"
              label="权限列表"
              options={[
                { value: 'SR650', label: 'SR650' },
                { value: 'X3650M5', label: 'X3650M5' },
              ]}
            />
            <ProFormUploadDragger
              max={1}
              label="上传"
              name="upload"
              tooltip="上传目标平台认证文件"
              description="仅支持三种格式上传: .txt，.sh和.yaml"
              onChange={handleChange}
              action={'http://10.122.140.39:9001/api/v1/hot_migration/host'}
              fieldProps={{
                name: "file",
                method:'PUT',
                headers:{
                  username:localStorage.getItem('userToken')
                }
              }}
              // fieldProps={{method:'PUT'}}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
