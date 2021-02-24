gsap.registerPlugin(ScrollTrigger);

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

// custom function for scroll stagger
const batch = (targets, vars) => {
  let varsCopy = {},
    interval = vars.interval || 0.1,
    proxyCallback = (type, callback) => {
      let batch = [],
        delay = gsap
          .delayedCall(interval, () => {
            callback(batch);
            batch.length = 0;
          })
          .pause();
      return (self) => {
        batch.length || delay.restart(true);
        batch.push(self.trigger);
        vars.batchMax && vars.batchMax <= batch.length && delay.progress(1);
      };
    },
    p;
  for (p in vars) {
    varsCopy[p] =
      ~p.indexOf("Enter") || ~p.indexOf("Leave")
        ? proxyCallback(p, vars[p])
        : vars[p];
  }
  gsap.utils.toArray(targets).forEach((target) => {
    let config = {};
    for (p in varsCopy) {
      config[p] = varsCopy[p];
    }
    config.trigger = target;
    ScrollTrigger.create(config);
  });
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

  batch(".gallery-item", {
    interval: 0.1, // time window (in seconds) for batching to occur. The first callback that occurs (of its type) will start the timer, and when it elapses, any other similar callbacks for other targets will be batched into an array and fed to the callback. Default is 0.1
    batchMax: 5, // maximum batch size (targets)
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, stagger: 0.5, overwrite: true }),
    onLeave: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
    // you can also define things like start, end, etc.
  });
};

scroll();
