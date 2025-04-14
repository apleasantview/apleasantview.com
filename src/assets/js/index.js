import MouseFollower from "mouse-follower";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

MouseFollower.registerGSAP(gsap);


gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  (function () {
    let cursor;
    let scroller;

    initialiseApp();

    function initialiseApp() {
      history.scrollRestoration = "manual";

      initialiseLenis();
      initialiseCursor();
      initialiseTitleAnimation();
    }

    function initialiseLenis() {
      scroller = new Lenis({
        lerp: 0.1,
      });

      scroller.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        scroller.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    function initialiseCursor() {
        cursor = new MouseFollower();
    }

    function initialiseTitleAnimation() {
      const title = document.querySelector(".c-logo-container");
      const titleStroke = title.querySelector(".js-stroke");
      const titleFade = title.querySelector(".js-fade");

      function enableScroll() {
        document.body.style.overflow = "visible";
      }

      gsap.to(titleFade, {
        autoAlpha: 1,
        duration: 1.7,
        ease: "power1.in",
      });

      gsap
        .timeline()
        .to(titleStroke, {
          xPercent: 100,
          duration: 3,
        })
        .to(
          titleStroke,
          {
            autoAlpha: 1,
            duration: 1.45,
            delay: 0.05,
            ease: "power1.in",
            onComplete: enableScroll,
          },
          "<"
        );

      gsap.to(title, {
        ease: "none",
        top: 0,
        position: "fixed",
        scrollTrigger: {
          id: "title",
          markers: false,
          trigger: title.parentElement,
          pin: false,
          scrub: true,
          start: "bottom bottom",
          end: () => `bottom top+=${title.offsetHeight}`,
          invalidateOnRefresh: true,
        },
      });
    }
  })();
});
