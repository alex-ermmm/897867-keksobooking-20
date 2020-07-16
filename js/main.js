'use strict';

// Константы
var COUNT_ADVERTISING = 7;

var PIN_BUTTON_IMG_WIDTH = 40;
var PIN_BUTTON_IMG_HEIGHT = 40;

var LOCATION_PIN_MIN_X = 0;
var LOCATION_PIN_MAX_X = 630;

var LOCATION_PIN_MIN_Y = 130;
var LOCATION_PIN_MAX_Y = 1200;

var PHOTO_ARRAY_LENGTH_MIN = 0;
var PHOTO_ARRAY_LENGTH_MAX = 30;

var PRICE_MIN = 1000;
var PRICE_MAX = 5000;

var PRICE_BUNGALO = 0;
var PRICE_FLAT = 1000;
var PRICE_HOUSE = 5000;
var PRICE_PALACE = 10000;

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
        locationX: getRandomLocations(LOCATION_PIN_MIN_X, LOCATION_PIN_MAX_X),
        locationY: getRandomLocations(LOCATION_PIN_MIN_Y, LOCATION_PIN_MAX_Y)
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

// записываем массив в переменную
var randomAdsList = generateRandomAdsList();

// генерируем список элементов в виде DOM элементов
function generatePinList(randomAdsArray) {
  var itemList = [];

  for (var i = 0; i < randomAdsArray.length; i++) {
    itemList[i] = renderItem(randomAdsArray[i].author.avatar, randomAdsArray[i].location.y, randomAdsArray[i].location.x, randomAdsArray[i].offer.title);
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

// блокируем элемнты формы
var mapsFilters = document.querySelectorAll('.map__filter');
var mapsCheckboxes = document.querySelectorAll('.map__checkbox');
var adFormsElements = document.querySelectorAll('.ad-form__element');

// функция отключения элементов формы
function elementsFormDisabled(formItem) {
  for (var j = 0; j < formItem.length; j++) {
    formItem[j].disabled = true;
  }
}

// отключли select
elementsFormDisabled(mapsFilters);

// отключли chekbox
elementsFormDisabled(mapsCheckboxes);

// отключли форму добавления
elementsFormDisabled(adFormsElements);

// функция включения элементов формы
function elementsFormsEnebled(formItem) {
  for (var j = 0; j < formItem.length; j++) {
    formItem[j].disabled = false;
  }
}

var mapPinMain = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');

// определяем адрес начальный
address.value = 'x = ' + mapPinMain.offsetLeft + ' y = ' + mapPinMain.offsetTop;

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');

// по клику на метку удалем клас у карты по клику мыши и она становится активна
function clickButtonFormsEnebled(evt) {
  evt.preventDefault();

  if (evt.which === 1) {
    // включили select
    elementsFormsEnebled(mapsFilters);

    // включили chekbox
    elementsFormsEnebled(mapsCheckboxes);

    // включили форму добавления
    elementsFormsEnebled(adFormsElements);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  }
}

mapPinMain.addEventListener('mousedown', clickButtonFormsEnebled);

// по клику на метку удалем клас у карты по клику enter и она становится активна
function enterKeydownActivationMap(evt) {
  if (evt.key === 'Enter') {

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    elementsFormsEnebled(mapsFilters);
  }
}

mapPinMain.addEventListener('keydown', enterKeydownActivationMap);

// функция синхронизации время заезда и выезда
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var changedTime;


timeIn.addEventListener('change', function () {
  changedTime = timeIn.value;
  timeOut.value = changedTime;
});

timeOut.addEventListener('change', function () {
  changedTime = timeOut.value;
  timeIn.value = changedTime;
});


function changeTimeOut() {
  changedTime = timeIn.value;
  timeOut.value = changedTime;
}

timeIn.addEventListener('change', changeTimeOut);

function changeTimeIn() {
  changedTime = timeOut.value;
  timeIn.value = changedTime;
}

timeOut.addEventListener('change', changeTimeIn);


// проверяем клик то типу жилья и меняем цену минимальную
var type = document.querySelector('#type');
var price = document.querySelector('#price');

function changePlaceholderPrice() {
  switch (type.value) {
    case 'bungalo':
      price.placeholder = PRICE_BUNGALO;
      break;
    case 'flat':
      price.placeholder = PRICE_FLAT;
      break;
    case 'house':
      price.placeholder = PRICE_HOUSE;
      break;
    case 'palace':
      price.placeholder = PRICE_PALACE;
      break;
  }
}

type.addEventListener('change', changePlaceholderPrice);

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var capacityOptionsLength = capacity.options.length;

function onRoomNumberChange(evt) {
  for (var i = 0; i < capacity.options.length; i++) {
    if (Number(evt.target.value) !== capacityOptionsLength) {
      if (evt.target.value === capacity.options[i].value) {
        capacity.options[i].setAttribute('selected', 'selected');
        capacity.options[i].removeAttribute('disabled', 'disabled');
      } else if (evt.target.value > capacity.options[i].value) {
        capacity.options[i].removeAttribute('disabled', 'disabled');
        capacity.options[i].removeAttribute('selected', 'selected');
      } else if (evt.target.value < capacity.options[i].value) {
        capacity.options[i].setAttribute('disabled', 'disabled');
        capacity.options[i].removeAttribute('selected', 'selected');
      }
    } else if (Number(evt.target.value) === capacityOptionsLength) {
      if (evt.target.value > capacity.options[i].value) {
        capacity.options[i].setAttribute('disabled', 'disabled');
        capacity.options[i].removeAttribute('selected', 'selected');
      } else if (evt.target.value <= capacity.options[i].value) {
        capacity.options[i].removeAttribute('disabled', 'disabled');
        capacity.options[i].setAttribute('selected', 'selected');
      }
    }
  }
}

roomNumber.addEventListener('change', onRoomNumberChange);

