'use strict';

(function () {
  // функция создания DOM-элемента Кпонка, на основе JS-объекта
  function createPinButton(tagName, className, positionX, positionY) {
    var element = document.createElement(tagName);

    element.classList.add(className);
    element.style.left = positionX;
    element.style.top = positionY;

    return element;
  }

  // функция создания DOM-элемента на основе JS-объекта
  function createPinImage(tag, src, width, height, alt) {
    var element = document.createElement(tag);

    element.setAttribute('src', src);
    element.setAttribute('width', width);
    element.setAttribute('height', height);
    element.setAttribute('alt', alt);

    return element;
  }

  function renderItem(image, positionX, positionY, alt) {
    var createButton = createPinButton('button', 'map__pin', positionX + 'px', positionY + 'px');
    var createImage = createPinImage('img', image, window.constants.PIN_BUTTON_IMG_HEIGHT, window.constants.PIN_BUTTON_IMG_WIDTH, alt);

    createButton.appendChild(createImage);

    return createButton;
  }

  // генерируем список элементов в виде DOM элементов
  function generatePinList(data) {
    var itemList = [];

    for (var i = 0; i < data.length; i++) {
      itemList[i] = renderItem(data[i].author.avatar, data[i].location.x, data[i].location.y, data[i].offer.title);
    }

    return itemList;
  }

  var mapPins = document.querySelector('.map__pins');

  // выводим элементы в DOM
  function renderPins(elements) {
    var mapMainPin = document.querySelector('.map__pin--main');
    var mapMainOverlay = document.querySelector('.map__overlay');

    mapPins.innerHTML = '';

    var pinArrayFragment = document.createDocumentFragment();

    pinArrayFragment.append(mapMainPin);
    pinArrayFragment.prepend(mapMainOverlay);

    var lengthAdsList = elements.length;
    if (elements.length >= window.constants.COUNT_ADVERTISING) {
      lengthAdsList = window.constants.COUNT_ADVERTISING;
    }

    for (var i = 0; i < lengthAdsList; i++) {
      pinArrayFragment.appendChild(elements[i]);
    }

    mapPins.appendChild(pinArrayFragment);
  }

  window.pin = {
    generatePinList: generatePinList,
    renderPins: renderPins
  };
})();
