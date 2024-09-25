import { useState, useEffect, useRef } from "react";
import Btn from "./Btn";

const Counter = () => {
  const [count, setCount] = useState(0); // let count=0;의 0이 여기로 들어감
  const updateCheckRef = useRef(false);
  const plus = () => {
    setCount(count + 10);
  };
  const minus = () => {
    setCount(count - 10);
  };
  const reset = () => {
    setCount(0);
  };

  // 마운트 -> 마운트의 경우 배열이 반드시 비어있어야한다. 가장 쉬움
  useEffect(() => {
    console.log("mount!");
  }, []); // useEffect는 반드시 앞은 함수 뒤는 배열

  // 업데이트 -> 가장 큰 단점이 업데이트되지 않았을때도 효과가 발동. 그래서 useRef와 if문을 함께써서 초기에 count update가 출력되지 않도록 함
  useEffect(() => {
    if (!updateCheckRef.current) {
      updateCheckRef.current = true;
      return;
    } else {
      console.log("count update!");
    }
  }, [count]);

  // 언마운트
  useEffect(() => {
    return () => {
      console.log("unmount!");
    };
  }, []);

  return (
    <>
      <h1>Total Clicks : {count}</h1>
      <Btn click={plus} text="+10" />
      <Btn click={minus} text="-10" />
      <Btn click={reset} text="reset" />
    </>
  );
};

export default Counter;
