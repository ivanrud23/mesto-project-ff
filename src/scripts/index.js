import {initialCards, createCard, addLike, deleteCard, addCard, closePopup} from "../components/cards.js";
import {handleFormEdit, escListner, handleFormNewCard} from "../components/modal.js";
import "../pages/index.css";


const cardsList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editForm = editPopup.querySelector(".popup__form");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");

const imagePopup = document.querySelector(".popup_type_image");

const closeEditPopup = editPopup.querySelector(".popup__close");
const closeNewCardPopup = newCardPopup.querySelector(".popup__close");
const closeImgPopup = imagePopup.querySelector(".popup__close");

const profTittle = document.querySelector(".profile__title");
const profDescr = document.querySelector(".profile__description");


initialCards.forEach(function (card) {
  addCard(card.name, card.link, deleteCard);
});

addButton.addEventListener("click", function () {
  newCardPopup.classList.add("popup_is-opened");
  newCardPopup.addEventListener("submit", handleFormNewCard);
  document.addEventListener("keydown", escListner);
});

editButton.addEventListener("click", function () {
  editForm.name.value = profTittle.textContent;
  editPopup.classList.add("popup_is-opened");
  editForm.description.value = profDescr.textContent;
  editForm.addEventListener("submit", handleFormEdit);
  document.addEventListener("keydown", escListner);
});

closeEditPopup.addEventListener("click", closePopup);
closeNewCardPopup.addEventListener("click", closePopup);
closeImgPopup.addEventListener("click", closePopup);

popups.forEach((popup) => {
  popup.addEventListener("click", function (el) {
    el.stopPropagation();
    if (popup.classList.contains("popup_is-opened") && el.target === popup) {
      popup.classList.remove("popup_is-opened");
    }
  });
});


export {
  cardsList, 
  imagePopup, 
  popups, 
  nameInput, 
  jobInput, 
  profTittle,
  profDescr,
  editPopup,
  cardName,
  cardLink,
  newCardPopup
};


