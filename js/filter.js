'use strict';

(function () {
// фильтруем метки
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  function clearPin() {
    var allPins = document.querySelectorAll('button.map__pin');
    for (var i = 0; i < allPins.length; i++) {
      if (allPins[i] !== allPins[0]) {
        allPins[i].remove();
      }
    }
  }

  function filterByType(evt) {
    clearPin();
    var listAds = window.pins.data.filter(function (advertisement) {

      return advertisement.offer.type === evt.target.value;
    });

    window.pins.renderItem(listAds);
  }

  housingType.addEventListener('change', filterByType);
  window.pins.renderItem(window.pins.data);

})();
