// Scroll avec lien d'ancrage 

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(anchorLink => {
  anchorLink.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = anchorLink.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});


// Effet du scroll
function appearOnScroll(element, effectClass) {
  let position = element.getBoundingClientRect().top;
  let windowHeight = window.innerHeight;

  if (position < windowHeight) {
    element.classList.add(effectClass);
  }
}
function handleScroll() {
  let fadeSlideElements = document.querySelectorAll('.fade-slide');
  for (let i = 0; i < fadeSlideElements.length; i++) {
    appearOnScroll(fadeSlideElements[i], 'fade-slide--active');
  }
  let fadeElements = document.querySelectorAll('.fade');
  for (let i = 0; i < fadeElements.length; i++) {
    appearOnScroll(fadeElements[i], 'fade--active');
  }
  let zoomElements = document.querySelectorAll('.zoom');
  for (let i = 0; i < zoomElements.length; i++) {
    appearOnScroll(zoomElements[i], 'zoom--active');
  }
}
window.addEventListener('scroll', handleScroll);
handleScroll();


// Effet zoom sur les cartes de personnages en hover
const characterCards = document.querySelectorAll('.card-items');
characterCards.forEach(card => {
  const image = card.querySelector('.img');
  const description = card.querySelector('.description');
  card.addEventListener('mouseenter', () => {
    image.style.transform = 'scale(1.1)';
    description.style.opacity = '1';
    description.style.transform = 'scale(1.1)';
  });
  card.addEventListener('mouseleave', () => {
    image.style.transform = 'scale(1)';
    description.style.opacity = '0';
    description.style.transform = 'scale(1)';
  });
});


// Slider avec Owl Carousel et jQuery
$(document).ready(function ($) {

  $('#JusticeLeague .owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    animateOut: 'fadeOut',
    autoplay: true,
    autoplayTimeout: 5000
  });

  $('#BatmanFilm .owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    smartSpeed:1500,
    autoplay: true,
    autoplayTimeout: 5000
  });

  var urlArrowLeft = "../Assets/Logos/icon_flèche_1.png";
  var urlArrowRight = "../Assets/Logos/icon_flèche_2.png";

  $("#BatmanFilm .owl-prev span").html('<img src="' + urlArrowLeft + '" >');
  $("#BatmanFilm .owl-next span").html('<img src="' + urlArrowRight + '" >');

});