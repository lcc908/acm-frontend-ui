import ProCard from '@ant-design/pro-card';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Button, message, Popconfirm, Timeline } from 'antd';
import { useEffect, useState } from 'react';

import { getTemporaryMigrationTask, postOpenstackVm } from '@/pages/offlineMigration/host/service';
import styles from '../style.less';

const waitTime = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const { fiveFormRef, fiveData, stepData } = props;
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [state, setState] = useState({}); //上传状态
  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
      readonly: true,
    },
    {
      title: '磁盘名称',
      dataIndex: 'age',
      key: 'age',
      readonly: true,
    },
    {
      title: '挂载点',
      dataIndex: 'address',
      key: 'address',
      readonly: true,
    },
    {
      title: '容量(GB)',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.key);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="确定删除此行数据?"
          onConfirm={() => {
            setDataSource(dataSource.filter((item) => item.key !== record.key));
          }}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: '1 Lake Park',
      tags: 2,
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'Lake Park',
      tags: 1,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: '1 Lake Park',
      tags: 3,
    },
  ];

  useEffect(() => {
    if (fiveData) {
      // console.log(fiveData);
      fiveFormRef?.current?.setFieldsValue({
        ...fiveData,
      });
      setState(fiveData.status);
    }
  }, [fiveData]);
  const handleClick = async () => {
    // console.log('这是第四步', fiveFormRef?.current?.getFieldValue());
    await waitTime();
    const val = fiveFormRef?.current?.getFieldValue();
    const taskId = localStorage.getItem('host_task_id');
    val.task_id = taskId;
    val.flavor_name = val.flavor;
    val.save_only = false;
    const { code, data } = await postOpenstackVm(val);
    if (code === 200) {
      message.success('虚拟机启动成功！');
      console.log(data);
      if (taskId) {
        const res = await getTemporaryMigrationTask({ id: taskId });
        if (res.data.length) {
          const { status } = JSON.parse(res?.data[0]?.sub_task[0]?.platform_info) || {};
          console.log(status);
          if (status === 'OPENSTACK_VM_CREATING') {
          }
          if (status === 'OPENSTACK_VM_CREATED') {
            message.error('创建成功');
          }
          if (status === 'OPENSTACK_VM_CREATE_FAILED') {
            message.error('创建失败');
          }
        }
      }
      // res.data[0].sub_task[0].platform_info
    }
  };
  return (
    <>
      <ProCard
        // title="创建虚拟机"
        headerBordered
        bordered
        split={'vertical'}
        // actions={updateState === 'IMAGE_UPLOADING' ? [<Button type="primary" key="1" loading>上传中</Button>] : [<Button type="primary" key="2" onClick={handleClick} loading>启动虚拟机</Button>]}
      >
        <ProCard
          title="创建虚拟机"
          colSpan="60%"
          headerBordered
          // actions={updateState === 'IMAGE_UPLOADING' ? [<Button type="primary" key="1" loading>上传中</Button>] : [<Button type="primary" key="2" onClick={handleClick} >启动虚拟机</Button>]}
          // bordered
        >
          {/*<ProFormText*/}
          {/*  name="a"*/}
          {/*  label="平台名称"*/}
          {/*  // rules={rules}*/}
          {/*/>*/}
          <ProFormText
            name="instance_name"
            label="主机名"
            // rules={rules}
          />
          {/*<ProFormSelect*/}
          {/*  name="instance_name"*/}
          {/*  label="主机名"*/}
          {/*  options={[*/}
          {/*    {*/}
          {/*      value: '1',*/}
          {/*      label: '1',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*/>*/}
          {/*<ProFormText*/}
          {/*  name="c"*/}
          {/*  label="镜像名称"*/}
          {/*  disabled*/}
          {/*  // rules={rules}*/}
          {/*/>*/}
          <ProFormSelect
            name="flavor"
            label="套餐大小"
            options={[
              {
                value: '4-16-0',
                label: '4-16-0',
              },
            ]}
          />
          <ProFormSelect
            name="network_name"
            label="网络名称"
            options={[
              {
                value: '10.108.192.0',
                label: '10.108.192.0',
              },
            ]}
          />
          <div style={{ textAlign: 'center' }}>
            {state === 'OPENSTACK_VM_CREATING' ? (
              <Button type="primary" loading={true}>
                虚拟机创建中
              </Button>
            ) : (
              <Button type="primary" key="2" onClick={handleClick}>
                创建虚拟机
              </Button>
            )}
          </div>
          {/*<Table columns={columns} dataSource={data} pagination={false} title={() => '磁盘列表'}/>*/}
          {/*<EditableProTable*/}
          {/*  rowKey="key"*/}
          {/*  headerTitle="磁盘列表"*/}
          {/*  columns={columns}*/}
          {/*  // scroll={{*/}
          {/*  //   x: 960,*/}
          {/*  // }}*/}
          {/*  request={async () => ({*/}
          {/*    data: data,*/}
          {/*    total: 3,*/}
          {/*    success: true,*/}
          {/*  })}*/}
          {/*  value={dataSource}*/}
          {/*  onChange={setDataSource}*/}
          {/*  editable={{*/}
          {/*    type: 'multiple',*/}
          {/*    editableKeys,*/}
          {/*    onSave: async (rowKey, data, row) => {*/}
          {/*      console.log(rowKey, data, row);*/}
          {/*      await waitTime(2000);*/}
          {/*    },*/}
          {/*    onChange: setEditableRowKeys,*/}
          {/*    onDelete:(Key, row) => {*/}
          {/*      console.log(Key);*/}
          {/*    }*/}
          {/*  }}*/}
          {/*  recordCreatorProps={false}*/}
          {/*/>*/}
        </ProCard>
        <ProCard
          headerBordered
          // bordered
          title="流量占用情况"
        >
          <Timeline pending="loading..." className={styles.timeLine}>
            {/*<Timeline>*/}
            <Timeline.Item color="green">2022-03-1 10:13:15 连接目标主机成功</Timeline.Item>
            <Timeline.Item color="green">2022-03-1 11:13:30 操作系统配置基线检查完成</Timeline.Item>
            {/*<Timeline.Item color="green">2022-03-2 12:13:45  目标主机硬件环境检查完成</Timeline.Item>*/}
            {/*<Timeline.Item color="green">2022-03-3 11:13:45  网络连通性检查正常，能够访问ETL存储</Timeline.Item>*/}
            {/*<Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>*/}
            {/*<Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>*/}
            {/*<Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>*/}
            {/*<Timeline.Item color="gray">2022-03-5 14:13:11 警告状态</Timeline.Item>*/}
            {/*<Timeline.Item color="red">2022-03-5 14:13:11 失败状态</Timeline.Item>*/}
          </Timeline>
        </ProCard>
      </ProCard>
    </>
  );
};
