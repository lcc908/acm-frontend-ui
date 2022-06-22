import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import styles from './style.less'
import {Card, List,Typography ,Button } from 'antd';
import PlatformModal from "@/components/PlatformModal";
import {getAlldictList} from './service'
import vmware from '../../../assets/vmware.png'
import openstack from '../../../assets/openstack.png'
import hyperv from '../../../assets/hyperv.png'
import physical_host from '../../../assets/physical_host.png'
import { history } from 'umi';
const { Title } = Typography;
const iconMapping = {
  vmware,
  openstack,
  hyperv,
  physical_host,
}

const IndexPage = () => {
  const [hostId,setHostId] = useState('');
  const [platformType,setPlatformType] = useState('');
  // const [listId,setListId] = useState('');
  const [modalVisit, setModalVisit] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [list, setList] = useState([]);
  useEffect(() => {
    getDataList();
  },[])
  const getDataList = async () => {
    const {data} = await getAlldictList();
    console.log(data);
    setList([...data])
  }
  useEffect(()=>{
    // console.log(checkData);
    console.log(platformType);
  },[platformType])
  const closeModal = () => {
    setModalVisit(false);
    setPlatformType('');
  }
  const addCheck = (val,obj) => {
    setHostId(obj.id);
    setDisabledButton(false)
  }
  const handleOk = () => {
    setModalVisit(false);
  }
  const pushRoute = () => {
    // console.log(platformType);
    if(platformType === 'vmware') {
      history.push(`/offline/vm?platform_id=${hostId}`);
    }
    if(platformType === 'physical_host') {
      history.push(`/offline/host?host_id=${hostId}`);
    }
  }
  return (
    <PageContainer
    >
      <Card
        actions={[<Button type="primary" onClick={pushRoute} disabled={disabledButton}>下一步</Button>]}
      >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={[...list]}
            renderItem={(item) => {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    // type="primary"
                    // actions={[ <Button style={{width:'200px'}} key={item.id}>未选择</Button>]}
                    cover={<img alt="" className={styles.cardAvatar} src={iconMapping[item.code]}/>}
                  >

                    <Title level={4}>{item.code}</Title>
                    <Button
                      style={{width:'200px'}}
                      key={item.code}
                      type={platformType === item.code ? "primary" : ""}
                      onClick={() => {
                        setModalVisit(true);
                        setPlatformType(item.code)
                      }}
                    >
                      {platformType === item.code ? "已选择" : "未选择"}
                    </Button>
                  </Card>
                </List.Item>
              );
            }}
          />
        </div>
      </Card>
      <PlatformModal
        modalVisit={modalVisit}
        closeModal={closeModal}
        handleOk={handleOk}
        addCheck={addCheck}
        platform_type={platformType}
      />
    </PageContainer>
  );
};
export default IndexPage
