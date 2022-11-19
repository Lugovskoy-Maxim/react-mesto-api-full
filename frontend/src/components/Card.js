import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardLike, handlePreviewPopupClick, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const countLikes = card.likes.length;
  const isLiked =
    card.likes.some((i) => i === currentUser._id);

  const classNameDeleteMainCard = `${
    card.owner === currentUser._id
      ? "element__cards-remove"
      : "element__cards-remove_hidden"
  }`;
  const classNameLikeButton = `element__like ${
    isLiked && "element__like_active"
  }`;

  const handleImageClick = (e) => {
    handlePreviewPopupClick(e.target.src, e.target.alt);
  };

  function handleLikeCard() {
    onCardLike(card);
  }

  function handleCardDelite() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleImageClick}
      />
      <button
        type="button"
        className={classNameDeleteMainCard}
        onClick={handleCardDelite}
      ></button>
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like_count">
          <button
            type="button"
            className={classNameLikeButton}
            onClick={handleLikeCard}
          ></button>
          <p className="element__like-counter">{countLikes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
