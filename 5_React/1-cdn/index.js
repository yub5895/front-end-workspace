// export로 내보낸 것들을 import로 불러온다. ex) import {a, b, plus, minus} from ".calculator.js";
// 다만 번거로운 경우, * as calculator를 사용해 모두 불러온다.
// export에서 default를 명시한 경우 * as가 빠져도 된다.

import calculator from "./calculator.js";
import lodash from "lodash";

// 함수의 경우 뒤에 ()를 붙여 호출해준다. 모두 불러오기를 사용한 경우, 앞에 calculator에서 불러옴을 명시해줘야 한다.
console.log(calculator.a, calculator.b, calculator.plus(), calculator.minus());

const arr = [1, 1, 1, 1, 4, 4, 3, 3, 6, 7, 1, 3];
const unique = lodash.uniqBy(arr);

console.log(unique);
