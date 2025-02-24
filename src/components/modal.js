function openPopup(el) {
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", escListner);
}

function closePopup(el) {
  el.target.parentNode.parentNode.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escListner);
}

function closeModal(el) {
  el.target.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escListner);
}

function escListner(el) {
  if (el.key === "Escape") {
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
  }
  document.removeEventListener("keydown", escListner);
}

function modalCloseByOverlay(el) {
  if (
    el.target.classList.contains("popup_is-opened") &&
    !el.target.classList.contains("popup__content")
  ) {
    closeModal(el);
  }
}

export { openPopup, escListner, closePopup, modalCloseByOverlay };
