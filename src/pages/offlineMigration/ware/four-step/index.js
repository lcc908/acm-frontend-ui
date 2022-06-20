import React, { useRef, useState } from 'react';
import {Collapse , Button} from 'antd';
import ProForm,{
  ProFormSelect,
} from '@ant-design/pro-form';
import { LoadingOutlined,CloseCircleTwoTone,CheckCircleTwoTone } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card'

const { Panel } = Collapse;

export default (props) => {
  const { fourFormRef, form, stepData } = props;
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const callback = (key) => {
    // console.log(key);
  }
  const genExtra = (data) => {
    if(data === 1) {
      return <LoadingOutlined
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    }
    if(data === 2) {
      return <CloseCircleTwoTone twoToneColor="#ff4d4f"
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    }
    return <CheckCircleTwoTone twoToneColor="#52c41a"
      onClick={event => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  };
  return (
    <>
      <ProCard
        title="任务日志"
        headerBordered
        bordered
      >
        <ProForm.Group>
          <ProFormSelect
            width="md"
            fieldProps={{
              labelInValue: true,
            }}
            // request={async () => [
            //   { label: '全部', value: 'all' },
            //   { label: '未解决', value: 'open' },
            //   { label: '已解决', value: 'closed' },
            //   { label: '解决中', value: 'processing' },
            // ]}
            options={[
              { label: '10.122.79.101', value: 'all' },
              { label: '10.122.79.101', value: 'open' },
              { label: '10.122.79.101', value: 'closed' },
              { label: '10.122.79.101', value: 'processing' },
            ]}
            name="useMode"
            label="IP"
            addonAfter={
              <Button type="primary">更新</Button>
            }
          />
        </ProForm.Group>
        <Collapse onChange={callback}>
          <Panel header="This is panel header 1" key="1"extra={genExtra(1)}>
            <Collapse defaultActiveKey="1">
              <Panel header="This is panel nest panel" key="1">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </Panel>
          <Panel header="This is panel header 2" key="2" extra={genExtra(2)}>
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3" extra={genExtra(3)}>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </ProCard>
    </>
  );
};
