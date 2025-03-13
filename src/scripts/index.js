import { addCard, cardLikeSwitch, deleteCard } from "../components/card.js";
import {
  closePopup,
  openPopup,
  setModalWindowEventListeners,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUsersInfo,
  getInitialCards,
  patchEditProfile,
  postNewCard,
  deleteCardOnServ,
  patchAvatar,
  handleError,
} from "../components/api.js";
import "../pages/index.css";

const cardsList = document.querySelector(".places__list");
const profileAvatar = document.querySelector(".profile__image");

const editAvatarBut = document.querySelector(".profile__avatar-botton");
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const editAvatarForm = editAvatarPopup.querySelector(".popup__form");
const avatarUrl = editAvatarPopup.querySelector(".popup__input_type_avatar");

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

const profTittle = document.querySelector(".profile__title");
const profDescr = document.querySelector(".profile__description");

const validConfig = {
  errorClass: "popup__input-error",
  errorClassText: "popup__input-error-text",
  errorSelectText: ".popup__input-error-text",
  errorClassTextActive: "popup__input-error-text-active",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  formSelector: ".popup__form",
  buttonClass: "popup__button-inactive",
};

let userId;

Promise.all([getUsersInfo(), getInitialCards()])
  .then(([user, cardsArray]) => {
    profTittle.textContent = user.name;
    profDescr.textContent = user.about;
    userId = user._id;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;

    cardsArray.forEach((cardObj) => {
      addCard(
        cardsList,
        openImg,
        cardLikeSwitch,
        deleteCardOnServ,
        cardObj,
        userId
      );
    });
  })
  .catch(handleError);

setModalWindowEventListeners(editAvatarPopup);
editAvatarForm.addEventListener("submit", handleFormEditAvatar);

setModalWindowEventListeners(editPopup);
editForm.addEventListener("submit", handleFormEdit);

setModalWindowEventListeners(newCardPopup);
newCardForm.addEventListener("submit", handleFormNewCard);

setModalWindowEventListeners(imagePopup);

editAvatarBut.addEventListener("click", function () {
  openPopup(editAvatarPopup);
  clearValidation(editAvatarPopup, validConfig);
});

addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
  clearValidation(newCardPopup, validConfig);
});

editButton.addEventListener("click", function (el) {
  openPopup(editPopup);
  clearValidation(editPopup, validConfig);
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
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";
  evt.preventDefault();
  const editObj = {
    name: nameInput.value,
    about: jobInput.value,
  };
  patchEditProfile(editObj)
    .then((res) => {
      profTittle.textContent = res.name;
      profDescr.textContent = res.about;
    })
    .catch(handleError)
    .finally(() => {
      button.textContent = "Сохранить";
    });
  closePopup(evt);
}

function handleFormEditAvatar(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";
  evt.preventDefault();
  patchAvatar(avatarUrl.value)
    .then((user) => {
      profileAvatar.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch(handleError)
    .finally(() => {
      button.textContent = "Сохранить";
    });
  closePopup(evt);
}

function handleFormNewCard(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";
  evt.preventDefault();
  const newCard = {
    name: cardName.value,
    link: cardLink.value,
  };
  newCardForm.reset();
  postNewCard(newCard)
    .then((cardObj) => {
      addCard(cardsList, openImg, cardLikeSwitch, deleteCard, cardObj, userId);
    })
    .catch(handleError)
    .finally(() => {
      button.textContent = "Сохранить";
    });
  closePopup(evt);
}

enableValidation(validConfig);
