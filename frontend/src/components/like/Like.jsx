import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function Like({ likes, myid, cardid }) {
  const [isLiked, setIsLiked] = useState(false);
  const [counter, setCounter] = useState(likes.length);

  useEffect(() => {
    setIsLiked(likes.some((item) => myid === item._id));
  }, [likes, myid]);

  function handleCardLike() {
    if (isLiked) {
      api
        .deleteLike(cardid, localStorage.jwt)
        .then((res) => {
          setIsLiked(false);
          setCounter(res.likes.length);
        })
        .catch(console.error);
    } else {
      api
        .addLike(cardid, localStorage.jwt)
        .then((res) => {
          setIsLiked(true);
          setCounter(res.likes.length);
        })
        .catch(console.error);
    }
  }

  return (
    <div className="elements__like-span">
      <button
        className={`elements__grid-vector ${
          isLiked ? "elements__grid-vector_active" : ""
        }`}
        type="button"
        onClick={handleCardLike}
      ></button>
      <span className="elements__counter">{counter}</span>
    </div>
  );
}
