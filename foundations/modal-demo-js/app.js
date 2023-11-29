const button = document.querySelector("button");
const modal = document.querySelector("#modal");
const close = document.querySelector("#close");

button.addEventListener("click", () => {
  modal.style.display = "block";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});
