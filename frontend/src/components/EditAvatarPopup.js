import { useCallback, useEffect, useState, useContext} from "react";
import PopupWithForm from "./PopupWithFotm";
import { LoadingPopupContext } from "../context/LoadingPopupContext";

function EditAvatarPopup({
  isOpened,
  isClosed,
  onEditAvatar
}) {
  const [value, setValue] = useState("");
  const loadingPopup = useContext(LoadingPopupContext);

  useEffect(() => {
    setValue("");
  }, [isOpened]);

  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    onEditAvatar(value)
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpened={isOpened}
      isClosed={isClosed}
      buttonTitle={loadingPopup ? "Сохранение..." : "Сохранить" }
      handleSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="url"
          id="avatar"
          name="avatar"
          value={value}
          onChange={onChange}
          className="popup__input"
          placeholder="Ссылка на аватар"
          autoComplete="off"
          required
        />
        <span className="popup__field-error" id="link-error">
          {" "}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
