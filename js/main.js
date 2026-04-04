$(function () {
  $('a[href^="#"]').click(function () {
    const speed = 1500;
    const type = "swing";
    const href = $(this).attr("href");
    const target = $(href === "#index" ? "html" : href);
    const headerHeight = $(window).width() <= 768 ? 60 : 80;
    const position = target.offset().top - headerHeight;

    $("body,html").animate({ scrollTop: position }, speed, type);
    return false;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#header");
  const btn = document.querySelector(".hamburger");
  const body = document.body;
  const mask = document.querySelector("#mask");
  const menuLinks = document.querySelectorAll("#menu-sp a");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      header.classList.add("is-fixed");
    } else {
      header.classList.remove("is-fixed");
    }
  });

  if (btn) {
    btn.addEventListener("click", () => {
      body.classList.toggle("nav-open");
    });
  }

  if (mask) {
    mask.addEventListener("click", () => {
      body.classList.remove("nav-open");
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  targets.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".swiper")) return;

  new Swiper(".swiper", {
    loop: true,
    effect: "fade",
    speed: 1200,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
