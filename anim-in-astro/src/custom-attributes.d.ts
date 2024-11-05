import type {
    DataAnimDelayProps,
    DataAnimDurationProps,
    DataAnimEasingProps,
    DataAnimEasingTypeProps,
    DataAnimScrubProps,
    DataAnimStaggerProps,
    DataAnimTargetProps,
    DataAnimTypeProps
} from "./types/text_anim.types";

declare namespace astroHTML.JSX {
    interface HTMLAttributes {
        'data-anim'?: "gsap-text";
        'data-anim-type'?: DataAnimTypeProps;
        'data-anim-target'?: DataAnimTargetProps;
        'data-anim-duration'?: DataAnimDurationProps;
        'data-anim-delay'?: DataAnimDelayProps;
        'data-anim-stagger'?: DataAnimStaggerProps;
        'data-anim-easing'?: DataAnimEasingProps;
        'data-anim-easing-type'?: DataAnimEasingTypeProps;
        'data-anim-scrub'?: DataAnimScrubProps;
    }
}