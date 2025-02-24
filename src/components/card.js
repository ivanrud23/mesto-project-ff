// Функция создания карточки
function createCard(name, link, openImg) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  const imgLikeBtn = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  cardImage.addEventListener("click", openImg);
  imgLikeBtn.addEventListener("click", cardLikeSwitch);
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

const getCardTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

function addCard(cardsList, name, link, openImg) {
  const cardElement = createCard(name, link, openImg);
  cardsList.prepend(cardElement);
}

function cardLikeSwitch(evt) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.classList.add("card__like-button_is-active");
  } else {
    evt.target.classList.remove("card__like-button_is-active");
  }
}

function deleteCard(el) {
  el.target.parentNode.remove();
}

export { createCard, cardLikeSwitch, deleteCard, addCard };
