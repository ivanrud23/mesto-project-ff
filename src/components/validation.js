const showInputError = (popupForm, popupInput, errorMessage, config) => {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClassTextActive);
};

const hideInputError = (popupForm, popupInput, config) => {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove(config.errorClass);
  errorElement.classList.remove(config.errorClassTextActive);
  errorElement.textContent = "";
};

const isValid = (popupForm, popupInput, config) => {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else {
    popupInput.setCustomValidity("");
  }

  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage, config);
  } else {
    hideInputError(popupForm, popupInput, config);
  }
};

const formValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formValidation(formElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (!hasInvalidInput(inputList)) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.buttonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.buttonClass);
  }
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.classList.remove(config.errorClass);
    inputElement.value = "";
  });
};
