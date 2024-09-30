const wrapLines = (arr, wrapType, wrapClass) => {
  arr.forEach((el) => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    el.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(el);
  });
};

class TextLinesReveal {
  // DOM elements
  DOM = {
    // main element (a text DOM element)
    el: null,
  };
  // Split Type instance
  SplitTypeInstance;
  // Checks if the Split Type lines are visible or not
  isVisible;
  // Animation timelines
  inTimeline;
  outTimeline;

  /**
   * Constructor.
   * @param {Element} DOM_el - a text DOM element
   */
  constructor(DOM_el) {
    this.DOM = {
      el: DOM_el,
    };

    this.SplitTypeInstance = new SplitType(this.DOM.el, { types: "lines" });
    // Wrap the lines (div with class .oh)
    // The inner child will be the one animating the transform
    wrapLines(this.SplitTypeInstance.lines, "div", "oh");

    this.initEvents();
  }

  /**
   * Animates the lines in.
   * @return {GSAP Timeline} the animation timeline
   * @param {Boolean} animation - with or without animation.
   */
  in(animation = true) {
    // Lines are visible
    this.isVisible = true;

    gsap.killTweensOf(this.SplitTypeInstance.lines);
    this.inTimeline = gsap
      .timeline({
        defaults: {
          duration: 1.1,
          ease: "power4.inOut",
        },
      })
      .addLabel("start", 0)
      .set(
        this.SplitTypeInstance.lines,
        {
          yPercent: 105,
        },
        "start"
      );

    if (animation) {
      this.inTimeline.to(
        this.SplitTypeInstance.lines,
        {
          yPercent: 0,
          stagger: 0.05,
        },
        "start"
      );
    } else {
      this.inTimeline.set(
        this.SplitTypeInstance.lines,
        {
          yPercent: 0,
        },
        "start"
      );
    }

    return this.inTimeline;
  }

  /**
   * Animates the lines out.
   * @param {Boolean} animation - with or without animation.
   * @return {GSAP Timeline} the animation timeline
   */
  out(animation = true) {
    // Lines are invisible
    this.isVisible = false;

    gsap.killTweensOf(this.SplitTypeInstance.lines);

    this.outTimeline = gsap
      .timeline({
        defaults: {
          duration: 1.1,
          ease: "power4.inOut",
        },
      })
      .addLabel("start", 0);

    if (animation) {
      this.outTimeline.to(
        this.SplitTypeInstance.lines,
        {
          yPercent: -105,
          stagger: 0.05,
        },
        "start"
      );
    } else {
      this.outTimeline.set(
        this.SplitTypeInstance.lines,
        {
          yPercent: -105,
        },
        "start"
      );
    }

    return this.outTimeline;
  }

  /**
   * Initializes some events.
   */
  initEvents() {
    // Re-initialize the Split Text on window resize.
    window.addEventListener("resize", () => {
      // Re-split text
      // https://github.com/lukePeavey/SplitType#instancesplitoptions-void
      this.SplitTypeInstance.split();

      // Need to wrap again the new lines elements (div with class .oh)
      wrapLines(this.SplitTypeInstance.lines, "div", "oh");

      // Hide the lines
      if (!this.isVisible) {
        gsap.set(this.SplitTypeInstance.lines, { yPercent: 105 });
      }
    });
  }
}

class Preview {
  // DOM elements
  DOM = {
    // main element (.preview)
    el: null,
    // image element (.preview__img)
    image: null,
    // image inner element (.preview__img-inner)
    imageInner: null,
    // title
    title: null,
    // backCtrl
    backCtrl: null,

    // oh__inner elements
    innerElements: null,
    multiLineWrap: null,
  };
  multiLines = [];

  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.preview)
   */
  constructor(DOM_el) {
    this.DOM.el = DOM_el;
    this.DOM.image = this.DOM.el.querySelector(".preview__img");
    this.DOM.imageInner = this.DOM.el.querySelector(".preview__img-inner");
    this.DOM.title = this.DOM.el.querySelector(".preview__title");
    this.DOM.backCtrl = this.DOM.el.querySelector(".preview__back");

    this.DOM.innerElements = [...this.DOM.el.querySelectorAll(".oh__inner")];
    // the TextLinesReveal instance (animate each text line using the SplitText library)
    this.DOM.multiLineWrap = [
      ...this.DOM.el.querySelectorAll(".preview__column > p"),
    ];
    this.DOM.multiLineWrap.forEach((line) =>
      this.multiLines.push(new TextLinesReveal(line))
    );
  }
}

class Item {
  // DOM elements
  DOM = {
    // main element (.item)
    el: null,
    // image element (.item__img)
    image: null,
    // image inner element (.item__img-inner)
    imageInner: null,
    // item link (.item__link)
    link: null,
    // item meta (.item__meta)
    meta: null,
    // item link (.item__title)
    title: null,
    // item link (.item__desc)
    desc: null,
  };

  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.item)
   * @param {Preview} previewEl - the Preview element
   */
  constructor(DOM_el, previewEl) {
    this.DOM.el = DOM_el;
    this.preview = previewEl;
    this.DOM.image = this.DOM.el.querySelector(".item__img");
    this.DOM.imageInner = this.DOM.el.querySelector(".item__img-inner");
    this.DOM.link = this.DOM.el.querySelector(".item__link");
    this.DOM.meta = this.DOM.el.querySelector(".item__meta");
    this.DOM.title = this.DOM.el.querySelector(".item__title");
    this.DOM.desc = this.DOM.el.querySelector(".item__desc");

    this.DOM.link.addEventListener("mouseenter", () => {
      gsap.killTweensOf(this.DOM.imageInner);
      gsap.to(this.DOM.imageInner, {
        duration: 2,
        ease: "power4",
        scale: 1.2,
      });
    });
    this.DOM.link.addEventListener("mouseleave", () => {
      gsap.killTweensOf(this.DOM.imageInner);
      gsap.to(this.DOM.imageInner, {
        duration: 0.7,
        ease: "expo",
        scale: 1,
      });
    });
  }
}

