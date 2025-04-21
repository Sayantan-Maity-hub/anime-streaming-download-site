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

/* for center slide effect */
let items = document.querySelectorAll('.header-container .anime-header-card');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 3; // Starting from index 3
let autoSlideInterval;

function loadShow() {
    const total = items.length;

    items.forEach((item, i) => {
        let offset = (i - active + total) % total;
        if (offset > total / 2) offset -= total;
        const absOffset = Math.abs(offset);

        if (offset === 0) {
            // Center card
            item.style.zIndex = 10;
            item.style.opacity = 1;
            item.style.filter = 'none';
            item.style.transform = `
                translateX(50px) 
                scale(1.05) 
                perspective(1000px) 
                rotateY(0deg)
            `;
        } else {
            item.style.zIndex = -absOffset;
            item.style.opacity = absOffset > 2 ? 0 : 1 - (0.4 * absOffset);
            item.style.filter = absOffset > 2 ? 'blur(5px)' : 'blur(2px)';
            item.style.transform = `
                translateX(${offset * 120}px) 
                scale(${1 - 0.2 * absOffset}) 
                perspective(16px) 
                rotateY(${offset < 0 ? 1 : -1}deg)
            `;
        }
    });
}


function nextItem() {
    active = (active + 1) % items.length;
    loadShow();
}

function prevItem() {
    active = (active - 1 + items.length) % items.length;
    loadShow();
}

// Manual controls
next.onclick = function () {
    clearInterval(autoSlideInterval);
    nextItem();
    startAutoSlide();
};

prev.onclick = function () {
    clearInterval(autoSlideInterval);
    prevItem();
    startAutoSlide();
};

// Hover pause
items.forEach(item => {
    item.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
    item.addEventListener("mouseleave", () => startAutoSlide());
});

// Start everything
function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextItem, 3000);
}

loadShow();
startAutoSlide();
