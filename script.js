let intro = document.querySelector(".intro");
let logo = document.querySelector(".logoHeader");
let logoSpan = document.querySelectorAll(".logo");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add("active");
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.remove("active");
          span.classList.add("fade");
        }, (idx + 1) * 50);
      });
    }, 3000);

    setTimeout(() => {
      intro.style.top = "-100vh";
    }, 3200);
  });
});

const menu = document.querySelector(".menuContainer");
const navMenu = document.querySelector(".navMenu");

menu.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  menu.classList.toggle("opacity");
});

const popup = document.querySelector(".popupContainer");
const buttonx = document.getElementById("x")
function openPopup() {
  setTimeout(() => {
    popup.classList.add("top");
    console.log("funciona")
  }, 7000);
}
openPopup();

buttonx.addEventListener("click", ()=>{
  popup.classList.remove("top");
})
