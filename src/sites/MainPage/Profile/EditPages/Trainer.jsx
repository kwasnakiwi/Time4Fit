import "./../../../../styles/profile.css";
import { useState, useContext, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL, ENDPOINTS } from "../../../../utils/Endopoints";
import { UserContext } from "../../../../utils/UserContext";
import Post from "./../elements/Post.jsx";
import ach1 from "./../../../../assets/images/ach1.png";
import ach2 from "./../../../../assets/images/ach2.png";
import ach3 from "./../../../../assets/images/ach3.png";
import ach4 from "./../../../../assets/images/ach4.png";
import pr1 from "./../../../../assets/images/pr-icon1.png";
import pr2 from "./../../../../assets/images/pr-icon2.png";
import pr3 from "./../../../../assets/images/pr-icon3.png";
import editIcon from "./../../../../assets/images/edit-icon.png";
import addIcon from "./../../../../assets/images/add-icon.png";
import {
  FaRegFlag as Flag,
  FaRegEye as Eye,
  FaRegEnvelope as Envelope,
  FaPhoneAlt as Phone,
  FaArrowRight as Arrow,
} from "react-icons/fa";
import pr4 from "./../../../../assets/images/pr-icon4.png";
import recClock from "./../../../../assets/images/rec-clock.png";
import recLoc from "./../../../../assets/images/rec-loc.png";
import recPeople from "./../../../../assets/images/rec-people.png";
import { apiFetch } from "./../../../../interceptor/interceptor.jsx";
import EditProfileModal from "./../elements/EditProfileModal.jsx";
import AddCertyficateModal from "../elements/AddCertyficateModal.jsx";
import Certyficate from "../elements/Certyficate.jsx";
import AddPostModal from "../elements/AddPostModal.jsx";

