document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".estimate-site-header");
  const button = document.querySelector(".estimate-hamburger");
  const mask = document.querySelector(".estimate-mask");
  const menuLinks = document.querySelectorAll(".estimate-menu-sp a");
  const body = document.body;

  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeaderState = () => {
    const currentScrollY = window.scrollY;
    const isMobile = window.innerWidth <= 1200;
    const threshold = isMobile ? 80 : 400;
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY);

    if (isMobile) {
      if (currentScrollY > threshold && scrollingDown && scrollDelta > 4) {
        header.classList.add("is-hidden");
      } else if (!scrollingDown && scrollDelta > 4) {
        header.classList.remove("is-hidden");
      }

      if (currentScrollY <= 0) {
        header.classList.remove("is-hidden");
      }
    } else if (currentScrollY > threshold) {
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

  if (button) {
    button.addEventListener("click", () => {
      body.classList.toggle("estimate-nav-open");
      header.classList.remove("is-hidden");
    });
  }

  if (mask) {
    mask.addEventListener("click", () => {
      body.classList.remove("estimate-nav-open");
      header.classList.remove("is-hidden");
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("estimate-nav-open");
      header.classList.remove("is-hidden");
    });
  });
});
