'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MOUSEDOWN_KEY = 1;
var TYPE = ['palace', 'flat', 'house', 'bungalow'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var FEATURES_MIN = 1;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PHOTOS_MIN = 1;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var LOCATION_X_WIDTH = 1130;
var LOCATION_X_HEIGHT = 10;
var PRICE = 1000;
var ROOMS = 5;
var GUEST = 4;
var TITLE = 'Заголовок';
var DESCRIPTION = 'Описание';
var COUNT_OBJ = 8;

var PIN_SIZE_X = 62;
var PIN_SIZE_Y = 62;
var PIN_POINTER_TOP = 18;

var MIN_LENGTH_TITLE = 30;
var MAX_LENGTH_TITLE = 100;
var MAX_VALUE_PRICE = 1000000;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var getRandom = function (arr) {
  return Math.ceil(Math.random() * arr.length - 1);
};


var getUniqRandomArray = function (array, randomNumber) {
  var arr = [];
  while (arr.length < randomNumber) {
    var item = array[getRandomIntInclusive(0, array.length - 1)];
    if (arr.indexOf(item) === -1) {
      arr.push(item);
    }
  }
  return arr;
};

var getOption = function (opt) {
  var num = getRandom(opt);
  return opt[num];
};

var getAddress = function (x, y) {
  return x + ',' + y;
};

var getAddictions = function (min, addictions) {
  var num = getRandomIntInclusive(min, addictions.length);
  return getUniqRandomArray(addictions, num);
};

var getLocation = function (x, y) {
  return getRandomIntInclusive(x, y);
};


var getObjects = function () {
  var pins = [];
  for (var i = 0; i < COUNT_OBJ; i++) {
    pins[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLE,
        address: getAddress(getLocation(LOCATION_X_WIDTH, LOCATION_X_HEIGHT), getLocation(LOCATION_Y_MIN, LOCATION_Y_MAX)),
        price: PRICE,
        type: getOption(TYPE),
        rooms: ROOMS,
        guests: GUEST,
        checkin: getOption(CHECKIN_TIME),
        checkout: getOption(CHECKOUT_TIME),
        features: getAddictions(FEATURES_MIN, FEATURES),
        description: DESCRIPTION,
        photos: getAddictions(PHOTOS_MIN, PHOTOS)
      },
      location: {
        x: getLocation(LOCATION_X_WIDTH, LOCATION_X_HEIGHT),
        y: getLocation(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    };
  }
  return pins;
};

var setAttributeDisable = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].setAttribute('disabled', 'disabled');
  }
};
var deleteAttributeDisable = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].removeAttribute('disabled');
  }
};

var openMap = function () {
  for (var pn = 0; pn < pinTm.length; pn++) {
    if (pn !== 0) {
      pinTm[pn].addEventListener('click', onClickCard(pn), false);
    }
  }
  element.classList.remove('map--faded');
  formVision.classList.remove('ad-form--disabled');
  mapVision.removeAttribute('disabled');
  deleteAttributeDisable(mapsFilters);
  deleteAttributeDisable(inputVision);
};

var element = document.querySelector('.map');

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

var setlocation = document.querySelector('#address');
var adressDefaultX = xPin + (PIN_SIZE_X / 2);
var adressDefaultY = yPin + (PIN_SIZE_Y / 2);
setlocation.setAttribute('value', getAddress(adressDefaultX, adressDefaultY));

activeAction.addEventListener('mousedown', function (evt) {
  if (evt.which === MOUSEDOWN_KEY) {
    openMap();
    var pinPointerX = xPin + (PIN_SIZE_X / 2);
    var pinPointerY = yPin + PIN_SIZE_Y + PIN_POINTER_TOP;
    setlocation.setAttribute('value', getAddress(pinPointerX, pinPointerY));
  }
});

activeAction.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
});
var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

var getDataItemFragment = function (item) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = item.location.x + 'px';
  pin.style.top = item.location.y + 'px';
  var img = pin.querySelector('img');
  img.src = item.author.avatar;
  img.alt = item.offer.title;
  return pin;
};

