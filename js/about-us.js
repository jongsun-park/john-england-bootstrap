const animatedText = () => {
  const blockquotes = document.querySelectorAll(".blockquote mark");
  const marks = document.querySelectorAll("mark");

  blockquotes.forEach((mark) => {
    mark.style.color = "white";
  });

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
