const ENTER = 13;

const isActivationEvent = (evt) => evt.keyCode && evt.keyCode === ENTER;

const menu = document.querySelector('.header__nav');
const menuToggle = menu.querySelector('.header__menu-toggle');
const menuList = menu.querySelector('.header__menu-list');

menu.classList.remove('header__nav--no-js');

const toggleMenu = () => {
  menuToggle.classList.toggle('header__menu-toggle--close');
};

menuToggle.addEventListener('click', toggleMenu);

menuToggle.addEventListener('keydown', (evt) => {
  if (isActivationEvent(evt)) {
    toggleMenu;
  }
});
