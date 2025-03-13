import { putCardLike, deleteCardLike, handleError } from "../components/api.js";

function createCard(openImg, cardLikeSwitch, deleteCardOnServ, card, userId) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  const imgLikeBtn = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  likeCount.textContent = card.likes.length;

  cardImage.addEventListener("click", openImg);

  imgLikeBtn.addEventListener("click", (el) => {
    cardLikeSwitch(el, card, userId, likeCount);
  });

  if (card.owner._id === userId) {
    deleteButton.addEventListener("click", (el) => {
      deleteCardOnServ(card._id);
      deleteCard(el);
    });
  } else {
    deleteButton.remove();
  }

  if (isLiked(card, userId)) {
    imgLikeBtn.classList.add("card__like-button_is-active");
  }

  return cardElement;
}

const getCardTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

function addCard(
  cardsList,
  openImg,
  cardLikeSwitch,
  deleteCard,
  cardObj,
  userId
) {
  const cardElement = createCard(
    openImg,
    cardLikeSwitch,
    deleteCard,
    cardObj,
    userId
  );
  cardsList.prepend(cardElement);
}

function cardLikeSwitch(evt, card, myUserId, likeCount) {
  const likeMethod = isLiked(card, myUserId) ? deleteCardLike : putCardLike;
  likeMethod(card._id)
    .then((res) => {
      evt.target.classList.toggle("card__like-button_is-active");
      card.likes = res.likes;
      likeCount.textContent = res.likes.length;
    })
    .catch(handleError);
}

function deleteCard(el) {
  el.target.closest(".places__item").remove();
}

const isLiked = (card, userId) => {
  return card.likes.some((user) => user._id === userId);
};

export { createCard, cardLikeSwitch, deleteCard, addCard };
