
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
// const saveButton = card.querySelector('.popup__button');

// @todo: Функция создания карточки

function createCard(name, link, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    const deletedCard = deleteButton.closest('.places__item');
    deleteCard(deletedCard);
  });
  return cardElement;
}

function addCard(name, link, deleteCard) {
  const cardElement = createCard(name, link, deleteCard);
  cardsList.append(cardElement);
};

// @todo: Функция удаления карточки
function deleteCard(deletedCard) {
  deletedCard.remove();
}

// @todo: Вывести карточки на страниц
initialCards.forEach(function (card) {
  addCard(card.name, card.link, deleteCard);
});


