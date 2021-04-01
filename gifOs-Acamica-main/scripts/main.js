/**Cambio en navbar cuando se hace scrolldown*/
const debounce = (fn) => {
  let frame;
  return (...params) => {
    if (frame) {
      cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  };
};

const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
};
document.addEventListener("scroll", debounce(storeScroll), { passive: true });
storeScroll();

/**Cambio de img en navbar cuando se hace hover */
const create_img = document.getElementById("create_img");

create_img.addEventListener("mouseover", () => {
  if (body.classList == "") {
    create_img.src = "./assets/CTA-crear-gifo-hover.svg";
  } else {
    create_img.src = "./assets/CTA-crear-gifo-hover-modo-noc.svg";
  }
});

create_img.addEventListener("mouseout", () => {
  if (body.classList == "") {
    create_img.src = "./assets/button-crear-gifo.svg";
  } else {
    create_img.src = "./assets/CTA-crear-gifo-modo-noc.svg";
  }
});
