'use strict';

(function () {

  // Константы
  var COUNT_ADVERTISING = 5;

  var PIN_BUTTON_IMG_WIDTH = 40;
  var PIN_BUTTON_IMG_HEIGHT = 40;

  var LOCATION_PIN_MIN_X = 0;
  var LOCATION_PIN_MAX_X = 630;

  var LOCATION_PIN_MIN_Y = 130;
  var LOCATION_PIN_MAX_Y = 630;

  var PHOTO_ARRAY_LENGTH_MIN = 0;
  var PHOTO_ARRAY_LENGTH_MAX = 30;

  var PRICE_MIN = 1000;
  var PRICE_MAX = 5000;

  var PRICE_BUNGALO = 0;
  var PRICE_FLAT = 1000;
  var PRICE_HOUSE = 5000;
  var PRICE_PALACE = 10000;
  var PRICE_DEFAULT = 'Выберите тип жилья';

  var typeHouses = ['palace', 'flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var rooms = ['1', '2', '3'];
  var guests = ['Один', 'Два', 'Не для гостей'];
  var titles = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'];
  var descriptions = ['строка с описанием 1', 'строка с описанием 2', 'строка с описанием 3', 'строка с описанием 4', 'строка с описанием 5', 'строка с описанием 6', 'строка с описанием 7', 'строка с описанием 8'];

  window.constants = {
    COUNT_ADVERTISING: COUNT_ADVERTISING,
    PIN_BUTTON_IMG_WIDTH: PIN_BUTTON_IMG_WIDTH,
    PIN_BUTTON_IMG_HEIGHT: PIN_BUTTON_IMG_HEIGHT,
    LOCATION_PIN_MIN_X: LOCATION_PIN_MIN_X,
    LOCATION_PIN_MAX_X: LOCATION_PIN_MAX_X,
    LOCATION_PIN_MIN_Y: LOCATION_PIN_MIN_Y,
    LOCATION_PIN_MAX_Y: LOCATION_PIN_MAX_Y,
    PHOTO_ARRAY_LENGTH_MIN: PHOTO_ARRAY_LENGTH_MIN,
    PHOTO_ARRAY_LENGTH_MAX: PHOTO_ARRAY_LENGTH_MAX,
    PRICE_MIN: PRICE_MIN,
    PRICE_MAX: PRICE_MAX,
    PRICE_BUNGALO: PRICE_BUNGALO,
    PRICE_FLAT: PRICE_FLAT,
    PRICE_HOUSE: PRICE_HOUSE,
    PRICE_PALACE: PRICE_PALACE,
    PRICE_DEFAULT: PRICE_DEFAULT,
    typeHouses: typeHouses,
    checkin: checkin,
    checkout: checkout,
    features: features,
    rooms: rooms,
    guests: guests,
    titles: titles,
    descriptions: descriptions
  };
})();
