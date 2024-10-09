import { useEffect, useRef } from 'react'
import './App.css'
import gsap from 'gsap';
import { Observer } from 'gsap/all';

function App() {

  const sectionElems = useRef<HTMLElement[]>([]);

  useEffect(() => {
    sectionElems.current = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    let currentIndex = 0;
    let animating = false;
    const sectionLength = sectionElems.current.length - 1;
    gsap.registerPlugin(Observer);

    const tl = gsap.timeline({ defaults: { duration: 1.25, ease: "power1.inOut", } });
    gsap.set(sectionElems.current, { display: "none" })



    function gotoSection(index: number, direction: number) {
      // Ensure index is within bounds and not animating
      if (index < 0 || index > sectionLength || animating) return;
      console.log("running")

      // Mark as animating to prevent further animations
      animating = true;

      // Set the new section as visible
      gsap.set(sectionElems.current[currentIndex], { display: "", zIndex: "0" });

      const notCurrentIndex = sectionElems.current.filter((item, i) => i !== index && item);

      // Create the animation timeline
      tl.fromTo(
        sectionElems.current[index],
        {
          translateY: direction ? "-100%" : "100%",
          zIndex: direction ? "1" : "0",
        },
        {
          translateY: "0",
          display: "",
          zIndex: direction ? "1" : "0",
          onComplete: () => {
            // Mark as not animating once the animation completes
            animating = false;
          },
        }
      )
        .set(notCurrentIndex, { display: "none", zIndex: "" })
        .set(sectionElems.current[index], { zIndex: "0" });

      // Update the current index
      currentIndex = index;
    }



    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, 1),
      onUp: () => !animating && gotoSection(currentIndex + 1, 0),
      tolerance: 10,
      preventDefault: true
    });

    gotoSection(0, 0)

    // gsap.set(sectionElems.current, { zIndex: 0, display: "none" })


    // const goUp = (index: number) => {
    //   if (currentIndex == 0 || index == 0) {
    //     gsap.set(sectionElems.current[currentIndex], { zIndex: 1, })
    //     gsap.set(sectionElems.current[index], { zIndex: 1, })

    //   }
    //   if (index >= 0) {
    //     gsap.set(sectionElems.current[index], { zIndex: 1, });

    //     tl.fromTo(sectionElems.current[index], {
    //       translateY: "100%"
    //     }, {
    //       translateY: 0,
    //       onComplete: () => {
    //         animating = false
    //       }
    //     }).set(sectionElems.current[currentIndex], { zIndex: 0, display: "none" })
    //   }
    //   currentIndex = index;
    // }


    // const goDown = (index: number) => {
    //   if (index < 0) {
    //     return
    //   }
    //   if (index == 0 || currentIndex == 0) {
    //     gsap.set(sectionElems.current[currentIndex], { zIndex: 1, display: "block" })
    //     gsap.set(sectionElems.current[index], { zIndex: 1, display: "block" })
    //     console.log(`check first contdion ${currentIndex} and ${index}`)

    //   }

    //   if (currentIndex >= 0) {
    //     console.log(`check second contdion ${currentIndex} and ${index}`)


    //     gsap.set(sectionElems.current[index], { zIndex: 1, display: "block" });

    //     tl.fromTo(sectionElems.current[index], {
    //       translateY: "100%"
    //     }, {
    //       translateY: 0,
    //       onComplete: () => {
    //         animating = false
    //       }
    //     }).set(sectionElems.current[currentIndex], { zIndex: 0, })
    //   }
    //   currentIndex = index;

    // }
    // function gotoSection(index: number, direction: number) {
    //   animating = true;

    //   if (!direction) {
    //     goUp(index)
    //   }
    //   else {
    //     goDown(index)
    //   }

    // }




  }, []);


  return (
    <>
      <section className='w-screen h-screen bg-red-300 absolute inset-0' ></section>
      <section className='w-screen h-screen bg-green-400 absolute inset-0' ></section>
      <section className='w-screen h-screen bg-purple-300 absolute inset-0'></section>
      <section className='w-screen h-screen bg-slate-600 absolute inset-0' ></section>
    </>
  )
}

export default App;
