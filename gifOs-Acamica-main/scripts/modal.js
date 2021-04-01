/**Variables */
const max_btn = document.querySelectorAll(".max_btn");
const download_btn = document.querySelectorAll(".download_btn");
let modal;

/**Maximizar gifo mobile */
function fullGifosMobile(img, id, slug, user, title) {
  if (window.matchMedia("(max-width: 899px)").matches) {
    fullGifos(img, id, slug, user, title);
  }
}

/**Maximizar gifo desktop */
function fullGifosDesktop(img, id, slug, user, title) {
  if (window.matchMedia("(min-width: 900px)").matches) {
    fullGifos(img, id, slug, user, title);
  }
}

function fullGifos(img, id, slug, user, title) {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = ` 
    <div class="modal__container">
            <button class="close_modal_btn" onclick="closefullGifos()"><i class="fas fa-times"></i></button>
            <img src="${img}" alt="${id}" class="modal__img">
            <div class="modal__info">
                <div class="modal__text">
                    <p class="modal__user">${user}</p>
                    <p class="modal__title">${title}</p>
                </div>
                <div>
                    <button class="fav_btn" onclick="addFavorite('${id}')"><img src="./assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-${id}"></button>
                    <button class="download_btn" onclick="downloadGifo('${img}','${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
                </div>
            </div>
        </div>
    `;
  document.body.appendChild(modal);
}

/**Cerrar gifo */
function closefullGifos() {
  document.body.removeChild(modal);
}
