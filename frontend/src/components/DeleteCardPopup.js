import { useContext } from "react";
import PopupWithForm from "./PopupWithFotm";
import { LoadingPopupContext } from "../context/LoadingPopupContext";

function DeleteCardPopup({ isOpened, isClosed, onDeletePhoto, card }) {
  const loadingPopup = useContext(LoadingPopupContext);

  function handleSubmit(event) {
    event.preventDefault();
    onDeletePhoto(card);
  }

  return (
    <PopupWithForm
      name="remove"
      title="Вы уверены?"
      isOpened={isOpened}
      isClosed={isClosed}
      buttonTitle={loadingPopup ? "Удаление..." : "Да" }
      handleSubmit={handleSubmit}
    />
  );
}
export default DeleteCardPopup;
