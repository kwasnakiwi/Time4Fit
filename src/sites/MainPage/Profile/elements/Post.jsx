import "./../../../../styles/profile.css";
import addIcon from "./../../../../assets/images/add-icon.png";
import like from "./../../../../assets/images/like.png";
import { useState } from "react";
import PostPopup from "./PostPopup.jsx";
import { createPortal } from "react-dom";

function Post({
  id,
  title,
  desc,
  pfpImage,
  name,
  surname,
  date,
  images,
  likes,
  handleRemovePost,
}) {
  const [showPostPupup, setShowPostPopup] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };


  return (
    <>
      {showPostPupup &&
        createPortal(
          <PostPopup
            pfpImage={pfpImage}
            images={images}
            name={name}
            surname={surname}
            date={date}
            title={title}
            desc={desc}
            likes={likes}
            setShowPostPopup={setShowPostPopup}
          />,
          document.body,
        )}
      <div
        className="post"
        onClick={() => {
          if (!isDeleteHovered) setShowPostPopup(true);
        }}
      >
        <img className="post-img2" src={images[0].image} alt="" />
        <div className="post-content">
          <div className="post-profile-box">
            <img src={pfpImage} alt="" className="post-pfp" />
            <div className="post-pfp-text">
              <span className="post-pfp-name">
                {name} {surname}
              </span>
              <span className="post-date">{formatDate(date)}</span>
            </div>
          </div>
          <div className="post-text-box">
            <h4 className="post-title">{title || "Brak tytułu"}</h4>
            <p className="post-desc">
              {desc.slice(0, 130) + (desc.length > 130 ? "..." : "") ||
                "Brak opisu"}
              {desc.length > 130 && (
                <span
                  style={{
                    color: "var(--primary-orange)",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  &nbsp;Czytaj więcej
                </span>
              )}
            </p>
          </div>
          <hr className="post-line" />
          <span className="post-likes">
            <img src={like} alt="" /> {likes}
          </span>
          <button
            onClick={() => handleRemovePost(id)}
            className="edit-pr-action-btn post"
            onMouseOver={() => setIsDeleteHovered(true)}
            onMouseOut={() => setIsDeleteHovered(false)}
          >
            Usuń
            <img src={addIcon} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Post;
