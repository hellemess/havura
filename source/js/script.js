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

  const menu = document.querySelector('.header__nav');
  const menuToggle = menu.querySelector('.header__menu-toggle');
  const menuList = menu.querySelector('.header__menu-list');

  menu.classList.remove('header__nav--no-js');

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

  // открытие и закрытие формы отправки отзывами

  const feedbackButton = document.querySelector('.feedback .btn');
  const feedbackForm = document.querySelector('.form');
  const feedbackFormClose = feedbackForm.querySelector('.form__close');
  const feedbackFormName = feedbackForm.querySelector('.form__input');

  const closeForm = () => {
    feedbackForm.classList.remove('form--show');
  }

  const openForm = (evt) => {
    evt.preventDefault();
    feedbackForm.classList.add('form--show');
    feedbackFormName.focus();
  };

  addHandler(feedbackButton, openForm);
  addHandler(feedbackFormClose, closeForm);
  feedbackForm.addEventListener('submit', closeForm);

  document.addEventListener('keydown', (evt) => {
    if (isDeactivationEvent(evt)) {
      closeForm();
    }
  });
})();
