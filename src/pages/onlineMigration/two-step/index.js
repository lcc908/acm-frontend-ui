import React, {useEffect, useRef, useState} from 'react';
import {Card, Timeline, Button, Progress, Row, Col, message, Form} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormSwitch,
  ProFormRadio, ProFormText,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card'
import styles from '../style.less';
import {getInstallAgentPercent, getReportAnalysis, postInstallAgent} from "@/pages/onlineMigration/service";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default (props) => {
  const {twoFormRef, setTwoNextBt} = props;
  const [lineList, setLineList] = useState([]);
  const [percent, setPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  // localStorage.setItem('onlineTask_id',res.data.id)
  const id = localStorage.getItem('onlineTask_id');
  const rules = [{ required: true, message: '这是必填项' }];

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    const {data} = await getReportAnalysis({id: id});
    setLineList([...data]);
    // oneFormRef?.current?.setFieldsValue({
    //   ...data
    // });
  }

  const handleClickAgent = async () => {
    const val = await twoFormRef.current?.validateFieldsReturnFormatValue();
    val.task_id = id;
    const {code, data} = await postInstallAgent(val);
    if (code === 200) {
      message.success('已提交安装客户端');
      console.log(data);
      localStorage.setItem('installAgentID', data.id);
      getAgentPercent(data.id)
      // getInstallAgentPercent
    }
    // console.log(res);
    //
  }
  useInterval(() => {
    getAgentPercent(localStorage.getItem('installAgentID'));
  }, isRunning ? 5000 : null);

  const getAgentPercent = async (id) => {
    const {code, data} = await getInstallAgentPercent({id});
    if (code === 200) {
      setPercent(data.percent);
      if (data.percent < 100) {
        // getAgentPercent(id);
        setIsRunning(true);
      } else {
        setIsRunning(false);
        setTwoNextBt(false)
      }
    }
  }
  return (
    <div className={styles.cardList}>
      <Row gutter={24}>
        <Col span={12}>
          <Card
            title="源主机诊断"
            headStyle={{fontWeight: 'bold'}}
            style={{height: 556}}
            className={styles.leftCard}
          >
            {/*<Timeline pending="Recording...">*/}
            <Timeline>
              {
                lineList.length > 0 && lineList.map((item, index) => {
                  return <Timeline.Item key={index} color="green">{item.time} {item.description}</Timeline.Item>
                })
              }
              {/*<Timeline.Item color="green">2022-03-1 10:13:15 连接目标主机成功</Timeline.Item>*/}
              {/*<Timeline.Item color="green">2022-03-1 11:13:30  操作系统配置基线检查完成</Timeline.Item>*/}
              {/*<Timeline.Item color="green">2022-03-2 12:13:45  目标主机硬件环境检查完成</Timeline.Item>*/}
              {/*<Timeline.Item color="green">2022-03-3 11:13:45  网络连通性检查正常，能够访问ETL存储</Timeline.Item>*/}
              {/*<Timeline.Item color="green">2022-03-4 12:13:45 成功状态</Timeline.Item>*/}
              {/*<Timeline.Item color="gray">2022-03-5 14:13:11 警告状态</Timeline.Item>*/}
              {/*<Timeline.Item color="red">2022-03-5 14:13:11 失败状态</Timeline.Item>*/}
            </Timeline>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="安装客户端"
            // style={{height:556}}
            // className={styles.rightCard}
            bodyStyle={{height: 440}}
            headStyle={{fontWeight: 'bold'}}
            actions={[<Button type="primary" key="1" onClick={handleClickAgent}>安装客户端</Button>]}
          >
            <ProFormSelect
              name="package_name"
              label="软件包列表"
              initialValue="Linuxs_salt_agent.zip"
              options={[
                {
                  "label": "Windows_Salt_Agent.zip",
                  "value": "windows_salt_agent.zip"
                },
                {
                  "label": "Linux_Salt_Agent.zip",
                  "value": "Linuxs_salt_agent.zip"
                }
              ]}
            />
            <ProFormText
              name="install_path"
              label="安装位置"
              initialValue={'/acm_agent'}
              // rules={rules}
            />
            <ProFormRadio.Group
              label="服务启动"
              name="service_start_method"
              initialValue="one_time"
              options={[
                {label: '一次性', value: 'one_time'},
                {label: '加入系统服务', value: 'system_service'},
              ]}
            />
            <ProFormSwitch initialValue={false} name="if_firewall" label="防火墙启用"/>
            <div style={{marginTop: 80, textAlign: "center"}}>
              {
                percent > 0 && (
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    percent={percent}
                    size="small"
                    status="active"
                    strokeWidth={40}
                    style={{fontSize: 28}}
                  />
                )
              }

            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
