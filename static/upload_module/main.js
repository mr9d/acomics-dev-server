(() => {
  const PAGE_HTML_TEMPLATE = `
<div class="multiple-issues-upload__dropbox">
    <label class="multiple-issues-upload__dropbox-label">Перетащите страницы вашего комикса сюда</label>
    <input type="file" class="multiple-issues-upload__dropbox-input" data-limit="2097152" accept="image/png, image/jpeg" multiple name="files">
</div>
<div class="multiple-issues-upload__field multiple-issues-upload__field_disabled">
    <div class="multiple-issues-upload__button multiple-issues-upload__top-buttons">
        <input type="file" name="inner_files" data-limit="2097152" accept="image/png, image/jpeg" class="multiple-issues-upload__add-button" multiple>
        <label>Добавить страницы</label>
    </div>
    <div class="multiple-issues-upload__list">
    </div>
    <label class="multiple-issues-upload__section-label">Режим публикации</label>
    <div class="multiple-issues-upload__publication">
        <input name="publication" type="radio" value="instant" class="multiple-issues-upload__publication-input"
               id="multiple-issues-upload__publish-immediately" checked>
        <label for="multiple-issues-upload__publish-immediately" class="multiple-issues-upload__publication-label">Сразу</label>
        <input name="publication" type="radio" value="auto" class="multiple-issues-upload__publication-input"
               id="multiple-issues-upload__publish-auto">
        <label for="multiple-issues-upload__publish-auto" class="multiple-issues-upload__publication-label">Автопубликация</label>
    </div>
    <div class="multiple-issues-upload__bottom-buttons">
        <div class="multiple-issues-upload__lds-roller_disabled"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <button class="multiple-issues-upload__button multiple-issues-upload__submit-button">Опубликовать</button>
        <button data-hystmodal="#preview-modal" class="multiple-issues-upload__button multiple-issues-upload__preview-button">Предпросмотр</button>

    </div>
    <div class="multiple-issues-upload__error"></div>
</div>
<div class="hystmodal" id="multipleIssuesModal" aria-hidden="true">
    <div class="hystmodal__wrap">
        <div class="hystmodal__window" role="dialog" aria-modal="true">
            <div class="edit-modal">
                <div class="edit-modal__img-container">
                    <img src="" alt="Примеры" class="edit-modal__img">
                </div>
                <div class="edit-modal__text">
                    <div class="edit-modal__name-field">
                        <h3 class="edit-modal__name">Редактирование выпуска</h3>
                        <button data-hystclose class="edit-modal__close"></button>
                    </div>
                    <hr>
                    <label for="edit-modal__namespace" class="edit-modal__label">Название выпуска:</label>
                    <textarea name="description" id="edit-modal__namespace"
                              class="edit-modal__namespace edit-modal__textarea" cols="0"
                              rows="0"></textarea>
                    <label for="edit-modal__description" class="edit-modal__label">Описание:</label>
                    <textarea name="description" id="edit-modal__description"
                              class="edit-modal__description edit-modal__textarea" cols="0"
                              rows="0"></textarea>
                    <button data-hystclose class="edit-modal__button">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="hystmodal" id="preview-modal" aria-hidden="true">
    <div class="hystmodal__wrap">
        <div class="hystmodal__window preview-modal" role="dialog" aria-modal="true">
            <div class="preview-modal__container">

            </div>
        </div>
    </div>
</div>`;
  const INNER_TEXT = `
<a href="" class="multiple-issues-upload__card-button multiple-issues-upload__card-button_type_move-left">
    <img class="image-fit" src="data:image/svg+xml;utf8,<?xml version='1.0' encoding='iso-8859-1'?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg fill='%23000000' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' \t width='800px' height='800px' viewBox='0 0 29.771 29.771'\t xml:space='preserve'><g>\t<path d='M29.771,14.886c0,1.657-1.344,3-3,3H11.486l4.506,4.505c1.172,1.172,1.172,3.071,0,4.243\t\tc-0.586,0.586-1.354,0.879-2.122,0.879s-1.534-0.293-2.12-0.878L0,14.885L11.745,3.138c1.173-1.172,3.071-1.171,4.243,0\t\tc1.172,1.172,1.172,3.071,0,4.243l-4.505,4.506h15.289C28.427,11.886,29.771,13.229,29.771,14.886z'/></g></svg>
" alt="Передвинуть влево">
</a>
<h3 class="multiple-issues-upload__card-title"></h3>
<a href="" class="multiple-issues-upload__card-button multiple-issues-upload__card-button_type_move-right">
    <img class="image-fit" src="data:image/svg+xml;utf8,<?xml version='1.0' encoding='iso-8859-1'?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg fill='%23000000' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' \t width='800px' height='800px' viewBox='0 0 29.774 29.773'\t xml:space='preserve'><g>\t<path d='M29.774,14.889L18.026,26.636c-0.586,0.585-1.354,0.878-2.121,0.878c-0.766,0-1.535-0.293-2.121-0.879\t\tc-1.172-1.171-1.172-3.071,0-4.243l4.505-4.505H3c-1.656,0-3-1.343-3-3s1.344-3,3-3h15.286l-4.506-4.506\t\tc-1.172-1.171-1.172-3.071,0-4.242c1.172-1.172,3.071-1.172,4.243,0L29.774,14.889z'/></g></svg>
" alt="Передвинуть вправо">
</a>
<a href="" data-hystmodal="#multipleIssuesModal" class="multiple-issues-upload__card-button multiple-issues-upload__card-button_type_edit">
    <img class="image-fit" src="data:image/svg+xml;utf8,<?xml version='1.0' encoding='iso-8859-1'?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg fill='%23000000' height='800px' width='800px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' \t viewBox='0 0 456.645 456.645' xml:space='preserve'><g>\t<g>\t\t<path d='M431.466,25.209c-33.61-33.61-88.01-33.615-121.625,0L32.192,302.859c-1.947,1.944-3.437,4.59-4.054,7.431L0.371,438.469\t\t\tc-1.08,4.984,0.447,10.176,4.054,13.782c3.61,3.611,8.806,5.132,13.782,4.054l128.18-27.768c2.869-0.621,5.506-2.129,7.431-4.054\t\t\tl277.649-277.649C464.998,113.302,464.998,58.742,431.466,25.209z M34.623,422.053l17.013-78.537l61.524,61.523L34.623,422.053z\t\t\t M143.211,392.664l-79.199-79.199L307,70.477l79.199,79.2L143.211,392.664z M410.254,125.621l-2.842,2.842l-79.199-79.2\t\t\tl2.842-2.842c21.864-21.864,57.31-21.887,79.199,0C432.088,68.257,432.088,103.786,410.254,125.621z'/>\t</g></g></svg>
" alt="Изменить"/>
</a>
<a href="" class="multiple-issues-upload__card-button multiple-issues-upload__card-button_type_delete">
    <img class="image-fit" src="data:image/svg+xml;utf8,<?xml version='1.0' encoding='iso-8859-1'?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg fill='%23000000' height='800px' width='800px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' \t viewBox='0 0 455 455' xml:space='preserve'><g>\t<g>\t\t<g>\t\t\t<path d='M227.5,0C101.761,0,0,101.75,0,227.5C0,353.239,101.75,455,227.5,455C353.239,455,455,353.25,455,227.5\t\t\t\tC455.001,101.761,353.251,0,227.5,0z M227.5,425.001c-108.902,0-197.5-88.599-197.5-197.5S118.599,30,227.5,30\t\t\t\tS425,118.599,425,227.5S336.402,425.001,227.5,425.001z'/>\t\t\t<path d='M321.366,133.635c-17.587-17.588-46.051-17.589-63.64,0L227.5,163.86l-30.226-30.225\t\t\t\tc-17.588-17.588-46.051-17.589-63.64,0c-17.544,17.545-17.544,46.094,0,63.64L163.86,227.5l-30.226,30.226\t\t\t\tc-17.544,17.545-17.544,46.094,0,63.64c17.585,17.586,46.052,17.589,63.64,0l30.226-30.225l30.226,30.225\t\t\t\tc17.585,17.586,46.052,17.589,63.64,0c17.544-17.545,17.544-46.094,0-63.64L291.141,227.5l30.226-30.226\t\t\t\tC338.911,179.729,338.911,151.181,321.366,133.635z M300.153,176.062l-40.832,40.832c-2.813,2.813-4.394,6.628-4.394,10.606\t\t\t\tc0,3.979,1.581,7.793,4.394,10.606l40.832,40.832c5.849,5.849,5.849,15.365,0,21.214c-5.862,5.862-15.351,5.863-21.214,0\t\t\t\tl-40.832-40.832c-2.929-2.929-6.768-4.394-10.606-4.394s-7.678,1.464-10.606,4.394l-40.832,40.832\t\t\t\tc-5.861,5.861-15.351,5.863-21.213,0c-5.849-5.849-5.849-15.365,0-21.214l40.832-40.832c2.813-2.813,4.394-6.628,4.394-10.606\t\t\t\tc0-3.978-1.581-7.793-4.394-10.606l-40.832-40.832c-5.849-5.849-5.849-15.365,0-21.214c5.864-5.863,15.35-5.863,21.214,0\t\t\t\tl40.832,40.832c5.857,5.858,15.355,5.858,21.213,0l40.832-40.832c5.863-5.862,15.35-5.863,21.213,0\t\t\t\tC306.001,160.697,306.001,170.213,300.153,176.062z'/>\t\t</g>\t</g></g></svg>
" alt="Удалить">
</a>`;
  const issuesToUpload = [];
  let modalIndex = 0;
  let uploadStarted = false;

  const onFirstInput = (e) => {
    const files = document.querySelector(".multiple-issues-upload__dropbox-input").files;
    const dropbox = document.querySelector(".multiple-issues-upload__dropbox");
    for (let elem of files) {
      issuesToUpload.push(createFile(elem));
    }
    dropbox.classList.add("multiple-issues-upload__dropbox-disabled");
    initTable();
  }

  const createLinks = (index) => {
    const preCount = document.querySelector('.multiple-issues-upload').dataset.issuesCount;
    let name = "" + (index + 1 + Number(preCount));
    if (issuesToUpload[index].name) {
      name = name + ". " + issuesToUpload[index].name;
    }
    const links = document.createElement("div");
    links.className = "multiple-issues-upload__card-title-segment";
    links.innerHTML = INNER_TEXT;
    links.querySelector('.multiple-issues-upload__card-title').innerText = name;
    return links;
  }

  const createFileCard = (elem, index) => {
    const card = document.createElement("div");
    card.className = 'multiple-issues-upload__card';
    card.dataset.index = index;
    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.className = "multiple-issues-upload__card-thumbnail";
    thumbnailDiv.setAttribute("data-hystmodal", "#preview-modal");
    const thumbnail = document.createElement("img")
    thumbnail.className = "image-fit";
    thumbnail.src = URL.createObjectURL(elem);
    thumbnailDiv.append(thumbnail);
    card.append(thumbnailDiv);
    card.append(createLinks(index));
    return card;
  }

  const createFile = (file, name = "", description = "") => {
    return {file: file, name: name, description: description, status: false, onload: "unload"};
  }

  const deleteFile = (evt) => {
    evt.preventDefault();
    const index = Number(evt.target.closest('.multiple-issues-upload__card').dataset.index);
    issuesToUpload.splice(index, 1);
    initTable();
  }

  const handleSwitching = (evt, direction) => {
    evt.preventDefault();
    const index = Number(evt.target.closest('.multiple-issues-upload__card').dataset.index);
    if (direction) {
      [issuesToUpload[index], issuesToUpload[index + 1]] = [issuesToUpload[index + 1], issuesToUpload[index]];
    } else {
      [issuesToUpload[index], issuesToUpload[index - 1]] = [issuesToUpload[index - 1], issuesToUpload[index]];
    }
    initTable();
  }

  const handleButtons = (elem) => {
    const deleteButton = elem.querySelector(".multiple-issues-upload__card-button_type_delete");
    const editButton = elem.querySelector(".multiple-issues-upload__card-button_type_edit");
    const rightArrow = elem.querySelector(".multiple-issues-upload__card-button_type_move-right");
    const leftArrow = elem.querySelector(".multiple-issues-upload__card-button_type_move-left");
    const previewImage = elem.querySelector(".multiple-issues-upload__card-thumbnail");
    previewImage.addEventListener("click", handleOnePreview);
    deleteButton.addEventListener("click", deleteFile);
    editButton.addEventListener("click", handleEditModalOpening);
    rightArrow.addEventListener("click", (evt) => {
      evt.preventDefault();
      handleSwitching(evt, 1)
    });
    leftArrow.addEventListener("click", (evt) => {
      evt.preventDefault();
      handleSwitching(evt, 0)
    });
  }

  const initTable = () => {
    const field = document.querySelector(".multiple-issues-upload__field");
    field.classList.remove("multiple-issues-upload__field_disabled");
    const cardList = document.querySelector(".multiple-issues-upload__list");
    cardList.innerHTML = "";
    let count = 0;
    for (let elem of issuesToUpload) {
      const card = createFileCard(elem.file, count);
      if (elem.onload === "loading") {
        card.classList.add("multiple-issues-upload__card_onload_loading");
      } else if (elem.onload === "error") {
        card.classList.add("multiple-issues-upload__card_onload_error");
      } else if (elem.onload === "success") {
        card.classList.add("multiple-issues-upload__card_onload_successful");
      }
      issuesToUpload[count].card = card;
      cardList.append(card);
      handleButtons(card);
      count++;
    }
    if (uploadStarted) {
      const arrows = document.querySelectorAll(".multiple-issues-upload__card-button_type_move-right, .multiple-issues-upload__card-button_type_move-left");
      arrows.forEach(arrow => {
        arrow.classList.add("multiple-issues-upload__card-button_type_move-block");
      })
    }
  }

  const handleInnerInput = () => {
    const files = document.querySelector(".multiple-issues-upload__add-button").files;
    for (let elem of files) {
      issuesToUpload.push(createFile(elem));
    }
    initTable();
    // console.log(issuesToUpload);
  }

  const handleSaveEdit = () => {
    const textareaName = document.querySelector(".edit-modal__namespace");
    const textareaDescription = document.querySelector(".edit-modal__description");
    const index = modalIndex;
    issuesToUpload[index].name = textareaName.value;
    issuesToUpload[index].description = textareaDescription.value;
    initTable();
  }

  const initPage = (elem) => {
    const uploadPage = document.createElement("section");
    uploadPage.className = "multiple-issues-upload__container";
    uploadPage.innerHTML = PAGE_HTML_TEMPLATE;
    elem.append(uploadPage);
  }

  const init = () => {
    const module = document.querySelector(".multiple-issues-upload");
    initPage(module);
    const input = document.querySelector(".multiple-issues-upload__dropbox-input");
    const add = document.querySelector(".multiple-issues-upload__add-button");
    const saveModal = document.querySelector(".edit-modal__button");
    const previewButton = document.querySelector(".multiple-issues-upload__preview-button");
    const submitButton = document.querySelector(".multiple-issues-upload__submit-button");
    input.addEventListener("change", onFirstInput);
    add.addEventListener("change", handleInnerInput);
    saveModal.addEventListener("click", handleSaveEdit);
    previewButton.addEventListener("click", handlePreview);
    submitButton.addEventListener("click", () => uploadImages(module.dataset.comicId));
  }

  const handleResponse = (elem, response) => {
    if (elem.status) {
      return true;
    }
    elem.card.classList.remove("multiple-issues-upload__card_onload_loading");
    elem.card.classList.remove("multiple-issues-upload__card_onload_error");
    elem.card.classList.remove("multiple-issues-upload__card_onload_successful");
    if (!response.querySelector("#error")) {
      elem.card.classList.add("multiple-issues-upload__card_onload_successful");
      elem.status = true;
      elem.onload = "success";
      return true;
    } else {
      const error = response.querySelector("#error p")
      elem.card.classList.add("multiple-issues-upload__card_onload_error");
      const errorBlock = document.querySelector(".multiple-issues-upload__error");
      errorBlock.textContent = error.textContent;
      elem.onload = "error";
      return false;
    }
  }


  const uploadImages = async (id) => {
    uploadStarted = true;
    const errorBlock = document.querySelector(".multiple-issues-upload__error");
    errorBlock.textContent = "";
    const arrows = document.querySelectorAll(".multiple-issues-upload__card-button_type_move-right, .multiple-issues-upload__card-button_type_move-left");
    arrows.forEach(arrow => {
      arrow.classList.add("multiple-issues-upload__card-button_type_move-block");
    })
    const submitButton = document.querySelector(".multiple-issues-upload__submit-button");
    submitButton.disabled = true;
    const loadingImage = document.querySelector(".multiple-issues-upload__lds-roller_disabled");
    loadingImage.classList.add("multiple-issues-upload__lds-roller");
    let success = true;
    for (let elem of issuesToUpload) {
      if (elem.status) {
        continue;
      }
      elem.card.classList.add("multiple-issues-upload__card_onload_loading");
      elem.onload = "loading";

      const formElement = document.createElement('form');
      formElement.setAttribute('method', 'post');
      formElement.setAttribute('action', '/action/manageAddIssue');
      formElement.enctype = 'multipart/form-data';

      const comicsId = document.createElement('input');
      comicsId.type = 'text';
      comicsId.name = 'serialId';
      comicsId.value = id;

      const name = document.createElement('input');
      name.type = 'text';
      name.name = 'name';
      name.value = elem.name;

      const description = document.createElement('input');
      description.type = 'text';
      description.name = 'description';
      description.value = elem.description;

      const image = document.createElement('input');
      image.type = 'file';
      image.name = 'image';

      let list = new DataTransfer();
      list.items.add(elem.file);
      image.files = list.files;

      image.setAttribute('data-limit', '2097152')

      const button = document.createElement('button');
      button.type = 'submit';

      const submit = document.createElement('input');
      submit.type = 'hidden';
      submit.name = 'submit';
      submit.value = 'add';

      const publish = document.createElement('input');
      publish.type = 'hidden';
      publish.name = 'publish';
      publish.value = document.querySelector('.multiple-issues-upload__publication-input:checked').value;

      const numberOrder = document.createElement('input');
      numberOrder.type = 'hidden';
      numberOrder.name = 'numberOrder';
      numberOrder.value = 'checked';

      formElement.append(comicsId);
      formElement.append(name);
      formElement.append(description);
      formElement.append(image);
      formElement.append(button);
      formElement.append(submit);
      formElement.append(publish);
      formElement.append(numberOrder);

      // console.log(formElement);
      const response = await window.acomicsLegacyClient.sendFormAndParseHtml(formElement);
      // console.log(response);

      if (!handleResponse(elem, response)) {
        success = false;
        break;
      }
    }
    submitButton.disabled = false;
    loadingImage.classList.remove("multiple-issues-upload__lds-roller");
    submitButton.textContent = "Повторить попытку"
    if (success) {
      location.href = document.querySelector('.multiple-issues-upload').dataset.successRedirectUrl;
    }
  }

  const handleModalClosing = () => {
    const textareaName = document.querySelector(".edit-modal__namespace");
    const textareaDescription = document.querySelector(".edit-modal__description");
    textareaName.value = "";
    textareaDescription.value = "";
  }

  const handleEditModalOpening = (evt) => {
    evt.preventDefault();
    let index = Number(evt.target.closest('.multiple-issues-upload__card').dataset.index);
    const img = document.querySelector(".edit-modal__img");
    img.src = URL.createObjectURL(issuesToUpload[index].file);
    modalIndex = index;
  }

  const handlePreview = () => {
    const container = document.querySelector(".preview-modal__container");
    container.innerHTML = "";
    for (let elem of issuesToUpload) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(elem.file);
      img.alt = "Предпросмотр";
      img.className = "preview-modal__image";
      container.append(img);
    }
  }

  const handleOnePreview = (evt) => {
    evt.preventDefault();
    let index = Number(evt.target.closest('.multiple-issues-upload__card').dataset.index);
    const container = document.querySelector(".preview-modal__container");
    container.innerHTML = "";
    const img = document.createElement("img");
    img.src = URL.createObjectURL(issuesToUpload[index].file);
    img.alt = "Предпросмотр";
    img.className = "preview-modal__image";
    container.append(img);
  }

  const multipleIssuesModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: () => handleModalClosing(),
  });


  init();
})();
