'use strict';

(function () {

  // блокируем элемнты формы
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapCheckbox = document.querySelectorAll('.map__checkbox');
  var adFormElement = document.querySelectorAll('.ad-form__element');

  // функция отключения элементов формы
  function formDisabled(formItem) {
    for (var j = 0; j < formItem.length; j++) {
      formItem[j].disabled = true;
    }
  }

  // отключли select
  formDisabled(mapFilter);

  // отключли chekbox
  formDisabled(mapCheckbox);

  // отключли форму добавления
  formDisabled(adFormElement);

  // функция включения элементов формы
  function formEnebled(formItem) {
    for (var j = 0; j < formItem.length; j++) {
      formItem[j].disabled = false;
    }
  }

  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  // определяем адрес начальный
  address.value = 'x = ' + mapPinMain.offsetLeft + ' y = ' + mapPinMain.offsetTop;

  var mapShow = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  // по клику на метку удалем клас у карты по клику мыши и она становится активна
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.which === 1) {
      // включили select
      formEnebled(mapFilter);

      // включили chekbox
      formEnebled(mapCheckbox);

      // включили форму добавления
      formEnebled(adFormElement);

      mapShow.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
    }
  });

  // по клику на метку удалем клас у карты по клику enter и она становится активна
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      mapShow.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      formEnebled(mapFilter);
    }
  });

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

  // проверяем клик то типу жилья и меняем цену минимальную
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  type.addEventListener('change', function () {
    var typeOfHousing = document.querySelector('#type');
    switch (typeOfHousing.value) {
      case 'bungalo':
        price.placeholder = window.constants.PRICE_BUNGALO;
        break;
      case 'flat':
        price.placeholder = window.constants.PRICE_FLAT;
        break;
      case 'house':
        price.placeholder = window.constants.PRICE_HOUSE;
        break;
      case 'palace':
        price.placeholder = window.constants.PRICE_PALACE;
        break;
    }
  });

  // соотносим количесвтво комнат и жильцов
  var roomNumber = document.querySelector('#room_number');

  function checkRoomForCapacity(capacity) {
    capacity.value = roomNumber.value;
    for (var i = 0; i < capacity.options.length; i++) {
      if (capacity.options[i].value <= roomNumber.value && capacity.options[i].value !== '0') {
        capacity.options[i].disabled = false;
        capacity.options[i].selected = false;
      } else {
        capacity.options[i].disabled = true;
      }
    }
  }

  roomNumber.addEventListener('change', function () {
    var capacity = document.querySelector('#capacity');
    switch (roomNumber.value) {
      case '1':
        checkRoomForCapacity(capacity);
        break;
      case '2':
        checkRoomForCapacity(capacity);
        break;
      case '3':
        checkRoomForCapacity(capacity);
        break;
      case '100':
        for (var i = 0; i < capacity.options.length; i++) {
          if (capacity.options[i].value === '0') {
            capacity.options[i].disabled = false;
            capacity.options[i].selected = true;
          } else {
            capacity.options[i].disabled = true;
            capacity.options[i].selected = false;
          }
        }
        break;
    }
  });
})();
