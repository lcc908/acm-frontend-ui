import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import styles from './style.less'
import {Card, List,Typography,Button } from 'antd';
import PlatformModal from "@/components/PlatformModal";
import {getAlldictList} from './service'
import vmware from '../../../assets/vmware.png'
import openstack from '../../../assets/openstack.png'
import hyperv from '../../../assets/hyperv.png'
import physical_host from '../../../assets/physical_host.png'
import { history } from 'umi';

const iconMapping = {
  vmware,
  openstack,
  hyperv,
  physical_host,
}

const IndexPage = () => {
  const [checkData,setCheckData] = useState('');
  const [clickId,setClickId] = useState('');
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
  // const list = [
  //   {
  //     "id": "1",
  //     "cover": "https://p4.lefile.cn/fes/cms/2022/04/06/ctoq1epe04eask33vk0lg5lykmt1m4817538.png",
  //   },
  //   {
  //     "id": "2",
  //     "cover": "https://p3.lefile.cn/fes/cms/2022/04/06/0wwrkvxfpqa8iko3o67sz0ag6cxzm5362790.png",
  //   },
  //   {
  //     "id": "3",
  //     "cover": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
  //   },
  //   {
  //     "id": "4",
  //     "cover": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
  //   },
  // ];

  useEffect(()=>{
    // console.log(checkData);
    console.log(clickId);
  },[clickId])
  const closeModal = () => {
    setModalVisit(false);
    setClickId('');
  }
  const addCheck = (val,obj) => {
    setCheckData(obj.id);
    setDisabledButton(false)
  }
  const handleOk = () => {
    setModalVisit(false);
  }
  const pushRoute = () => {
    console.log(clickId);
    console.log(checkData);
    history.push(`/offline/host?host_id=${checkData}&platForm=${clickId}`);
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
                    <Button
                      style={{width:'200px'}}
                      key={item.code}
                      type={clickId === item.code ? "primary" : ""}
                      onClick={() => {
                        setModalVisit(true);
                        setClickId(item.code)
                      }}
                    >
                      {clickId === item.code ? "已选择" : "未选择"}
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
        platform_type={clickId}
      />
    </PageContainer>
  );
};
export default IndexPage
