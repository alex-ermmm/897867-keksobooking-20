'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  function onSuccess(data) {
    var pins = document.querySelector('.map__pins');
    window.pins.data = data;

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
    pins.addEventListener('click', pinHandler);
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
        checkSuccess(xhr.response.map(function (pin) {
          pin.id = Math.random();

          return pin;
        }));
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
