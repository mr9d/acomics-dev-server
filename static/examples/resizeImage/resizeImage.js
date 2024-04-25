(function () {
  const initHTML = () => {

    const body = document.body;
    body.innerHTML +=
      '         <div class="page fixed disable refactor-page">\n' +
      '            <div class="refactor-background"></div>\n' +
      '            <div class="refactor-container" onselectstart="return false">\n' +
      '                <div class="refactor-container__header">\n' +
      '                    <div class="refactor-container__header-text">Ваша фотография</div>\n' +
      '                    <div class="refactor-container__close-button"></div>\n' +
      '                </div>\n' +
      '                <div class="zoom-variant-container">\n' +
      '                    <div data-type="wheel" class="zoom-variant-item zoom-variant-item_type_wheel"></div>\n' +
      '                    <div data-type="arrows" class="zoom-variant-item zoom-variant-item_type_arrows"></div>\n' +
      '                    <div data-type="area" class="zoom-variant-item zoom-variant-item_type_area"></div>\n' +
      '                </div>\n' +
      '                <div class="refactor-container__body refactor-container__body_type_wheel">\n' +
      '                    <p class="refactor-container__body-text">Выбранная область будет показываться на вашей странице</p>\n' +
      '                    <p class="refactor-container__body-paragraph">Вы можете изменять размер изображения при помощи колёсика мыши</p>\n' +
      '                    <div class="refactor-container__body-box refactor-container__body-box_type_wheel">\n' +
      '                        <div class="refactor-container__body-file refactor-container__file_place-back refactor-container__file_place-back_t_w"></div>\n' +
      '                        <div class="refactor-container__circle-box">\n' +
      '                            <div class="refactor-container__body-file refactor-container__file_place-front refactor-container__file_place-front_t_w"></div>\n' +
      '                        </div>\n' +
      '                    </div>\n' +
      '                </div>\n' +
      '                <div class="refactor-container__body refactor-container__body_type_arrows">\n' +
      '                    <p class="refactor-container__body-text">Выбранная область будет показываться на вашей странице</p>\n' +
      '                    <p class="refactor-container__body-paragraph">Вы можете изменять размер изображения при помощи стягивания углов</p>\n' +
      '                    <div class="refactor-container__body-box refactor-container__body-box_type_arrows">\n' +
      '                        <div class="refactor-container__body-file refactor-container__file_place-back refactor-container__file_place-back_t_a"></div>\n' +
      '                        <div class="refactor-container__circle-box">\n' +
      '                            <div class="refactor-container__body-file refactor-container__file_place-front refactor-container__file_place-front_t_a"></div>\n' +
      '                        </div>\n' +
      '                        <div class="refactor-container__zoom-arrows">\n' +
      '                            <div class="refactor-container__zoom-button refactor-container__zoom-button_place_top"></div>\n' +
      '                            <div class="refactor-container__zoom-button refactor-container__zoom-button_place_bottom"></div>\n' +
      '                        </div>\n' +
      '                    </div>\n' +
      '                </div>\n' +
      '                <div class="refactor-container__body refactor-container__body_type_area">\n' +
      '                    <p class="refactor-container__body-text">Выбранная область будет показываться на вашей странице</p>\n' +
      '                    <p class="refactor-container__body-paragraph">Вы можете выбрать необходимый участок изображения</p>\n' +
      '                    <div class="refactor-container__body-box">\n' +
      '                        <div class="refactor-container__body-image refactor-container__file_place-back_t_area">\n' +
      '                            <div class="refactor-container__background-box">\n' +
      '                                <div class="refactor-container__background refactor-container__background_pos_t"></div>\n' +
      '                                <div class="refactor-container__background refactor-container__background_pos_l"></div>\n' +
      '                                <div class="refactor-container__background refactor-container__background_pos_b"></div>\n' +
      '                                <div class="refactor-container__background refactor-container__background_pos_r"></div>\n' +
      '                            </div>\n' +
      '                            <div class="refactor-container__body-image-area refactor-container__file_place-front_t_area">\n' +
      '                                <div class="scale-cube scale-cube_pos_tl"></div>\n' +
      '                                <div class="scale-cube scale-cube_pos_tr"></div>\n' +
      '                                <div class="scale-cube scale-cube_pos_bl"></div>\n' +
      '                                <div class="scale-cube scale-cube_pos_br"></div>\n' +
      '                            </div>\n' +
      '                        </div>\n' +
      '                    </div>\n' +
      '                </div>\n' +
      '                <div class="refactor-container__footer">\n' +
      '                    <div class="refactor-container__button refactor-container__button_type-confirm">\n' +
      '                        <span>Сохранить изменения</span>\n' +
      '                    </div>\n' +
      '                    <div class="refactor-container__button refactor-container__button_type-deny">\n' +
      '                        <span>Вернуться назад</span>\n' +
      '                    </div>\n' +
      '                </div>\n' +
      '              <canvas class="canvas_crop"></canvas>\n' +
      '            </div>\n' +
      '         </div>'
  }
  initHTML();

  const form = document.querySelector('form.editAvatar');
  const dt = new DataTransfer();
  let targetWidth;
  let targetHeight;

  let img;
  let initImageWidth;
  let initImageHeight;
  let imageWidth;
  let imageHeight;

  let zoom = 1;
  let zoomDelta = 0;
  let zoomVariant = "area";
  let imagePosX = 0, imagePosY = 0;

  const backImageTypeWheel = document.querySelector(".refactor-container__file_place-back_t_w");
  const frontImageTypeWheel = document.querySelector(".refactor-container__file_place-front_t_w");

  const backImageTypeArrows = document.querySelector(".refactor-container__file_place-back_t_a");
  const frontImageTypeArrows = document.querySelector(".refactor-container__file_place-front_t_a");

  const backImageTypeArea = document.querySelector(".refactor-container__file_place-back_t_area");
  const frontImageTypeArea = document.querySelector(".refactor-container__file_place-front_t_area");

  let areaTop = 0;
  let areaLeft = 0;
  let areaBot = 0;
  let areaRight = 0;

  const imageRefactorPage = document.querySelector(".refactor-page");
  const refactorBody = document.querySelector(".refactor-container__body_type_area");

  const fileReader = new FileReader();

  const refactorContainers = document.querySelectorAll("[data-type]");
  let scrollInterval;

  const imageRefactorMethod = () => {
    //let imageBox = document.querySelector(".image_refactor_box");
    let mousePosX, mousePosY;

    let scrollDirection = 0;

    const arrowsEvents = () => {
      const imageScrollWithArrows = (event) => {
        {
          zoom = 1 + zoomDelta + ((event.clientX - mousePosX) + (event.clientY - mousePosY))
            / (100 + Math.sqrt((event.clientX - mousePosX) * (event.clientX - mousePosX) +
              (event.clientY - mousePosY) * (event.clientY - mousePosY)));
        }
        if (scrollDirection === 4) {
          zoom = 1 + zoomDelta - ((event.clientX - mousePosX) + (event.clientY - mousePosY))
            / (100 + Math.sqrt((event.clientX - mousePosX) * (event.clientX - mousePosX) +
              (event.clientY - mousePosY) * (event.clientY - mousePosY)));
        }

        if (initImageWidth * zoom < targetWidth || initImageHeight * zoom < targetHeight) {
          zoom = targetWidth / Math.min(initImageWidth, initImageHeight);
          zoomDelta = zoom - 1;
        }

        imageWidth = initImageWidth * zoom;
        imageHeight = initImageHeight * zoom;

        document.querySelector(".refactor-container__zoom-button_place_top").style.margin = (32 * zoom + 4) / (zoom + 4) + "px";
        document.querySelector(".refactor-container__zoom-button_place_bottom").style.margin = (32 * zoom + 4) / (zoom + 4) + "px";
        makePositionValid();
        setImagesWidth(imageWidth);
      }

      const arrowClickDown = (event) => {
        mousePosX = event.clientX;
        mousePosY = event.clientY;

        document.addEventListener("mousemove", imageScrollWithArrows);
      }

      document.querySelector(".refactor-container__zoom-button_place_top")
        .addEventListener("mousedown", (event) => {
          scrollDirection = 2;
          arrowClickDown(event);
        });
      document.querySelector(".refactor-container__zoom-button_place_bottom")
        .addEventListener("mousedown", (event) => {
          scrollDirection = 4;
          arrowClickDown(event);
        });

      const imageClickUp = () => {
        zoomDelta = zoom - 1;
        document.removeEventListener("mousemove", imageScrollWithArrows);
      }

      document.addEventListener("mouseup", imageClickUp);

    }
    arrowsEvents();

    const wheelEvents = () => {
      const imageScrollWithWheel = (event) => {
        zoom -= event.deltaY / 2400;
        if (initImageWidth * zoom >= targetWidth && initImageHeight * zoom >= targetHeight) {
          imageWidth = initImageWidth * zoom;
          imageHeight = initImageHeight * zoom;
        } else {
          zoom += event.deltaY / 2400;
        }
        makePositionValid();
        setImagesWidth(imageWidth);
      }

      if ('onwheel' in document) {
        backImageTypeWheel.addEventListener("wheel", imageScrollWithWheel);
      } else if ('onmousewheel' in document) {
        backImageTypeWheel.addEventListener("mousewheel", imageScrollWithWheel);
      } else {
        backImageTypeWheel.addEventListener("MozMousePixelScroll", imageScrollWithWheel);
      }
    }
    wheelEvents();

    const areaEvents = () => {
      const imageScrollWithArea = (event) => {
        let viewportImageOffset = backImageTypeArea.getBoundingClientRect();
        let viewportImageAreaOffset = backImageTypeArea.getBoundingClientRect();
        let refactorBodyOffset = refactorBody.getBoundingClientRect();

        let clX, clY;
        if (event.touches != null) {
          clX = event.touches[0].clientX;
          clY = event.touches[0].clientY;
        } else {
          clX = event.clientX;
          clY = event.clientY;
        }

        let scrollX = 0, scrollY = 0;
        if (clY - refactorBodyOffset.top <= 100) {
          scrollY = -((100 - clY + refactorBodyOffset.top) / 5);
        }
        if (refactorBodyOffset.height + refactorBodyOffset.top - clY <= 100) {
          scrollY = ((100 - refactorBodyOffset.height - refactorBodyOffset.top + clY) / 5);
        }
        if (clX - refactorBodyOffset.left <= 100) {
          scrollX = -((100 - clX + refactorBodyOffset.left) / 5);
        }
        if (refactorBodyOffset.width + refactorBodyOffset.left - clX <= 100) {
          scrollX = ((100 - refactorBodyOffset.width - refactorBodyOffset.left + clX) / 5);
        }

        if (scrollY !== 0 || scrollX !== 0) {
          if (scrollY < 0) {
            refactorBody.scrollTop = Math.max(refactorBody.scrollTop + scrollY, 0);
          }
          if (scrollY > 0) {
            refactorBody.scrollTop = Math.min(refactorBody.scrollTop + scrollY, initImageHeight - refactorBodyOffset.top);
          }
          if (scrollX < 0) {
            refactorBody.scrollLeft = Math.max(refactorBody.scrollLeft + scrollX, 0);
          }
          if (scrollX > 0) {
            refactorBody.scrollLeft = Math.min(refactorBody.scrollLeft + scrollX, initImageWidth - refactorBodyOffset.left);
          }
          clearInterval(scrollInterval);
          scrollInterval = setInterval(imageMoveEvent, 50, refactorBodyOffset, scrollX, scrollY);
        } else {
          clearInterval(scrollInterval);
        }


        console.log(clY - refactorBodyOffset.top)
        console.log(clY, refactorBodyOffset.top, refactorBody.scrollTop);

        if (scrollDirection === 1 || scrollDirection === 2) {
          areaTop = clY - viewportImageOffset.top;
          if (areaTop < 0) {
            areaTop = 0;
          } else if (areaTop + 50 > viewportImageAreaOffset.height - areaBot) {
            areaTop = viewportImageAreaOffset.height - areaBot - 50;
          }
        }

        if (scrollDirection === 3 || scrollDirection === 4) {
          areaBot = viewportImageOffset.top + viewportImageOffset.height - clY;
          if (areaBot < 0) {
            areaBot = 0;
          } else if (areaBot + 50 > viewportImageAreaOffset.height - areaTop) {
            areaBot = viewportImageAreaOffset.height - areaTop - 50;
          }
        }

        if (scrollDirection === 2 || scrollDirection === 3) {
          areaLeft = clX - viewportImageOffset.left;
          if (areaLeft < 0) {
            areaLeft = 0;
          } else if (areaLeft + 50 > viewportImageAreaOffset.width - areaRight) {
            areaLeft = viewportImageAreaOffset.width - areaRight - 50;
          }
        }
        if (scrollDirection === 4 || scrollDirection === 1) {
          areaRight = viewportImageOffset.left + viewportImageOffset.width - clX;
          if (areaRight < 0) {
            areaRight = 0;
          } else if (areaRight + 50 > viewportImageAreaOffset.width - areaLeft) {
            areaRight = viewportImageAreaOffset.width - areaLeft - 50;
          }
        }

        setImagesWidth(imageWidth);
        setImagesPosition(imagePosX, imagePosY);
      }

      document.querySelector(".scale-cube_pos_tr").addEventListener("touchstart", () => {
        scrollDirection = 1;
        document.addEventListener("touchmove", imageScrollWithArea);
      })
      document.querySelector(".scale-cube_pos_tl").addEventListener("touchstart", () => {
        scrollDirection = 2;
        document.addEventListener("touchmove", imageScrollWithArea);
      })
      document.querySelector(".scale-cube_pos_bl").addEventListener("touchstart", () => {
        scrollDirection = 3;
        document.addEventListener("touchmove", imageScrollWithArea);
      })
      document.querySelector(".scale-cube_pos_br").addEventListener("touchstart", () => {
        scrollDirection = 4;
        document.addEventListener("touchmove", imageScrollWithArea);
      })

      document.querySelector(".scale-cube_pos_tr").addEventListener("mousedown", () => {
        scrollDirection = 1;
        document.addEventListener("mousemove", imageScrollWithArea);
      })
      document.querySelector(".scale-cube_pos_tl").addEventListener("mousedown", () => {
        scrollDirection = 2;
        document.addEventListener("mousemove", imageScrollWithArea);
      })
      document.querySelector(".scale-cube_pos_bl").addEventListener("mousedown", () => {
        scrollDirection = 3;
        document.addEventListener("mousemove", imageScrollWithArea);
      })
      document.querySelector(".scale-cube_pos_br").addEventListener("mousedown", () => {
        scrollDirection = 4;
        document.addEventListener("mousemove", imageScrollWithArea);
      })

      const imageClickUp = () => {
        clearInterval(scrollInterval);
        document.removeEventListener("mousemove", imageScrollWithArea);
      }

      const imageMoveEvent = (refactorBodyOffset, deltaX, deltaY) => {
        if (deltaY < 0) {
          refactorBody.scrollTop = Math.max(refactorBody.scrollTop + deltaY, 0);
        }
        if (deltaY > 0) {
          refactorBody.scrollTop = Math.min(refactorBody.scrollTop + deltaY, initImageHeight - refactorBodyOffset.top);
        }
        if (scrollX < 0) {
          refactorBody.scrollLeft = Math.max(refactorBody.scrollLeft + scrollX, 0);
        }
        if (scrollX > 0) {
          refactorBody.scrollLeft = Math.min(refactorBody.scrollLeft + scrollX, initImageWidth - refactorBodyOffset.left);
        }
      }
      document.addEventListener("mouseup", imageClickUp);
    }
    areaEvents();

    const makePositionValid = () => {
      if (2 * imagePosX + targetWidth > imageWidth) {
        imagePosX = imageWidth / 2 - targetWidth / 2;
      } else if (2 * imagePosX - targetWidth < -imageWidth) {
        imagePosX = -imageWidth / 2 + targetWidth / 2;
      }

      if (2 * imagePosY + targetHeight > imageHeight) {
        imagePosY = imageHeight / 2 - targetHeight / 2;
      } else if (2 * imagePosY - targetHeight < -imageHeight) {
        imagePosY = -imageHeight / 2 + targetHeight / 2;
      }
      const posX = "calc(50% + " + imagePosX + "px)";
      const posY = "calc(50% + " + imagePosY + "px)";

      setImagesPosition(posX, posY)
    }

    const imageMoveEvents = () => {
      const imageMove = (event) => {
        const deltaX = event.clientX;
        const deltaY = event.clientY;

        imagePosX = (deltaX - mousePosX);
        imagePosY = (deltaY - mousePosY);

        makePositionValid();
      }

      const imageClickDown = (event) => {
        mousePosX = event.clientX - imagePosX;
        mousePosY = event.clientY - imagePosY;

        document.addEventListener("mousemove", imageMove);
      }

      backImageTypeWheel.addEventListener("mousedown", imageClickDown);
      backImageTypeArrows.addEventListener("mousedown", imageClickDown);
      backImageTypeArea.addEventListener("mousedown", imageClickDown);

      const imageClickUp = () => {
        document.removeEventListener("mousemove", imageMove);
      }

      document.addEventListener("mouseup", imageClickUp);
    }
    imageMoveEvents();

    const refactorStartEvents = () => {

    }
    refactorStartEvents();
  }
  const imageInputChangeMethod = () => {
    const fileInput = document.querySelector(".imageResizeAndCrop");
    targetWidth = Number(fileInput.getAttribute('data-target-width'));
    targetHeight = Number(fileInput.getAttribute('data-target-height'));
    const fileChange = function () {
      imageRefactorPage.classList.remove("disable");

      fileReader.readAsDataURL(fileInput.files[0]);
      fileReader.addEventListener("load", () => {
        img = new Image;
        img.src = fileReader.result;
        getImageData();

        window.addEventListener("resize", updateImageAfterWindowResize);
      })

      setEnableZoomVariant("area");
    };
    fileInput.addEventListener("change", fileChange);
    const getImageData = async () => {
      initImageWidth = img.naturalWidth;
      initImageHeight = img.naturalHeight;

      while (initImageWidth * initImageHeight === 0) {
        initImageWidth = img.naturalWidth;
        initImageHeight = img.naturalHeight;
        await new Promise(r => setTimeout(r, 300));
      }

      backImageTypeWheel.style.backgroundImage = "url('" + fileReader.result + "')";
      frontImageTypeWheel.style.backgroundImage = "url('" + fileReader.result + "')";

      backImageTypeArrows.style.backgroundImage = "url('" + fileReader.result + "')";
      frontImageTypeArrows.style.backgroundImage = "url('" + fileReader.result + "')";

      let dw = initImageWidth / Math.min(window.innerWidth, 900);
      let dh = initImageHeight / Math.min(window.innerHeight - 200, 600);

      let dRes = Math.min(dw, dh);

      backImageTypeArea.style.width = (initImageWidth / dRes - 88) + "px";
      backImageTypeArea.style.height = (initImageHeight / dRes - 88) + "px";
      backImageTypeArea.style.backgroundSize = (initImageWidth / dRes - 88) + "px " + (initImageHeight / dRes - 88) + "px";
      backImageTypeArea.style.backgroundImage = "url('" + fileReader.result + "')";

      areaLeft = 0;
      areaTop = 0;
      areaRight = 0;
      areaBot = 0;

      imagePosY = 0;
      imagePosX = 0;
      zoom = targetWidth / Math.min(initImageWidth, initImageHeight);

      zoomDelta = 0;
      imageWidth = initImageWidth * zoom;
      imageHeight = initImageHeight * zoom;

      setImagesWidth(imageWidth);
      setImagesPosition("50%", "50%")
    }
    const updateImageAfterWindowResize = () => {
      if (window.innerWidth <= 720) {
        zoomVariant = "area";
        setEnableZoomVariant();
      }
      getImageData();
    }
    window.removeEventListener("resize", updateImageAfterWindowResize);

    const setEnableZoomVariant = () => {
      for (let el of refactorContainers) {
        let type = el.dataset.type
        document.querySelector(".refactor-container__body_type_" + type).style.display = "none";
        document.querySelector(".zoom-variant-item_type_" + type).style.backgroundColor = "transparent";
      }
      document.querySelector(".refactor-container__body_type_" + zoomVariant)
        .style.display = "flex";
      document.querySelector(".zoom-variant-item_type_" + zoomVariant).style.backgroundColor = "var(--color-active)";
    }
    const setDifferentScaleTypesMethod = () => {
      for (let el of refactorContainers) {
        let type = el.dataset.type
        document.querySelector(".zoom-variant-item_type_" + type)
          .addEventListener("click", () => {
            zoomVariant = type;
            setEnableZoomVariant();
          }, type);
      }
    }
    setDifferentScaleTypesMethod();

    const saveUpdatedImageEvent = () => {
      const crop_button = document.querySelector(".refactor-container__button_type-confirm");
      const canvas = document.querySelector('.canvas_crop');

      crop_button.addEventListener("click", () => {
        if (zoomVariant === "area") {
          let viewportImageOffset = backImageTypeArea.getBoundingClientRect();
          let viewportImageAreaOffset = backImageTypeArea.getBoundingClientRect();

          const dx = initImageWidth / viewportImageOffset.width;
          const dy = initImageHeight / viewportImageOffset.height;

          canvas.width = (viewportImageOffset.width - areaLeft - areaRight) * dx;
          canvas.height = (viewportImageOffset.height - areaTop - areaBot) * dy;
          let context = canvas.getContext('2d');

          context.drawImage(img, areaLeft * dx, areaTop * dy, initImageWidth - areaLeft * dx - areaRight * dx, initImageHeight - areaTop * dy - areaBot * dy, 0, 0, canvas.width, canvas.height);
        } else {
          const dx = Math.min(initImageWidth / targetWidth, initImageHeight / targetHeight);
          canvas.width = targetWidth * dx;
          canvas.height = targetHeight * dx;
          let context = canvas.getContext('2d');

          const sourceX = initImageWidth / 2 - imagePosX / zoom - (targetWidth / 2) / zoom;
          const sourceY = initImageHeight / 2 - imagePosY / zoom - (targetHeight / 2) / zoom;

          const sourceWidth = targetWidth / zoom;
          const sourceHeight = targetHeight / zoom;
          context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
        }
        canvas.toBlob(function (blob) {
          console.log(blob);
          dt.items.clear();
          dt.items.add(new File([blob], 'ava.png', {type: "image/png"}));
          form.requestSubmit();
        });
      });
    }
    saveUpdatedImageEvent();
    const denyUpdatedImageEvent = () => {
      window.removeEventListener("resize", updateImageAfterWindowResize);

      const removeUpdates = () => {
        imageRefactorPage.classList.add("disable");
      }

      document.querySelector(".refactor-container__button_type-deny").addEventListener("click", removeUpdates);
      document.querySelector(".refactor-container__close-button").addEventListener("click", removeUpdates);
    }
    denyUpdatedImageEvent();
  }
  const setImagesWidth = (width) => {
    let viewportImageOffset = backImageTypeArea.getBoundingClientRect();
    let viewportImageAreaOffset = backImageTypeArea.getBoundingClientRect();

    backImageTypeWheel.style.backgroundSize = width + "px";
    frontImageTypeWheel.style.backgroundSize = width + "px";

    backImageTypeArrows.style.backgroundSize = width + "px";
    frontImageTypeArrows.style.backgroundSize = width + "px";

    frontImageTypeArea.style.height = (viewportImageOffset.height - areaTop - areaBot) + "px";
    frontImageTypeArea.style.width = (viewportImageOffset.width - areaLeft - areaRight) + "px";

    document.querySelector(".refactor-container__background_pos_t").style.height = areaTop + "px";
    document.querySelector(".refactor-container__background_pos_b").style.height = areaBot + "px";

    document.querySelector(".refactor-container__background_pos_l").style.top = areaTop + "px";
    document.querySelector(".refactor-container__background_pos_l").style.bottom = areaBot + "px";
    document.querySelector(".refactor-container__background_pos_l").style.width = areaLeft + "px";

    document.querySelector(".refactor-container__background_pos_r").style.top = areaTop + "px";
    document.querySelector(".refactor-container__background_pos_r").style.bottom = areaBot + "px";
    document.querySelector(".refactor-container__background_pos_r").style.width = areaRight + "px";
  }
  const setImagesPosition = (posX, posY) => {
    backImageTypeWheel.style.backgroundPosition = posX + " " + posY;
    frontImageTypeWheel.style.backgroundPosition = posX + " " + posY;

    backImageTypeArrows.style.backgroundPosition = posX + " " + posY;
    frontImageTypeArrows.style.backgroundPosition = posX + " " + posY;

    frontImageTypeArea.style.backgroundPosition = -areaLeft + "px " + -areaTop + "px";
    frontImageTypeArea.style.left = areaLeft + "px";
    frontImageTypeArea.style.right = areaRight + "px";
    frontImageTypeArea.style.top = areaTop + "px";
    frontImageTypeArea.style.bottom = areaBot + "px";
  }


  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const username = document.querySelector('section.auth').dataset.username;
    form.querySelector('input[name="username"]').setAttribute('value', username);
    const file_list = dt.files;
    console.log('Коллекция файлов создана:');
    console.dir(file_list);
    form.querySelector('input[name="avatar"]').files = file_list;
    const response = await window.acomicsLegacyClient.sendFormAndParseHtml(evt.target);
    console.log(response);
  });
  imageInputChangeMethod();
  imageRefactorMethod();
})();


