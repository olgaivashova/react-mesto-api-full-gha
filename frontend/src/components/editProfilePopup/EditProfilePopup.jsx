import PopupWithForm from "../popupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useEffect, useContext, useState } from "react";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser, props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({ name: name, job: description });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      button=""
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="name-input"
          type="text"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Имя"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          id="about-input"
          type="text"
          className="popup__input popup__input_type_job"
          name="job"
          placeholder="О себе"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error about-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
