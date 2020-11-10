'use strict';
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalow'];
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

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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

  var getOption = function (option) {
    var num = getRandom(option);
    return option[num];
  };

  window.getAddress = function (x, y) {
    return x + ',' + y;
  };

  var getAddictions = function (min, addictions) {
    var num = getRandomIntInclusive(min, addictions.length);
    return getUniqRandomArray(addictions, num);
  };

  var getLocation = function (x, y) {
    return getRandomIntInclusive(x, y);
  };

  window.getObjects = function () {
    var pins = [];
    for (var i = 0; i < COUNT_OBJ; i++) {
      pins[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: TITLE,
          address: window.getAddress(getLocation(LOCATION_X_WIDTH, LOCATION_X_HEIGHT), getLocation(LOCATION_Y_MIN, LOCATION_Y_MAX)),
          price: PRICE,
          type: getOption(TYPES),
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
})();
