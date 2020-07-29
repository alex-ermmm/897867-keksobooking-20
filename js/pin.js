'use strict';

(function () {

  // функция создания DOM-элемента Кпонка, на основе JS-объекта
  function createPin(data) {
    var image = createPinImage(data);
    var button = document.createElement('button');

    button.classList.add('map__pin');
    button.setAttribute('data-id', data.id);
    button.style.left = data.location.x + 'px';
    button.style.top = data.location.y + 'px';
    button.appendChild(image);

    return button;
  }

  // функция создания DOM-элемента на основе JS-объекта
  function createPinImage(data) {
    var pinImage = document.createElement('img');

    pinImage.setAttribute('src', data.author.avatar);
    pinImage.setAttribute('width', window.constants.PIN_BUTTON_IMG_WIDTH);
    pinImage.setAttribute('height', window.constants.PIN_BUTTON_IMG_HEIGHT);
    pinImage.setAttribute('alt', data.offer.title);

    return pinImage;
  }

  var mapPins = document.querySelector('.map__pins');


  function pinHandler(evt) {

    var pin = evt.target.closest('.map__pin');

    if (pin && pin.dataset.id) {
      var element = window.pins.data.find(function (it) {
        return it.id.toString() === pin.dataset.id;
      });

      if (element) {
        window.popup.openPopup(element);
      }
    }
  }

  mapPins.addEventListener('click', pinHandler);

  function renderItem(data) {
    var fragment = document.createDocumentFragment();

    data
      .slice(0, window.constants.COUNT_ADVERTISING)
      .forEach(function (pin) {
        fragment.appendChild(createPin(pin));
      });

    mapPins.appendChild(fragment);
  }

  window.pins = {
    data: [],
    renderItem: renderItem
  };
})();
