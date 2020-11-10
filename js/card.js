'use strict';
(function () {
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
      var elementForFeatures = document.createElement('li');
      elementForFeatures.classList.add('popup__feature', 'popup__feature--' + item.offer.features[j]);
      features.appendChild(elementForFeatures);
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

  window.renderCard = function () {
    var result = document.createDocumentFragment();
    for (var i = 0; i < window.map.pins.length; i++) {
      result.appendChild(getCardItemFragment(window.map.pins[i]));
    }
    return result;
  };
})();
