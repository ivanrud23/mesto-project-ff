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

const popupForm = document.querySelector(".popup__form");
const popupInput = document.querySelector(".popup__input");

let userId;

getUsersInfo().then((user) => {
  profTittle.textContent = user.name;
  profDescr.textContent = user.about;
  userId = user._id;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;
});

getInitialCards().then((cardsArray) => {
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
});

setModalWindowEventListeners(editAvatarPopup);
editAvatarForm.addEventListener("submit", handleFormEditAvatar);

setModalWindowEventListeners(editPopup);
editForm.addEventListener("submit", handleFormEdit);

setModalWindowEventListeners(newCardPopup);
newCardForm.addEventListener("submit", handleFormNewCard);

setModalWindowEventListeners(imagePopup);

editAvatarBut.addEventListener("click", function () {
  openPopup(editAvatarPopup);
  clearValidation(editAvatarPopup);
});

addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
  clearValidation(newCardPopup);
});

editButton.addEventListener("click", function (el) {
  openPopup(editPopup);
  clearValidation(editPopup);
  getUsersInfo().then((user) => {
    editForm.name.value = user.name;
    editForm.description.value = user.about;
  });
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
  profTittle.textContent = nameInput.value;
  profDescr.textContent = jobInput.value;
  const editObj = {
    name: nameInput.value,
    about: jobInput.value,
  };
  patchEditProfile(editObj);
  closePopup(evt);
  button.textContent = "Сохранить";
}

function handleFormEditAvatar(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";
  evt.preventDefault();
  patchAvatar(avatarUrl.value).then((user) => {
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
  });
  closePopup(evt);
  button.textContent = "Сохранить";
}

function handleFormNewCard(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";
  evt.preventDefault();
  addCard(
    cardsList,
    cardName.value,
    cardLink.value,
    openImg,
    cardLikeSwitch,
    deleteCard
  );
  const newCard = {
    name: cardName.value,
    link: cardLink.value,
  };
  newCardForm.reset();
  closePopup(evt);
  postNewCard(newCard);
  button.textContent = "Сохранить";
}

enableValidation();
