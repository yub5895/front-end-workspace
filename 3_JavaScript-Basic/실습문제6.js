function count() {
  // 지금 현재 날짜와 비교해야 할 날짜
  const now = new Date();
  const last = new Date("2025-01-01 00:00:00");
  console.log(last - now); // 밀리세컨드

  const second = Math.floor((last - now) / 1000); // 1초 = 밀리세컨드/1000
  const minute = Math.floor(second / 60); // 60초 = 1분
  const hour = Math.floor(minute / 60); // 60분 = 1시간
  const day = Math.floor(hour / 24); // 24시간 = 1일
  console.log(second);
  // 1초 = 밀리세컨드/1000, 60초 = 1분, 60분 = 1시간, 24시간 = 1일

  clock.innerHTML = `${day}일 ${hour % 24}시 ${minute % 60}분 ${String(
    second % 60
  ).padStart(2, "0")}초`;
}

count();

setInterval(count, 1000);
