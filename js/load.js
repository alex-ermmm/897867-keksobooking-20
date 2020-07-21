'use strict';

(
  function () {
    var URL = 'https://javascript.pages.academy/keksobooking/data';

    function onSuccess(data) {
      return window.pin.renderPins(window.pin.generatePinList(data));
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

    function loadData(url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      console.log(xhr.response);

      function loadHandler() {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
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
    //console.log(listElements);
  })();
