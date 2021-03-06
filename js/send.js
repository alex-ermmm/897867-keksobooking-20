'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';

  function sendError() {
    var main = document.querySelector('main');
    var errorContainer = document.querySelector('#error');
    var error = errorContainer.content.querySelector('.error');

    main.appendChild(error);

    error.addEventListener('click', function () {
      error.remove();
    });
  }

  function sendData(data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    function onSuccessHandler() {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        sendError();
      }
    }

    xhr.addEventListener('load', onSuccessHandler);

    xhr.open('POST', URL);
    xhr.send(data);

    window.form.resetForm();
  }

  window.send = {
    sendData: sendData
  };
})();
