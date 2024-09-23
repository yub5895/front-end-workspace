// 다른곳에서 사용하려면 export로 내보내야한다.

const a = 5;
const b = 10;

const plus = () => {
  return a + b;
};

const minus = () => {
  return a - b;
};

// 일일히 export를 붙이는 게 아닌, 한 곳에 담아 한 번에 내보내는 방법
export default { a, b, plus, minus };
