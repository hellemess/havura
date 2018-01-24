const ENTER = 13;

const isActivationEvent = (evt) => evt.keyCode && evt.keyCode === ENTER;

// открытие и закрытие меню сайта по нажанию на иконку меню

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

// переключение между отзывами взрослых и школьников

const feedback = document.querySelector('.feedback');
const feedbackToggle = feedback.querySelector('.feedback__toggle');
const feedbackSelections = feedback.querySelectorAll('.feedback__selection');

feedback.classList.remove('feedback--no-js');

feedbackToggle.addEventListener('change', () => {
  feedbackSelections.forEach((it) => {
    it.classList.toggle('feedback__selection--show');
  });
});
