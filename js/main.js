'use strict';

// Константы
var COUNT_ADVERTISING = 7;

var PIN_BUTTON_IMG_WIDTH = 40;
var PIN_BUTTON_IMG_HEIGHT = 40;

var ADDRESS_MIN_X = 0;
var ADDRESS_MIN_Y = 0;
var ADDRESS_MAX_X = 700;
var ADDRESS_MAX_Y = 1200;

var LOCATION_PIN_MIN_X = 0;
var LOCATION_PIN_MIN_Y = 0;
var LOCATION_PIN_MAX_X = 700;
var LOCATION_PIN_MAX_Y = 1200;

var PHOTO_ARRAY_LENGTH_MIN = 0;
var PHOTO_ARRAY_LENGTH_MAX = 30;

var PRICE_MIN = 1000;
var PRICE_MAX = 5000;


var typeHouses = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var rooms = ['1', '2', '3'];
var guests = ['Один', 'Два', 'Не для гостей'];
var titles = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'];
var descriptions = ['строка с описанием 1', 'строка с описанием 2', 'строка с описанием 3', 'строка с описанием 4', 'строка с описанием 5', 'строка с описанием 6', 'строка с описанием 7', 'строка с описанием 8'];


// получаем случайный элемент массива
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// получаем случайное фото для аватара пользователя
function getRandomUserAvatar(min, max) {
  return 'img/avatars/user0' + Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + '.png';
}

// получаем случайное фото объекта
function getRandomPhoto(min, max) {
  return 'http://o0.github.io/assets/images/tokyo/hotel' + Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + '.jpg';
}

// получаем случайные координаты.
function getRandomLocations(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1));
}

// случайная цена, диапазон от 1000 до 5000
function getRandomPrice(min, max) {
  return 'Цена ' + Math.round(Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)) + ' руб.';
}

// функция генерации случайных данных
function generateRandomData() {
  return {
    author: {
      avatar: getRandomUserAvatar(0, COUNT_ADVERTISING)
    },
    offer: {
      title: getRandomElement(titles),
      address: {
        locationX: getRandomLocations(ADDRESS_MIN_X, ADDRESS_MAX_X),
        locationY: getRandomLocations(ADDRESS_MIN_Y, ADDRESS_MAX_Y),
      },
      price: getRandomPrice(PRICE_MIN, PRICE_MAX),
      type: getRandomElement(typeHouses),
      rooms: getRandomElement(rooms),
      guests: getRandomElement(guests),
      checkin: getRandomElement(checkin),
      checkout: getRandomElement(checkout),
      features: getRandomElement(features),
      description: getRandomElement(descriptions),
      photos: getRandomPhoto(PHOTO_ARRAY_LENGTH_MIN, PHOTO_ARRAY_LENGTH_MAX)
    },
    location: {
      x: getRandomLocations(LOCATION_PIN_MIN_X, LOCATION_PIN_MAX_X),
      y: getRandomLocations(LOCATION_PIN_MIN_Y, LOCATION_PIN_MAX_Y)
    }
  };
}

// функция генерации массива случайных данных
function generateRandomAdsList() {
  var adsList = [];
  for (var i = 0; i < COUNT_ADVERTISING; i++) {
    adsList[i] = generateRandomData();
  }
  return adsList;
}

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
  var createImage = createPinImage('img', image, PIN_BUTTON_IMG_HEIGHT, PIN_BUTTON_IMG_WIDTH, alt);
  createButton.appendChild(createImage);
  return createButton;
}
console.log(renderItem('ddd', 100, 200, 'wew'));

// записываем массив в переменную
var randomAdsList = generateRandomAdsList();

// генерируем список элементов в виде DOM элементов
function generatePinList(randomAdsArray) {
  var itemList = [];

  for (var i = 0; i < randomAdsArray.length; i++) {
    itemList[i] = renderItem(randomAdsArray[i].author.avatar, randomAdsArray[i].location.y, randomAdsArray[i].location.y, randomAdsArray[i].offer.title);
  }

  return itemList;
}

var listElements = generatePinList(randomAdsList);

// выводим элементы в DOM
function renderPins(elements) {
  var pinArrayFragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');

  for (var i = 0; i < elements.length; i++) {
    pinArrayFragment.appendChild(elements[i]);
  }
  mapPins.appendChild(pinArrayFragment);
}

renderPins(listElements);

