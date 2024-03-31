(() => {

  const PROXY_PREFIX = '/proxy';

  const domParser = new DOMParser();

  const isDevServer = () => window.location.hostname !== 'acomics.ru';

  const proxifyPath = (path) => isDevServer() ? PROXY_PREFIX + path : path;

  const fetchAndParseHtml = async (path, init) => {
    const response = await fetch(proxifyPath(path), init);
    const responseText = await response.text();
    return domParser.parseFromString(responseText, 'text/html');
  };

  const sendFormAndParseHtml = async (form) => {
    const init = {method: form.method};
    if (form.getAttribute('method') === 'post') {
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
