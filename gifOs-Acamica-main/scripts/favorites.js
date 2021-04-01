/**Variables**/
let fav_gifos = document.getElementById("fav_gifos");
const fav_icon = "./assets/icon-fav-sin-contenido.svg";
const fav_act_img = "./assets/icon-fav-active.svg";
let favoriteArray = [];
let favoriteString = localStorage.getItem("favoriteGifos");

/**Agregar a favoritos**/
function addFavorite(gifoId) {
  let iconFav = document.getElementById("icon-fav-" + gifoId);
  iconFav.src = fav_act_img;
  addFav(gifoId);
}

function addFav(gifo) {
  if (favoriteString == null) {
    favoriteArray = [];
  } else {
    favoriteArray = JSON.parse(favoriteString);
  }
  favoriteArray.push(gifo);
  favoriteString = JSON.stringify(favoriteArray);
  localStorage.setItem("favoriteGifos", favoriteString);
}

/**Renderizar favoritos**/
function renderFavorites() {
  fav_gifos.innerHTML = "";
  if (favoriteString == null || favoriteString == "[]") {
    fav_gifos.classList.remove("grid");
    noResults(
      fav_icon,
      fav_gifos,
      "Guarda tu primer GIFO en favoritos para que se muestre aquí"
    );
  } else {
    favoriteArray = JSON.parse(favoriteString);
    let urlFavorites = `https://api.giphy.com/v1/gifs?ids=${favoriteArray.toString()}&api_key=${api_key}`;
    getSectionsData(urlFavorites, fav_gifos, fav_act_img, fav_remove, fav);
  }
}

/**Eliminar favoritos**/
function removeFav(gifo) {
  let arrayAux = [];
  arrayAux = JSON.parse(favoriteString);
  let index = arrayAux.indexOf(gifo);
  arrayAux.splice(index, 1);

  let newFavoritesString = JSON.stringify(arrayAux);
  localStorage.setItem("favoriteGifos", newFavoritesString);

  /**Cambiar icono */
  let eraseIconFav = document.getElementById("icon-fav-" + gifo);
  eraseIconFav.setAttribute("src", "./assets/icon-fav-hover.svg");

  /**Recargar pagina */
  location.reload();
}

/**Descargar gifo**/
async function downloadGifo(gifoImg, gifoName) {
  let blob = await fetch(gifoImg).then((img) => img.blob());
  invokeSaveAsDialog(blob, gifoName + "myGifo.gif");
}
