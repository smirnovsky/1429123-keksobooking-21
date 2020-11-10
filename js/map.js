'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MOUSEDOWN_KEY = 1;
  var PIN_SIZE_X = 62;
  var PIN_SIZE_Y = 62;
  var PIN_POINTER_TOP = 18;

  var setAttributeDisable = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };
  var deleteAttributeDisable = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var openMap = function () {
    window.renderPins();
    window.elements.classList.remove('map--faded');
    formVision.classList.remove('ad-form--disabled');
    mapVision.removeAttribute('disabled');
    deleteAttributeDisable(mapsFilters);
    deleteAttributeDisable(inputVision);
  };

  var formVision = document.querySelector('.ad-form');
  formVision.classList.add('ad-form--disabled');

  var mapVision = document.querySelector('.map__filters');
  var mapsFilters = mapVision.querySelectorAll('.map__filter');
  setAttributeDisable(mapsFilters);

  var inputVision = formVision.querySelectorAll('fieldset');
  setAttributeDisable(inputVision);

  var activeAction = document.querySelector('.map__pin--main');

  var xPin = activeAction.offsetLeft;
  var yPin = activeAction.offsetTop;

  var addressInput = document.querySelector('#address');
  var addressDefaultX = xPin + (PIN_SIZE_X / 2);
  var addressDefaultY = yPin + (PIN_SIZE_Y / 2);
  addressInput.setAttribute('value', window.getAddress(addressDefaultX, addressDefaultY));

  activeAction.addEventListener('mousedown', function (evt) {
    if (evt.which === MOUSEDOWN_KEY) {
      openMap();
      var pinPointerX = xPin + (PIN_SIZE_X / 2);
      var pinPointerY = yPin + PIN_SIZE_Y + PIN_POINTER_TOP;
      addressInput.setAttribute('value', window.getAddress(pinPointerX, pinPointerY));
    }
  });

  activeAction.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openMap();
    }
  });

  window.elements = document.querySelector('.map');
  window.pins = window.getObjects();

  window.pinContainerElement = window.elements.querySelector('.map__pins');
  var mapPopup = window.elements.querySelector('.map__filters-container');
  window.elements.insertBefore(window.renderCard(), mapPopup);

  var mapCards = window.elements.querySelectorAll('.map__card');

  function onClickPopup(index) {
    return function () {
      mapCards[index].classList.add('hidden');
    };
  }

  function onClickPopupEsc(pin) {
    return function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        mapCards[pin].classList.add('hidden');
      }
    };
  }

  window.createPinClickListener = function (pin) {
    return function () {
      for (var g = 0; g < mapCards.length; g++) {
        if (mapCards[g].querySelector(".popup__text--address").textContent === pin.offer.address) {
          mapCards[g].classList.remove('hidden');
          var closeCard = mapCards[g].querySelector('.popup__close');
          closeCard.addEventListener('click', onClickPopup(g), false);
          window.elements.addEventListener('keydown', onClickPopupEsc(g), false);
        } else {
          mapCards[g].classList.add('hidden');
        }
      }
    };
  };
})();
