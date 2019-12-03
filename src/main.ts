import { TimelineMax } from "gsap";
import { TweenMax } from "gsap";

function init() {
    const slides: NodeListOf<HTMLElement> = document.querySelectorAll(".slide");
    const pages = document.querySelectorAll(".page");
    const backgrounds = [
        `radial-gradient(rgba(43, 55, 96, 1), rgba(11, 16, 35, 1))`,
        `radial-gradient(rgba(78, 48, 2, 1), rgba(22, 22, 22, 1))`,
        `radial-gradient(rgba(78, 69, 66, 1), rgba(22, 22, 22, 1))`
    ];

    // Trackers
    let current = 0;
    let scrollSlide = 0;

    slides.forEach((slide, index) => {
        slide.addEventListener("click", function() {
            changeDots(this);
            nextSlide(index);
            scrollSlide = index;
        });
    });

    function changeDots(dot) {
        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dot.classList.add("active");
    }

    function nextSlide(pageNumber: number) {
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector(".hero .model-left");
        const nextRight = nextPage.querySelector(".hero .model-right");
        const currentLeft = currentPage.querySelector(".hero .model-left");
        const currentRight = currentPage.querySelector(".hero .model-right");
        const nextText = nextPage.querySelector(".details");
        const portofolio = document.querySelector(".portofolio");

        const tl = new TimelineMax({
            onStart: function() {
                slides.forEach(slide => {
                    slide.style.pointerEvents = "none";
                });
            },
            onComplete: function() {
                slides.forEach(slide => {
                    slide.style.pointerEvents = "all";
                });
            }
        });

        tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
            .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")
            .to(portofolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
            .fromTo(
                currentPage,
                0.3,
                { opacity: 1, pointerEvents: "all" },
                { opacity: 0, pointerEvents: "none" }
            )
            .fromTo(
                nextPage,
                0.3,
                { opacity: 0, pointerEvents: "none" },
                { opacity: 1, pointerEvents: "all" },
                "-=0.6"
            )
            .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=0.6")
            .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.8")
            .fromTo(nextText, 0.3, { opacity: 0, y: 10 }, { opacity: 1, y: 1 })
            .set(nextLeft, { clearProps: "all" })
            .set(nextRight, { clearProps: "all" });

        current = pageNumber;
    }

    document.addEventListener("wheel", throttle(scrollChange, 1500));
    document.addEventListener("touchmove", throttle(scrollChange, 1500));

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }

    function switchDots(dotNumber) {
        const activeDot = document.querySelectorAll(".slide")[dotNumber];
        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        activeDot.classList.add("active");
    }

    function scrollChange(e) {
        if (e.deltaY > 0) {
            scrollSlide += 1;
        } else {
            scrollSlide -= 1;
        }

        if (scrollSlide > 2) {
            scrollSlide = 0;
        }

        if (scrollSlide < 0) {
            scrollSlide = 2;
        }

        switchDots(scrollSlide);
        nextSlide(scrollSlide);
        console.log(scrollSlide);
    }

    const hamburger = document.querySelector(".menu");
    const hamburgerLines = document.querySelectorAll(".menu line");
    const navOpen = document.querySelector(".nav-open");
    const contact = document.querySelector(".contact");
    const social = document.querySelector(".social");
    const logo = document.querySelector(".logo");

    const tl = new TimelineMax({ paused: true, reversed: true });

    tl.to(navOpen, 0.5, { y: 0 })
        .fromTo(
            contact,
            0.5,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 1 },
            "-=0.1"
        )
        .fromTo(
            social,
            0.5,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 1 },
            "-=0.5"
        )
        .fromTo(logo, 0.2, { color: "#FFF" }, { color: "#000" })
        .fromTo(
            hamburgerLines,
            0.2,
            { stroke: "#fff" },
            { stroke: "#000" },
            "-=1"
        );

    hamburger.addEventListener("click", () => {
        tl.reversed() ? tl.play() : tl.reverse();
    });
}

init();
