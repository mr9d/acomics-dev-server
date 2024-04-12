(() => {

  const form = document.querySelector('form.editAvatar');

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const username = document.querySelector('section.auth').dataset.username;
    form.querySelector('input[name="username"]').setAttribute('value', username);
    const response = await window.acomicsLegacyClient.sendFormAndParseHtml(evt.target);
    console.log(response);
  });

})();
