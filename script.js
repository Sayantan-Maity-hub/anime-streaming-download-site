/* for cursor indicator*/
const navLinks = document.querySelectorAll('.nav li');
const indicator = document.querySelector('.indicator');

navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const { left, width } = link.getBoundingClientRect();
        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;
    });
});


/* Clone cards for infinite effect */
let items = document.querySelectorAll('.header-container .anime-header-card');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 3; // Starting active item index
let autoSlideInterval; // Variable to hold the interval

function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    // Adjust items to the right of the active item
    for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(3px)';
        items[i].style.opacity = stt > 4 ? 0 : 0.6;
    }

    // Adjust items to the left of the active item
    stt = 0;
    for (var i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(3px)';
        items[i].style.opacity = stt > 4 ? 0 : 0.6;
    }
}

// Function to move to the next item
function nextItem() {
    active = active + 1 < items.length ? active + 1 : 0; // Loop back to the first item
    loadShow();
}

// Function to move to the previous item
function prevItem() {
    active = active - 1 >= 0 ? active - 1 : items.length - 1; // Loop back to the last item
    loadShow();
}

// Load the initial state
loadShow();

// Event listeners for next and previous buttons
next.onclick = function() {
    clearInterval(autoSlideInterval); // Clear the auto slide interval when manually changing slides
    nextItem();
    startAutoSlide(); // Restart auto slide
}

prev.onclick = function() {
    clearInterval(autoSlideInterval); // Clear the auto slide interval when manually changing slides
    prevItem();
    startAutoSlide(); // Restart auto slide
}

// Function to start auto sliding
function startAutoSlide() {
    autoSlideInterval = setInterval(nextItem, 3000); // Change slide every 3 seconds
}

// Start the auto slide feature
startAutoSlide();
