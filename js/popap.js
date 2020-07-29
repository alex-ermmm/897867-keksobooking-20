'use strict';

(function () {
  var IMAGE_HEIGHT = 40;
  var IMAGE_WIDTH = 45;

  var templatePopup = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  function createFutures(data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (feature) {
      var li = document.createElement('li');
      li.className = 'popup__feature' + 'popup__feature--' + feature;

      fragment.appendChild(li);
    });

    return fragment;
  }

  function createPhotos(data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (link) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.setAttribute('src', link);
      img.setAttribute('height', IMAGE_HEIGHT);
      img.setAttribute('width', IMAGE_WIDTH);
      img.setAttribute('alt', 'Фотография жилья');

      fragment.appendChild(img);
    });

    return fragment;
  }

  function createPopup(data) {
    var template = templatePopup.cloneNode(true);

    var popupAvatar = template.querySelector('.popup__avatar');
    var popupTitle = template.querySelector('.popup__title');
    var popupAddress = template.querySelector('.popup__text--address');
    var popupPrice = template.querySelector('.popup__text--price');
    var popupType = template.querySelector('.popup__type');
    var popupCapacity = template.querySelector('.popup__text--capacity');
    var popupTime = template.querySelector('.popup__text--time');
    var popupDescription = template.querySelector('.popup__description');
    var popupPhotos = template.querySelector('.popup__photos');
    var popupFeatures = template.querySelector('.popup__features');

    popupAvatar.setAttribute('src', data.author.avatar);
    popupAvatar.setAttribute('alt', data.offer.title);
    popupTitle.innerHTML = data.offer.title;
    popupAddress.innerHTML = data.offer.address;
    popupPrice.innerHTML = data.offer.price + 'Р/Ночь';

    var type;
    switch (data.offer.type) {
      case 'bungalo':
        type = 'Бунгало';
        break;
      case 'flat':
        type = 'Квартира';
        break;
      case 'house':
        type = 'дом';
        break;
      case 'palace':
        type = 'Дворец';
        break;
      default:
        type = window.constants.PRICE_DEFAULT;
        break;
    }
    popupType.innerHTML = type;
    popupCapacity.innerHTML = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    popupTime.innerHTML = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    popupDescription.innerHTML = data.offer.description;

    popupPhotos.appendChild(createPhotos(data.offer.photos));
    popupFeatures.appendChild(createFutures(data.offer.features));

    return template;
  }

  function closePopup() {
    var popup = document.querySelector('.map__card');

    if (popup) {
      popup.remove();
    }
  }

  function keydownClosePopup(evt) {

    var popup = document.querySelector('.map__card');

    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (popup) {
        popup.remove();
      }

    }
  }

  function openPopup(pipPopup) {

    map.insertBefore(createPopup(pipPopup), mapFiltersContainer);
    map.addEventListener('click', closePopup);
    map.addEventListener('keydown', keydownClosePopup);
  }

  window.popup = {
    openPopup: openPopup
  }
})();
