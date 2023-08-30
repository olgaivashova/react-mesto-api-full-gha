import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Like from "../like/Like";

function Card({ card, onCard, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner;

  return (
    <div className="elements__item">
      {isOwn && (
        <button
          className="elements__delete-icon"
          type="button"
          onClick={() => onDelete(card._id)}
        />
      )}
      <img
        className="elements__grid-photo"
        src={card.link}
        alt={card.name}
        onClick={() => onCard({ name: card.name, link: card.link })}
      />
      <div className="elements__titles">
        <h2 className="elements__grid-text">{card.name}</h2>
        <Like likes={card.likes} myid={currentUser._id} cardid={card._id} />
      </div>
    </div>
  );
}

export default Card;
