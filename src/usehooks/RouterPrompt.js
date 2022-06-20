import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from "antd";
export function RouterPrompt(props) {
  const { when, onOK, onCancel, title, clearLocalStorage,okText, cancelText } = props;

  const history = useHistory();

  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (when) {
      history.block((prompt) => {
        setCurrentPath(prompt.pathname);
        setShowPrompt(true);
        return false;
      });
    } else {
      history.block(() => {});
    }

    return () => {
      history.block(() => {});
    };
  }, [history, when]);

  const handleOK = useCallback(async () => {
    if (onOK) {
      clearLocalStorage();
      const canRoute = await Promise.resolve(onOK());
      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
  }, [currentPath, history, onOK]);

  const handleCancel = useCallback(async () => {
    if (onCancel) {
      const canRoute = await Promise.resolve(onCancel());
      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
    setShowPrompt(false);
  }, [currentPath, history, onCancel]);

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return showPrompt ? (
    <Modal
      title={title}
      visible={showPrompt}
      onOk={handleOK}
      // okText={okText}
      onCancel={handleCancel}
      // cancelText={cancelText}
      closable={true}
    >
      如果您确定要离开该页面，您输入的数据将得不到保存！
    </Modal>
  ) : null;
}
