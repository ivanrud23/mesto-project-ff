import {
  imagePopup,
  popups,
  nameInput,
  jobInput,
  profTittle,
  profDescr,
  editPopup,
  cardName,
  cardLink,
  newCardPopup,
} from "../scripts/index.js";

import { addCard } from "./cards.js";

function openImg(evt) {
  evt.target.classList.add("popup__image");
  imagePopup.classList.add("popup_is-opened");
  imagePopup.querySelector(".popup__image").src = evt.target.src;
  imagePopup.querySelector(".popup__caption").textContent = evt.target.alt;
  imagePopup.querySelector(".popup__image").alt = evt.target.alt;
  document.addEventListener("keydown", escListner);
}

function escListner(el) {
  if (el.key === "Escape") {
    popups.forEach((popup) => {
      if (popup.classList.contains("popup_is-opened")) {
        popup.classList.remove("popup_is-opened");
      }
    });
  }
  document.removeEventListener("keydown", escListner);
}

function handleFormEdit(evt) {
  evt.preventDefault();
  profTittle.textContent = nameInput.value;
  profDescr.textContent = jobInput.value;
  editPopup.classList.remove("popup_is-opened");
}

function handleFormNewCard(evt) {
  evt.preventDefault();
  addCard(cardName.value, cardLink.value);
  newCardPopup.classList.remove("popup_is-opened");
  cardName.value = "";
  cardLink.value = "";
}

export { openImg, handleFormEdit, escListner, handleFormNewCard };
