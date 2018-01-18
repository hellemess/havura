const ENTER = 13;

const isActivationEvent = (evt) => evt.keyCode && evt.keyCode === ENTER;

const menu = document.querySelector('.header__nav');
const menuToggle = menu.querySelector('.header__menu-toggle');
const menuList = menu.querySelector('.header__menu-list');

menu.classList.remove('header__nav--no-js');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('header__menu-toggle--close');
});

menuToggle.addEventListener('keydown', (evt) => {
  if (isActivationEvent(evt)) {
    menuToggle.classList.toggle('header__menu-toggle--close');
  }
});
