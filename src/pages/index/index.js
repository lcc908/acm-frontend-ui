import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import styles from './index.less'
import {Card, List,Typography,Button } from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
const { Paragraph,Title,Link,Text  } = Typography;
import yewu from '../../assets/yewurongzai.png'
import zaixian from '../../assets/zaixian.png'
import lixian from '../../assets/lixian.png'
import beifen from '../../assets/beifen.png'
import {history} from "umi";

const IndexPage = () => {
  const list = [
    {
      "id": "fake-list-2",
      "title": "混合云场景",
      "buttonText": "在线迁移",
      "cover": zaixian,
      "code":'zaixian',
      "description": "在线迁移目前兼容主流的Linux和Windows主机，该功能能够满足应用宕机时间短，业务恢复快，不依赖于源平台类型，迁移目标平台的时间取决于迁移过程所依赖的网络带宽，磁盘IO读写性能以及迁移应用程序的资源配置。",
    },
    {
      "id": "fake-list-3",
      "title": "异构平台",
      "buttonText": "离线迁移",
      "cover": lixian,
      "code":'physical_host',
      "description": "离线迁移适用于较低版本的OS迁移，操作系统及程序绑定硬件信息，对数据敏感型应用，以及不同厂商的平台，后端存储以及跨存储迁移等场景，迁移时间灵活，自动化程度高。",
    },
    {
      "id": "fake-list-1",
      "title": "业务容灾",
      "buttonText": "应用灾备",
      "cover": yewu,
      "description": "对于一些企业的核心业务，大多都会建设灾备数据中心，持续地保证两地数据中心所承载的应用一致性，需要定期地将两地的应用集群和数据进行同步，也适用于私有云的应用集群敏捷地迁移到公有云或专有云平台。",
    },
    {
      "id": "fake-list-4",
      "title": "应用备份与恢复",
      "buttonText": "备份恢复",
      "cover": beifen,
      "description": "应用的备份与恢复包括应用的识别，适用于战略级应用和生产数据库，备份类型主要包括立即备份和定时备份，备份的存储介质选择，备份数据的恢复等。",
    },
  ];

  const handleClick = (code) => {
    if(code === 'zaixian') {
      history.push(`/onlineMigration`);
    }
    if(code === 'physical_host') {
      history.push(`/offline/source`);
    }
  }
  return (
    <PageContainer
      header={{
        title: '',
      }}
      // content={'助力企业更好地体验上云之旅'}
    >
      <Card className={styles.heder}>
        {/*<span className={styles.title}>助力企业更好地体验上云之旅</span>*/}
        <Title level={3}>助力企业更好地体验上云之旅</Title>
        <Text>本平台提供多种企业级数据迁移服务，主要包括物理主机迁，传统虚拟化，公有云等平台的系统和数据迁移到私有云平台。更多帮助参考</Text>
        <Link href="https://acm.lenovo.com/download/documents/%E8%81%94%E6%83%B3%E6%99%BA%E8%83%BD%E4%BA%91%E8%BF%81%E7%A7%BB%E5%B9%B3%E5%8F%B0%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C_v20220614.pdf" target="_blank">
          <DownloadOutlined/>用户手册
        </Link>
        {/*<p>本平台提供多种企业级数据迁移服务，主要包括物理主机迁，传统虚拟化，公有云等平台的系统和数据迁移到私有云平台。更多帮助参考 <DownloadOutlined/><a href="">用户手册</a></p>*/}
      </Card>
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
              <List.Item key={item.id} onClick={() => handleClick(item.code)}>
                <Card
                  hoverable
                  className={styles.card}
                  actions={[ <Button
                    style={{width:'200px'}}
                    type="primary"
                    key={item.id}
                    disabled={!item.code ? true : false}
                  >
                    {item.buttonText}
                  </Button>]}
                  cover={<img alt="" className={styles.cardAvatar} src={item.cover}/>}
                >
                  <Card.Meta
                    title={<a>{item.title}</a>}
                    description={
                      <Paragraph
                        className={styles.item}
                        // ellipsis={{
                        //   rows: 3,
                        // }}
                      >
                        {item.description}
                      </Paragraph>
                    }
                  />
                </Card>
              </List.Item>
            );
          }}
        />
      </div>
    </PageContainer>
  );
};
export default IndexPage
