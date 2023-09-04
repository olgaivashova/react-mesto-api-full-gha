import Header from "./header/Header";
import Main from "./Main/Main";
import PopupWithForm from "./popupWithForm/PopupWithForm";
import ImagePopup from "./imagePopup/ImagePopup";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./editProfilePopup/EditProfilePopup";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import ProtectedElement from "./protectedElement/ProtectedElement";
import ProtectedProfile from "./protectedProfile/ProtectedProfile";
import InfoTooltip from "./infoTooltip/InfoTooltip";

function App() {
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [imagePopup, setImagePopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [card, setCard] = useState([]);
  const [deletedCardId, setDeletedCardId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(!isAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPopupOpen(!isAddPopupOpen);
  }
  function handleImageClick(card) {
    setSelectedCard(card);
    setImagePopup(!imagePopup);
  }
  function handleDeletePopupClick(cardId) {
    setDeletedCardId(cardId);
    setIsDeletePopupOpen(!isDeletePopupOpen);
  }

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPopupOpen(false);
    setImagePopup(false);
    setIsDeletePopupOpen(false);
    setIsResultPopupOpen(false);
  }

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    api
      .deleteCard(deletedCardId, localStorage.jwt)
      .then(() => {
        setCard(
          card.filter((item) => {
            return item._id !== deletedCardId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleRegistrationSubmit(password, email) {
    auth
      .signup(password, email)
      .then(() => {
        setIsResultPopupOpen(true);
        setIsSuccess(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsResultPopupOpen(true);
        setIsSuccess(false);
        console.error(err);
      });
  }

  function handleLoginSubmit(password, email) {
    auth
      .signin(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setProfileEmail(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setIsResultPopupOpen(true);
        setIsSuccess(false);
        console.error(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .setInfo(data, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data, localStorage.jwt)
      .then((res) => {
        setCard([res, ...card]);
        closeAllPopups();
      })
      .catch(console.error);
  }
  function handleUpdateAvatar(data) {
    api
      .setAvatar(data, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setProfileEmail(res.email);
        })
        .catch(console.error);
    } else {
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getInfo(localStorage.jwt),
        api.getCards(localStorage.jwt),
      ])
        .then(([user, dataCards]) => {
          setCurrentUser(user);
          setCard(dataCards);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  /* function signout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }*/

  return (
    <div className="App" style={{ backgroundColor: "#000" }}>
      <div className="page__content">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedElement
                  element={ProtectedProfile}
                  profileEmail={profileEmail}
                  onEditProfile={handleEditProfileClick}
                  onAddPopup={handleAddPlaceClick}
                  onAvatar={handleEditAvatarClick}
                  onCard={handleImageClick}
                  onDelete={handleDeletePopupClick}
                  card={card}
                  loggedIn={loggedIn}
                  //onSignout={signout}
                />
              }
            />

            <Route
              path="/sign-up"
              element={
                <>
                  <Header name="register" />
                  <Main
                    name="register"
                    handleSignup={handleRegistrationSubmit}
                  />
                </>
              }
            />

            <Route
              path="/sign-in"
              element={
                <>
                  <Header name="login" />
                  <Main name="login" handleSignin={handleLoginSubmit} />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            button="Да"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteSubmit}
          />

          <ImagePopup
            name="image"
            card={selectedCard}
            isOpen={imagePopup}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            name="result"
            successText="Вы успешно зарегистрировались"
            failText="Что-то пошло не так! Попробуйте еще раз."
            isSuccess={isSuccess}
            isOpen={isResultPopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
