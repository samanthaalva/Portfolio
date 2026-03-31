// current year in footer
const theTime = new Date();
document.querySelector("#year").textContent = theTime.getFullYear();

// Only watch top-level main sections that map to a nav link.
const myListOfItems = Array.from(document.querySelectorAll("main > section[id]")).filter(
  (section) => document.querySelector(`#navWrapper a[href="#${section.id}"]`)
);

// a comma deliniated list of name/value pairs controlling how the observer works
let observerOptions = {
  //null is the default and references the viewport
  root: null,
  //alters the viewport. negative values decrease the size.
  rootMargin: "0px 0px -30px 0px",
  //0 is barely showing, 1 is fully showing
  threshold: 0.25,
};

// AllItems is a list of all elements being watched
const myObserver = new IntersectionObserver((allItems) => {
  allItems.forEach((singleItem) => {
    if (singleItem.isIntersecting) {
      hiliteNav(singleItem.target);
    }
  });
}, observerOptions);

// function to hilight the current navigation items
function hiliteNav(x) {
  const theid = x.getAttribute("id");
  const newActiveLink = document.querySelector(`[href="#${theid}"]`);

  // Ignore sections that do not map to a nav link.
  if (!newActiveLink || !newActiveLink.parentElement) return;

  // Remove active class from currently active item (if it exists)
  const currentActive = document.querySelector(".active");
  if (currentActive) {
    currentActive.classList.remove("active");
  }

  newActiveLink.parentElement.classList.add("active");
}

// Add smooth scrolling with offset for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Check if we're on a large screen (64rem = 1024px)
      const isLargeScreen = window.innerWidth >= 1024;

      let targetPosition;

      if (isLargeScreen) {
        // On large screens, navigation is sidebar - no offset needed
        targetPosition = targetSection.offsetTop;
      } else {
        // On small/medium screens, navigation is at top - apply offset
        const navHeight = document.querySelector("#navWrapper").offsetHeight;
        targetPosition = targetSection.offsetTop - navHeight - 10;
      }

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

//call the function for each element in the list
myListOfItems.forEach((item) => {
  myObserver.observe(item);
});

//Swiper from section two

const swiper = new Swiper(".swiper", {
  // Optional parameters

  loop: true,
  effect: "fade",
  speed: 2000,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  //Autoplay
  autoplay: {
    delay: 5000,
  },
});
