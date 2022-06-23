import React, {useEffect, useRef, useState} from 'react';
import {Card, Spin, Button, Progress, Row, Col, message, Form} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormSwitch,
  ProFormRadio, ProFormText,
} from '@ant-design/pro-form';
import TimelinePage from '@/components/Timeline'
import styles from '../style.less';
import {getInstallAgentPercent, getReportAnalysis, postInstallAgent,postreportAnalysis} from "@/pages/onlineMigration/service";
import {useInterval} from "@/utils"

export default (props) => {
  const {twoFormRef, setTwoNextBt,current} = props;
  const [lineList, setLineList] = useState([]);
  const [percent, setPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState('');
  const [spinning, setPpinning] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const id = localStorage.getItem('onlineTask_id');
  const rules = [{ required: true}];

  useEffect(() => {
    getData();
    getAgentPercent();
  }, [current])

  const getData = async () => {
    const onlineOneData = JSON.parse(localStorage.getItem('onlineOne'));
    if(!onlineOneData) return;
    setPpinning(true)
    const res = await postreportAnalysis(onlineOneData);
    console.log(res);
    const {data} = await getReportAnalysis({id: id});
    setPpinning(false)
    const status = data.some(item => {
      return item.status === 'running'
    })
    if (status) {
      setLoading('加载中...')
    } else {
      setLoading('')
    }
    setLineList([...data]);
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
    getAgentPercent();
  }, isRunning ? 5000 : null);

  const getAgentPercent = async (id) => {
    const agentId = localStorage.getItem('installAgentID');
    if(!agentId) return;
    const {code, data} = await getInstallAgentPercent({id:agentId});
    if (code === 200) {
      setPercent(data.percent);
      if (data.percent < 100) {
        // getAgentPercent(id);
        setIsRunning(true);
      } else {
        setIsRunning(false);
        setTwoNextBt(true);
        setTwoNextBt(setDisabled);
      }
    }
  }
  return (
    <div className={styles.cardList}>
      <Spin spinning={spinning} tip="Loading...">
        <Row gutter={24}>
          <Col span={12}>
            <Card
              title="源主机诊断"
              headStyle={{fontWeight: 'bold'}}
              style={{height: 556}}
              className={styles.leftCard}
            >
              <TimelinePage loading={loading} lineList={lineList}/>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="安装客户端"
              // style={{height:556}}
              // className={styles.rightCard}
              bodyStyle={{height: 440}}
              headStyle={{fontWeight: 'bold'}}
              actions={[<Button disabled={disabled} type="primary" key="1" onClick={handleClickAgent}>安装客户端</Button>]}
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
                rules={rules}
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
      </Spin>
    </div>
  );
};
