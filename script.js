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
    const track = document.querySelector('.header-container');
    const cards = [...track.children];
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });