import { useEffect, useRef, useState } from 'react'
import './App.css'
import gsap from 'gsap';
import { Observer } from 'gsap/all';
import img1 from "./assets/img_01.webp";
import img2 from "./assets/img_02.webp";
import img3 from "./assets/IMG_03.webp";
import img4 from "./assets/img_04.webp";
import SplitType from "./_gsap/assets/SplitText"

function App() {

  const sectionElems = useRef<HTMLElement[]>([]);
  const contentHeading = useRef<HTMLHeadingElement | null>(null);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Grab the sections and header element
    sectionElems.current = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    const head_elem = contentHeading.current;

    let currentIndex = -1;
    let animating = false;
    const sectionLength = sectionElems.current.length - 1;

    gsap.registerPlugin(Observer, SplitType);

    // Initialize SplitType
    const typeSplit = new SplitType(head_elem, {
      type: "words,lines",
      tag: "span",
      wordsClass: "text-anime overflow-hidden",
      linesClass: "text-anime overflow-hidden",
    });

    // Initial setup for sections
    gsap.set(sectionElems.current, { display: "none", position: "absolute", top: 0, left: 0, width: "100%" });

    // Timeline definition (avoid creating multiple timelines for performance)
    const tl = gsap.timeline({ paused: true });
    // const tl2 = gsap.timeline();


    // Function to handle section transitions
    function gotoSection(index: number, direction: number) {
      if (index < 0 || index > sectionLength || animating) return;
      animating = true;

      // Set current and target sections
      const currentSection = sectionElems.current[currentIndex];
      const targetSection = sectionElems.current[index];

      // Set initial state for the target section based on direction
      gsap.set(targetSection, { display: "", y: direction ? "100%" : "-100%", zIndex: 1 });

      // Combine animations into one timeline for smoother performance
      tl.clear()
        .to(currentSection, { y: direction ? "-100%" : "100%", duration: 1.8, ease: "expo.inOut" }) // Animate out current section
        .to(targetSection, { y: "0%", duration: 1.8, ease: "expo.inOut" }, "<") // Animate in target section
        .from(typeSplit.words, { y: "100%", duration: 0.8, ease: "power2.out" }, "-=0.7") // Animate text in
        .set(currentSection, { display: "none", zIndex: 0 }) // Hide the current section after transition
        .call(() => { animating = false; }); // Reset animating flag

      tl.play(); // Play the timeline

      currentIndex = index; // Update the current index

      gsap.fromTo(typeSplit.words, {
        y: "0",

      }, {
        y: "-100%",
        ease: "power2.in",
        duration: 0.5
      })
    }

    // Scroll-based section navigation using GSAP Observer
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, 0), // Scroll down (previous section)
      onUp: () => !animating && gotoSection(currentIndex + 1, 1),   // Scroll up (next section)
      tolerance: 50,
      preventDefault: true,
    });

    observer.disable();
    // Start at the first section
    gotoSection(0, 1);

    function couterAnimation() {
      const counterElem = document.querySelector("#progressHeading span");
      if (!counterElem) return
      const loadTimeline = gsap.timeline();

      loadTimeline.to(counterElem, {
        textContent: 100,
        duration: 6,
        ease: " Power1.easeIn",
        snap: { textContent: 3 },
        onUpdate: function () {
          // Update the text with the current value + %
          counterElem.textContent = counterElem.textContent + "%";
        },

      }).to("#loadOverlay", {
        y: 0,
        duration: 6,
        ease: " Power1.easeIn",
      }, "<")
        .to(counterElem, {
          yPercent: -100,
          ease: "power2.in",
          onComplete: () => {
            counterElem.textContent = "Hello."
            counterElem.setAttribute("style", "opacity:0")
          }
        })
        .to(counterElem, {
          yPercent: 100,
          ease: "power2.in",
          onComplete: () => {
            counterElem.setAttribute("style", "opacity:1;transform: translateY(100%);")
          }
        },).to(
          counterElem, {
          yPercent: 0,
          ease: "power2.in",
        }
        ).to(
          counterElem, {
          yPercent: -100,
          ease: "power2.in",
        }, "+=0.5"
        ).to("#loading", {
          yPercent: -100,
          duration: 1.8,
          ease: "expo.inOut",
          onComplete: () => {
            observer.enable();
            setLoading(false)
          }
        })





    }

    couterAnimation();



    // Function for pagination
    // function jumpToSection(index: number) {
    //   if (!animating && index !== currentIndex && index >= 0 && index <= sectionLength) {
    //     const direction = index > currentIndex ? 1 : 0; 
    //     gotoSection(index, direction);
    //   }
    // }
    // Determine direction based on target section

    // Cleanup function
    return () => {
      typeSplit.revert(); // Restore the original text
      observer.kill(); // Remove the Observer instance to prevent memory leaks
    };
  }, []);



  return (
    <>
      {/* loading animation start  */}

      {
        loading
        && (
          <div id='loading' className='w-screen h-screen absolute inset-0 bg-blue-800 z-50'>
            <div className='w-full h-full bg-blue-900 translate-y-full fixed' id='loadOverlay'></div>
            <div className='grid place-content-center w-full h-full'>
              <h4 id='progressHeading' className='relative flex justify-center items-center text-7xl text-white overflow-hidden'><span className='inline-block'>0%</span></h4>
            </div>
          </div>
        )
      }

      {/* loading animation start  */}

      {/* section start */}

      <section className='w-screen h-screen bg-[#f1f1f1] absolute inset-0 ' >
        <div className='flex justify-end w-full h-full max-md:items-end  max-md:justify-center'>
          <img src={img1} alt="" className='max-w-full max-h-full  aspect-square max-md:h-1/2' />
        </div>
      </section>
      <section className='w-screen h-screen bg-[#d7d7d7] absolute inset-0 flex justify-end' >
        <div className='flex justify-end w-full h-full max-md:items-end  max-md:justify-center'>
          <img src={img2} alt="" className='max-w-full max-h-full  aspect-square max-md:h-1/2' />
        </div>
      </section>
      <section className='w-screen h-screen bg-[#46d0ff] absolute inset-0 flex justify-end'>
        <div className='flex justify-end w-full h-full max-md:items-end  max-md:justify-center'>
          <img src={img3} alt="" className='max-w-full max-h-full  aspect-square max-md:h-1/2' />
        </div>
      </section>
      <section className='w-screen h-screen bg-[#000f55] absolute inset-0 flex justify-end' >
        <div className='flex justify-end w-full h-full max-md:items-end  max-md:justify-center'>
          <img src={img4} alt="" className='max-w-full max-h-full  aspect-square max-md:h-1/2' />
        </div>
      </section>

      {/* section end */}


      {/* conetnt start */}

      <div className='w-screen h-screen z-10 relative px-4 lg:px-20 max-lg:py-20'>
        <div className='flex flex-col justify-center w-full h-full lg:w-1/2 max-lg:justify-start'>
          <h2 className=' text-3xl font-bold lg:text-7xl relative' ref={contentHeading}>Lorem ipsum dolor sit,Lorem ipsum dolor sit,</h2>
        </div>
      </div>

      {/* conetnt start */}

    </>
  )
}

export default App;
