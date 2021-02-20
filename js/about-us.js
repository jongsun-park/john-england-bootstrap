const animatedText = () => {
  const marks = document.querySelectorAll("mark");
  // console.log(marks);
  marks.forEach((mark, index) => {
    setTimeout(() => {
      mark.classList.add("mark");
    }, 300 * index);
  });
};

const main = () => {
  // console.log("js loaded");
  animatedText();
};

main();
