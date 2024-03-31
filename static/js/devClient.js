(() => {

  const PROXY_PREFIX = '/proxy';
  const PROFILE_SETTINGS_PATH = '/settings/profile';
  const AUTH_LOGIN_PATH = '/action/authLogin';

  const domParser = new DOMParser();

  const isDevServer = () => window.location.hostname !== 'acomics.ru';

  const proxifyPath = (path) => isDevServer() ? PROXY_PREFIX + path : path;

  const getUsername = async () => {
    const response = await fetch(proxifyPath(PROFILE_SETTINGS_PATH), { method: 'get' });
    const responseText = await response.text();
    const htmlDoc = domParser.parseFromString(responseText, 'text/html');
    const usernameInput = htmlDoc.querySelector('main form.profile input[name="username"]');
    return usernameInput === null ? null : usernameInput.value;
  };

  const authFormSubmitListener = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const response = await fetch(proxifyPath(AUTH_LOGIN_PATH), { method: 'post', body: new FormData(form)});
    const responseText = await response.text();
    const htmlDoc = domParser.parseFromString(responseText, 'text/html');
    const errorSection = htmlDoc.querySelector('div#error');
    if (errorSection === null) {
      const username = await getUsername();
      initAuthPanel(username);
    } else {
      console.log(errorSection);
      alert('Ошибка авторизации. См. детали в консоли.');
    }
  };

  const createLoginForm = () => {
    const formElement = document.createElement('form');

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

    formElement.addEventListener('submit', authFormSubmitListener);

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
    authElement.classList.add('auth');

    if (username) {
      authElement.innerText = 'Вы вошли как: ' + username;
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