var pins = getObjects();

var renderPins = function () {
  var result = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    result.appendChild(getDataItemFragment(pins[i]));
  }
  return result;
};

var pinContainerElement = element.querySelector('.map__pins');
pinContainerElement.appendChild(renderPins());


var getTypeCard = function (type) {
  var result = '';
  switch (type) {
    case 'flat':
      result = 'Квартира';
      break;
    case 'bungalow':
      result = 'Бунгало';
      break;
    case 'house':
      result = 'Дом';
      break;
    case 'palace':
      result = 'Дворец ';
      break;
  }
  return result;
};


var cardTemplate = document.querySelector('#card')
  .content.querySelector('.map__card');

var getCardItemFragment = function (item) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = item.offer.title;
  card.querySelector('.popup__text--address').textContent = item.offer.address;
  card.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = getTypeCard(item.offer.type);
  card.querySelector('.popup__text--capacity').textContent = item.offer.guests + 'комнаты для ' + item.offer.rooms + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkout + ' , выезд до ' + item.offer.checkin;
  card.querySelector('.popup__description').textContent = item.offer.description;
  card.querySelector('.popup__avatar').src = item.author.avatar;

  var features = card.querySelector('.popup__features');
  for (var j = 0; j < item.offer.features.length; j++) {
    if (item.offer.features.indexOf(item.offer.features[j]) >= 0) {
      var elementForFeatures = document.createElement('li');
      elementForFeatures.classList.add('popup__feature', 'popup__feature--' + item.offer.features[j]);
      features.appendChild(elementForFeatures);
    }
  }

  var photos = card.querySelector('.popup__photos');
  for (var i = 0; i < item.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = item.offer.photos[i];
    img.alt = 'Фотография жилья';
    img.style.width = '45px';
    img.style.height = '40px';
    photos.appendChild(img);
  }
  card.classList.add('hidden');
  return card;
};

var renderCard = function () {
  var result = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    result.appendChild(getCardItemFragment(pins[i]));
  }
  return result;
};

var mapPopup = element.querySelector('.map__filters-container');
element.insertBefore(renderCard(), mapPopup);

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
      priceForm.setAttribute('min', 1000);
      priceForm.setAttribute('placeholder', 1000);
      break;
    case 'bungalow':
      priceForm.setAttribute('min', 0);
      priceForm.setAttribute('placeholder', 0);
      break;
    case 'house':
      priceForm.setAttribute('min', 5000);
      priceForm.setAttribute('placeholder', 5000);
      break;
    case 'palace':
      priceForm.setAttribute('min', 10000);
      priceForm.setAttribute('placeholder', 10000);
      break;
  }
});

var addressForm = formVision.querySelector('#address');
addressForm.setAttribute('readonly', 'readonly');

var timeoutForm = formVision.querySelector('#timeout');
var timeinForm = formVision.querySelector('#timein');

timeinForm.addEventListener('change', function () {
  timeoutForm.value = timeinForm.value;
});
timeoutForm.addEventListener('change', function () {
  timeinForm.value = timeoutForm.value;
});

var mapCards = element.querySelectorAll('.map__card');
var pinTm = element.querySelectorAll('.map__pin');

function onClickPopup(g) {
  return function () {
    mapCards[g].classList.add('hidden');
  };
}

function onClickPopupEsc(pn) {
  return function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      mapCards[pn].classList.add('hidden');
    }
  };
}

function onClickCard(pn) {
  return function () {
    for (var g = 0; g < mapCards.length; g++) {
      mapCards[g].classList.add('hidden');
    }
    mapCards[pn - 1].classList.remove('hidden');
    var closeCard = mapCards[pn - 1].querySelector('.popup__close');
    closeCard.addEventListener('click', onClickPopup(pn - 1), false);
    element.addEventListener('keydown', onClickPopupEsc(pn - 1), false);

  };
}
