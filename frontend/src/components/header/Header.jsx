import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      {props.name === "register" || props.name === "login" ? (
        <Link
          to={props.name === "register" ? "/sign-in" : "/sign-up"}
          className="header__link"
        >
          {props.name === "register" ? "Войти" : "Регистрация"}
        </Link>
      ) : (
        <>
          <div className="header__profile-container">
            <p className="header__profile-email">e-mail:{props.profileEmail}</p>
            <Link
              to={"sign-up"}
              className="header__link"
              onCLick={props.onSignout}
            >
              Выйти
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
