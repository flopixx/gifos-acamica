//Variables
const trendslider = document.getElementById("trendslider");
let start;
let change;

/**Slider mobile**/
trendslider.addEventListener("touchstart", (e) => {
  start = e.touches[0].clientX;
});

trendslider.addEventListener("touchmove", (e) => {
  e.preventDefault();
  let touch = e.touches[0];
  change = start - touch.clientX;
});

trendslider.addEventListener("touchend", slideShow);

function slideShow() {
  if (change > 0) {
    trendslider.scrollLeft += 200;
  } else {
    trendslider.scrollLeft -= 200;
  }
}

/**Slider Desktop */
const prev_btn = document.getElementById("prev");
const next_btn = document.getElementById("next");

prev_btn.addEventListener("click", (e) => {
  e.preventDefault();
  trendslider.scrollLeft -= 500;
});

next_btn.addEventListener("click", (e) => {
  e.preventDefault();
  trendslider.scrollLeft += 500;
});
