import Popup from "../popup/Popup";

function ImagePopup({ name, card, isOpen, onClose }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__image-form">
        <img className="popup__image-scale" src={card.link} alt={card.name} />
        <p className="popup__image-caption">{card.name}</p>
      </div>
    </Popup>
  );
}
export default ImagePopup;
