import { useState, useCallback } from 'react';

export default () => {
  const [disKList,setdisKList] = useState([]);
  const setDisKList = useCallback((val) => {
    console.log(val);
    setdisKList([...val])
  }, [])
  return { disKList, setDisKList };
};
