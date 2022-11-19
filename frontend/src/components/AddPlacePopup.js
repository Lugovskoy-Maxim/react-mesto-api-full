import { useCallback, useEffect, useState, useContext } from "react";
import { LoadingPopupContext } from "../context/LoadingPopupContext";
import PopupWithForm from "./PopupWithFotm";

function AddPlacePopup({isOpened, isClosed, onAddPlace}) {
  const [titleCard, setTitleCard] = useState("");
  const [link, setLink] = useState("");
  const loadingPopup = useContext(LoadingPopupContext);

  useEffect(() => {
    if (isOpened){
      setLink("");
      setTitleCard("");
    }

  }, [isOpened])

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace(link, titleCard)
  }

  const cbChangetitle = useCallback((event) => {
    setTitleCard(event.target.value);
  }, []);

  const cbChangeLink = useCallback((event) => {
    setLink(event.target.value);
  }, []);

  return (
      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpened={isOpened}
        isClosed={isClosed}
        buttonTitle={loadingPopup ? "Сохранение..." : "Создать" }
        handleSubmit={handleSubmit}
      >
        <label className="popup__field">
          <input
            onChange={cbChangetitle}
            value={titleCard}
            type="text"
            className="popup__input"
            placeholder="Название"
            name="title"
            id="title"
            minLength="2"
            maxLength="30"
            autoComplete="off"
          />
          <span className="popup__field-error" id="title-error">
            {" "}
          </span>
        </label>
        <label className="popup__field">
          <input
            onChange={cbChangeLink}
            value={link}
            type="url"
            id="link"
            name="link"
            className="popup__input"
            placeholder="Ссылка"
            autoComplete="off"
          />
          <span className="popup__field-error" id="link-error">
            {" "}
          </span>
        </label>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
