import gsap from "gsap";
import SplitType from "../_gsap/assets/SplitText";
import { ComponentState } from "react";

// let currentIndex = -1;
// let animating = false;

// Initialize SplitType

export const splitingText = (head_elem: HTMLElement | null) => {
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
  homeDatas: Array<any>
) => {
  gsap.fromTo(
    typeSplit.words,
    {
      y: "0",
    },
    {
      y: "-100%",
      ease: "power2.in",
      duration: 0.7,
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
    }
  );
};

// Function for pagination
// function jumpToSection(index: number) {
//   if (!animating && index !== currentIndex && index >= 0 && index <= sectionLength) {
//     const direction = index > currentIndex ? 1 : 0;
//     gotoSection(index, direction);
//   }
// }
