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
    let firstMove = true;

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
//       cursor = document.querySelector(".o-cursor");

//       let xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
//       let yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

//       window.addEventListener("mousemove", (event) => {
//         if (firstMove) {
//           firstMove = false;
//           gsap.to(cursor, { autoAlpha: 1, duration: 0.6, delay: 0.6, ease: "power2.out" });
//         }

//         xTo(event.clientX);
//         yTo(event.clientY);
//       });
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
