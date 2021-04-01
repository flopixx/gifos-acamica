/**Varibales */
const search_input = document.getElementById("search_input");
const search_btn = document.getElementById("search_btn");
const right_btn = document.getElementById("right_btn");
const right_icon = document.getElementById("right_icon");
const results_title = document.getElementById("results_title");
const url_search = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key;
const url_suggestions = "https://api.giphy.com/v1/tags/related/";
let autoComp = document.getElementById("autocomplete_content");
let offset = 0;
let value = "";

//Obtener datos de la API de giphy
function searchGifos() {
  results_grid.innerHTML = "";
  value = search_input.value.trim();
  results.classList.remove("hide");
  results_title.textContent = value;

  const search = url_search + "&limit=12&q=" + value + "/";
  getSectionsData(search, results_grid, fav_img, fav_add, fav);
  closeAutocompleteSection();
}

//Autocompletar sugerencias y buscar gifos con enter event

search_input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchGifos();
    console.log("buscando con enter");
  }

  value = search_input.value;
  if (value.length >= 1) {
    showAutocompleteSection();
    fetch(`${url_suggestions}${value}?api_key=${api_key}`)
      .then((response) => response.json())
      .then((data) => {
        suggestedTerms(data);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    closeAutocompleteSection();
  }
});

//Mostrar seccion de autocompletar
function showAutocompleteSection() {
  autoComp.style.display = "block";
  right_icon.classList.remove("fa-search");
  right_icon.classList.add("fa-times");
  search_btn.classList.remove("hide");
}

//Renderizar resultados
function suggestedTerms(terms) {
  let suggested = terms.data;
  autoComp.innerHTML = `
    <li class="suggested"> <i class="fas fa-search"></i> <p class="suggested__text">${suggested[0].name}</p></li>
    <li class="suggested"> <i class="fas fa-search"></i> <p class="suggested__text">${suggested[1].name}</p></li>
    <li class="suggested"> <i class="fas fa-search"></i> <p class="suggested__text">${suggested[2].name}</p></li>
    `;
}

//Ocultar autocompletar
function closeAutocompleteSection() {
  autoComp.style.display = "none";
  right_icon.classList.remove("fa-times");
  right_icon.classList.add("fa-search");
  search_btn.classList.add("hide");
}

//Buscar con sugerencias
autoComp.addEventListener("click", (li) => {
  search_input.value = li.target.textContent;
  searchGifos();
});

//Cancelar busqueda
right_btn.addEventListener("click", (e) => {
  search_input.value = "";
  search_input.placeholder = "Busca GIFOS y más";
  closeAutocompleteSection();
});

//Buscar gifos con click event
search_btn.addEventListener("click", searchGifos);

//Ver mas resultados
more_btn.addEventListener("click", (e) => {
  e.preventDefault();
  seeMoreResults();
});

//Renderizar 12 resultados mas
function seeMoreResults() {
  offset = offset + 12;
  value = search_input.value.trim();
  let search_more = url_search + "&limit=12&q=" + value + "&offset=" + offset;
  getSectionsData(search_more, results_grid, fav_img, fav_add, fav);
}

//Tendring topics

let trend_topics = document.getElementById("trend_topics");
window.onload = trendingTopics();

//Obtener datos de la api de giphy
function trendingTopics() {
  let url = `https://api.giphy.com/v1/trending/searches?api_key=${api_key}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((gifoWords) => {
      let topics = gifoWords.data;
      trend_topics.innerHTML = `
            <p class="trending__links">${topics[0]}</p>, 
            <p class="trending__links">${topics[1]}</p>, 
            <p class="trending__links">${topics[2]}</p>, 
            <p class="trending__links">${topics[3]}</p>, 
            <p class="trending__links">${topics[4]}</p>`;

      let topic_btns = document.getElementsByClassName("trending__links");
      for (let i = 0; i < topic_btns.length; i++) {
        topic_btns[i].addEventListener("click", function (e) {
          search_input.value = topics[i];
          searchGifos();
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
