import React, {useCallback, useRef, useState} from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  message,
  Input,
  Menu,
  Modal, Popconfirm,
  Progress,
  Radio,
  Row,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import OperationModal from './components/OperationModal';
import { addFakeList, queryFakeList, removeFakeList, updateFakeList } from './service';
import styles from './style.less';
import ProTable from "@ant-design/pro-table";
import {getHostPermission} from "@/pages/authority/host-permissions/service";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

export const BasicList = () => {
  const [done, setDone] = useState(false);
  const [total, setTotal] = useState('');
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [editorRowData, setEditorRowData] = useState({}); //编辑数据
  const [params, setParams] = useState({
    name:"",
    status:""
  })
  const ref = useRef();
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'description',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '管理员',
      dataIndex: 'created_by',
      align: 'center',
    },
    {
      title: '开始时间',
      dataIndex: 'updated_at',
      align: 'center',
    },
    {
      title: '进度',
      dataIndex: 'status',
      align: 'center',
      render:(text,record) => <Progress status="active" percent={50} showInfo={false} />
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      valueType: 'option',
      render: (text, record) => [
        <a key="1" onClick={() => handleOnClickEdit(record)}>编辑</a>,
        <Popconfirm
          title={'确定要删除该数据吗？'}
          onConfirm={() => handleClickDelete(record)}
          key="2"
        >
          <a>删除</a>
        </Popconfirm>
      ],
    },
  ]
  const handleOnClickEdit = (record) => {
    setVisible(true);
    setEditorRowData({ ...record });
  }
  const handleClickDelete = async ({id}) => {
    const {code} = await removeFakeList({ids:[id]});
    if(code === 200) {
      message.success("删除成功");
      reloadTable();
    }
  }

  const handleChangeRadio = (e) => {
    setParams({...params,status:e.target.value})
  }
  const onSearch = (value) => setParams({...params,name:value})

  const extraContent = (
    <>
      <RadioGroup defaultValue="" onChange={handleChangeRadio}>
        <RadioButton value="">全部</RadioButton>
        <RadioButton value="RUNNING">进行中</RadioButton>
        <RadioButton value="NOT_READY">等待中</RadioButton>
      </RadioGroup>
      <Search
        className={styles.extraContentSearch}
        placeholder="请输入"
        onSearch={onSearch}
      />
    </>
  );

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({});
  };
  const onChangePagination = (page, pageSize) => {
    // console.log(page, pageSize);
  }
  const reloadTable = useCallback(() => {
    ref.current.reload();
  },[])

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false} style={{marginBottom:20}}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value={`${total}个任务`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value={`${total}个任务`} />
              </Col>
            </Row>
          </Card>
          {/*<div>*/}
          {/*  {extraContent}*/}
          {/*</div>*/}
          <ProTable
            headerTitle='任务列表'
            actionRef={ref}
            columns={columns}
            rowKey="id"
            params={
              params
            }
            request={(par) => {
              return queryFakeList(params)
            }}
            search={false}
            toolBarRender={() => [
              extraContent
            ]}
            postData={(arr) => {
              setTotal(arr.length);
              return arr;
            }}
            pagination={{
              position: ['bottomCenter'],
              showQuickJumper: true,
              onChange: onChangePagination,
              pageSize: 10,
            }}
          />
        </div>
      </PageContainer>
      <OperationModal
        visible={visible}
        setVisible={setVisible}
        editData={editorRowData}
        reloadTable={reloadTable}
      />
    </div>
  );
};
export default BasicList;
