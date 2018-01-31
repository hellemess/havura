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

  // выпадение подменю при фокусе на ссылке

  if (document.documentElement.clientWidth > 750) {
    const menuLinks = header.querySelectorAll('.header__menu-link');
    const submenus = header.querySelectorAll('.header__submenu-list');

    menuLinks.forEach((it) => {
      it.addEventListener('focus', () => {
        menuLinks.forEach((it) => {
          it.style.background = 'transparent';
        });

        submenus.forEach((it) => {
          it.classList.remove('header__submenu-list--show');
        });

        it.style.background = 'rgba(0, 0, 0, 0.95)';

        if (it.classList.contains('header__menu-link--with-submenu')) {
          it.parentElement.children[1].classList.add('header__submenu-list--show');
        }
      });

      it.addEventListener('blur', (evt) => {
        if (evt.relatedTarget === null || !evt.relatedTarget.classList.contains('header__submenu-link')) {
          menuLinks.forEach((it) => {
            it.style.background = 'transparent';
          });

          submenus.forEach((it) => {
            it.classList.remove('header__submenu-list--show');
          });
        }
      });
    });
  }

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
