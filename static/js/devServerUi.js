(() => {

  const PROFILE_SETTINGS_PATH = '/settings/profile';
  const AUTH_LOGIN_PATH = '/action/authLogin';
  const AUTH_LOGOUT_PATH = '/auth/logout';

  const getUsername = async () => {
    const response = await window.acomicsLegacyClient.fetchAndParseHtml(PROFILE_SETTINGS_PATH, {method: 'get'});
    const usernameInput = response.querySelector('main form.profile input[name="username"]');
    return usernameInput === null ? null : usernameInput.value;
  };

  const loginFormSubmitListener = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const response = await window.acomicsLegacyClient.sendFormAndParseHtml(form);
    const errorSection = response.querySelector('div#error');
    if (errorSection === null) {
      const username = form.username.value;
      initAuthPanel(username);
    } else {
      console.log(errorSection);
      alert('Ошибка авторизации. См. детали в консоли.');
    }
  };

  const createLoginForm = () => {
    const formElement = document.createElement('form');
    formElement.setAttribute('method', 'post');
    formElement.setAttribute('action', AUTH_LOGIN_PATH);

    const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('name', 'username');
    usernameInput.style.margin = '0 1em 0 0.5em';

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('name', 'password');
    passwordInput.style.margin = '0 1em 0 0.5em';

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerText = 'Войти';

    const hiddenElement = document.createElement('input');
    hiddenElement.setAttribute('type', 'hidden');
    hiddenElement.setAttribute('name', 'submit');
    hiddenElement.setAttribute('value', 'login');

    formElement.append(
      document.createTextNode('Имя пользователя:'),
      usernameInput,
      document.createTextNode('Пароль:'),
      passwordInput,
      submitButton,
      hiddenElement);

    formElement.addEventListener('submit', loginFormSubmitListener);

    return formElement;
  };

  const logoutFormSubmitListener = async (evt) => {
    evt.preventDefault();
    await window.acomicsLegacyClient.sendFormAndParseHtml(evt.target);
    initAuthPanel(null);
  };

  const createLogoutForm = (username) => {
    const formElement = document.createElement('form');
    formElement.setAttribute('method', 'get');
    formElement.setAttribute('action', AUTH_LOGOUT_PATH);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerText = 'Выйти';
    submitButton.style.margin = '0 0 0 0.5em';

    formElement.append(
      document.createTextNode('Вы вошли как: ' + username),
      submitButton);

    formElement.addEventListener('submit', logoutFormSubmitListener);

    return formElement;
  };

  const initAuthPanel = async (username) => {
    const oldPanel = document.querySelector('section.auth');
    if (oldPanel !== null) {
      oldPanel.remove();
    }

    const authElement = document.createElement('section');

    authElement.style.padding = '1em';
    authElement.style.background = 'lightgrey';
    authElement.style.margin = '0 0 8px';
    authElement.classList.add('auth');
    authElement.dataset.username = username;

    if (username) {
      authElement.append(createLogoutForm(username));
    } else {
      authElement.append(createLoginForm());
    }

    document.body.prepend(authElement);
  };

  const init = async () => {
    const username = await getUsername();
    initAuthPanel(username);
  };

  init();

})();