function Trainer({ trainerId }) {
  const [profileData, setProfileData] = useState({});
  const [mediaType, setMediaType] = useState("posts");
  const [albums, setAlbums] = useState([]);
  const [showCerPopup, setShowCerPopup] = useState(false);
  const [cerTitle, setCerTitle] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [cerIdentificator, setCerIdentificator] = useState("");
  const [issuedDay, setIssuedDay] = useState(null);
  const [issuedMonth, setIssuedMonth] = useState(null);
  const [issuedYear, setIssuedYear] = useState(null);
  const [cerImages, setCerImages] = useState([]);
  const [cerEdit, setCerEdit] = useState(false);
  const [cerEditId, setCerEditId] = useState(null);
  const [pickSpecializationEdit, setPickSpecializationEdit] = useState("");
  const [descEdit, setDescEdit] = useState();
  const [specializationsEdit, setSpecializationEdit] = useState();
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showEditModal1, setShowEditModal1] = useState(false);
  const [showEditModal2, setShowEditModal2] = useState(false);
  const [showEditModal3, setShowEditModal3] = useState(false);
  const navigate = useNavigate();

  const getProfileInfo = async () => {
    try {
      const response = await apiFetch(`
            ${BASE_URL}${ENDPOINTS.trainerFullProfile}${trainerId}/
          `);

      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.error);
      }

      console.log("profil:", data);
      setProfileData(data || {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  const advancedLevels = {
    beginner: "Początkujący",
    "semi-advanced": "Średniozaawansowany",
    advanced: "Zaawansowany",
    none: "Brak",
  };

  return (
    <>
      {showPostPopup &&
        createPortal(
          <AddPostModal
            setShowPostPopup={setShowPostPopup}
            getProfileInfo={getProfileInfo}
          />,
          document.body,
        )}
      {showCerPopup &&
        createPortal(
          <AddCertyficateModal
            getProfileInfo={getProfileInfo}
            setShowPopup={setShowCerPopup}
            cerEdit={cerEdit}
            setCerEdit={setCerEdit}
            setCerEditId={setCerEditId}
            cerEditId={cerEditId}
            setCerTitle={setCerTitle}
            setIssuedBy={setIssuedBy}
            setCerIdentificator={setCerIdentificator}
            setIssuedDay={setIssuedDay}
            setIssuedMonth={setIssuedMonth}
            setIssuedYear={setIssuedYear}
            setCerImages={setCerImages}
            cerTitle={cerTitle}
            issuedBy={issuedBy}
            cerIdentificator={cerIdentificator}
            issuedDay={issuedDay}
            issuedMonth={issuedMonth}
            issuedYear={issuedYear}
            cerImages={cerImages}
          />,
          document.body,
        )}
      {showEditModal1 &&
        createPortal(
          <EditProfileModal
            setShowModal={setShowEditModal1}
            heading="Zmiana prowadzonych zajęć"
            title="Prowadzi"
            type="input"
            value={pickSpecializationEdit}
            setValue={setPickSpecializationEdit}
            maxLength={50}
            trainerId={trainerId}
            field="pick_specialization"
            getProfileInfo={getProfileInfo}
          />,
          document.body,
        )}
      {showEditModal2 &&
        createPortal(
          <EditProfileModal
            setShowModal={setShowEditModal2}
            heading="Zmiana opisu"
            title="Opis"
            type="textarea"
            value={descEdit}
            setValue={setDescEdit}
            maxLength={300}
            trainerId={trainerId}
            field="description"
            getProfileInfo={getProfileInfo}
          />,
          document.body,
        )}
      {showEditModal3 &&
        createPortal(
          <EditProfileModal
            setShowModal={setShowEditModal3}
            heading="Zmiana specjalizacji"
            title="Specializacje"
            type="textarea"
            value={specializationsEdit}
            setValue={setSpecializationEdit}
            maxLength={300}
            trainerId={trainerId}
            field="specializations"
            getProfileInfo={getProfileInfo}
          />,
          document.body,
        )}
      <div className="profile">
        <section className="profile-main">
          <div className="profile-panel" style={{ gridArea: "main" }}>
            <div className="profile-pr-panel-1row">
              <div className="pfp-site">
                <img
                  className="pr-img-pfp"
                  src={profileData?.img_profile}
                  alt="Zdjęcie profilowe"
                />
                <div className="pfp-site-text">
                  <h2 className="pfp-site-name">
                    {profileData?.profile?.name} {profileData?.profile?.surname}
                  </h2>
                  <span className="pfp-site-work">Trener</span>
                </div>
              </div>
              <div className="profile-pr-panel-btns">
                <button className="pr-panel-btn views">
                  <Eye />
                </button>
                <button className="pr-panel-btn report">
                  <Flag />
                </button>
              </div>
            </div>
            <div className="profile-pr-panel-2row">
              <div className="pr-panel-contact-item">
                <div className="pr-panel-contact-icon" id="cyan">
                  <Phone />
                </div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Nr. telefonu</span>
                  <br />
                  <span className="contact-text-value">
                    {profileData?.phone_business}
                  </span>
                </div>
              </div>
              <div className="pr-panel-contact-item">
                <div className="pr-panel-contact-icon" id="blue">
                  <Envelope />
                </div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Adres E-mail</span>
                  <br />
                  <span className="contact-text-value">
                    {profileData?.business_email}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="profile-panel achievement"
            style={{ gridArea: "classes" }}
          >
            <div className="ach-box" id="blue">
              <img src={ach1} alt="ach" />
            </div>
            <div className="pr-panel-contact-text">
              <span className="contact-text-title">Odbyte zajęcia</span>
              <br />
              <span className="contact-text-value">
                {profileData?.event_past}
              </span>
            </div>
          </div>
          <div
            className="profile-panel achievement"
            style={{ gridArea: "type", position: "relative" }}
          >
            <div className="ach-box" id="purple">
              <img src={ach2} alt="ach" />
            </div>
            <div className="pr-panel-contact-text">
              <span className="contact-text-title">Prowadzi</span>
              <br />
              <span className="contact-text-value">
                {profileData?.pick_specialization}
              </span>
            </div>
            <button
              onClick={() => {
                setShowEditModal1(true);
              }}
              style={{ top: "10px" }}
              className="edit-pr-action-btn"
            >
              Edytuj
              <img src={editIcon} />
            </button>
          </div>
          <div
            className="profile-panel achievement"
            style={{ gridArea: "rating" }}
          >
            <div className="ach-box" id="gold">
              <img src={ach3} alt="ach" />
            </div>
            <div className="pr-panel-contact-text">
              <span className="contact-text-title">Ocena</span>
              <br />
              <span className="contact-text-value">
                {profileData?.rate_avg || "-"}
              </span>
            </div>
          </div>
          <div
            className="profile-panel achievement"
            style={{ gridArea: "joined" }}
          >
            <div className="ach-box" id="green">
              <img src={ach4} alt="ach" />
            </div>
            <div className="pr-panel-contact-text">
              <span className="contact-text-title">Obserwujący</span>
              <br />
              <span className="contact-text-value">
                {profileData?.followers_count}
              </span>
            </div>
          </div>
        </section>
        <section className="profile-second">
          <div className="profile-panel" style={{ gridArea: "desc" }}>
            <h2 className="recomendation-title">
              <img src={pr1} alt="zdj" id="pr1" />
              Opis profilu
            </h2>
            <p className="profile-desc">{profileData?.description}</p>
            <button
              onClick={() => setShowEditModal2(true)}
              className="edit-pr-action-btn"
            >
              Edytuj
              <img src={editIcon} />
            </button>
          </div>
          <div className="profile-panel" style={{ gridArea: "list" }}>
            <h2 className="recomendation-title">
              <img src={pr2} alt="zdj" id="pr2" />
              Specjalizacje
            </h2>
            <p className="profile-desc">{profileData?.specializations}</p>
            <button
              onClick={() => setShowEditModal3(true)}
              className="edit-pr-action-btn"
            >
              Edytuj
              <img src={editIcon} />
            </button>
          </div>
          <div className="profile-panel" style={{ gridArea: "awards" }}>
            <h2 className="recomendation-title">
              <img src={pr3} alt="zdj" id="pr3" />
              Certyfikaty i dyplomy
            </h2>
            <div className="certificates">
              {profileData?.certyficates?.map((cer, i) => (
                <Certyficate
                  key={i}
                  cId={cer.id}
                  title={cer.title}
                  issuedBy={cer.issued_by}
                  issuedDate={cer.issued_date}
                  identyficatior={cer.identyficatior}
                  images={cer.images}
                  setCerTitle={setCerTitle}
                  setIssuedBy={setIssuedBy}
                  setCerIdentificator={setCerIdentificator}
                  setIssuedDay={setIssuedDay}
                  setIssuedMonth={setIssuedMonth}
                  setIssuedYear={setIssuedYear}
                  setCerImages={setCerImages}
                  cerEdit={cerEdit}
                  setCerEdit={setCerEdit}
                  setCerEditId={setCerEditId}
                  setShowCerPopup={setShowCerPopup}
                  profileData={profileData}
                  getProfileInfo={getProfileInfo}
                />
              ))}
              {profileData?.certyficates?.length === 0 && (
                <h3 className="no-trainers-text">Brak certyfikatów</h3>
              )}
            </div>
            <button
              onClick={() => setShowCerPopup(true)}
              className="edit-pr-action-btn"
            >
              Dodaj
              <img src={addIcon} id="act2" />
            </button>
          </div>
          <div className="profile-panel" style={{ gridArea: "events" }}>
            <h2 className="recomendation-title">
              <img src={pr4} alt="zdj" />
              Inne prowadzone zajęcia
            </h2>
            <div className="recomended-events">
              {profileData?.events?.map((ev, i) => {
                const date = new Date(ev.date_time_event);
                const formattedDate = date.toLocaleString("pl-PL", {
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div key={i} className="rec-event">
                    <div className="rec-event-first-row">
                      <h3 className="rec-event-name">
                        {ev.title || "Brak tytułu"}
                      </h3>
                      <span
                        className={`rec-event-price-status ${ev.is_free ? "green" : ""}`}
                      >
                        {ev.is_free ? "Bezpłatny" : "Płatny"}
                      </span>
                    </div>
                    <div className="rec-event-informations">
                      <span className="rec-event-information">
                        {ev.category_name || "-"}
                      </span>
                      <span className="rec-event-information">
                        {ev.additional_info.age_limit}
                      </span>
                      <span className="rec-event-information">
                        {advancedLevels[ev.additional_info.advanced_level]}
                      </span>
                    </div>
                    <div className="rec-event-more-info-wrapper">
                      <div className="rec-event-more-info">
                        <ul className="rec-event-more-info-list">
                          <li>
                            <img src={recClock} /> {formattedDate}
                          </li>
                          <li>
                            <img src={recLoc} /> {ev.city}, {ev.street}
                          </li>
                          <li>
                            <img src={recPeople} /> {ev.available_places} miejsc
                          </li>
                        </ul>
                      </div>
                      <button
                        onClick={() => navigate(`/eventy/${ev.id}`)}
                        className="rec-event-show-details-btn"
                      >
                        Zobacz szczegóły <Arrow />
                      </button>
                    </div>
                  </div>
                );
              })}
              {profileData?.events?.length === 0 && (
                <h3 className="no-trainers-text">Brak wydarzeń</h3>
              )}
            </div>
          </div>
          <section className="profile-media" style={{ gridArea: "medias" }}>
            <div className="profile-panel">
              <h2 className="recomendation-title">
                <img src={pr3} alt="zdj" id="pr3" />
                Twoje media
              </h2>
              <div className="medias-container">
                <div className="media-selection">
                  <button
                    className={`media-option ${mediaType === "posts" ? "selected" : ""}`}
                    onClick={() => setMediaType("posts")}
                  >
                    Posty
                  </button>
                  <button
                    className={`media-option ${mediaType === "albums" ? "selected" : ""}`}
                    onClick={() => setMediaType("albums")}
                  >
                    Albumy
                  </button>
                </div>
                <div className="medias">
                  {mediaType === "posts" && (
                    <div className="posts-box">
                      <div
                        onClick={() => setShowPostPopup(true)}
                        className="add-post-box"
                      >
                        <span>+</span>
                      </div>
                      <div
                        className="posts"
                        style={
                          profileData?.posts?.length === 0
                            ? { justifyContent: "center" }
                            : undefined
                        }
                      >
                        {profileData?.posts?.map((post, i) => (
                          <Post
                            key={i}
                            id={post.id}
                            title={post.title || "Brak tytułu"}
                            desc={post.description || "Brak opisu"}
                            pfpImage={profileData?.img_profile}
                            name={profileData?.profile?.name}
                            surname={profileData?.profile?.surname}
                            date={post.date}
                            images={post.images}
                            likes={post.likes}
                            getProfileInfo={getProfileInfo}
                            isCreator={profileData?.is_owner}
                          />
                        ))}
                        {profileData?.posts?.length === 0 && (
                          <h3 className="no-trainers-text">
                            Brak postów, stwórz nowy!
                          </h3>
                        )}
                      </div>
                    </div>
                  )}
                  {mediaType === "albums" && (
                    <div className="images-box">
                      <div
                        onClick={() => alert("dodano")}
                        className="add-post-box image"
                      >
                        <span>+</span>
                      </div>
                      <div className="pr-images">
                        {albums.map((img, i) => (
                          <div key={i} className="pr-image">
                            <img
                              src={img.img}
                              alt="img-image"
                              className="img-img"
                            />
                          </div>
                        ))}
                        {albums.length === 0 && (
                          <h3 className="no-trainers-text">
                            Brak albumów, stwórz nowy!
                          </h3>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <div
            className="profile-panel"
            style={{
              gridArea: "custom",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="edit-pr-action-btn"
              style={{ position: "static" }}
            >
              Dodaj Custom Funkcję
              <img src={addIcon} id="act2" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Trainer;
