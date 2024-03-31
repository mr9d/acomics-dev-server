(() => {

  const form = document.querySelector('form.serialCategories');

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const response = await window.acomicsLegacyClient.sendFormAndParseHtml(evt.target);
    console.log(response);
  });

})();
