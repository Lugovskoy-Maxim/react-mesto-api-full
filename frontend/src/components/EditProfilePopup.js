import { useCallback, useEffect, useState, useContext} from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { LoadingPopupContext } from "../context/LoadingPopupContext";
import PopupWithForm from "./PopupWithFotm";

function EditProfilePopup({
  isOpened,
  isClosed,
  onEditProfile
}) {
  const currentUser = useContext(CurrentUserContext);
  const loadingPopup = useContext(LoadingPopupContext);
  const [userName, setUserName] = useState(currentUser.name);
  const [userAbout, setUserAbout] = useState(currentUser.about);

  useEffect(() => {
    setUserName(currentUser.name);
    setUserAbout(currentUser.about);
  }, [currentUser, isOpened]);

  function handleSubmit(event) {
    event.preventDefault();
    onEditProfile(userName, userAbout)
  }

  const onChangeName = useCallback((event) => {
    setUserName(event.target.value);
  }, []);

  const onChangeAbout = useCallback((event) => {
    setUserAbout(event.target.value);
  }, []);



  return (
    <>
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpened={isOpened}
        isClosed={isClosed}
        onEditProfile={onEditProfile}
        buttonTitle={loadingPopup ? "Сохранение..." : "Сохранить" }
        handleSubmit={handleSubmit}
      >
        <label className="popup__field">
          <input
            type="text"
            className="popup__input"
            value={userName || ""}
            placeholder="Имя"
            name="name"
            id="name"
            minLength="2"
            maxLength="30"
            autoComplete="off"
            onChange={onChangeName}
            required
          />
          <span className="popup__field-error" id="title-error">
            {" "}
          </span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            id="about"
            name="about"
            className="popup__input"
            placeholder="О себе"
            value={userAbout || ""}
            autoComplete="off"
            onChange={onChangeAbout}
            required
          />
          <span className="popup__field-error" id="link-error">
            {" "}
          </span>
        </label>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
