gsap.registerPlugin(ScrollTrigger);
Splitting();
const panel = document.querySelector(".panel");

gsap.to(this, {
  scrollTrigger: {
    trigger: ".panel",
    start: "top 100%",
    end: "bottom 25%",
    scrub: 0,
    onUpdate: (self) => {
      panel.style.setProperty("--progress", self.progress);
    },
  },
});

let letbody = document.getElementsByTagName("body")[0];

// gsap.to("body", {
//   scrollTrigger: {
//     trigger: "h1",
//     start: "top 20%",
//     end: "100px 0%",
//     scrub: 0,
//     onUpdate: (self) => {
//       letbody.style.setProperty("--progress", self.progress);
//     },
//   },
// });
