/**Variables**/
const theme_btn = document.getElementById("theme_btn");
const body = document.getElementById("body");
const logo = document.getElementById("logo");
const camera = document.getElementById("camera");
const film_reel = document.getElementById("film_reel");
const theme_link = document.getElementById("theme_link");

theme_btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (body.classList == "") {
    body.classList.add("dark");
    create_img.src = "./assets/CTA-crear-gifo-modo-noc.svg";
    logo.src = "./assets/Logo-modo-noc.svg";
    camera.src = "./assets/camara-modo-noc.svg";
    film_reel.src = "./assets/pelicula-modo-noc.svg";
    theme_link.textContent = "Modo diurno";
  } else {
    body.classList.remove("dark");
    create_img.src = "./assets/button-crear-gifo.svg";
    logo.src = "./assets/logo-mobile.svg";
    camera.src = "./assets/camara.svg";
    film_reel.src = "./assets/pelicula.svg";
    theme_link.textContent = "Modo nocturno";
  }
});
