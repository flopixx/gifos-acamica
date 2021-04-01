/**Variables**/
const my_gifos_link = document.getElementById("my_gifos_link");
const my_gifos = document.getElementById("my_gifos");

my_gifos_link.addEventListener("click", (e)=> {
  e.preventDefault();
  scrollStep(); 
  hero.classList.add("hide");
  results.classList.add("hide");
  favorites.classList.add("hide");
  create.classList.add("hide");
  my_gifos.classList.remove("hide");
  renderMyGifos();
});
