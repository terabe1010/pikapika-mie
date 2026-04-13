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
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeaderState = () => {
    const currentScrollY = window.scrollY;
    const threshold = window.innerWidth <= 768 ? 80 : 400;
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY);

    if (currentScrollY > threshold) {
      header.classList.add("is-fixed");

      if (scrollingDown && scrollDelta > 4) {
        header.classList.add("is-hidden");
      } else if (!scrollingDown && scrollDelta > 4) {
        header.classList.remove("is-hidden");
      }
    } else {
      header.classList.remove("is-fixed", "is-hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderState);
      ticking = true;
    }
  });

  updateHeaderState();

  if (btn) {
    btn.addEventListener("click", () => {
      body.classList.toggle("nav-open");
      header.classList.remove("is-hidden");
    });
  }

  if (mask) {
    mask.addEventListener("click", () => {
      body.classList.remove("nav-open");
      header.classList.remove("is-hidden");
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      header.classList.remove("is-hidden");
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
