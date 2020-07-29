'use strict';
(function () {

  var mainPin = document.querySelector('button.map__pin--main');
  var map = document.querySelector('.map');

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (currentCoords.x >= window.constants.MainPinSize.WIDTH &&
        currentCoords.x <= map.clientWidth - window.constants.MainPinSize.WIDTH &&
        currentCoords.y + window.constants.offsetY >= window.constants.CoordY.MIN &&
        currentCoords.y + window.constants.offsetY <= window.constants.CoordY.MAX) {

        mainPin.style.left = currentCoords.x + 'px';
        mainPin.style.top = currentCoords.y + 'px';

        var address = document.querySelector('#address');
        address.value = 'x = ' + currentCoords.x + ' y = ' + (currentCoords.y + window.constants.offsetY);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDown);

})();
