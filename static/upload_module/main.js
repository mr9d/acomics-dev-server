(function () {
  const Page = `
<div class="upload__dropbox">
    <label class="upload__dropbox_label">Drop your files here</label>
    <input type="file" class="upload__input" accept="image/png, image/jpeg" multiple name="files">
</div>
<div class="upload__field upload__field-disabled">
    <h3 class="upload__title">Добавить выпуск</h3>
    <div class="upload__button upload__button-add">
        <input type="file" name="inner_files" accept="image/png, image/jpeg" class="upload__button-add__input" multiple>
        <label>Загрузить изображения</label>
    </div>
    <div class="upload__list">
    </div>
    <label for="upload__description" class="upload__description-title upload__label">Описание (для всех
        страниц)</label>
    <textarea name="description" id="upload__description" class="upload__description" cols="30"
              rows="10"></textarea>
    <label class="upload__publication-title upload__label">Режим публикации</label>
    <div class="upload__publication">
        <input name="publication" type="radio" value="immediately" class="upload__publication__input"
               id="upload__immediately" checked>
        <label for="upload__immediately" class="upload__publication__label">Сразу</label>
        <input name="publication" type="radio" value="autopublication" class="upload__publication__input"
               id="upload__autopublication">
        <label for="upload__autopublication" class="upload__publication__label">Автопубликация</label>
    </div>
    <div class="upload__buttons">
        <button class="upload__button upload__button-dark upload__button-submit">Опубликовать</button>
        <button data-hystmodal="#previewModal" class="upload__button preview__button">Предпросмотр</button>
    </div>
</div>
<div class="hystmodal" id="myModal" aria-hidden="true">
    <div class="hystmodal__wrap">
        <div class="hystmodal__window" role="dialog" aria-modal="true">
            <div class="modal__edit__container">
                <div class="modal__edit__img-container">
                    <img src="images/sample_image.jpg" alt="Примеры" class="modal__edit__img">
                </div>
                <div class="modal__edit__text">
                    <div class="modal__edit__name-field">
                        <h4 class="modal__edit__name">Редактирование выпуска</h4>
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
  const files_ = [];
  let modalIndex = 0;

  const onFirstInput = (e) => {
    const files = document.querySelector(".upload__input").files;
    const dropbox = document.querySelector(".upload__dropbox");
    console.log(files);
    let count = 0;
    for (let elem of files) {
      files_.push(createFile(elem));
      count++;
    }
    dropbox.classList.add("upload__dropbox-disabled");
    initTable();
  }

  const createLinks = (index) => {
    let name = "" + (index + 1);
    if (files_[index].name) {
      name = name + ". " + files_[index].name;
    }
    const innerText = `
<a href="#" class="upload__card__button upload__card__button_move-left upload__card__button_move-left-${index}">
    <img class="image-fit" src="images/left-arrow.svg" alt="Передвинуть влево">
</a>
<h5 class="upload__card__title">${name}</h5>
<a href="#" class="upload__card__button upload__card__button_move-right upload__card__button_move-right-${index}">
    <img class="image-fit" src="images/right-arrow.svg" alt="Передвинуть вправо">
</a>
<a href="#" data-hystmodal="#myModal" class="upload__card__button upload__card__button_edit upload__card__button_edit-${index}">
    <img class="image-fit" src="images/edit-button.svg" alt="Изменить"/>
</a>
<a href="#" class="upload__card__button upload__card__button_delete upload__card__button_delete-${index}">
    <img class="image-fit" src="images/delete-button.svg" alt="Удалить">
</a>`;
    const links = document.createElement("div");
    links.className = "upload__card__title-segment";
    links.innerHTML = innerText;
    return links;
  }

  const createFileCard = (elem, index) => {
    const card = document.createElement("div");
    card.className = `upload__card upload__card-${index}`;
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
    files_.splice(index, 1);
    initTable();
  }

  const handleSwitching = (index, direction) => {
    if (direction) {
      [files_[index], files_[index + 1]] = [files_[index + 1], files_[index]];
    } else {
      [files_[index], files_[index - 1]] = [files_[index - 1], files_[index]];
    }
    initTable();
  }

  const handleButtons = (index) => {
    const deleteButton = document.querySelector(".upload__card__button_delete-" + index);
    const editButton = document.querySelector(".upload__card__button_edit-" + index);
    const rightArrow = document.querySelector(".upload__card__button_move-right-" + index);
    const leftArrow = document.querySelector(".upload__card__button_move-left-" + index);
    deleteButton.addEventListener("click", () => deleteFile(index));
    editButton.addEventListener("click", () => handleEditModalOpening(index));
    rightArrow.addEventListener("click", () => handleSwitching(index, 1));
    leftArrow.addEventListener("click", () => handleSwitching(index, 0));
  }

  const initTable = () => {
    const field = document.querySelector(".upload__field");
    field.classList.remove("upload__field-disabled");
    const cardList = document.querySelector(".upload__list");
    cardList.innerHTML = "";
    let count = 0;
    for (let elem of files_) {
      cardList.append(createFileCard(elem.file, count));
      handleButtons(count);
      count++;
    }
  }

  const handleInnerInput = () => {
    const files = document.querySelector(".upload__button-add__input").files;
    for (let elem of files) {
      files_.push(createFile(elem));
    }
    initTable();
  }

  const handleSaveEdit = () => {
    const textareaName = document.querySelector(".modal__edit__namespace");
    const textareaDescription = document.querySelector(".modal__edit__description");
    const index = modalIndex;
    files_[index].name = textareaName.value;
    files_[index].description = textareaDescription.value;
    initTable();
  }

  const initPage = (elem) => {
    const uploadPage = document.createElement("section");
    uploadPage.className = "container upload";
    uploadPage.innerHTML = Page;
    elem.append(uploadPage);
  }

  const init = () => {
    const module = document.querySelector(".module__upload");
    initPage(module);
    const input = document.querySelector(".upload__input");
    const add = document.querySelector(".upload__button-add__input");
    const saveModal = document.querySelector(".modal__edit__button");
    const previewButton = document.querySelector(".preview__button");
    const submitButton = document.querySelector(".upload__button-submit");
    input.addEventListener("change", onFirstInput);
    add.addEventListener("change", handleInnerInput);
    saveModal.addEventListener("click", handleSaveEdit);
    previewButton.addEventListener("click", handlePreview);
    submitButton.addEventListener("click", () => uploadImages(14897));
  }

  const uploadImages = async (id) => {
    for (let elem of files_) {
      const formElement = document.createElement('form');
      formElement.setAttribute('method', 'post');
      formElement.setAttribute('action', '/action/manageAddIssue');
      formElement.enctype = 'multipart/form-data';

      const idComic = document.createElement('input');
      idComic.type = 'text';
      idComic.name = 'serialId';
      idComic.value = id;

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
      publish.value = 'instant';

      const numberOrder = document.createElement('input');
      numberOrder.type = 'hidden';
      numberOrder.name = 'numberOrder';
      numberOrder.value = 'checked';

      formElement.append(idComic);
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
    img.src = URL.createObjectURL(files_[index].file);
    modalIndex = index;
  }

  const handlePreview = () => {
    const container = document.querySelector(".preview__container");
    container.innerHTML = "";
    for (let elem of files_) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(elem.file);
      img.alt = "Предпросмотр";
      img.className = "preview__image";
      container.append(img);
    }
  }

  const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: () => handleModalClosing(),
  });


  init();
})();