// body element
const body = document.body;

// .content element
const contentEl = document.querySelector(".content");

// frame element
const frameEl = document.querySelector(".frame");

// top and bottom overlay overlay elements
const overlayRows = [...document.querySelectorAll(".overlay__row")];

// Preview instances array
const previews = [];
[...document.querySelectorAll(".preview")].forEach((preview) =>
  previews.push(new Preview(preview))
);

// Item instances array
const items = [];
[...document.querySelectorAll(".item")].forEach((item, pos) =>
  items.push(new Item(item, previews[pos]))
);

const openItem = (item) => {
  gsap
    .timeline({
      defaults: {
        duration: 1,
        ease: "power3.inOut",
      },
    })
    .add(() => {
      // pointer events none to the content
      contentEl.classList.add("content--hidden");
    }, "start")

    .addLabel("start", 0)
    .set(
      [item.preview.DOM.innerElements, item.preview.DOM.backCtrl],
      {
        opacity: 0,
      },
      "start"
    )
    .to(
      overlayRows,
      {
        scaleY: 1,
      },
      "start"
    )

    .addLabel("content", "start+=0.6")

    .add(() => {
      body.classList.add("preview-visible");

      gsap.set(
        frameEl,
        {
          opacity: 0,
        },
        "start"
      );
      item.preview.DOM.el.classList.add("preview--current");
    }, "content")
    // Image animation (reveal animation)
    .to(
      [item.preview.DOM.image, item.preview.DOM.imageInner],
      {
        startAt: { y: (pos) => (pos ? "101%" : "-101%") },
        y: "0%",
      },
      "content"
    )

    .add(() => {
      for (const line of item.preview.multiLines) {
        line.in();
      }
      gsap.set(item.preview.DOM.multiLineWrap, {
        opacity: 1,
        delay: 0.1,
      });
    }, "content")
    // animate frame element
    .to(
      frameEl,
      {
        ease: "expo",
        startAt: { y: "-100%", opacity: 0 },
        opacity: 1,
        y: "0%",
      },
      "content+=0.3"
    )
    .to(
      item.preview.DOM.innerElements,
      {
        ease: "expo",
        startAt: { yPercent: 101 },
        yPercent: 0,
        opacity: 1,
      },
      "content+=0.3"
    )
    .to(
      item.preview.DOM.backCtrl,
      {
        opacity: 1,
      },
      "content"
    );
};

const closeItem = (item) => {
  gsap
    .timeline({
      defaults: {
        duration: 1,
        ease: "power3.inOut",
      },
    })
    .addLabel("start", 0)
    .to(
      item.preview.DOM.innerElements,
      {
        yPercent: -101,
        opacity: 0,
      },
      "start"
    )
    .add(() => {
      for (const line of item.preview.multiLines) {
        line.out();
      }
    }, "start")

    .to(
      item.preview.DOM.backCtrl,
      {
        opacity: 0,
      },
      "start"
    )

    .to(
      item.preview.DOM.image,
      {
        y: "101%",
      },
      "start"
    )
    .to(
      item.preview.DOM.imageInner,
      {
        y: "-101%",
      },
      "start"
    )

    // animate frame element
    .to(
      frameEl,
      {
        opacity: 0,
        y: "-100%",
        onComplete: () => {
          body.classList.remove("preview-visible");
          gsap.set(frameEl, {
            opacity: 1,
            y: "0%",
          });
        },
      },
      "start"
    )

    .addLabel("grid", "start+=0.6")

    .to(
      overlayRows,
      {
        //ease: 'expo',
        scaleY: 0,
        onComplete: () => {
          item.preview.DOM.el.classList.remove("preview--current");
          contentEl.classList.remove("content--hidden");
        },
      },
      "grid"
    );

  if (window.innerWidth < 768) {
    window.onscroll = "";
  }
};

for (const item of items) {
  // Opens the item preview
  item.DOM.link.addEventListener("click", () => openItem(item));
  // Closes the item preview
  item.preview.DOM.backCtrl.addEventListener("click", () => closeItem(item));
}

function scrollToCurrentPreview() {
  const currentPreview = document.querySelector(".preview--current");
  if (currentPreview && window.innerWidth < 768) {
    const topOffset = 100; // 100px from the top
    const elementPosition =
      currentPreview.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - topOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    window.onscroll = () => {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    };
  }
}

const observer = new MutationObserver(scrollToCurrentPreview);
const previewsContainer = document.querySelector(".previews");

observer.observe(previewsContainer, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"], // Listen for class changes
});

// Initial scroll to make sure the current preview is in view
scrollToCurrentPreview();
