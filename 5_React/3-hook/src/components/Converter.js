import { useState, useEffect } from "react";
import Btn from "./Btn";

const Converter = () => {
  const [minute, setMinute] = useState("");
  const [hour, setHour] = useState("");
  const [text, setText] = useState("Minutes => Hours");
  const [bool, setBool] = useState(false);
  const [number, setNumber] = useState("");
  /* 내가했던 방식
  const write = (e) => {
    const value = e.target.value;
    setMinute(value);
    setHour(value / 60);
  };

  const write2 = (e) => {
    const value = e.target.value;
    setMinute(value * 60);
    setHour(value);
  }; 
  */

  const change = (e) => {
    setNumber(e.target.value);
  };

  const invert = () => {
    setBool(!bool);
    reset();
  };

  const reset = () => {
    setNumber("");
  };

  useEffect(() => {
    if (bool) {
      setText("Hours => Minutes");
    } else {
      setText("Minutes => Hours");
    }
  }, [bool]);

  return (
    <>
      <h1>Time Converter</h1>
      <p>
        Minutes :{" "}
        <input
          type="number"
          onChange={change}
          value={bool ? number * 60 : number}
          placeholder="Minutes"
          disabled={bool}
        />
      </p>

      <p>
        Hours :{" "}
        <input
          type="number"
          value={bool ? number : Math.floor(number / 60)}
          placeholder="Hours"
          disabled={!bool}
          onChange={change}
        />
      </p>
      <Btn click={reset} text="Reset" />
      <Btn click={invert} text={text} />
    </>
  );
};

export default Converter;
