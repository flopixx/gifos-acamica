/**Varibles**/
const create_link = document.getElementById("create_link");
const trending = document.getElementById("trending");

create_link.addEventListener("click", (e)=> {
  e.preventDefault();
  scrollStep(); 
  hero.classList.add("hide");
  results.classList.add("hide");
  favorites.classList.add("hide");
  trending.classList.add("hide");
  my_gifos.classList.add("hide");
  create.classList.remove("hide");
});

