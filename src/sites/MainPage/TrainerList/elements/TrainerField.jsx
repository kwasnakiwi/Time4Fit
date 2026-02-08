import "./../../../../styles/trainerlist.css";
import phone from "./../../../../assets/images/phone.png";
import mail from "./../../../../assets/images/mail.png";
import tr1 from "./../../../../assets/images/tr1.png";
import tr2 from "./../../../../assets/images/tr2.png";
import tr3 from "./../../../../assets/images/tr3.png";
import { useNavigate } from "react-router-dom";

function TrainerField({
  pfpImage,
  name,
  surname,
  specialization,
  eventPast,
  rating,
  followers,
  phoneNumber,
  email,
  trainerId,
}) {
  let isFollowing = false;
  const navigate = useNavigate();

  return (
    <>
      <div className="trainer-field">
        <div className="tf-profile">
          <img src={pfpImage} alt="" />
          <div className="tf-profile-text">
            <span className="name">
              {name} {surname}
            </span>
            <span className="specialization">{specialization}</span>
          </div>
        </div>
        <div className="tf-more-informations">
          <div className="tf-more-info-box">
            <span className="tf-more-info-name">Zajęcia</span>
            <span className="tf-more-info-value blue">
              <img src={tr1} alt="" />
              {eventPast}
            </span>
          </div>
          <div className="tf-more-info-box">
            <span className="tf-more-info-name">Ocena</span>
            <span className="tf-more-info-value yellow">
              <img src={tr2} alt="" />
              {rating}
            </span>
          </div>
          <div className="tf-more-info-box">
            <span className="tf-more-info-name">Obserwujący</span>
            <span className="tf-more-info-value green">
              <img src={tr3} alt="" />
              {followers}
            </span>
          </div>
        </div>
        <div className="tf-contact-info">
          <div className="tf-contact-field">
            <div className="tf-img-box lightblue">
              <img src={phone} alt="" />
            </div>
            <div className="tf-contact-field-text">
              <span className="name">Numer telefonu</span>
              <span className="value">{phoneNumber}</span>
            </div>
          </div>
          <div className="tf-contact-field">
            <div className="tf-img-box darkblue">
              <img src={mail} alt="" />
            </div>
            <div className="tf-contact-field-text">
              <span className="name">Adres E-mail</span>
              <span className="value">{email}</span>
            </div>
          </div>
        </div>
        <div className="tf-buttons">
          <button className={`tf-follow-btn ${isFollowing ? "following" : ""}`}>
            {isFollowing ? "Obserwujesz" : "Obserwuj"}
          </button>
          <button
            className="tf-go-to-trainer-profile"
            onClick={() => navigate(`/lista-trenerow/${trainerId}`)}
          >
            Zobacz profil
          </button>
        </div>
      </div>
    </>
  );
}

export default TrainerField;
