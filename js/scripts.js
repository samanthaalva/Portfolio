// current year in footer
const theTime = new Date();
document.querySelector('#year').textContent = theTime.getFullYear();

// get me a list of all the items to watch
const myListOfItems = document.querySelectorAll('section')

// a comma deliniated list of name/value pairs controlling how the observer works
let observerOptions = {
    //null is the default and references the viewport
    root: null,
    //alters the viewport. negative values decrease the size.
    rootMargin: '0px 0px -30px 0px',
    //0 is barely showing, 1 is fully showing
    threshold: .25
  }

// AllItems is a list of all elements being watched
const myObserver = new IntersectionObserver(allItems => {
    allItems.forEach(singleItem => {
        if (singleItem.isIntersecting){
            hiliteNav(singleItem.target)
        }
    })
}, observerOptions)

// function to hilight the current navigation items
function hiliteNav(x) {
	// Remove active class from currently active item (if it exists)
	const currentActive = document.querySelector('.active');
	if (currentActive) {
		currentActive.classList.remove('active');
	}
	
	let theid = x.getAttribute('id');
	let newActiveLink = document.querySelector(`[href="#${theid}"]`);
	
	// Make sure the link exists before trying to add the active class
	if (newActiveLink && newActiveLink.parentElement) {
		newActiveLink.parentElement.classList.add('active');
	}
}

// Add smooth scrolling with offset for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
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
                const navHeight = document.querySelector('#navWrapper').offsetHeight;
                targetPosition = targetSection.offsetTop - navHeight - 10;
            }
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

//call the function for each element in the list
myListOfItems.forEach(item => {
    myObserver.observe(item)
});