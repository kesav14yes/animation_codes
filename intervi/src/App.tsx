import { useEffect, useRef, useState } from 'react'
import './App.css'
import gsap from 'gsap';
import { Observer } from 'gsap/all';
import img1 from "./assets/img_01.webp";
import img2 from "./assets/img_02.webp";
import img3 from "./assets/IMG_03.webp";
import img4 from "./assets/img_04.webp";
import SplitType from "./_gsap/assets/SplitText"
import { homeDatas } from './data/home.data';
import { textoutAni, splitingText, goToSection, couterAnimation, goDown, goUp, jumpToSection } from './helpers/home.func';



function App() {

  const sectionElems = useRef<HTMLElement[]>([]);
  const contentHeading = useRef<HTMLHeadingElement | null>(null);

  const [loading, setLoading] = useState(true)
  const [heading, setHeading] = useState(homeDatas[0])




  useEffect(() => {

    gsap.registerPlugin(Observer, SplitType);
    sectionElems.current = Array.from(document.querySelectorAll('section')) as HTMLElement[];   // Grab the sections and header element

    const counterElem = document.querySelector("#progressHeading span") as HTMLElement;
    const overlayElem = document.getElementById("loadOverlay") as HTMLElement
    const textAnimationElem = document.querySelectorAll('[data-textanimation]');
    const paginations = Array.from(document.querySelectorAll("[data-inicator]")) as HTMLElement[];
    const activePaginationELem = document.getElementById("activePagination") as HTMLElement;


    if (!contentHeading.current || !textAnimationElem) return
    const textElem = [contentHeading.current, ...Array.from(textAnimationElem).map((elem) => elem as HTMLElement)]


    if (!textElem || !counterElem || !overlayElem) {
      return console.log(`text elemnt is null ${textElem} || counterElem is null ${counterElem} || overlayelem is null ${overlayElem}`)
    }

    // Initial setup for sections
    gsap.set(sectionElems.current, { display: "none", position: "absolute", top: 0, left: 0, width: "100%" });

    const runGotoSection = (index: number, direction: number) => {
      goToSection(index, direction, sectionElems.current, textElem, setHeading, paginations, activePaginationELem)

    }

    couterAnimation(counterElem, overlayElem, setLoading);
    runGotoSection(0, 1)


    // Scroll-based section navigation using GSAP Observer
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => goDown(runGotoSection), // Scroll down (previous section)
      onUp: () => goUp(runGotoSection),   // Scroll up (next section)
      tolerance: 70,
      preventDefault: true,
    });


    paginations.forEach((pagination, i) => {
      pagination.addEventListener("click", () => {
        jumpToSection(i, runGotoSection)
        // console.log("running")
      })
    })

    // Cleanup function
    return () => {
      // Restore the original text
      observer.kill(); // Remove the Observer instance to prevent memory leaks
    };
  }, []);


  useEffect(() => {
    const textAnimationElem = document.querySelectorAll('[data-textanimation]');
    if (!contentHeading.current || !textAnimationElem) return
    const head_elem = [contentHeading.current, ...Array.from(textAnimationElem).map((elem) => elem as HTMLElement)]
    const split = splitingText(head_elem);
    textoutAni(split);

  }, [heading])

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

      <section className='w-screen h-screen bg-[#d7d7d7] absolute inset-0 ' >
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
          <h2 id='heading' className=' text-3xl font-bold lg:text-7xl relative text-white' ref={contentHeading} dangerouslySetInnerHTML={{ __html: heading.cont }}></h2>
        </div>
      </div>

      {/* conetnt start */}

      {/* section indicator start  */}

      <div className=' absolute z-[2] right-[10%] bottom-[10%]'>
        <p className='text-white text-5xl overflow-hidden  shrink-0 '>
          <span data-textanimation className='overflow-hidden inline-block text-6xl'>{(homeDatas.indexOf(heading) + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</span>
          <span>/</span>
          <span >{(homeDatas.length).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</span>
        </p>


      </div>

      {/* section indicator end  */}


      {/* section pagination start  */}

      <div className='absolute left-[10%] bottom-[10%] z-10 '>

        <div className='relative flex w-full'>
          {
            homeDatas.map((_, i) => (
              <span data-inicator key={i} className={`relative  w-1.5 h-1.5 rounded-full bg-white mx-2 cursor-pointer`} />
            ))
          }
          <span id='activePagination' className='w-1.5 h-1.5 rounded-full bg-red-700 mx-2 cursor-pointer absolute left-0'></span>
        </div>

      </div>

      {/* section pagination start  */}

    </>
  )
}

export default App;
