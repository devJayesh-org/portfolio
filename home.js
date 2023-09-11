gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

function showTime() {
    let time = new Date()
    document.querySelector(".time").innerHTML = "MY LOCAL TIME " + time.getHours() + ":" + time.getMinutes()
}

function creatSpan() {
    let reveal = document.querySelectorAll(".reveal")
    reveal.forEach(function (elem) {
        let parent = document.createElement("span")
        let child = document.createElement("span")

        parent.classList.add("parent")
        child.classList.add("child")

        child.innerHTML = elem.innerHTML
        parent.appendChild(child)

        elem.innerHTML = ""
        elem.appendChild(parent)
    })
}

function blackGreenAnimation() {
    let tl = gsap.timeline()

    tl.from(".black .child span", {
        x: 100,
        duration: .5,
        delay: 0.1,
        stagger: .2,
    })
    tl.to(".black .child", {
        y: "-100%",
        duration: 1,
        delay: 0.5,
        ease: Circ.easeInOut
    })
    tl.to(".black", {
        height: 0,
        duration: 1.1,
        ease: Circ.easeInOut,
    })
    tl.to(".green", {
        height: "100vh",
        duration: .5,
        top: 0,
        delay: -1,
        ease: Circ.easeInOut,
    })
    tl.to(".green", {
        height: "0vh",
        duration: .5,
        delay: -.5,
        ease: Circ.easeInOut,
        onComplete: function () {
            homepageAnimation()
        }
    })
}

function valueSetter() {
    gsap.set(".nav a", { y: "-100%", opacity: 0 })
    gsap.set(".t-hero h1:nth-child(1)", { y: "100%", opacity: 0 })
    gsap.set(".t-hero h1:nth-child(3)", { y: "100%", opacity: 0 })
    gsap.set(".t-hero-text h5", { y: "100%", opacity: 0 })
    gsap.set(".i-text h1", { y: "100%", opacity: 0 })
}

function homepageAnimation() {
    let tl = gsap.timeline()

    tl.to(".nav a", {
        y: "0%",
        opacity: 1,
        duration: 1,
        delay: -.1,
    })
    tl.to(".t-hero h1:nth-child(1)", {
        opacity: 1,
        y: "0%",
        duration: 2,
        delay: -1,
        ease: Circ.easeInOut,
    })
    tl.to(".t-hero h1:nth-child(3)", {
        opacity: 1,
        y: "0%",
        duration: 2,
        ease: Circ.easeInOut,
        delay: -1.9,
    })
    tl.to(".t-hero-text h5", {
        opacity: 1,
        y: "0%",
        duration: 1.5,
        ease: Expo.easeInOut,
        delay: -1.3,
    })
    tl.to(".i-text h1", {
        opacity: 1,
        y: "0%",
        duration: 2,
        ease: Circ.easeInOut,
        stagger: .1,
        scrollTrigger: {
            trigger: ".i-text h1",
            scroller: ".main",
            // markers: true,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
        }
    })
    tl.to(".intro .i-img", {
        rotate: 15,
        duration: .5,
        ease: Expo,
        scrollTrigger: {
            trigger: ".i-img",
            scroller: ".main",
            // markers: true,
            start: "top 80%",
            end: "top 5%",
            scrub: 1,
        }
    })
}

function mouseMove() {
    let crsr = document.querySelector(".cursor")
    let firstImg = document.querySelector(".first-img")
    let secandImg = document.querySelector(".secand-img")
    let featWorks = document.querySelector(".feat-works")
    let badaLine = document.querySelector(".bada-line")
    let work = document.querySelector(".work")

    firstImg.addEventListener("mousemove", function(dets) {
        crsr.style.left = dets.x + 7 + "px"
        crsr.style.top = dets.y + 7 + "px"
        crsr.style.opacity = 1
        featWorks.style.backgroundColor = "#B4BACF"
        work.style.backgroundColor = "#B4BACF"
        badaLine.style.backgroundColor = "#B4BACF"
    })
    firstImg.addEventListener("mouseleave", function(dets) {
        crsr.style.opacity = 0
        featWorks.style.backgroundColor = "#F2F2F2"
        work.style.backgroundColor = "#F2F2F2"
        badaLine.style.backgroundColor = "#F2F2F2"
    })
    secandImg.addEventListener("mousemove", function(dets) {
        crsr.style.left = dets.x + 7 + "px"
        crsr.style.top = dets.y + 7 + "px"
        crsr.style.opacity = 1
        featWorks.style.backgroundColor = "pink"
        work.style.backgroundColor = "pink"
        badaLine.style.backgroundColor = "pink"
    })
    secandImg.addEventListener("mouseleave", function(dets) {
        crsr.style.opacity = 0
        featWorks.style.backgroundColor = "#F2F2F2"
        work.style.backgroundColor = "#F2F2F2"
        badaLine.style.backgroundColor = "#F2F2F2"
    })
}




mouseMove()
showTime()
creatSpan()
valueSetter()
blackGreenAnimation()