// set current date
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// menu links
const navBtn = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

// show/remove links
navBtn.addEventListener("click", () => {
  const linksContainerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  linksContainer.style.height =
    linksContainerHeight === 0 ? linksHeight + "px" : 0;
});

// fix navigation
const navBar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
const navigationHeight = navBar.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  scrollHeight > 0
    ? navBar.classList.add("fixed-nav")
    : navBar.classList.remove("fixed-nav");

  scrollHeight > document.documentElement.clientHeight
    ? topLink.classList.add("show-link")
    : topLink.classList.remove("show-link");
});

// smooth scroll

const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href").slice(1);
    elementById = document.getElementById(id);
    const isNavFixed = navBar.classList.contains("fixed-nav");

    let position = isNavFixed
      ? elementById.offsetTop - navigationHeight
      : elementById.offsetTop - 2 * navigationHeight;

    if (navigationHeight > 102) {
      position = position + linksContainerHeight;
      console.log(position);
    }
    window.scrollTo({
      left: 0,
      top: position,
    });
    console.log(navigationHeight);
    linksContainer.style.height = 0;
    
  });
});
