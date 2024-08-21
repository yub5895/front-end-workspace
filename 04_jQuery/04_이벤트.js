// 1. 이벤트 연결
// one
$("#area1").one("click", () => {
  alert("처음이자 마지막으로 이벤트 핸들러 실행");
});

// on
// $("#area2").on("mouseenter", (event) => {
//   // 여기서의 event는 굳이 안적어도 항상 숨겨져있음
//   $(event.target).css("background-color", "hotpink").text("마우스가 올라감");
// });

// 마우스가 내려갈 때(mouseleave)
// -> 배경 색상 : beige, 텍스트 : 마우스가 내려감
// $("#area2").on("mouseleave", (event) => {
//   $(event.target).css("background-color", "beige").text("마우스가 내려감");
// });
// $("#area2").on("mouseenter mouseleave", (event) => {
//   if (event.type === "mouseenter") {
//     $(event.target).css("background-color", "hotpink").text("마우스가 올라감");
//   } else if (event.type === "mouseleave") {
//     $(event.target).css("background-color", "beige").text("마우스가 내려감");
//   }
// });
// $("#area2").on("click", (event) => {
//   $(event.target)
//     .css("background-color", "white")
//     .text("")
//     .off("mouseenter mouseleave"); // mouseenter, mouseleave 이벤트 제거
// });
$("#area2").on({
  mouseenter: (event) => {
    $(event.target).css("background-color", "hotpink").text("마우스가 올라감");
  },
  mouseleave: (event) => {
    $(event.target).css("background-color", "beige").text("마우스가 내려감");
  },
  click: (event) => {
    $(event.target)
      .css("background-color", "white")
      .text("")
      .off("mouseenter mouseleave");
  },
});

// 2. 키보드 이벤트
// keydown, keypress, keyup
$("#textarea1").on({
  keydown: (e) => {
    // 키보드가 눌려질 때
    console.log(`keydown - e.key : ${e.key}, e.keyCode : ${e.keyCode}`);
  },
  keypress: (e) => {
    // 글자가 입력될 때
    console.log(`keypress - e.key : ${e.key}, e.keyCode : ${e.keyCode}`);
  },
  keyup: (e) => {
    // 키보드가 떼어질 때
    console.log(`keyup - e.key : ${e.key}, e.keyCode : ${e.keyCode}`);
  },
});

$("#textarea2").keyup((e) => {
  let target = $(e.target);
  let length = target.val().length;
  let maxLength = parseInt($("#maxLength").text());
  if (length > maxLength) {
    target.val(target.val().substr(0, maxLength));
  } else {
    $("#counter").text(length);
  }
});

$("#userId").keyup((e) => {
  let regExp = /^[a-z][a-z0-9]{3,11}$/;
  let check = regExp.test(userId.value);
  if (check) {
    $("#idCheck").text("사용 가능한 아이디입니다.").css("color", "green");
  } else if (check === "") {
    $("#idCheck").text("");
  } else {
    $("#idCheck").text("사용 불가한 아이디입니다.").css("color", "red");
  }
});

// 3. trigger
$("#area3").click(() => {
  let counter = $("#counter2");
  let current = parseInt(counter.text());
  counter.text(++current);
});
$("#btn").click(() => {
  $("#area3").trigger("click");
});
