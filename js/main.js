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


var arrFlat = ['palace', 'flat', 'house', 'bungalo'];
var arrCheckin = ['12:00', '13:00', '14:00'];
var arrCheckout = ['12:00', '13:00', '14:00'];
var arrFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var arrRooms = ['1', '2', '3'];
var arrGuests = ['Один', 'Два', 'Не для гостей'];
var arrTitle = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'];
var arrDescription = ['строка с описанием 1', 'строка с описанием 2', 'строка с описанием 3', 'строка с описанием 4', 'строка с описанием 5', 'строка с описанием 6', 'строка с описанием 7', 'строка с описанием 8'];


// получаем случайный элемент массива
function getRandomElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

// получаем случайное фото для аватара пользователя
function getRandomUserAvatar(min, max) {
  var imageRandom = 'img/avatars/user0' + Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + '.png';
  return imageRandom;
}

// получаем случайное фото объекта
function getRandomPhoto(min, max) {
  var photoRandom = 'http://o0.github.io/assets/images/tokyo/hotel' + Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + '.jpg';
  return photoRandom;
}

// получаем случайные координаты.
function getRandomLocations(min, max) {
  var location = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1));
  return location;
}

// случайная цена, диапазон от 1000 до 5000
function getRandomPrice(min, max) {
  var randomItem = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
  return 'Цена ' + Math.round(randomItem) + ' руб.';
}

// функция генерации случайных данных
function generateRandomData() {
  return {
    author: {
      avatar: getRandomUserAvatar(0, COUNT_ADVERTISING)
    },
    offer: {
      title: getRandomElement(arrTitle),
      address: {
        locationX: getRandomLocations(ADDRESS_MIN_X, ADDRESS_MAX_X),
        locationY: getRandomLocations(ADDRESS_MIN_Y, ADDRESS_MAX_Y),
      },
      price: getRandomPrice(PRICE_MIN, PRICE_MAX),
      type: getRandomElement(arrFlat),
      rooms: getRandomElement(arrRooms),
      guests: getRandomElement(arrGuests),
      checkin: getRandomElement(arrCheckin),
      checkout: getRandomElement(arrCheckout),
      features: getRandomElement(arrFeatures),
      description: getRandomElement(arrDescription),
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
function createPinImage(tagName, srcValue, widthValue, heightValue, altValue) {
  var element = document.createElement(tagName);
  element.setAttribute('src', srcValue);
  element.setAttribute('width', widthValue);
  element.setAttribute('height', heightValue);
  element.setAttribute('alt', altValue);
  return element;
}

function renderItem(linkImage, positionX, positionY, altName) {
  var createButton = createPinButton('button', 'map__pin', positionX, positionY);
  var createImage = createPinImage('img', linkImage, PIN_BUTTON_IMG_HEIGHT, PIN_BUTTON_IMG_WIDTH, altName);
  createButton.appendChild(createImage);
  return createButton;
}

// записываем массив в переменную
var randomAdsList = generateRandomAdsList();

// генерируем список элеентов в виде DOM элементов
function generatePinList(randomAdsArray) {
  var itemList = [];
  for (var i = 0; i < randomAdsArray.length; i++) {
    itemList[i] = renderItem(randomAdsArray[i].author.avatar, randomAdsArray[i].location.y + 'px', randomAdsArray[i].location.y + 'px', randomAdsArray[i].offer.title);
  }
  return itemList;
}

// выводим элементы в DOM
var arrayElements = generatePinList(randomAdsList);
var pinArrayFragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');

for (var i = 0; i < arrayElements.length; i++) {
  pinArrayFragment.appendChild(arrayElements[i]);
}
mapPins.appendChild(pinArrayFragment);
