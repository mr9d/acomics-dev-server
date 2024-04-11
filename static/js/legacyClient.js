(() => {

  const PROXY_PREFIX = '/proxy';

  const domParser = new DOMParser();

  const isDevServer = () => window.location.hostname !== 'acomics.ru';

  const proxifyPath = (path) => isDevServer() ? PROXY_PREFIX + path : path;

  const fetchAndParseHtml = async (path, init) => {
    console.log(proxifyPath(path), init)
    const response = await fetch(proxifyPath(path), init);
    console.log(proxifyPath(path), init, response)
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
