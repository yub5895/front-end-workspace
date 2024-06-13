/* window.addEventListener("이벤트명", function () {}); window는 가장 최상위 객체로
    script link를 head에 건 경우 사용 */
// DOMContentLoaded : DOM 구조가 로드되고 실행!
window.addEventListener("DOMContentLoaded", function () {
  const h1 = document.querySelector("h1");
  console.log(h1);
  h1.onmouseenter = function () {
    h1.style.backgroundColor = "purple";
  };
  h1.onmouseleave = function () {
    h1.style.backgroundColor = "pink";
  };
  // addEventListener만 기억하셔도 괜찮아요!
  h1.addEventListener("click", function () {
    h1.style.backgroundColor = "skyblue";
  });
});

const img = document.querySelectorAll("img");
console.log(img);

/* 이미지마다 이벤트 걸려면 반복문 필요! */
/* for (const i in img)
  img[i].addEventListener("click", function (e) {
     event.currentTarget.stlye.display = "none"; // <-이걸로 써도되며 이경우 function에 e 추가필요. e는 event의 약자
    img[i].style.display = "none";
  }); */

const container = document.querySelector(".container");

function removeHandler(e) {
  if (e.target !== e.currentTarget) {
    e.target.style.display = "none";
  }
}

container.addEventListner("click", removeHandler);
