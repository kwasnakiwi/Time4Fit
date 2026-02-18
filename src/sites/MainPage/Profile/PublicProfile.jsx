import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Post from "./elements/Post.jsx";
import "./../../../styles/profile.css";
import pfp from "./../../../assets/images/pfp2.png";
import ach1 from "./../../../assets/images/ach1.png";
import ach2 from "./../../../assets/images/ach2.png";
import ach3 from "./../../../assets/images/ach3.png";
import ach4 from "./../../../assets/images/ach4.png";
import pr1 from "./../../../assets/images/pr-icon1.png";
import pr2 from "./../../../assets/images/pr-icon2.png";
import pr3 from "./../../../assets/images/pr-icon3.png";
import pr4 from "./../../../assets/images/pr-icon4.png";
import certificate from "./../../../assets/images/certificate.png";
import recClock from "./../../../assets/images/rec-clock.png";
import recLoc from "./../../../assets/images/rec-loc.png";
import recPeople from "./../../../assets/images/rec-people.png";
import {
  FaRegFlag as Flag,
  FaRegEye as Eye,
  FaRegEnvelope as Envelope,
  FaPhoneAlt as Phone,
  FaArrowRight as Arrow,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import empty from "./../../../assets/images/eventImg.png";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints";

function PublicProfile() {
  const [mediaType, setMediaType] = useState("posts");
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [albums, setAlbums] = useState([]);

  const navigate = useNavigate();
  const { trainerId } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiFetch(`${BASE_URL}${ENDPOINTS.settings}`);

        let data = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error(data?.error);
        }

        setUserData(data);
        console.log("settings:", data);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    getProfileInfo();
  }, [trainerId]);

  const getProfileInfo = async () => {
    try {
      const response = await apiFetch(
        `${BASE_URL}${ENDPOINTS.trainerFullProfile}${trainerId}/`,
      );

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.error);
      }

      setProfileData(data);
      console.log("Profil trenera: ", data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      month: "short",
      year: "numeric",
    });
  };

  const formatDate2 = (date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const levels = {
    beginner: "Początkujący",
    "semi-advanced": "Średniozaawansowany",
    advanced: "Zaawansowany",
    none: "Brak",
  };

  return (
    <>
      <NavBar
        title="Profil"
        route="Ustawienia konta / Profil"
        linkRoute="/strona-glowna"
        isProfileVisible
      />
      <SideBar />
      <main className="home-page-container">
        <div className="profile">
          <section className="profile-main">
            <div className="profile-panel" style={{ gridArea: "main" }}>
              <div className="profile-pr-panel-1row">
                <div className="pfp-site">
                  <img src={profileData?.img_profile} alt="Zdjęcie profilowe" />
                  <div className="pfp-site-text">
                    <h2 className="pfp-site-name">
                      {profileData?.profile?.name}{" "}
                      {profileData?.profile?.surname}
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
              style={{ gridArea: "type" }}
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
                <img src={pr1} alt="zdj" />
                Opis profilu
              </h2>
              <p className="profile-desc">{profileData?.description}</p>
            </div>
            <div className="profile-panel" style={{ gridArea: "list" }}>
              <h2 className="recomendation-title">
                <img src={pr2} alt="zdj" />
                Specjalizacje
              </h2>
              <ul className="profile-list">{profileData?.specializations}</ul>
            </div>
            <div className="profile-panel" style={{ gridArea: "awards" }}>
              <h2 className="recomendation-title">
                <img src={pr3} alt="zdj" />
                Certyfikaty i dyplomy
              </h2>
              <div className="certificates">
                {profileData?.certyficates?.map((cer, i) => (
                  <div key={i} className="certificate">
                    <h3 className="cer-title">
                      Certyfikat z ukończenia szkolenia:
                    </h3>
                    <h4 className="cer-name">{cer.title}</h4>
                    <span className="cer-place-info">{cer.issued_by}</span>
                    <br />
                    <span className="cer-more-info">
                      Issued {formatDate(cer.issued_date)}
                    </span>
                    <br />
                    <span className="cer-more-info">
                      Identyfikator poświadczenia: {cer.identyficatior}
                    </span>
                    <br />
                    {cer.images.map((img, idx) => (
                      <img
                        src={img.image}
                        key={idx}
                        alt="cer"
                        className="cer-img"
                      />
                    ))}
                    <hr className="certificates-line" />
                  </div>
                ))}
                {profileData?.certyficates?.length === 0 && (
                  <h3 className="no-trainers-text">Brak certyfikatów</h3>
                )}
              </div>
            </div>
            <div className="profile-panel" style={{ gridArea: "events" }}>
              <h2 className="recomendation-title">
                <img src={pr4} alt="zdj" />
                Inne prowadzone zajęcia
              </h2>
              <div className="recomended-events">
                {profileData?.events?.map((ev, i) => (
                  <div key={i} className="rec-event">
                    <div className="rec-event-first-row">
                      <h3 className="rec-event-name">{ev.title}</h3>
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
                        {levels[ev.additional_info.advanced_level]}
                      </span>
                    </div>
                    <div className="rec-event-more-info-wrapper">
                      <div className="rec-event-more-info">
                        <ul className="rec-event-more-info-list">
                          <li>
                            <img src={recClock} />{" "}
                            {formatDate2(ev.date_time_event)}
                          </li>
                          <li>
                            <img src={recLoc} /> {ev.city}, {ev.street}
                          </li>
                          <li>
                            <img src={recPeople} /> {ev.available_places} miejsc
                          </li>
                        </ul>
                      </div>
                      <Link>
                        <button className="rec-event-show-details-btn">
                          Zobacz szczegóły <Arrow />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className="profile-media pbl" style={{ gridArea: "medias" }}>
              <div className="profile-panel">
                <h2 className="recomendation-title">
                  <img src={pr3} alt="zdj" id="pr3" />
                  Media
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
                              Brak postów
                            </h3>
                          )}
                        </div>
                      </div>
                    )}
                    {mediaType === "albums" && (
                      <div className="images-box">
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
                              Brak albumów
                            </h3>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}

export default PublicProfile;
