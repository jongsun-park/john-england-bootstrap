const select = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

const slider = () => {
  let index = 0;
  const slider = select(".promotion_slider");
  const inner = select(".slider__inner");
  const sliders = selectAll(".slider__item");
  const prev = select(".prev-btn");
  const next = select(".next-btn");
  const gap = 10;
  const offset = sliders[0].getBoundingClientRect().width + gap;

  // console.log(inner.getBoundingClientRect().width);
  // console.log(offset);

  let perItems = Math.floor(slider.getBoundingClientRect().width / offset);

  // console.log("perItems", perItems);

  const resetButtons = () => {
    prev.classList.remove("inactive");
    next.classList.remove("inactive");
    if (index <= 0) {
      prev.classList.add("inactive");
    }

    if (index >= sliders.length - perItems) {
      next.classList.add("inactive");
    }
  };
  resetButtons();

  prev.addEventListener("click", () => {
    if (index <= 0) return;
    // console.log("clieck prev");
    index -= 1;
    // console.log(index);
    inner.style.transform = `translateX(${-offset * index}px)`;
    resetButtons();
  });
  next.addEventListener("click", () => {
    // console.log("clieck next");
    if (index >= sliders.length - perItems) return;
    index += 1;
    // console.log(index);
    inner.style.transform = `translateX(${-offset * index}px)`;
    resetButtons();
  });
};

const toggle = () => {
  const toggleButton = selectAll(".toggle-button");
  // console.log(toggleButton);
  toggleButton.forEach((el) => {
    el.addEventListener("click", () => {
      // console.log("toggle button clicked");
      el.classList.toggle("active");
    });
  });
};

const main = () => {
  slider();
  toggle();
};

main();
