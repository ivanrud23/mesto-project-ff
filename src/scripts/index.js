import { addCard, cardLikeSwitch, deleteCard } from "../components/card.js";
import {
  closePopup,
  openPopup,
  setModalWindowEventListeners,
} from "../components/modal.js";
import "../pages/index.css";

const cardsList = document.querySelector(".places__list");

const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
const newCardForm = document.forms["new-place"];

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editForm = editPopup.querySelector(".popup__form");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");

const imagePopup = document.querySelector(".popup_type_image");
const imageModal = imagePopup.querySelector(".popup__image");

const closeImgPopup = imagePopup.querySelector(".popup__close");

const profTittle = document.querySelector(".profile__title");
const profDescr = document.querySelector(".profile__description");

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

initialCards.forEach(function (card) {
  addCard(cardsList, card.name, card.link, openImg, cardLikeSwitch, deleteCard);
});

setModalWindowEventListeners(editPopup);
editForm.addEventListener("submit", handleFormEdit);

setModalWindowEventListeners(newCardPopup);
newCardForm.addEventListener("submit", handleFormNewCard);

setModalWindowEventListeners(imagePopup);

addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});


editButton.addEventListener("click", function (el) {
  openPopup(editPopup);
  editForm.name.value = profTittle.textContent;
  editForm.description.value = profDescr.textContent;
});

function openImg(evt) {
  openPopup(imagePopup);
  imageModal.src = evt.target.src;
  imagePopup.querySelector(".popup__caption").textContent = evt.target.alt;
  imageModal.alt = evt.target.alt;
}

function handleFormEdit(evt) {
  evt.preventDefault();
  profTittle.textContent = nameInput.value;
  profDescr.textContent = jobInput.value;
  closePopup(evt);
}

function handleFormNewCard(evt) {
  evt.preventDefault();
  addCard(
    cardsList,
    cardName.value,
    cardLink.value,
    openImg,
    cardLikeSwitch,
    deleteCard
  );
  newCardForm.reset();
  closePopup(evt);
}
