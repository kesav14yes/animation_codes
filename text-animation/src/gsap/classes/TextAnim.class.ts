import gsap from "gsap";
import SplitType from "../assets/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type {
    DataAnimDelayProps,
    DataAnimDurationProps,
    DataAnimEasingProps,
    DataAnimEasingTypeProps,
    DataAnimScrubProps,
    DataAnimStaggerProps,
    DataAnimTargetProps,
    DataAnimTypeProps
} from "../../types/text_anim.types";
import { ENV, Environment } from "env.config";


export class TextAnimClass {
    constructor() {
        gsap.registerPlugin(SplitType, ScrollTrigger);
    }
    init() {
        this.animate();
    }





    private getAttributes = (anim_elem: HTMLElement) => {
        const type: DataAnimTypeProps = anim_elem.getAttribute("data-anim-type") as DataAnimTypeProps || "slide-up";
        const target: DataAnimTargetProps = anim_elem.getAttribute("data-anim-target") as DataAnimTargetProps || "parah";
        const duration: DataAnimDurationProps = Number(anim_elem.getAttribute("data-anim-target")) as DataAnimDurationProps || 0.5;
        const delay: DataAnimDelayProps = Number(anim_elem.getAttribute("data-anim-delay")) as DataAnimDelayProps || 0;
        const stagger: DataAnimStaggerProps = Number(anim_elem.getAttribute("data-anim-stagger")) as DataAnimStaggerProps || 0.1;
        const easing: DataAnimEasingProps = anim_elem.getAttribute("data-anim-easing") as DataAnimEasingProps || "power1";
        const scrub: DataAnimScrubProps = anim_elem.getAttribute("data-anim-delay") as DataAnimScrubProps || "inactive";

        const easing_type: DataAnimEasingTypeProps = anim_elem.getAttribute("data-anim-easing") as DataAnimEasingTypeProps || "out";
        const ease = `${easing}.${easing_type}`;


        return {
            type,
            target,
            duration,
            delay,
            stagger,
            ease,
            scrub,
        }
    }

    private getTargetElem = (anim_elem: HTMLElement, target: DataAnimTargetProps) => {
        let target_elem: any = anim_elem;
        if (target !== "parah") {
            const typeSplit = new SplitType(anim_elem, {
                types: target,
                tagName: 'span',
                linesClass: "overflow-hidden"
            })

            switch (target) {
                case "chars":
                    target_elem = typeSplit.chars;
                    break;
                case "lines":
                    target_elem = typeSplit.lines;
                    break;
                case "words":
                    target_elem = typeSplit.words;
                    break;
                default:
                    target_elem = typeSplit.lines;
                    break;
            }
        }
        target_elem.parent = anim_elem.parentElement;
        return target_elem;
    }

    private getAnimProps = (type: DataAnimTypeProps) => {
        switch (type) {
            case "slide-up":
                return {
                    y: '100%',
                    opacity: 0,
                };
            case "rotate":
                return {
                    y: '110%',
                    opacity: 0,
                    rotationZ: '10',
                };
            case "scrub-opacity":
                return {
                    opacity: 0.3,
                };
            default:
                return {
                    opacity: 0.3,
                };
        }
    }

    private animate() {
        const anim_elems = [...document.querySelectorAll("[data-anim='gsap-text']")] as HTMLElement[];
        anim_elems.forEach(anim_elem => {

            const attributes = this.getAttributes(anim_elem);
            const target_elem = this.getTargetElem(anim_elem, attributes.target);
            const anim_props = this.getAnimProps(attributes.type);

            gsap.from(target_elem, {
                ...anim_props,
                duration: attributes.duration,
                ease: attributes.ease,
                stagger: attributes.stagger,
                delay: attributes.delay,
                scrollTrigger: {
                    trigger: target_elem.parent,
                    markers: ENV === Environment.DEVELOPMENT,
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: attributes.scrub === "active",
                }
            })
        });
    }

}

