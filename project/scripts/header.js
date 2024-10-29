const hamburgerElement = document.querySelector('#hamburgerButton');
const navElement = document.querySelector('#nav-links-animation');

hamburgerElement.addEventListener('click', () => {
   navElement.classList.toggle('open')
   hamburgerElement.classList.toggle('open')
});