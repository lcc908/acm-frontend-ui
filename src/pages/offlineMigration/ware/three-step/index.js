import React, {useEffect, useRef, useState} from 'react';
import {Alert, Row, Col, Space, Tag, Button} from 'antd';
import {
  ProFormText,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import {EditableProTable} from '@ant-design/pro-table';
import {history} from "umi";
import TagetInfo from './tagetInfo'
// import styles from './style.less';
import {getPermission} from "@/pages/authority/platform-permissions/service";
import {postVmwareTaskValidate} from "@/pages/offlineMigration/ware/service";
import {waitTime} from "@/utils"


const TagList = ({value}) => {
  return value.map((item, index) => (
    <Tag color="green" key={index}>{item.size}</Tag>
  ))
}

const ErrorTagList = ({value}) => {
  return value.map((item, index) => (
    <Tag color="error" key={index}>{item}</Tag>
  ))
}

export default (props) => {
  const {threeFormRef, current, setThreeNextBt} = props;
  const {platform_id} = history?.location?.query;
  const [errText, setErrText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([])
  const [editableKeys, setEditableRowKeys] = useState([]); //正在编辑的行，默认 key 会使用 rowKey 的配置
  const {name, target_platform_id} = JSON.parse(localStorage.getItem('vmTwoStepFormData')) || {}
  const vmArray = JSON.parse(localStorage.getItem('vmOneStepRowKeys')) || []
  const columns = [
    {
      title: '虚拟机名称',
      dataIndex: 'vmname',
      ellipsis: true,
      align: 'center',
      readonly: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      align: 'center',
      editable: (text, record, index) => {
        return text ? false : true;
      },
    },
    {
      title: 'CPU',
      dataIndex: 'cpu',
      align: 'center',
      readonly: true,
    },
    {
      title: 'MEM',
      dataIndex: 'mem',
      align: 'center',
      readonly: true,
    },
    {
      title: '主机类型',
      dataIndex: 'os',
      align: 'center',
      editable: (text, record, index) => {
        return text ? false : true;
      },
    },
    {
      title: '磁盘配置',
      dataIndex: 'diskInfo',
      align: 'center',
      readonly: true,
      renderFormItem: (_, {isEditable}) => {
        return <TagList/>;
      },
      render: (tags) => (
        <span>
        {tags.map((tag,index) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={index}>
              {tag.size}
            </Tag>
          );
        })}
      </span>
      ),
    },
    {
      title: '错误描述',
      dataIndex: 'error_message',
      align: 'center',
      width: 300,
      renderFormItem: (_, {isEditable}) => {
        return <ErrorTagList/>;
      },
      render: (tags) => (
        <span>
        {tags.map((tag,index) => {
          return (
            <Space size={4}>
              <Tag color="error" key={index}>
                {tag}
              </Tag>
            </Space>
          );
        })}
      </span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      align: 'center',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.vmname);
          }}
        >
          编辑
        </a>,
        // <a
        //   key="delete"
        //   onClick={() => {
        //     setDataSource(dataSource.filter((item) => item.vmname !== record.vmname));
        //   }}
        // >
        //   删除
        // </a>,
      ],
    },
  ];

  // useEffect(() => {
  //   function renderData() {
  //     const item = JSON.parse(localStorage.getItem('vmTwoStepFormData'))
  //     if (item) {
  //       getData()
  //     }
  //   }
  //
  //   window.addEventListener('storage', renderData)
  //
  //   return () => {
  //     window.removeEventListener('storage', renderData)
  //   }
  // }, [])

  useEffect(() => {
    getData()
  }, [current]);

  const getData = async () => {
    const {data} = await getPermission({id: platform_id}); //获取目标平台
    getVmwareList();
    // :{datastore_check,vm_check,vm_infos}
    threeFormRef?.current?.setFieldsValue({
      ...data[0],
    });
  };
  const getVmwareList = async (arr) => {
    setLoading(true);
    // const vmArray = JSON.parse(localStorage.getItem('vmOneStepRowKeys')) || []
    if(target_platform_id) {
      const vmNameArray = vmArray.map(item => {
        return {vmname: item};
      })
      try {
        const {code, data: {result}} = await postVmwareTaskValidate({
          name,
          source_platform_id: platform_id,
          target_platform_id: target_platform_id,
          vm_infos: arr || vmNameArray
        });
        if (code === 200) setLoading(false)
        // setLoading(false)
        // console.log(result);
        const {datastore_check, vm_check, vm_infos} = result;
        if (datastore_check === "failed" || vm_check === "failed") {
          // "datastore_check" 和 "vm_check"的值只要任何一个为"failed"，说明验证失败，阻止用户进入下一步
          setThreeNextBt(true)
        }
        if (datastore_check === "success" && vm_check === "success") {
          setThreeNextBt(false)
        }
        if (datastore_check === "failed") {
          setErrText(true)
        }
        // console.log(result);
        const Arr = vm_infos.map(item => {
          delete item.port;
          return item;
        })
        setDataSource([...Arr]);
        localStorage.setItem('vmThreeVmData', JSON.stringify(Arr));
      } catch (e) {
        setLoading(false)
      }
    }
  }
  //重新验证
  const validation = async () => {
    const vmArray = JSON.parse(localStorage.getItem('vmOneStepRowKeys')) || []
    const vmNameArray = vmArray.map(item => {
      return {vmname: item};
    })
    // console.log(vmNameArray);
    // console.log(dataSource);
    // console.log(editableKeys);
    for (let i of vmNameArray) {
      for (let j of dataSource) {
        if (i.vmname === j.vmname) {
          i.ip = j.ip;
          i.os = j.os;
        }
      }
    }
    const res = await getVmwareList(vmNameArray)
    console.log(res);
    // for (let)
  }
  const handleChange = (editableKeys, editableRows) => {
    // console.log(editableKeys);
    // console.log(editableRows);
    setEditableRowKeys(editableKeys)
  }
  return (
    <>
      <ProCard title="源平台" headerBordered bordered>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="datacenter"
              label="区域"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="platform_type"
              label="平台类型"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="platform_name"
              label="平台名称"
              disabled
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="share_file_path"
              label="共享文件存储"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="b"
              label="注入脚本"
              initialValue="os_modify_linux.sh"
              options={[
                {
                  label: "OS-Modify-Linux.sh",
                  value: "os_modify_linux.sh"
                }
              ]}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <EditableProTable
              rowKey="vmname"
              headerTitle="待迁移虚拟机列表"
              toolBarRender={() => [
                <Button
                  type="primary"
                  onClick={validation}
                  key="1"
                  disabled={editableKeys.length ? true : false}
                >
                  重新验证
                </Button>
              ]}
              recordCreatorProps={false}
              columns={columns}
              value={dataSource}
              onChange={setDataSource}
              loading={loading}
              editable={{
                type: 'single',
                editableKeys,
                actionRender: (row, config, defaultDoms) => {
                  return [defaultDoms.save, defaultDoms.cancel];
                },
                onSave: async (rowKey, data, row) => {
                  console.log(rowKey, data, row);
                  // await waitTime(1000);
                },
                onChange: handleChange,
              }}
            />
            {
              errText ? (
                <Alert
                  style={{marginTop: 20}}
                  showIcon
                  message="源平台上找不到与目标平台nfs对应的datastore，请先配置datastore"
                  type="error"
                />
              ) : null
            }
          </Col>
        </Row>
      </ProCard>
      <TagetInfo current={current}/>
    </>
  );
};
