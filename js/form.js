'use strict';
(function () {
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var MAX_VALUE_PRICE = 1000000;
  var PRICE_BUNGALO = 0;
  var PRICE_FLAT = 1000;
  var PRICE_HOUSE = 5000;
  var PRICE_PALACE = 10000;

  var formVision = document.querySelector('.ad-form');

  var onRoomsChange = function () {
    guests.setCustomValidity('');
    if (rooms.value === '1' && guests.value !== '1') {
      guests.setCustomValidity('В комнате может находиться только 1 гость');
    } else if (guests.value !== '2' && guests.value !== '1' && rooms.value === '2') {
      guests.setCustomValidity('В комнате может находиться только 1 или 2 гостя');
    } else if (rooms.value === '3' && guests.value === '0') {
      guests.setCustomValidity('В комнате может находиться 1 или 2 или 3 гостя');
    } else if (rooms.value === '100' && guests.value !== '0') {
      guests.setCustomValidity('Это не жилое помещение');
    } else {
      guests.setCustomValidity('');
    }
  };

  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');

  formVision.addEventListener('change', function () {
    onRoomsChange();
  });

  var titleForm = formVision.querySelector('#title');
  titleForm.setAttribute('required', 'required');
  titleForm.setAttribute('minlength', MIN_LENGTH_TITLE);
  titleForm.setAttribute('maxlength', MAX_LENGTH_TITLE);

  var priceForm = formVision.querySelector('#price');
  priceForm.setAttribute('required', 'required');
  priceForm.setAttribute('type', 'number');
  priceForm.setAttribute('max', MAX_VALUE_PRICE);

  var typeForm = formVision.querySelector('#type');
  typeForm.addEventListener('change', function () {
    switch (typeForm.value) {
      case 'flat':
        priceForm.setAttribute('min', PRICE_FLAT);
        priceForm.setAttribute('placeholder', PRICE_FLAT);
        break;
      case 'bungalow':
        priceForm.setAttribute('min', PRICE_BUNGALO);
        priceForm.setAttribute('placeholder', PRICE_BUNGALO);
        break;
      case 'house':
        priceForm.setAttribute('min', PRICE_HOUSE);
        priceForm.setAttribute('placeholder', PRICE_HOUSE);
        break;
      case 'palace':
        priceForm.setAttribute('min', PRICE_PALACE);
        priceForm.setAttribute('placeholder', PRICE_PALACE);
        break;
    }
  });

  var addressForm = formVision.querySelector('#address');
  addressForm.setAttribute('readonly', 'readonly');

  var timeOutForm = formVision.querySelector('#timeout');
  var timeInForm = formVision.querySelector('#timein');

  timeInForm .addEventListener('change', function () {
    timeOutForm.value = timeInForm.value;
  });
  timeOutForm.addEventListener('change', function () {
    timeInForm .value = timeOutForm.value;
  });
})();
