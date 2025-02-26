function openPopup(el) {
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", escListner);
}

function closePopup(el) {
  if (el.target.closest(".popup_is-opened") === null) {
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
  } else {
    el.target.closest(".popup_is-opened").classList.remove("popup_is-opened");
  }
  document.removeEventListener("keydown", escListner);
}

function escListner(el) {
  if (el.key === "Escape") {
    closePopup(el);
  }
}

export const setModalWindowEventListeners = (modalWindow, handle) => {
  modalWindow.addEventListener("submit", handle);
  modalWindow
    .querySelector(".popup__close")
    .addEventListener("click", closePopup);
  modalWindow.addEventListener("click", handleCloseByOverlay);
};

function handleCloseByOverlay(el) {
  if (
    el.target.classList.contains("popup_is-opened") &&
    !el.target.classList.contains("popup__content")
  ) {
    closePopup(el);
  }
}

export { openPopup, escListner, closePopup, handleCloseByOverlay };
