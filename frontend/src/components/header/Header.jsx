import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header({ name, profileEmail }) {
  function signout() {
    localStorage.removeItem("jwt");
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      {name === "register" || name === "login" ? (
        <Link
          to={name === "register" ? "/sign-in" : "/sign-up"}
          className="header__link"
        >
          {name === "register" ? "Войти" : "Регистрация"}
        </Link>
      ) : (
        <>
          <div className="header__profile-container">
            <p className="header__profile-email">e-mail:{profileEmail}</p>
            <Link to={"sign-in"} className="header__link" onCLick={signout}>
              Выйти
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
