import { openImg } from "./modal.js";
import { cardsList } from "../scripts/index.js";
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточки
function createCard(name, link, deleteCard, addLike, openImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  cardElement.querySelector(".card__image").addEventListener("click", openImg);

  const imgLikeBtn = cardElement.querySelector(".card__like-button");
  imgLikeBtn.addEventListener("click", addLike);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    const deletedCard = deleteButton.closest(".places__item");
    deleteCard(deletedCard);
  });
  return cardElement;
}

function addLike(evt) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.classList.add("card__like-button_is-active");
  } else {
    evt.target.classList.remove("card__like-button_is-active");
  }
}

function deleteCard(deletedCard) {
  console.log(deletedCard);
  deletedCard.remove();
}

function addCard(name, link, deleteCard) {
  const cardElement = createCard(name, link, deleteCard, addLike, openImg);
  cardsList.insertBefore(cardElement, cardsList.firstChild);
}

function closePopup(el) {
  el.target.parentNode.parentNode.classList.remove("popup_is-opened");
}

export { initialCards, createCard, addLike, deleteCard, addCard, closePopup };
