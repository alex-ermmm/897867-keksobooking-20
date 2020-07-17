'use strict';

(function () {
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
        avatar: getRandomUserAvatar(0, window.constants.COUNT_ADVERTISING)
      },
      offer: {
        title: getRandomElement(window.constants.titles),
        address: {
          locationX: getRandomLocations(window.constants.LOCATION_PIN_MIN_X, window.constants.LOCATION_PIN_MAX_X),
          locationY: getRandomLocations(window.constants.LOCATION_PIN_MIN_Y, window.constants.LOCATION_PIN_MAX_Y)
        },
        price: getRandomPrice(window.constants.PRICE_MIN, window.constants.PRICE_MAX),
        type: getRandomElement(window.constants.typeHouses),
        rooms: getRandomElement(window.constants.rooms),
        guests: getRandomElement(window.constants.guests),
        checkin: getRandomElement(window.constants.checkin),
        checkout: getRandomElement(window.constants.checkout),
        features: getRandomElement(window.constants.features),
        description: getRandomElement(window.constants.descriptions),
        photos: getRandomPhoto(window.constants.PHOTO_ARRAY_LENGTH_MIN, window.constants.PHOTO_ARRAY_LENGTH_MAX)
      },
      location: {
        x: getRandomLocations(window.constants.LOCATION_PIN_MIN_X, window.constants.LOCATION_PIN_MAX_X),
        y: getRandomLocations(window.constants.LOCATION_PIN_MIN_Y, window.constants.LOCATION_PIN_MAX_Y)
      }
    };
  }

  // функция генерации массива случайных данных
  function generateRandomAdsList() {
    var adsList = [];

    for (var i = 0; i < window.constants.COUNT_ADVERTISING; i++) {
      adsList[i] = generateRandomData();
    }

    return adsList;
  }

  var RandomAdsList = generateRandomAdsList();

  window.data = {
    RandomAdsList: RandomAdsList
  };
})();
