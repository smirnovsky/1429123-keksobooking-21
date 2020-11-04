'use strict';

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
var TITLE = 'Зaголовок';
var DESCRIPTION = 'Описание';
var COUNT_OBJ = 8;


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

// var openMap = function () {
//   element.classList.remove('map--faded');
//   formVision.classList.remove('ad-form--disabled');
//   mapVision.removeAttribute('disabled');
//   dellAttributeDisable(mapsFilters);
//   dellAttributeDisable(inputVision);
// };

var element = document.querySelector('.map');

var formVision = document.querySelector('.ad-form');
formVision.classList.add('ad-form--disabled');


var getPinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

var getDataItemFragment = function (item) {
  var pin = getPinTemplate.cloneNode(true);
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
    result.appendChild(getDataItemFragment(getObjects()[i]));
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
  return card;
};

var renderCard = function () {
  var result = document.createDocumentFragment();
  result.appendChild(getCardItemFragment(getObjects()[0]));
  return result;
};

var mapPopup = element.querySelector('.map__filters-container');
element.insertBefore(renderCard(), mapPopup);

