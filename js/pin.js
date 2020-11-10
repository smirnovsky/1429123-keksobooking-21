'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

  var createPin = function (item) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = item.location.x + 'px';
    pin.style.top = item.location.y + 'px';
    var img = pin.querySelector('img');
    img.src = item.author.avatar;
    img.alt = item.offer.title;
    return pin;
  };

  window.renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.map.pins.length; i++) {
      var pinElement = createPin(window.map.pins[i]);
      pinElement.addEventListener('click', window.map.createPinClickListener(window.map.pins[i]));
      fragment.appendChild(pinElement);
    }
    window.pinContainerElement.appendChild(fragment);
  };
})();
