(() => {

  const form = document.querySelector('form.manageAddIssue');

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const input = document.querySelector('.imgs');
    const file = input.files;

    let list = new DataTransfer();
    list.items.add(file[0]);
    input.files = list.files;
    console.log(evt.target);
    const response = await window.acomicsLegacyClient.sendFormAndParseHtml(evt.target);
    console.log(response);
  });

})();
