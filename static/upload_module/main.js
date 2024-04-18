(() => {
  const PAGE_HTML_TEMPLATE = `
<div class="upload__dropbox">
    <label class="upload__dropbox-label">Drop your files here</label>
    <input type="file" class="upload__dropbox-input" data-limit="2097152" accept="image/png, image/jpeg" multiple name="files">
</div>
<div class="upload__field upload__field_disabled">
    <h2 class="upload__title">Добавить выпуск</h2>
    <div class="upload__button upload__top-buttons">
        <input type="file" name="inner_files" data-limit="2097152" accept="image/png, image/jpeg" class="upload__add-button" multiple>
        <label>Загрузить изображения</label>
    </div>
    <div class="upload__list">
    </div>
    <label for="upload__description" class="upload__description-title upload__section-label">Описание (для всех
        страниц)</label>
    <textarea name="description" id="upload__description" class="upload__description" cols="30"
              rows="10"></textarea>
    <label class="upload__publication-title upload__section-label">Режим публикации</label>
    <div class="upload__publication">
        <input name="publication" type="radio" value="instant" class="upload__publication-input"
               id="upload__immediately" checked>
        <label for="upload__immediately" class="upload__publication-label">Сразу</label>
        <input name="publication" type="radio" value="auto" class="upload__publication-input"
               id="upload__autopublication">
        <label for="upload__autopublication" class="upload__publication-label">Автопубликация</label>
    </div>
    <div class="upload__bottom-buttons">
        <button class="upload__button upload__button_submit">Опубликовать</button>
        <button data-hystmodal="#previewModal" class="upload__button upload__preview-button">Предпросмотр</button>
    </div>
</div>
<div class="hystmodal" id="multipleIssuesModal" aria-hidden="true">
    <div class="hystmodal__wrap">
        <div class="hystmodal__window" role="dialog" aria-modal="true">
            <div class="modal__edit">
                <div class="modal__edit__img-container">
                    <img src="" alt="Примеры" class="modal__edit__img">
                </div>
                <div class="modal__edit__text">
                    <div class="modal__edit__name-field">
                        <h3 class="modal__edit__name">Редактирование выпуска</h3>
                        <button data-hystclose class="modal__edit__close"></button>
                    </div>
                    <hr>
                    <label for="modal__edit__namespace" class="modal__edit__label">Название выпуска:</label>
                    <textarea name="description" id="modal__edit__namespace"
                              class="modal__edit__namespace modal__edit__textarea" cols="0"
                              rows="0"></textarea>
                    <label for="modal__edit__description" class="modal__edit__label">Описание:</label>
                    <textarea name="description" id="modal__edit__description"
                              class="modal__edit__description modal__edit__textarea" cols="0"
                              rows="0"></textarea>
                    <button data-hystclose class="modal__edit__button">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="hystmodal" id="previewModal" aria-hidden="true">
    <div class="hystmodal__wrap">
        <div class="hystmodal__window preview__modal" role="dialog" aria-modal="true">
            <div class="preview__container">

            </div>
        </div>
    </div>
</div>`;
  const issuesToUpload = [];
  let modalIndex = 0;

  const onFirstInput = (e) => {
    const files = document.querySelector(".upload__dropbox-input").files;
    const dropbox = document.querySelector(".upload__dropbox");
    for (let elem of files) {
      issuesToUpload.push(createFile(elem));
    }
    dropbox.classList.add("upload__dropbox-disabled");
    initTable();
  }

  const createLinks = (index) => {
    const preCount = document.querySelector('.multiple-issues-upload').dataset.issuesCount;
    let name = "" + (index + 1 + Number(preCount));
    if (issuesToUpload[index].name) {
      name = name + ". " + issuesToUpload[index].name;
    }
    const innerText = `
<a href="" class="upload__card__button upload__card__button_move-left">
    <img class="image-fit" src="data:image/svg+xml;utf8,<?xml version='1.0' encoding='iso-8859-1'?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg fill='%23000000' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' \t width='800px' height='800px' viewBox='0 0 29.771 29.771'\t xml:space='preserve'><g>\t<path d='M29.771,14.886c0,1.657-1.344,3-3,3H11.486l4.506,4.505c1.172,1.172,1.172,3.071,0,4.243\t\tc-0.586,0.586-1.354,0.879-2.122,0.879s-1.534-0.293-2.12-0.878L0,14.885L11.745,3.138c1.173-1.172,3.071-1.171,4.243,0\t\tc1.172,1.172,1.172,3.071,0,4.243l-4.505,4.506h15.289C28.427,11.886,29.771,13.229,29.771,14.886z'/></g></svg>
" alt="Передвинуть влево">
</a>
<h3 class="upload__card__title"></h3>
<a href="" class="upload__card__button upload__card__button_move-right">
    <img class="image-fit" src="data:image/svg+xml;utf8,<?xml version='1.0' encoding='iso-8859-1'?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg fill='%23000000' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' \t width='800px' height='800px' viewBox='0 0 29.774 29.773'\t xml:space='preserve'><g>\t<path d='M29.774,14.889L18.026,26.636c-0.586,0.585-1.354,0.878-2.121,0.878c-0.766,0-1.535-0.293-2.121-0.879\t\tc-1.172-1.171-1.172-3.071,0-4.243l4.505-4.505H3c-1.656,0-3-1.343-3-3s1.344-3,3-3h15.286l-4.506-4.506\t\tc-1.172-1.171-1.172-3.071,0-4.242c1.172-1.172,3.071-1.172,4.243,0L29.774,14.889z'/></g></svg>
" alt="Передвинуть вправо">
</a>
<a href="" data-hystmodal="#multipleIssuesModal" class="upload__card__button upload__card__button_edit">
    <img class="image-fit" src="data:image/svg+xml;utf8,<?xml version='1.0' encoding='iso-8859-1'?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg fill='%23000000' height='800px' width='800px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' \t viewBox='0 0 456.645 456.645' xml:space='preserve'><g>\t<g>\t\t<path d='M431.466,25.209c-33.61-33.61-88.01-33.615-121.625,0L32.192,302.859c-1.947,1.944-3.437,4.59-4.054,7.431L0.371,438.469\t\t\tc-1.08,4.984,0.447,10.176,4.054,13.782c3.61,3.611,8.806,5.132,13.782,4.054l128.18-27.768c2.869-0.621,5.506-2.129,7.431-4.054\t\t\tl277.649-277.649C464.998,113.302,464.998,58.742,431.466,25.209z M34.623,422.053l17.013-78.537l61.524,61.523L34.623,422.053z\t\t\t M143.211,392.664l-79.199-79.199L307,70.477l79.199,79.2L143.211,392.664z M410.254,125.621l-2.842,2.842l-79.199-79.2\t\t\tl2.842-2.842c21.864-21.864,57.31-21.887,79.199,0C432.088,68.257,432.088,103.786,410.254,125.621z'/>\t</g></g></svg>
" alt="Изменить"/>
</a>
<a href="" class="upload__card__button upload__card__button_delete">
    <img class="image-fit" src="data:image/svg+xml;utf8,<?xml version='1.0' encoding='iso-8859-1'?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg fill='%23000000' height='800px' width='800px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' \t viewBox='0 0 455 455' xml:space='preserve'><g>\t<g>\t\t<g>\t\t\t<path d='M227.5,0C101.761,0,0,101.75,0,227.5C0,353.239,101.75,455,227.5,455C353.239,455,455,353.25,455,227.5\t\t\t\tC455.001,101.761,353.251,0,227.5,0z M227.5,425.001c-108.902,0-197.5-88.599-197.5-197.5S118.599,30,227.5,30\t\t\t\tS425,118.599,425,227.5S336.402,425.001,227.5,425.001z'/>\t\t\t<path d='M321.366,133.635c-17.587-17.588-46.051-17.589-63.64,0L227.5,163.86l-30.226-30.225\t\t\t\tc-17.588-17.588-46.051-17.589-63.64,0c-17.544,17.545-17.544,46.094,0,63.64L163.86,227.5l-30.226,30.226\t\t\t\tc-17.544,17.545-17.544,46.094,0,63.64c17.585,17.586,46.052,17.589,63.64,0l30.226-30.225l30.226,30.225\t\t\t\tc17.585,17.586,46.052,17.589,63.64,0c17.544-17.545,17.544-46.094,0-63.64L291.141,227.5l30.226-30.226\t\t\t\tC338.911,179.729,338.911,151.181,321.366,133.635z M300.153,176.062l-40.832,40.832c-2.813,2.813-4.394,6.628-4.394,10.606\t\t\t\tc0,3.979,1.581,7.793,4.394,10.606l40.832,40.832c5.849,5.849,5.849,15.365,0,21.214c-5.862,5.862-15.351,5.863-21.214,0\t\t\t\tl-40.832-40.832c-2.929-2.929-6.768-4.394-10.606-4.394s-7.678,1.464-10.606,4.394l-40.832,40.832\t\t\t\tc-5.861,5.861-15.351,5.863-21.213,0c-5.849-5.849-5.849-15.365,0-21.214l40.832-40.832c2.813-2.813,4.394-6.628,4.394-10.606\t\t\t\tc0-3.978-1.581-7.793-4.394-10.606l-40.832-40.832c-5.849-5.849-5.849-15.365,0-21.214c5.864-5.863,15.35-5.863,21.214,0\t\t\t\tl40.832,40.832c5.857,5.858,15.355,5.858,21.213,0l40.832-40.832c5.863-5.862,15.35-5.863,21.213,0\t\t\t\tC306.001,160.697,306.001,170.213,300.153,176.062z'/>\t\t</g>\t</g></g></svg>
" alt="Удалить">
</a>`;
    const links = document.createElement("div");
    links.className = "upload__card__title-segment";
    links.innerHTML = innerText;
    links.querySelector('.upload__card__title').innerText = name;
    links.querySelector('.upload__card__button_move-right').classList.add('upload__card__button_move-right-' + index);
    links.querySelector('.upload__card__button_move-left').classList.add('upload__card__button_move-left-' + index);
    links.querySelector('.upload__card__button_edit').classList.add('upload__card__button_edit-' + index);
    links.querySelector('.upload__card__button_delete').classList.add('upload__card__button_delete-' + index);
    return links;
  }

  const createFileCard = (elem, index) => {
    const card = document.createElement("div");
    card.className = 'upload__card';
    card.dataset.index = index;
    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.className = "upload__card__thumbnail";
    const thumbnail = document.createElement("img")
    thumbnail.className = "image-fit";
    thumbnail.src = URL.createObjectURL(elem);
    thumbnailDiv.append(thumbnail);
    card.append(thumbnailDiv);
    card.append(createLinks(index));
    return card;
  }

  const createFile = (file, name = "", description = "") => {
    return {file: file, name: name, description: description};
  }

  const deleteFile = (index) => {
    issuesToUpload.splice(index, 1);
    initTable();
  }

  const handleSwitching = (index, direction) => {
    if (direction) {
      [issuesToUpload[index], issuesToUpload[index + 1]] = [issuesToUpload[index + 1], issuesToUpload[index]];
    } else {
      [issuesToUpload[index], issuesToUpload[index - 1]] = [issuesToUpload[index - 1], issuesToUpload[index]];
    }
    initTable();
  }

  const handleButtons = (index) => {
    const deleteButton = document.querySelector(".upload__card__button_delete-" + index);
    const editButton = document.querySelector(".upload__card__button_edit-" + index);
    const rightArrow = document.querySelector(".upload__card__button_move-right-" + index);
    const leftArrow = document.querySelector(".upload__card__button_move-left-" + index);
    deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      deleteFile(index)
    });
    editButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      handleEditModalOpening(index)
    });
    rightArrow.addEventListener("click", (evt) => {
      evt.preventDefault();
      handleSwitching(index, 1)
    });
    leftArrow.addEventListener("click", (evt) => {
      evt.preventDefault();
      handleSwitching(index, 0)
    });
  }

  const initTable = () => {
    const field = document.querySelector(".upload__field");
    field.classList.remove("upload__field_disabled");
    const cardList = document.querySelector(".upload__list");
    cardList.innerHTML = "";
    let count = 0;
    for (let elem of issuesToUpload) {
      cardList.append(createFileCard(elem.file, count));
      handleButtons(count);
      count++;
    }
  }

  const handleInnerInput = () => {
    const files = document.querySelector(".upload__add-button").files;
    for (let elem of files) {
      issuesToUpload.push(createFile(elem));
    }
    initTable();
  }

  const handleSaveEdit = () => {
    const textareaName = document.querySelector(".modal__edit__namespace");
    const textareaDescription = document.querySelector(".modal__edit__description");
    const index = modalIndex;
    issuesToUpload[index].name = textareaName.value;
    issuesToUpload[index].description = textareaDescription.value;
    initTable();
  }

  const initPage = (elem) => {
    const uploadPage = document.createElement("section");
    uploadPage.className = "container upload";
    uploadPage.innerHTML = PAGE_HTML_TEMPLATE;
    elem.append(uploadPage);
  }

  const init = () => {
    const module = document.querySelector(".multiple-issues-upload");
    initPage(module);
    const input = document.querySelector(".upload__dropbox-input");
    const add = document.querySelector(".upload__add-button");
    const saveModal = document.querySelector(".modal__edit__button");
    const previewButton = document.querySelector(".upload__preview-button");
    const submitButton = document.querySelector(".upload__button_submit");
    input.addEventListener("change", onFirstInput);
    add.addEventListener("change", handleInnerInput);
    saveModal.addEventListener("click", handleSaveEdit);
    previewButton.addEventListener("click", handlePreview);
    submitButton.addEventListener("click", () => uploadImages(module.dataset.comicId));
  }

  const uploadImages = async (id) => {
    for (let elem of issuesToUpload) {
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
      publish.value = document.getElementsByName('publication')[0].value;

      const numberOrder = document.createElement('input');
      numberOrder.type = 'hidden';
      numberOrder.name = 'numberOrder';
      numberOrder.value = 'checked';

      formElement.append(comicsId);
      formElement.append(name);
      formElement.append(image);
      formElement.append(button);
      formElement.append(submit);
      formElement.append(publish);
      formElement.append(numberOrder);

      console.log(formElement);
      const response = await window.acomicsLegacyClient.sendFormAndParseHtml(formElement);
      console.log(response);
    }
  }

  const handleModalClosing = () => {
    const textareaName = document.querySelector(".modal__edit__namespace");
    const textareaDescription = document.querySelector(".modal__edit__description");
    textareaName.value = "";
    textareaDescription.value = "";
  }

  const handleEditModalOpening = (index) => {
    const img = document.querySelector(".modal__edit__img");
    img.src = URL.createObjectURL(issuesToUpload[index].file);
    modalIndex = index;
  }

  const handlePreview = () => {
    const container = document.querySelector(".preview__container");
    container.innerHTML = "";
    for (let elem of issuesToUpload) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(elem.file);
      img.alt = "Предпросмотр";
      img.className = "preview__image";
      container.append(img);
    }
  }

  const multipleIssuesModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: () => handleModalClosing(),
  });


  init();
})();
