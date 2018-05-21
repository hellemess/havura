window.script = (() => {
  const ENTER = 13;

  const isActivationEvent = (evt) => evt.keyCode && evt.keyCode === ENTER;

  const addHandler = (element, action) => {
    element.addEventListener(`click`, action);

    element.addEventListener(`keydown`, (evt) => {
      if (isActivationEvent(evt)) {
        action;
      }
    });
  };

  // открытие и закрытие меню сайта по нажанию на иконку меню

  const header = document.querySelector(`.header`);
  const menuToggle = header.querySelector(`.header__menu-toggle`);

  header.classList.remove(`header--no-js`);

  const toggleMenu = () => {
    menuToggle.classList.toggle(`header__menu-toggle--close`);
  };

  addHandler(menuToggle, toggleMenu);

  // выпадение подменю при фокусе на ссылке

  if (window.innerWidth > 767) {
    const menuLinks = header.querySelectorAll(`.header__menu-link`);
    const submenus = header.querySelectorAll(`.header__submenu-list`);
    const submenuLinks = header.querySelectorAll(`.header__submenu-link`);

    const refreshMenu = () => {
      Array.from(menuLinks).forEach((it) => {
        it.style.background = `transparent`;
      });

      Array.from(submenus).forEach((it) => {
        it.classList.remove(`header__submenu-list--show`);
      });
    }

    Array.from(menuLinks).forEach((it) => {
      if (it.href === ``) {
        it.setAttribute(`tabindex`, 0);
      }

      it.addEventListener(`focus`, () => {
        refreshMenu();

        it.style.background = `rgba(0, 0, 0, 0.95)`;

        if (it.classList.contains(`header__menu-link--with-submenu`)) {
          it.nextElementSibling.classList.add(`header__submenu-list--show`);
        }

        it.addEventListener(`blur`, (evt) => {
          if (evt.relatedTarget === null || !evt.relatedTarget.classList.contains(`header__submenu-link`)) {
            refreshMenu();
          }
        });
      });
    });

    Array.from(submenuLinks).forEach((it) => {
      it.addEventListener(`blur`, (evt) => {
        if (evt.relatedTarget === null || !evt.relatedTarget.classList.contains(`header__submenu-link`)) {
          refreshMenu();
        }
      });
    });
  }

  // переключение между отзывами взрослых и школьников

  const feedback = document.querySelector(`.feedback--with-toggle`);

  if (feedback !== null) {
    const feedbackToggle = feedback.querySelector(`.feedback__toggle`);
    const feedbackOptions = feedback.querySelectorAll(`.feedback__option`);
    const feedbackSelections = feedback.querySelectorAll(`.feedback__selection`);

    feedback.classList.remove(`feedback--no-js`);

    feedbackToggle.addEventListener(`change`, () => {
      Array.from(feedbackSelections).forEach((it) => {
        it.classList.toggle(`feedback__selection--show`);
      });
    });

    Array.from(feedbackOptions).forEach((it) => {
      it.addEventListener(`keydown`, (evt) => {
        if (isActivationEvent(evt)) {
          evt.target.previousElementSibling.checked = true;

          Array.from(feedbackOptions).forEach((it) => {
            it.setAttribute(`tabindex`, 0);
          });

          it.setAttribute(`tabindex`, -1);

          if (evt.target.htmlFor === `adults`) {
            feedbackSelections[0].classList.add(`feedback__selection--show`);
            feedbackSelections[1].classList.remove(`feedback__selection--show`);
          } else {
            feedbackSelections[0].classList.remove(`feedback__selection--show`);
            feedbackSelections[1].classList.add(`feedback__selection--show`);
          }
        }
      });
    });
  }

  // переключение между треками расписания

  const schedule = document.querySelector(`.schedule`);

  if (schedule) {
    const parallels = document.querySelectorAll(`.schedule__parallel`);

    Array.from(parallels).forEach((it) => {
      const frame = it.querySelector(`.schedule__frame`);
      const content = frame.children[0];
      const lecturesCount = content.children.length;
      console.log(lecturesCount);

      let currentPosition = 0;

      const switchLectures = (evt) => {
        if (evt.target.classList.contains(`schedule__btn--prev`) && currentPosition < 0) {
          currentPosition += 100;
          content.style.left = `${currentPosition}%`;
        } else if (evt.target.classList.contains(`schedule__btn--next`) && currentPosition > - (lecturesCount - 1) * 100) {
          currentPosition -= 100;
          content.style.left = `${currentPosition}%`;
        }
      };

      it.addEventListener(`click`, (evt) => {
        addHandler(it, switchLectures);
      });
    });
  }

  // галерея фотографий

  const gallery = document.querySelector(`.gallery__block`);

  if (gallery) {
    const images = document.querySelectorAll(`.gallery__img`);

    let currentImageIndex = 0;

    gallery.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`gallery__btn--prev`) && currentImageIndex > 0) {
        images[currentImageIndex].classList.remove('gallery__item--show');
        currentImageIndex--;
        images[currentImageIndex].classList.add('gallery__item--show');
      }
    });
  }
})();
