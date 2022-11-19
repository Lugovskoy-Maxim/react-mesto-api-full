import React from "react";
import { Link, useLocation, Switch, Route } from "react-router-dom";
import headerLogo from "../Images/Vectorlogo.svg";

function Header(props) {
const location = useLocation();

  return (
    <header className="header">
      <>
        <a className="header__link" href="/">
          <img className="header__logo" alt="Логотип" src={headerLogo} />
        </a>
      </>
      <div className="header__navInfo">
        {props.onlogin ? (
          <>
            <p className="header__email">{props.email}</p>
            <Link
              className="header__link header__link_logout"
              to="/signin"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>

          </>

        ) : (
        <Switch>
          <Route path='/signup'>
            <Link className="header__link" to="/signin">Войти</Link>
          </Route>
          <Route path='/signin'>
            <Link className="header__link" to="/signup">Регистрация</Link>
          </Route>
        </Switch>
        )}
      </div>
    </header>
  );
}

export default Header;
