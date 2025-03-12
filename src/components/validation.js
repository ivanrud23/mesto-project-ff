const showInputError = (popupForm, popupInput, errorMessage) => {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add("popup__input-error");

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error-text-active");
};

const hideInputError = (popupForm, popupInput) => {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove("popup__input-error");
  errorElement.classList.remove("popup__input-error-text-active");
  errorElement.textContent = "";
};

const isValid = (popupForm, popupInput) => {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else {
    popupInput.setCustomValidity("");
  }

  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage);
  } else {
    hideInputError(popupForm, popupInput);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button-inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button-inactive");
  }
};

export const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const errorList = Array.from(
    formElement.querySelectorAll(".popup__input-error-text")
  );

  inputList.forEach((inputElement) => {
    // console.log(inputElement);
    inputElement.classList.remove("popup__input-error");
    inputElement.value = "";
  });

  errorList.forEach((errorElement) => {
    // console.log(errorElement);
    errorElement.classList.remove("popup__input-error-text-active");
    errorElement.textContent = "";
  });
};
