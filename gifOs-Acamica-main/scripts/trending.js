//Variables
const api_key = "eyRxfhyq7dyHJXfqhaaBX0xX8ehcicw8";
const url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=100`;
const slider = document.getElementById("slider");
const icon_search = "./assets/icon-busqueda-sin-resultado.svg";
const results_grid = document.getElementById("results_grid");
const more_btn = document.getElementById("more_btn");
const fav_img = "./assets/icon-fav.svg";
const fav_add = "addFavorite";
const fav_remove = "removeFav";
const erase_gifo = "erase";
const fav = "fav";

/***Trending Gifos***/

function gifoBoxTemplate(gifo, leftButton, leftFunction, type) {
  return `<div class="gifo" onclick="fullGifosMobile('${gifo.images.downsized.url}', '${gifo.id}', '${gifo.slug}', '${gifo.username}', '${gifo.title}')">
            <img class="gifo__img" src=${gifo.images.downsized.url} alt=${gifo.title} >
                <div class="gifo__hover">
                    <div class="gifo__buttons">
                        <button class="gifo__btn">
                            <img src=${leftButton} alt="${type}" class="${type}_btn" id="icon-${type}-${gifo.id}" onclick="${leftFunction}('${gifo.id}')">
                        </button>
                        <button class="gifo__btn">
                            <img src="./assets/icon-download-hover.svg" alt="download" class="download_btn" onclick="downloadGifo('${gifo.images.downsized.url}', '${gifo.slug}')">
                        </button>
                        <button class="gifo__btn">
                            <img src="./assets/icon-max-hover.svg" alt="fullsize" class="max_btn" onclick="fullGifosDesktop('${gifo.images.downsized.url}', '${gifo.id}', '${gifo.slug}', '${gifo.username}', '${gifo.title}')">
                        </button>
                    </div>
                    <div class="gifo__text">
                        <p>${gifo.username}</p>
                        <h6>${gifo.title}</h6>
                    </div>
                </div>
        </div>`;
}

//Sin resultados
function noResults(iconUrl, place, msg) {
  place.innerHTML = "";
  let cont = document.createElement("div");
  cont.classList.add("error_msg");
  let text = document.createElement("p");
  text.classList.add("no_results_title");
  text.textContent = msg;
  let icon = document.createElement("img");
  icon.src = iconUrl;
  cont.appendChild(icon);
  cont.appendChild(text);
  place.appendChild(cont);
}

//Renderizar gifos
function renderAllGifos(arrayGifos, container, favButton, favFunction, type) {
  let content = "";

  if (arrayGifos.data.length == 0) {
    container.classList.remove("grid");
    noResults(icon_search, results_grid, "Intenta con otra búsqueda");
    more_btn.classList.add("invisible");
  } else {
    for (const gifo of arrayGifos.data) {
      content += gifoBoxTemplate(gifo, favButton, favFunction, type);
      more_btn.classList.remove("invisible");
    }
    container.innerHTML += content;
    if (
      arrayGifos.pagination.total_count <=
      arrayGifos.pagination.offset + 12
    ) {
      more_btn.classList.add("invisible");
    }
  }
}

//Obtener datos de la API de giphy
function getSectionsData(url, container, favButton, favFunction, type) {
  fetch(url)
    .then((response) => response.json())
    .then((content) => {
      renderAllGifos(content, container, favButton, favFunction, type);
    })
    .catch((error) => console.log(error));
}

//Renderizar trending gifos
function renderTrendingGifos(
  arrayGifos,
  container,
  favButton,
  favFunction,
  type
) {
  let content = "";

  for (const gifo of arrayGifos.data) {
    content += gifoBoxTemplate(gifo, favButton, favFunction, type);
  }
  container.innerHTML += content;
}

//Obtener data de la API de giphy
function getTrendingData(url, container, favButton, favFunction, type) {
  fetch(url)
    .then((response) => response.json())
    .then((content) => {
      renderTrendingGifos(content, container, favButton, favFunction, type);
    })
    .catch((error) => console.log(error));
}

function trendings() {
  getTrendingData(url_trending, slider, fav_img, fav_add, fav);
}

trendings();
