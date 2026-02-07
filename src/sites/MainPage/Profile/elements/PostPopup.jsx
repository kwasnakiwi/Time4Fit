import like from "./../../../../assets/images/like.png";
import "./../../../../styles/popup.css";
import { useEffect } from "react";

function PostPopup({
  pfpImage,
  images,
  name,
  surname,
  date,
  title,
  desc,
  likes,
  setShowPostPopup,
}) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowPostPopup(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        className="post-popup-back-overlay"
        onClick={() => setShowPostPopup(false)}
      />
      <div className="post-popup">
        <img
          className="post-popup-img"
          src={images[0].image}
          alt="post image"
        />
        <div className="post-popup-content">
          <div className="post-popup-profile">
            <img src={pfpImage} alt="PFP" />
            <div className="post-popup-profile-content">
              <span className="name">
                {name} {surname}
              </span>
              <span className="date">{formatDate(date)}</span>
            </div>
          </div>
          <div className="post-popup-text">
            <h2>{title}</h2>
            <p>{desc}</p>
          </div>
          <hr className="post-popup-line" />
          <span className="post-likes">
            <img src={like} alt="" /> {likes}
          </span>
        </div>
      </div>
    </>
  );
}

export default PostPopup;
