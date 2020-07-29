'use strict';

(function () {

  function showOkMessage() {
    var main = document.querySelector('main');
    var successContainer = document.querySelector('#success');
    var success = successContainer.content.querySelector('.success');

    main.appendChild(success);

    // не выходит сделать обработкич один на всех

    success.addEventListener('click', function () {
      success.remove();
    });

    // не работает
    success.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        success.remove();
      }
    });
  }


  function responseOk(evt) {
    evt.preventDefault();

    window.send.sendData(new FormData(form), function (response) {
      var map = document.querySelector('.map');
      map.classList.add('map--faded');

      showOkMessage();
    });
  }

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', responseOk);
})();
