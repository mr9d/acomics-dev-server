(() => {

  const PROXY_PREFIX = '/proxy';
  const LIVE_HOST_NAMES = ['acomics.ru', 'acomics4'];

  const domParser = new DOMParser();

  const isDevServer = () => !LIVE_HOST_NAMES.includes(window.location.hostname);

  const proxifyPath = (path) => isDevServer() ? PROXY_PREFIX + path : path;

  const fetchAndParseHtml = async (path, init) => {
    const response = await fetch(proxifyPath(path), init);
    
    const responseText = await response.text();

    return domParser.parseFromString(responseText, 'text/html');
  };

  const sendFormAndParseHtml = async (form) => {
    const init = {method: form.getAttribute('method')};
    if (form.getAttribute('method').toLowerCase() === 'post') {
      init['body'] = new FormData(form);
    }
    return fetchAndParseHtml(form.getAttribute('action'), init);
  };

  const init = () => {
    window.acomicsLegacyClient = {
      fetchAndParseHtml,
      sendFormAndParseHtml
    };
  };

  init();

})();
