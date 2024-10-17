import gsap from "gsap";
import SplitType from "../_gsap/assets/SplitText";
import { ComponentState } from "react";
import { HomeData, homeDatas } from "../data/home.data";

// Function for pagination
// function jumpToSection(index: number) {
//   if (!animating && index !== currentIndex && index >= 0 && index <= sectionLength) {
//     const direction = index > currentIndex ? 1 : 0;
//     gotoSection(index, direction);
//   }
// }
// Determine direction based on target section

// variables
let currentIndex = -1;
let animating = false;

// Initialize timeline for goToSection
const tl = gsap.timeline({ paused: true });

// Initialize SplitType

export const splitingText = (head_elem: HTMLElement[]) => {
  const typeSplit = new SplitType(head_elem, {
    type: "words,lines",
    tag: "span",
    wordsClass: "text-anime overflow-hidden",
    linesClass: "text-anime overflow-hidden",
  });

  return typeSplit;
};

export const textAnimation = (typeSplit: InstanceType<typeof SplitType>) => {
  gsap.to(typeSplit.words, {
    keyframes: [
      { yPercent: 0 },
      {
        yPercent: -100,
        ease: "power2.in",
        duration: 0.3,
      },
      {
        opacity: 0,
        duration: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        duration: 0,
      },
      {
        yPercent: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      },
    ],
  });
};

export const textInAni = (
  typeSplit: InstanceType<typeof SplitType>,
  setHeading: ComponentState,
  index: number,
  homeDatas: Array<HomeData>
) => {
  gsap.fromTo(
    typeSplit.words,
    {
      y: "0",
    },
    {
      y: "-100%",
      ease: "power2.out",
      duration: 0.5,
      onComplete: () => {
        setHeading(homeDatas[index]);
      },
    }
  );
};

export const textoutAni = (typeSplit: InstanceType<typeof SplitType>) => {
  gsap.fromTo(
    typeSplit.words,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.3,
    }
  );
};

export const goToSection = (
  index: number,
  direction: number,
  sectionElem: HTMLElement[],
  textElem: HTMLElement[],
  setHeading: ComponentState
) => {
  const sectionLength = sectionElem.length - 1;
  if (index < 0 || index > sectionLength || animating) return;
  animating = true;
  // Set current and target sections
  const currentSection = sectionElem[currentIndex];
  const targetSection = sectionElem[index];

  if (currentIndex == -1) {
    gsap.set(sectionElem[index], { display: "", y: "0%", zIndex: 1 }); // Show the first section without animation
    currentIndex = index; // Update the current index
    animating = false; // Allow future transitions
    console.log(`running inside ${animating} ${currentIndex}`);
    return; // Exit the function
  }
  // Set initial state for the target section based on direction
  gsap.set(targetSection, {
    display: "",
    y: direction ? "100%" : "-100%",
    zIndex: 1,
  });
  const head_elem = textElem;
  const split = splitingText(head_elem);

  // Combine animations into one timeline for smoother performance
  tl.clear()

    .to(
      currentSection,
      {
        y: direction ? "-100%" : "100%",
        duration: 1.5,
        ease: "expo.inOut",
        onStart: () => textInAni(split, setHeading, index, homeDatas),
      },
      "<"
    ) // Animate out current section
    .to(targetSection, { y: "0%", duration: 1.5, ease: "expo.inOut" }, "<") // Animate in target section
    .set(currentSection, { display: "none", zIndex: 0 }) // Hide the current section after transition
    .call(() => {
      animating = false;
    }); // Reset animating flag

  tl.play(); // Play the timeline

  currentIndex = index; // Update the current index
  console.log(`running outside ${animating} ${currentIndex}`);
};

export const couterAnimation = (
  counterElem: HTMLElement,
  overlayElem: HTMLElement,
  setLoading: ComponentState
) => {
  const loadTimeline = gsap.timeline();

  loadTimeline
    .to(counterElem, {
      textContent: 100,
      duration: 6,
      ease: " Power1.easeIn",
      snap: { textContent: 3 },
      onUpdate: function () {
        // Update the text with the current value + %
        counterElem.textContent = counterElem.textContent + "%";
      },
    })
    .to(
      overlayElem,
      {
        y: 0,
        duration: 6,
        ease: " Power1.easeIn",
      },
      "<"
    )
    .to(counterElem, {
      yPercent: -100,
      ease: "power2.in",
      onComplete: () => {
        counterElem.textContent = "Hello.";
        counterElem.setAttribute("style", "opacity:0");
      },
    })
    .to(counterElem, {
      yPercent: 100,
      ease: "power2.in",
      onComplete: () => {
        counterElem.setAttribute(
          "style",
          "opacity:1;transform: translateY(100%);"
        );
      },
    })
    .to(counterElem, {
      yPercent: 0,
      ease: "power2.in",
    })
    .to(
      counterElem,
      {
        yPercent: -100,
        ease: "power2.in",
      },
      "+=0.5"
    )
    .to("#loading", {
      yPercent: -100,
      duration: 1.8,
      ease: "expo.inOut",
      onComplete: () => {
        setLoading(false);
      },
    });
};

export const goDown = (
  callback: (index: number, direction: number) => void
) => {
  if (!animating) {
    callback(currentIndex - 1, 0);
  }
};

export const goUp = (callback: (index: number, direction: number) => void) => {
  if (!animating) {
    callback(currentIndex + 1, 1);
  }
};
