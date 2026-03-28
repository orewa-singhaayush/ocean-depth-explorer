gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll("section");
const dots = document.querySelectorAll(".depth-nav a");
const display = document.getElementById("depth-display");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;

      dots.forEach(dot => {
        dot.classList.remove("active");

        if (dot.getAttribute("href") === `#${id}`) {
          dot.classList.add("active");
          display.innerText = dot.dataset.depth;
        }
      });
    }
  });
}, {
  threshold: 0.3,
  rootMargin: "-100px 0px -50% 0px"
});

sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".hidden").forEach(el => {
  revealObserver.observe(el);
});

function toggleCard(id) {
  const card = document.getElementById(id);
  const button = card.querySelector("button");

  card.classList.toggle("active");

  button.innerText = card.classList.contains("active")
    ? "× HIDE"
    : "+ DISCOVER";
}

// FACT SYSTEM
const facts = [
  "Many creatures glow using bioluminescence.",
  "Most fish in the ocean live in this zone.",
  "Animals migrate vertically every day.",
  "Only dim blue light reaches here.",
  "Creatures have large eyes to see better.",
  "Some fish are nearly invisible.",
  "Pressure increases rapidly with depth.",
  "Water is cold and dark.",
  "Lanternfish are the most common species.",
  "Bioluminescence is used for hunting and defense."
];

let index = 0;

function nextFact() {
  document.getElementById("factText").innerText = facts[index];
  index = (index + 1) % facts.length;
}

const abyssal = document.querySelector(".abyssal");

window.addEventListener("scroll", () => {
  const rect = abyssal.getBoundingClientRect();

  if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
    abyssal.classList.add("active");
  } else {
    abyssal.classList.remove("active");
  }
});

// cursor
const cursor = document.querySelector("#cursor");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.2
  });
});

const interactiveElements = document.querySelectorAll(
  ".card, .creature-card, .fact-box button, .aby-item, .trench-card, .depth-nav a"
);

interactiveElements.forEach(el => {

  el.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      opacity: 1,
      scale: 1.8,
      backgroundColor: "rgba(137,208,237,0.7)"
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      opacity: 0,
      scale: 1
    });
  });

});
var tl = gsap.timeline();

tl.from(".header", {
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      
    }
  });
});

// SUNLIGHT
gsap.fromTo(".card",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: ".sunlight",
      start: "top 90%"
    }
  }
);

// TWILIGHT
gsap.fromTo(".twilight .creature-card",
  { opacity: 0, x: -80 },
  {
    opacity: 1,
    x: 0,
    stagger: 0.3,
    duration: 1,
    scrollTrigger: {
      trigger: ".twilight",
      start: "top 90%"
    }
  }
);

// MIDNIGHT
gsap.fromTo(".midnight .creature-card",
  { opacity: 0, scale: 0.7 },
  {
    opacity: 1,
    scale: 1,
    stagger: 0.3,
    duration: 1,
    scrollTrigger: {
      trigger: ".midnight",
      start: "top 90%"
    }
  }
);

// ABYSSAL
gsap.fromTo(".aby-item",
  { opacity: 0, scale: 0.5 },
  {
    opacity: 1,
    scale: 1,
    stagger: 0.15,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".abyssal",
      start: "top 90%"
    }
  }
);

// TRENCH
gsap.fromTo(".trench-card",
  { opacity: 0, y: 80 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.3,
    duration: 1,
    scrollTrigger: {
      trigger: ".trench",
      start: "top 90%"
    }
  }
);

gsap.utils.toArray("section h2").forEach((heading) => {

  gsap.from(heading, {
    opacity: 0,
    y: 40,
    duration: 1,

    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
      toggleActions: "play reverse play reverse"
    }
  });

});