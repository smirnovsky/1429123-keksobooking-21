'use strict';

var ENTER_KEYCODE = 13;
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
var LOCATION_X_WIDTH = 1200;
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var getRandom = function (arr) {
  return Math.floor(Math.random() * arr.length - 1);
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

var setAttributeDisable = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].setAttribute('disabled', 'disabled');
  }
};
var dellAttributeDisable = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].removeAttribute('disabled');
  }
};

var openMap = function () {
  element.classList.remove('map--faded');
  formVision.classList.remove('ad-form--disabled');
  mapVision.removeAttribute('disabled');
  dellAttributeDisable(mapsFilters);
  dellAttributeDisable(inputVision);
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

activeAction.addEventListener('mousedown', function () {
  openMap();
  var pinPointerX = xPin + (PIN_SIZE_X / 2);
  var pinPointerY = yPin + PIN_SIZE_Y + PIN_POINTER_TOP;
  setlocation.setAttribute('value', getAddress(pinPointerX, pinPointerY));
});

activeAction.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
});

var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

var dataItemFragment = function (item) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = item.location.x + 'px';
  pin.style.top = item.location.y + 'px';
  var img = pin.querySelector('img');
  img.src = item.author.avatar;
  img.alt = item.offer.title;
  return pin;
};

var renderPins = function () {
  var result = document.createDocumentFragment();
  for (var i = 0; i < getObjects().length; i++) {
    result.appendChild(dataItemFragment(getObjects()[i]));
  }
  return result;
};

var pinContainerElem = element.querySelector('.map__pins');
pinContainerElem.appendChild(renderPins());


var onRoomsChange = function () {

  guests.setCustomValidity('');

  if (rooms.value === '1' && guests.value !== '1') {
    guests.setCustomValidity('В комнате может находиться только 1 гость');
  } else if (guests.value !== '2' && guests.value !== '1' && rooms.value === '2') {
    guests.setCustomValidity('В комнате может находиться только 1 или 2 гостя');
  } else if (rooms.value === '3' && guests.value === '0') {
    guests.setCustomValidity('В комнате может находиться 1 или 2 или 3 гостя');
  } else if (rooms.value === '100' && guests.value !== '0') {
    guests.setCustomValidity('"Это не жилое помещение');
  } else {
    guests.setCustomValidity('');
  }
};

var rooms = document.querySelector('#room_number');
var guests = document.querySelector('#capacity');

onRoomsChange();

formVision.addEventListener('change', function () {
  onRoomsChange();
});
