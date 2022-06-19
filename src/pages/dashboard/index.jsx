import React, {useRef, useState} from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal, Popconfirm,
  Progress,
  Radio,
  Row,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import moment from 'moment';
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

const ListContent = ({ data: { created_by, createdAt, percent, status } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>Owner</span>
      <p>{created_by}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>开始时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <Progress
        percent={percent}
        status={status}
        strokeWidth={6}
        style={{
          width: 180,
        }}
      />
    </div>
  </div>
);

export const BasicList = () => {
  const [done, setDone] = useState(false);
  const [total, setTotal] = useState('');
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [params, setParams] = useState({})
  const {
    data: listData,
    loading,
    mutate,
  } = useRequest(() => {
    return queryFakeList({
      // count: 7,
    });
  });
  const actionRef = useRef();
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
        // <a key="2" onClick={() => handleClickDelete(record)}>删除</a>,
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

  const { run: postRun } = useRequest(
    (method, params) => {
      if (method === 'remove') {
        return removeFakeList(params);
      }

      if (method === 'update') {
        return updateFakeList(params);
      }

      return addFakeList(params);
    },
    {
      manual: true,
      onSuccess: (result) => {
        mutate(result);
      },
    },
  );
  const list = listData || [];
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: list.length,
  };

  const showEditModal = (item) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id) => {
    postRun('remove', {
      id,
    });
  };

  const editAndDelete = (key, currentItem) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">进行中</RadioButton>
        <RadioButton value="waiting">等待中</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({});
  };

  const handleSubmit = (values) => {
    setDone(true);
    const method = values?.id ? 'update' : 'add';
    postRun(method, values);
  };

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
            actionRef={actionRef}
            columns={columns}
            rowKey="id"
            params={
              params
            }
            request={(par) => {
              return queryFakeList(params)
            }}
            search={false}
            pagination={false}
            toolBarRender={() => [
              extraContent
            ]}
            postData={(arr) => {
              setTotal(arr.length);
              return arr;
            }}
          />
          {/*<Card*/}
          {/*  className={styles.listCard}*/}
          {/*  bordered={false}*/}
          {/*  title="任务列表"*/}
          {/*  style={{*/}
          {/*    marginTop: 24,*/}
          {/*  }}*/}
          {/*  bodyStyle={{*/}
          {/*    padding: '0 32px 40px 32px',*/}
          {/*  }}*/}
          {/*  extra={extraContent}*/}
          {/*>*/}
          {/*  <List*/}
          {/*    size="large"*/}
          {/*    rowKey="id"*/}
          {/*    loading={loading}*/}
          {/*    pagination={paginationProps}*/}
          {/*    dataSource={list}*/}
          {/*    renderItem={(item) => (*/}
          {/*      <List.Item*/}
          {/*        actions={[*/}
          {/*          <a*/}
          {/*            key="edit"*/}
          {/*            onClick={(e) => {*/}
          {/*              e.preventDefault();*/}
          {/*              showEditModal(item);*/}
          {/*            }}*/}
          {/*          >*/}
          {/*            编辑*/}
          {/*          </a>,*/}
          {/*          <MoreBtn key="more" item={item} />,*/}
          {/*        ]}*/}
          {/*      >*/}
          {/*        <List.Item.Meta*/}
          {/*          avatar={<Avatar src={item.logo} shape="square" size="large" />}*/}
          {/*          title={<a href={item.href}>{item.name}</a>}*/}
          {/*          description={item.subDescription}*/}
          {/*        />*/}
          {/*        <ListContent data={item} />*/}
          {/*      </List.Item>*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</Card>*/}
        </div>
      </PageContainer>
      {/*<Button*/}
      {/*  type="dashed"*/}
      {/*  onClick={() => {*/}
      {/*    setVisible(true);*/}
      {/*  }}*/}
      {/*  style={{*/}
      {/*    width: '100%',*/}
      {/*    marginBottom: 8,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <PlusOutlined />*/}
      {/*  添加*/}
      {/*</Button>*/}
      <OperationModal
        done={done}
        visible={visible}
        current={current}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
export default BasicList;
