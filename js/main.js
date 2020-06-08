var countAdvertising = 7;

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
  min = Math.ceil(min);
  max = Math.floor(max);
  var imageRandom = 'img/avatars/user0' + Math.floor(Math.random() * (max - min + 1)) + '.png';
  return imageRandom;
}

// получаем случайное фото объекта
function getRandomPhoto(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var photoRandom = 'http://o0.github.io/assets/images/tokyo/hotel' + Math.floor(Math.random() * (max - min + 1)) + '.jpg';
  return photoRandom;
}

// получаем случайные координаты.
function getRandomLocations(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var location = Math.floor(Math.random() * (max - min + 1));
  return location;
}

// случайная цена, диапазон от 1000 до 5000
function getRandomPrice(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var randomItem = Math.floor(Math.random() * (max - min + 1)) + min;
  return 'Цена ' + Math.round(randomItem) + ' руб.';
}

// функция генерации случайных данных
var getRandomData = function () {
  var Advertisinglist = [
    {
      "author": {
        "avatar": getRandomUserAvatar(0, countAdvertising)
      },
      "offer": {
        "title": getRandomElement(arrTitle),
        "address": getRandomLocations(0, 1200, 0, 700),
        "price": getRandomPrice(1000, 5000),
        "type": getRandomElement(arrFlat),
        "rooms": getRandomElement(arrRooms),
        "guests": getRandomElement(arrGuests),
        "checkin": getRandomElement(arrCheckin),
        "checkout": getRandomElement(arrCheckout),
        "features": getRandomElement(arrFeatures),
        "description": getRandomElement(arrDescription),
        "photos": getRandomPhoto(0, 30)
      },
      "location": {
        "x": getRandomLocations(0, 1200),
        "y": getRandomLocations(130, 630)
      }
    }
  ];
  return Advertisinglist;
};

// функция генерации массива случайных данных
var getRandomDataArray = function () {
  var nArr = [];
  for (var i = 0; i < countAdvertising; i++) {
    nArr[i] = getRandomData();
  }
  return nArr;
};

console.log(getRandomDataArray());


// функция создания DOM-элемента на основе JS-объекта
var createElement = function (tagName, className, position) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  element.setAttribute('style', position);
  return element;
};
console.log(createElement('button', 'map__pin', 'left:100; top: 200px'));

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var createItemElement = function (product) {
  var listItem = createElement('button', 'map__pin');
  //listItem.appendChild(title);

  var picture = createElement('img', 'product__image');
  picture.src = product.imgUrl;
  picture.alt = product.text;
  listItem.appendChild(picture);

  return listItem;
};
console.log(createItemElement(getRandomDataArray()));
