'use strict';

(function () {

  // блокируем элемнты формы
  var mapsFilter = document.querySelectorAll('.map__filter');
  var mapsCheckbox = document.querySelectorAll('.map__checkbox');
  var adFormsElements = document.querySelectorAll('.ad-form__element');

  // функция отключения элементов формы
  function formElementDisabled(formItem) {
    for (var j = 0; j < formItem.length; j++) {
      formItem[j].disabled = true;
    }
  }

  // отключли select
  formElementDisabled(mapsFilter);

  // отключли chekbox
  formElementDisabled(mapsCheckbox);

  // отключли форму добавления
  formElementDisabled(adFormsElements);

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
      elementsFormsEnebled(mapsFilter);
      // включили chekbox
      elementsFormsEnebled(mapsCheckbox);
      // включили форму добавления
      elementsFormsEnebled(adFormsElements);
      window.pins.renderItem(window.pins.data);
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
      elementsFormsEnebled(mapsFilter);
    }
  }

  mapPinMain.addEventListener('keydown', enterKeydownActivationMap);

  // функция синхронизации время заезда и выезда
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var changedTime;

  function changeTimeOut(evt) {
    changedTime = evt.target.value;
    timeOut.value = changedTime;
  }

  timeIn.addEventListener('change', changeTimeOut);

  function changeTimeIn(evt) {
    changedTime = evt.target.value;
    timeIn.value = changedTime;
  }

  timeOut.addEventListener('change', changeTimeIn);

  // проверяем клик то типу жилья и меняем цену минимальную
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  function changePlaceholderPrice() {
    switch (type.value) {
      case 'bungalo':
        price.placeholder = window.constants.PRICE_BUNGALO;
        price.setAttribute('min', window.constants.PRICE_BUNGALO);
        break;
      case 'flat':
        price.placeholder = window.constants.PRICE_FLAT;
        price.setAttribute('min', window.constants.PRICE_FLAT);
        break;
      case 'house':
        price.placeholder = window.constants.PRICE_HOUSE;
        price.setAttribute('min', window.constants.PRICE_HOUSE);
        break;
      case 'palace':
        price.placeholder = window.constants.PRICE_PALACE;
        price.setAttribute('min', window.constants.PRICE_PALACE);
        break;
      default:
        price.placeholder = window.constants.PRICE_DEFAULT;
        break;
    }
  }

  type.addEventListener('change', changePlaceholderPrice);

  // соотносим количесвтво комнат и жильцов
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

  // обраотчик очистки формы
  var resetFormButton = document.querySelector('.ad-form__reset');

  function resetForm() {
    var title = document.querySelector('#title');
    title.value = '';
    price.value = '';
    type.value = 'flat';
    timein.value = '12:00';
    timeOut.value = '12:00';
    roomNumber.value = '1';
    capacity.value = '4';
    var description = document.querySelector('#description');
    description.value = '';
  }

  resetFormButton.addEventListener('click', resetForm);

  roomNumber.addEventListener('change', onRoomNumberChange);

  window.form = {
    resetForm: resetForm
  }
})();
