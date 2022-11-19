import React from "react";

function ImagePopup({ card,  isOpened, isClosed,}) {
  return (
    <section className={`popup popup_type_photo ${isOpened && `popup_opened`}`}>
      <div className="popup__container popup__image-container">
        <img src={card.link} alt={card.title} className="popup__image" />
        <h2 className="popup__image-title">{card.title}</h2>
        <button
          type="button"
          className="popup__close popup__close-image"
          aria-label="Закрыть"
          onClick={isClosed}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
