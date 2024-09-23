import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0); // let count=0;의 0이 여기로 들어감
  const plus = () => {
    setCount(count + 10);
  };
  const minus = () => {
    setCount(count - 10);
  };
  const reset = () => {
    setCount(0);
  };
  return (
    <div>
      <h1>Total Clicks : {count}</h1>
      <button onClick={plus}>+10</button>
      <button onClick={minus}>-10</button>
      <button onClick={reset}>Click!</button>
    </div>
  );
};

export default App;
