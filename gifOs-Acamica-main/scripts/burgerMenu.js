/**Variables**/
const burger = document.getElementById("burger");
const burger_icon = document.getElementById("burger_icon");
const menu = document.getElementById("menu");

/**Mostrar menu */
burger.addEventListener("click", () => {
  burger_icon.classList.toggle("fa-bars");
  burger_icon.classList.toggle("fa-times");
  menu.classList.toggle("invisible");
  menu.classList.toggle("visible");
});
