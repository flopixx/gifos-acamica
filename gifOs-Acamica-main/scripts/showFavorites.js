/**Variables**/
const fav_link = document.getElementById("fav_link");
const favorites = document.getElementById("favorites");
const hero = document.getElementById("hero");
const results = document.getElementById("results");
const create = document.getElementById("create");

fav_link.addEventListener("click", (e)=> {
  e.preventDefault();
  scrollStep(); 
  hero.classList.add("hide");
  results.classList.add("hide");
  my_gifos.classList.add("hide");
  create.classList.add("hide");
  favorites.classList.remove("hide");
  renderFavorites();
});
