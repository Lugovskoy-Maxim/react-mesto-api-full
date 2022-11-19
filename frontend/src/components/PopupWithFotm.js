import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpened && `popup_opened`
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form popup__form_add"
          name="cardForm"
          onSubmit={props.onSubmit}
        >
          {props.children}
        </form>
        <button
          type="button"
          className="popup__close"
          onClick={props.isClosed}
        ></button>
        <button
          type="submit"
          className="popup__save popup__save-card"
          onClick={props.handleSubmit}
        >
          {props.buttonTitle}
        </button>
      </div>
    </section>
  );
}

export default PopupWithForm;
