'use strict';

(function () {

  console.log(window.loadAdsList);

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
      itemList[i] = renderItem(data[i].author.avatar, data[i].location.y, data[i].location.x, data[i].offer.title);
    }

    return itemList;
  }

  // выводим элементы в DOM
  function renderPins(elements) {
    var pinArrayFragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');

    for (var i = 0; i < elements.length; i++) {
      pinArrayFragment.appendChild(elements[i]);
    }

    mapPins.appendChild(pinArrayFragment);
  }

  window.pin = {
    generatePinList: generatePinList,
    renderPins: renderPins
  }
})();
