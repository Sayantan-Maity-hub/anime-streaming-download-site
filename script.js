const navLinks = document.querySelectorAll('.nav-links li');
const indicator = document.querySelector('.indicator');

navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const { left, width } = link.getBoundingClientRect();
        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;
    });
});