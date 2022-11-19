import SuccessIcon from "../Images/SuccessIcon.svg";
import FailIcon from "../Images/FailIcon.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpened && `popup_opened`}`}>
      <div className="popup__container">
        <img className="popup__status-image" src={`${ props.status ? SuccessIcon : FailIcon}`} alt="Cтатус" />
        <h2 className="popup__status-text">
          {`${ props.status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}`}
        </h2>
        <button type="button" className="popup__close" onClick={props.isClosed} />
      </div>
    </div>
  );
}

export default InfoTooltip;