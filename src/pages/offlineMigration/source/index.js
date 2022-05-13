import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import styles from './style.less'
import {Card, List,Typography,Button } from 'antd';
import PlatformModal from "@/components/PlatformModal";

const IndexPage = () => {
  const [checkData,setCheckData] = useState('');
  const [clickId,setClickId] = useState('');
  const [modalVisit, setModalVisit] = useState(false);
  const list = [
    {
      "id": "1",
      "cover": "https://p4.lefile.cn/fes/cms/2022/04/06/ctoq1epe04eask33vk0lg5lykmt1m4817538.png",
    },
    {
      "id": "2",
      "cover": "https://p3.lefile.cn/fes/cms/2022/04/06/0wwrkvxfpqa8iko3o67sz0ag6cxzm5362790.png",
    },
    {
      "id": "3",
      "cover": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
    },
    {
      "id": "4",
      "cover": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
    },
  ];

  useEffect(()=>{
    // console.log(checkData);
    console.log(clickId);
  },[checkData,clickId])
  const closeModal = () => {
    setModalVisit(false);
    setClickId('');
  }
  const addCheck = (val) => {
    setCheckData(val)
  }
  const handleOk = () => {
    setModalVisit(false);
  }
  return (
    <PageContainer
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
                  cover={<img alt="" className={styles.cardAvatar} src={item.cover}/>}
                >
                  <Button
                    style={{width:'200px'}}
                    key={item.id}
                    type={clickId === item.id ? "primary" : ""}
                    onClick={() => {
                      setModalVisit(true);
                      setClickId(item.id)
                    }}
                  >
                    {clickId === item.id ? "已选择" : "未选择"}
                  </Button>
                </Card>
              </List.Item>
            );
          }}
        />
      </div>
      <PlatformModal
        modalVisit={modalVisit}
        closeModal={closeModal}
        handleOk={handleOk}
        addCheck={addCheck}
        clickId={clickId}
      />
    </PageContainer>
  );
};
export default IndexPage
