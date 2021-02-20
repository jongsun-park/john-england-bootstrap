const hide = (elm) => {
  gsap.set(elm, { autoAlpha: 0 });
};

const animateFrom = (elm, direction) => {
  direction = direction | 1;
  let x = 0,
    y = direction * 100;

  if (elm.classList.contains("gs_reveal_fromLeft")) {
    x = -50;
    y = 0;
  } else if (elm.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }

  gsap.fromTo(
    elm,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto",
    }
  );
};

const scroll = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".gs_reveal").forEach((elm) => {
    hide(elm);
    ScrollTrigger.create({
      trigger: elm,
      onEnter: function () {
        animateFrom(elm);
      },
      onEnterBack: function () {
        animateFrom(elm, -1);
      },
      onLeave: function () {
        hide(elm);
      }, // assure that the element is hidden when scrolled into view
    });
  });
};

scroll();
