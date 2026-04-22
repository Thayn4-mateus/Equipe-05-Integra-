function revealElements() {
  const elements = document.querySelectorAll(".reveal");

  elements.forEach((el, index) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight ) {
      el.style.transitionDelay = index * 0.1 + "s";
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);