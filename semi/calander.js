document.addEventListener("DOMContentLoaded", function () {
  const Calendar = FullCalendar.Calendar;

  const calendarEl = document.getElementById("calendar");

  const calendar = new Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    selectable: true,
    editable: true,
    dateClick: function (info) {
      const month = calendarEl
        .querySelector(".fc-toolbar-title")
        .innerText.split(" ")[0];
      const clickedDate = info.dateStr;
      const selectedMonth = info.date.getMonth(); // 0부터 시작하는 월 인덱스
      // 예: 7월 (8월의 경우 7로 설정)
      if (selectedMonth === 0 && month === "January") {
        showModal(clickedDate);
      } else if (selectedMonth === 1 && month === "February") {
        showModal(clickedDate);
      } else if (selectedMonth === 2 && month === "March") {
        showModal(clickedDate);
      } else if (selectedMonth === 3 && month === "April") {
        showModal(clickedDate);
      } else if (selectedMonth === 4 && month === "May") {
        showModal(clickedDate);
      } else if (selectedMonth === 5 && month === "June") {
        showModal(clickedDate);
      } else if (selectedMonth === 6 && month === "July") {
        showModal(clickedDate);
      } else if (selectedMonth === 7 && month === "August") {
        showModal(clickedDate);
      } else if (selectedMonth === 8 && month === "September") {
        showModal(clickedDate);
      } else if (selectedMonth === 9 && month === "October") {
        showModal(clickedDate);
      } else if (selectedMonth === 10 && month === "November") {
        showModal(clickedDate);
      } else if (selectedMonth === 11 && month === "December") {
        showModal(clickedDate);
      }
    },
  });

  calendar.render();

  function showModal() {
    $("#bigModal").slideDown();
    if (modal.css("display") === "none") {
      modal.slideUp(400);
    }
  }

  /*
  document.getElementById("X").addEventListener("click", function () {
    document.getElementById("bigModal").style.display = "none";
  });
*/
  $("#X").click(function () {
    $("#bigModal").slideUp(400);
  });
});

$("#six").click(function () {
  $("#detModal").slideDown(400);
  $("#detModal").css("display", "block");
  $("#bigModal").css("display", "none");
});

$("#X2").click(function () {
  $("#detModal").slideUp(400);
  $("#bigModal").css("display", "block");
});

$("#groupmake").click(function () {
  $("#modal1").css("display", "block");
});

$(".close").click(function () {
  $(".modal").css("display", "none");
});

$(window).click(function (event) {
  if ($(event.target).is(".modal")) {
    $(".modal").css("display", "none");
  }
});

$(document).keydown(function (event) {
  if (event.keyCode == 27) {
    $(".modal").css("display", "none");
  }
});

$("#addgroup").mouseover((e) => {
  setTimeout(() => {
    let content = $(".modalgroup");

    if (content.css("display") === "none") {
      content.fadeIn(450);
    }
  }, 400);
});

$("#calendar-container").mouseover((e) => {
  let content = $(".modalgroup");

  if (content.css("display") != "none") {
    content.fadeOut(200);
  }
});

$("#addgroup").mouseout((e) => {
  let content = $(".modalgroup");

  if (content.css("display") != "none") {
    setTimeout(function () {
      content.fadeOut(200);
    }, 3000);
  }
});
/*
$("#calendar-container").mouseout((e) => {
  let content = $(".modalgroup");

  if (content.css("display") != "none") {
    content.fadeOut(200);
  }
});
*/

$("#grouppart").click(function () {
  $("#modal2").css("display", "block");
});

$(".close").click(function () {
  $(".modal").css("display", "none");
});

$(window).click(function (event) {
  if ($(event.target).is(".modal")) {
    $(".modal").css("display", "none");
  }
});

$(document).keydown(function (event) {
  if (event.keyCode == 27) {
    $(".modal").css("display", "none");
  }
});

$(".more").click(function () {
  $("#modal3").css("display", "block");
});
/*
$(window).resize(function () {
  if ($(window).height() < 830) {
    $(".group2").css("display", "none");
  }
});

$(window).resize(function () {
  if ($(window).height() < 830) {
    $("span").css("display", "none");
  }
});*/
/*
$(window).resize(function () {
  if ($(".group2").height() == $(".more").height()) {
    $(".group2").css("display", "none");
  }
});
*/

/*
$(document).ready(function () {
  function checkCollision() {
    const more = $(".more");
    const moreOffset = more.offset();
    const moreHeight = more.outerHeight();

    $(".group2").each(function () {
      const group = $(this);
      const groupOffset = group.offset();
      const groupHeight = group.outerHeight();

      const topheight = !(
        moreOffset.top + moreHeight < groupOffset.top ||
        moreOffset.top > groupOffset.top + groupHeight
      );

      if (topheight) {
        group.css("display", "none");
      }
    });
  }

  $(window).on("scroll resize", checkCollision);

  checkCollision();
});

$(document).ready(function () {
  function checkCollision() {
    const more = $(".more");
    const moreOffset = more.offset();
    const moreHeight = more.outerHeight();

    $("span").each(function () {
      const group = $(this);
      const groupOffset = group.offset();
      const groupHeight = group.outerHeight();

      const topheight = !(
        moreOffset.top + moreHeight < groupOffset.top ||
        moreOffset.top > groupOffset.top + groupHeight
      );

      if (topheight) {
        group.css("display", "none");
      }
    });
  }

  $(window).on("scroll resize", checkCollision);

  checkCollision();
});
*/

$(".user").click(function () {
  $(".mymodal").css("display", "block");
});

$("#calendar-container").mouseover((e) => {
  let content = $(".mymodal");

  if (content.css("display") != "none") {
    content.fadeOut(200);
  }
});

$(".user").mouseout((e) => {
  let content = $(".mymodal");

  if (content.css("display") != "none") {
    setTimeout(function () {
      content.fadeOut(200);
    }, 3000);
  }
});

$documnet.ready(function () {
  $("#add2").on("click", function () {
    const groupName = $("#testGroup").val().trim();
    if (groupName.length >= 2) {
      const initials = groupName.subString(0, 2).toUpperCase();
      $("#group5").text(initials);
    } else {
      $("#group5").text("N/A");
    }
  });
});
