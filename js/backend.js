'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  function housingTypeHandler(evt) {
    var listAds = window.adsData.filter(function (advertisement) {
      return advertisement.offer.type === evt.target.value;
    });

    return window.pin.renderPins(window.pin.generatePinList(listAds));
  }

  function onSuccess(data) {
    // фильтруем массив
    window.adsData = data;

    housingType.addEventListener('change', housingTypeHandler);

    window.pin.renderPins(window.pin.generatePinList(data));
  }

  function onError(message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function loadData(url, checkSuccess, checkError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    function loadHandler() {
      if (xhr.status === 200) {
        checkSuccess(xhr.response);
      } else {
        checkError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    }

    xhr.addEventListener('load', loadHandler);

    function errorHandler() {
      onError('Произошла ошибка соединения');
    }

    xhr.addEventListener('error', errorHandler);

    function timeoutHandler() {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    }

    xhr.addEventListener('timeout', timeoutHandler);

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  }

  loadData(URL, onSuccess, onError);
})();
