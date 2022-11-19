import { useState } from "react";

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
    setEmail('');
    setPassword('');
  }

  return (
      <div className="login">
        <p className="login__welcome">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <label htmlFor="email"></label>
          <input
            className="login__input"
            placeholder="Email"
            required
            id="email"
            name="email"
            type="email"
            value={email || "" }
            onChange={handleEmailChange}
          />
          <label htmlFor="password"></label>
          <input
            className="login__input"
            placeholder="Пароль"
            required
            id="password"
            name="password"
            type="password"
            value={password || ""}
            onChange={handlePasswordChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__save-button">
              Войти
            </button>
          </div>
        </form>
      </div>
  );
}

export default Login;
