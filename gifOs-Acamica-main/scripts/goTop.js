let intervalId = 0;

function scrollStep() {
  if (window.pageYOffset === 0) {
    clearInterval(intervalId);
  }
  window.scroll(window.pageYOffset, 0);
}
