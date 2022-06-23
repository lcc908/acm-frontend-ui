import React, {useEffect, useRef, useState} from 'react';
import { Card, Result, Button, Row, Col, message, Upload } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ForwardOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormUploadDragger,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import { UploadOutlined } from '@ant-design/icons';
import styles from '../style.less';
import {getHotMigration} from "@/pages/onlineMigration/service";
import {getPermission} from "@/pages/authority/platform-permissions/service";

export default (props) => {
  const { oneFormRef, setOneDisabled, stepData } = props;
  const rules = [{ required: true}];
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
  const request = async (params) => {
    const {data} = await getPermission({platform_type:'openstack'});
    const arr = data.map(item =>{
      return {label:item.platform_name,value:item.id}
    });
    oneFormRef?.current?.setFieldsValue({
      typeList: arr[0].value,
    });
    return arr;
  };
  const beforeUpload = (file) => {
    console.log(file);
    const isPNG = file.type === 'text/x-sh';
    if (!isPNG) {
      message.error(`${file.name} 不是一个sh文件`);
    }

    return isPNG || Upload.LIST_IGNORE;
  }
  return (
    <div className={styles.cardList}>
      <Row>
        <Col span={11}>
          <Card
            title="源主机信息"
            headStyle={{ fontWeight: 'bold' }}
            bodyStyle={{height:460}}
            actions={[<Button type="primary" onClick={checkUp}>连通性检查</Button>]}
          >
            {/*<ProFormText name="xitong" label="系统类型"/>*/}
            <ProFormSelect
              name="os_type"
              label="系统类型"
              initialValue="Linux"
              options={[
                { value: 'linux', label: 'Linux' },
                { value: 'windows', label: 'Windows' },
              ]}
            />
            <ProFormText name="ip_address" label="ip地址" rules={rules}/>
            <ProFormText
              name="username"
              label="用户名"
              fieldProps={{
                autoComplete:"new-password"
              }}
              rules={rules}
            />
            <ProFormText.Password
              name="password"
              label="密码"
              fieldProps={{
                autoComplete:"new-password"
              }}
              rules={rules}
            />
            <ProFormText name="port" label="端口" initialValue={22} />
            <ProFormSelect
              name="connect_type"
              label="连接接类型"
              initialValue="SSH"
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
              name="target_platform_id"
              label="权限列表"
              request={request}
              rules={rules}
            />
            <ProFormUploadDragger
              max={1}
              label="上传"
              name="upload"
              tooltip="上传目标平台认证文件"
              description="仅支持三种格式上传: .txt，.sh和.yaml"
              onChange={handleChange}
              action={'https://acm.lenovo.com:9001/api/v1/hot_migration/host'}
              fieldProps={{
                name: "file",
                method:'PUT',
                beforeUpload:beforeUpload,
                headers:{
                  username:localStorage.getItem('userToken'),
                }
              }}
              // fieldProps={{method:'PUT'}}
            />
            {/*<Upload*/}
            {/*  name='file'*/}
            {/*  action='https://acm.lenovo.com:9001/api/v1/hot_migration/host'*/}
            {/*  headers={*/}
            {/*    {username: localStorage.getItem('userToken')}*/}
            {/*  }*/}
            {/*  method='PUT'*/}
            {/*  beforeUpload={beforeUpload}*/}
            {/*>*/}
            {/*  <Button icon={<UploadOutlined />}>Click to Upload</Button>*/}
            {/*</Upload>*/}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
