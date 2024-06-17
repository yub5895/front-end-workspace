const id = document.querySelector("#id");
const idSpan = document.querySelector("#idSpan");

id.addEventListener("input", function (e) {
  const regExp = /^[a-zA-Z][a-zA-Z0-9]{3,11}$/;
  const check = regExp.test(id.value);

  if (check) {
    idSpan.style.color = "green";
    idSpan.innerHTML = "OK!";
  } else {
    idSpan.style.color = "red";
    idSpan.innerHTML = "NO!";
  }
});
