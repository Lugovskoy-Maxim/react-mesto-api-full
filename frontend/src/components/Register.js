import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="login">
      <h2 className="login__welcome">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          className="login__input"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email || ""}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className="login__input"
          placeholder="Пароль"
          onChange={handlePasswordChange}
          value={password || ""}
          required
        />
        <div className="login__button-container">
          <button type="submit" className="login__save-button">
            Зарегистрироваться
          </button>
        </div>
        <p className="login__text">
          Уже зарегистрированы?
          <Link className="login__link link" to="/signin">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
