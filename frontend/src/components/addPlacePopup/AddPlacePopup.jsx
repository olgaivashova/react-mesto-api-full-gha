import { useEffect, useState } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";



function AddPlacePopup (props) {

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('')

  function handleChangeTitle (evt) {
    setTitle(evt.target.value)
     }

     function handleChangeLink (evt) {
      setLink(evt.target.value)
     }

  function handleSubmit (evt) {
    evt.preventDefault();
    props.onAddPlace({ title: title, link: link })
  }

  function resetAddForm () {
    setTitle('')
    setLink('')
   
  }

  useEffect(() => {
    if (!props.isOpen) {
      resetAddForm()
    }
  }, [props.isOpen, resetAddForm])

  return (<PopupWithForm
    name="add"
    title="Новое место"
    button="Создать"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <label className="popup__form-field">
      <input
        id="title-input"
        type="text"
        className="popup__input popup__input_type_title"
        name="title"
        placeholder="Название"
        value={title ? title : ''}
        onChange={handleChangeTitle}
      />
      <span className="popup__input-error title-input-error"></span>
    </label>
    <label className="popup__form-field">
      <input
        id="link-input"
        type="url"
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        value={link ? link : ''}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error link-input-error"></span>
    </label>
  </PopupWithForm>

  )
}

export default AddPlacePopup;