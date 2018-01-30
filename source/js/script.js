window.script = (() => {
  const ENTER = 13;
  const ESC = 27;

  const isActivationEvent = (evt) => evt.keyCode && evt.keyCode === ENTER;
  const isDeactivationEvent = (evt) => evt.keyCode && evt.keyCode === ESC;

  const addHandler = (element, action) => {
    element.addEventListener('click', action);

    element.addEventListener('keydown', (evt) => {
      if (isActivationEvent(evt)) {
        action;
      }
    });
  };

  // открытие и закрытие меню сайта по нажанию на иконку меню

  const header = document.querySelector('.header');
  const menuToggle = header.querySelector('.header__menu-toggle');

  header.classList.remove('header--no-js');

  const toggleMenu = () => {
    menuToggle.classList.toggle('header__menu-toggle--close');
  };

  addHandler(menuToggle, toggleMenu);

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
})();
