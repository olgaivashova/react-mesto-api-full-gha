import { useRef } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";


function EditAvatarPopup (props) {
  const avatarInput = useRef()

  function handleSubmit (evt) {
    evt.preventDefault();
    props.onUpdateAvatar({avatar: avatarInput.current.value})
    evt.target.reset();
  }

  return (<PopupWithForm
    name="save-avatar"
    title="Обновить аватар"
    button=""
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <label className="popup__form-field">
      <input
      ref={avatarInput}
        id="avatar-input"
        type="url"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </label>
  </PopupWithForm>

  )
}

export default EditAvatarPopup;