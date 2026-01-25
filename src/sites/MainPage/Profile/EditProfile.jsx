import { useContext, useEffect, useState } from "react";

import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/profile.css';
import './../../../styles/components.css';

import prSide1 from './../../../assets/images/pr-side1.png';
import prSide2 from './../../../assets/images/pr-side2.png';
import prSide3 from './../../../assets/images/pr-side3.png';
import prSide4 from './../../../assets/images/pr-side4.png';
import prSide5 from './../../../assets/images/pr-side5.png';
import prSide6 from './../../../assets/images/pr-side6.png';
import prSide7 from './../../../assets/images/pr-side7.png';
import clPrSide1 from './../../../assets/images/cl-pr-side1.png';
import clPrSide2 from './../../../assets/images/cl-pr-side2.png';
import clPrSide3 from './../../../assets/images/cl-pr-side3.png';
import clPrSide4 from './../../../assets/images/cl-pr-side4.png';
import clPrSide5 from './../../../assets/images/cl-pr-side5.png';
import clPrSide6 from './../../../assets/images/cl-pr-side6.png';
import clPrSide7 from './../../../assets/images/cl-pr-side7.png';
import pfp from './../../../assets/images/pfp2.png';
import ach1 from './../../../assets/images/ach1.png';
import ach2 from './../../../assets/images/ach2.png';
import ach3 from './../../../assets/images/ach3.png';
import ach4 from './../../../assets/images/ach4.png';
import pr1 from './../../../assets/images/pr-icon1.png';
import pr2 from './../../../assets/images/pr-icon2.png';
import pr3 from './../../../assets/images/pr-icon3.png';
import certificate from './../../../assets/images/certificate.png';
import editIcon from './../../../assets/images/edit-icon.png';
import addIcon from './../../../assets/images/add-icon.png';
import circlePfp from './../../../assets/images/circle-pfp.png';
import editIcon2 from './../../../assets/images/edit-icon2.png';
import placeChoice1 from './../../../assets/images/p-choice1.png';
import placeChoice2 from './../../../assets/images/p-choice2.png';
import orPlaceChoice1 from './../../../assets/images/or-p-choice1.png';
import orPlaceChoice2 from './../../../assets/images/or-p-choice2.png';

import empty from './../../../assets/images/eventImg.png'

import { FaRegFlag as Flag,
         FaRegEye as Eye,
         FaRegEnvelope as Envelope,
         FaPhoneAlt as Phone,
         FaArrowRight as Arrow } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import pr4 from './../../../assets/images/pr-icon4.png';
import recClock from './../../../assets/images/rec-clock.png';
import recLoc from './../../../assets/images/rec-loc.png';
import recPeople from './../../../assets/images/rec-people.png';
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";

import { BiX as XMark } from "react-icons/bi";
import plus from "./../../../assets/images/+.png"
import popup1 from "./../../../assets/images/popup1.png"
import { UserContext } from "../../../utils/UserContext.jsx";


function EditProfile(){
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({})
  const [selected, setSelected] = useState("data");
  const [placeType, setPlaceType] = useState(null);
  const [mediaType, setMediaType] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [showCerPopup, setShowCerPopup] = useState(false);
  const [cerTitle, setCerTitle] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [cerIdentificator, setCerIdentificator] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [cerImages, setCerImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try{
        const response = await apiFetch(`${BASE_URL}${ENDPOINTS.settings}`);

        let data;
        try{
          data = await response.json();
        }
        catch{
          data = null;
        }

        if(!response.ok){
          throw new Error(data?.error);
        }

        setUserData(data || {});
        console.log("settings:", data);
      }
      catch(err){
        console.error(err);
      }
    }

    getUserData();
  }, [])

  useEffect(() => {
    const getProfileInfo = async () => {
      if(selected === "profile"){
        try{
          const response = await apiFetch(`
              ${BASE_URL}${ENDPOINTS.trainerFullProfile}${userData?.trainer_id}/
            `)
          
          let data;
          try{
            data = await response.json();
          }
          catch{
            data = null;
          }

          if(!response.ok){
            throw new Error(data?.error);
          }

          console.log("profil:", data);
          setProfileData(data || {});
        }
        catch(err){
          console.error(err);
        }
      }
    }

    getProfileInfo();
  }, [selected])

  const advancedLevels = {
    beginner: "Początkujący",
    "semi-advanced": "Średniozaawansowany",
    advanced: "Zaawansowany",
    none: "Brak"
  }

  const { me, refetchMe } = useContext(UserContext);

  return(
    <>
      {showCerPopup &&
        <>
          <div className="code-popup-overlay" onClick={() => setShowCerPopup(false)} />
          <div className="code-popup">
            <div className="code-popup-heading evd">
              <div className="popup1-box"><img src={popup1} alt="" /></div>
              <div>
                <h3>Dyplomy i certyfikaty</h3>
                <p>Dodaj nowe osiągnięcie</p>
                <XMark 
                  className="code-x" 
                  style={{cursor: "pointer"}} 
                  onClick={e => setShowCerPopup(false)}
                />
              </div>
            </div>
            <div className="code-content">
              <span className="settings-text"><img src={plus} alt="settings" /> Ustawienia zaproszenia</span>
              <div className="code-switch">
                <span>Kod jednorazowy</span>
                <div className="switches">
                  <button 
                    className={`switch-button`}
                    onClick={e => e.target.value}
                  >
                    TAK
                  </button>
                  <button 
                    className={`switch-button s2`}
                    onClick={e => e.target.value}
                  >
                    NIE
                  </button>
                </div>
              </div>
              <div className="code-switch">
                <span>Kod jest aktywny?</span>
                <div className="switches">
                  <button 
                    className={`switch-button s1`}
                    onClick={e => e.target.value}
                  >
                    TAK
                  </button>
                  <button 
                    className={`switch-button s2`}
                    onClick={e => e.target.value}
                  >
                    NIE
                  </button>
                </div>
              </div>
            </div>
            <hr className="code-popup-line" />
            <div className="code-popup-btns">
              <button 
                className="code-popup-btn cancel"
                onClick={e => setShowCerPopup(false)}
              >
                Anuluj
              </button>
              <button 
                className="code-popup-btn add"
                onClick={e => e.target.value}
              >
                Dodaj
              </button>
            </div>
          </div>
        </>
      }
      <NavBar title="Ustawienia konta" route="Ustawienia konta" linkRoute="/strona-glowna"/>
      <SideBar />
      <main className="home-page-container profile-edit-container">
        <div className="profile-edit-side">
          <nav className="profile-side-container">
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title">Użytkownik</h2>
              </div>
              <ul className="pr-side-part-list">
                
                <li className={selected == "data" ? "pr-side-selected" : ""} onClick={() => setSelected("data")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "data" ? clPrSide2 : prSide2} />
                  </div>
                  Dane użytkownika
                </li>
                <li className={selected == "safety" ? "pr-side-selected" : ""} onClick={() => setSelected("safety")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "safety" ? clPrSide3 : prSide3} />
                  </div>
                  Bezpieczeństwo
                </li>
                <li className={selected == "notifications" ? "pr-side-selected" : ""} onClick={() => setSelected("notifications")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "notifications" ? clPrSide4 : prSide4} />
                  </div>
                  Powiadomienia
                </li>
                <li className={selected == "payments" ? "pr-side-selected" : ""} onClick={() => setSelected("payments")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "payments" ? clPrSide5 : prSide5} />
                  </div>
                  Płatności
                </li>
              </ul>
            </section>
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title">Tworzenie</h2>
              </div>
              <ul className="pr-side-part-list">
                <li className={selected == "place" ? "pr-side-selected" : ""} onClick={() => setSelected("place")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "place" ? clPrSide6 : prSide6} />
                  </div>
                  Placówka
                </li>
                <li className={selected == "event" ? "pr-side-selected" : ""} onClick={() => setSelected("event")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "event" ? clPrSide7 : prSide7} />
                  </div>
                  Eventy
                </li>
              </ul>
            </section>
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title biz">Funkcje biznes</h2>
              </div>
               <ul className="pr-side-part-list">
                <li className={selected == "profile" ? "pr-side-selected" : ""} onClick={() => { !userData.is_trainer ? navigate("/profil/edycja/stworz-profil-trenera") : setSelected("profile") }}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "profile" ? clPrSide1 : prSide1} />
                  </div>
                  {userData.is_trainer ? "Mój trener" : "Jestem trenerem"}
                </li>
                <li onClick={() => setSelected("place")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "event" ? clPrSide7 : prSide7} />
                  </div>
                  Jestem placówką
                </li>
              </ul>
            </section>
          </nav>
        </div>
        {selected == "profile" &&
          <div className="profile">
            <section className="profile-main">
              <div className="profile-panel" style={{gridArea: 'main'}}>
                <div className="profile-pr-panel-1row">
                  <div className="pfp-site">
                    <img className="pr-img-pfp" src={profileData?.img_profile} alt="Zdjęcie profilowe" />
                    <div className="pfp-site-text">
                      <h2 className="pfp-site-name">{profileData?.profile?.name} {profileData?.profile?.surname}</h2>
                      <span className="pfp-site-work">Trener</span>
                    </div>
                  </div>
                  <div className="profile-pr-panel-btns">
                    <button className="pr-panel-btn views"><Eye /></button>
                    <button className="pr-panel-btn report"><Flag /></button>
                  </div>
                </div>
                <div className="profile-pr-panel-2row">
                  <div className="pr-panel-contact-item">
                    <div className="pr-panel-contact-icon" id="cyan"><Phone /></div>
                    <div className="pr-panel-contact-text">
                      <span className="contact-text-title">Nr. telefonu</span><br />
                      <span className="contact-text-value">{profileData?.phone_business}</span>
                    </div>
                  </div>
                  <div className="pr-panel-contact-item">
                    <div className="pr-panel-contact-icon" id="blue"><Envelope /></div>
                    <div className="pr-panel-contact-text">
                      <span className="contact-text-title">Adres E-mail</span><br />
                      <span className="contact-text-value">{profileData?.business_email}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'classes'}}>
                <div className="ach-box" id="blue"><img src={ach1} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Odbyte zajęcia</span><br />
                  <span className="contact-text-value">{profileData?.event_past}</span>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'type'}}>
                <div className="ach-box" id="purple"><img src={ach2} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Prowadzi</span><br />
                  <span className="contact-text-value">{profileData?.pick_specialization}</span>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'rating'}}>
                <div className="ach-box" id="gold"><img src={ach3} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Ocena</span><br />
                  <span className="contact-text-value">{profileData?.rate_avg || "0.0"}</span>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'joined'}}>
                <div className="ach-box" id="green"><img src={ach4} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Obserwujący</span><br />
                  <span className="contact-text-value">{profileData?.followers_count}</span>
                </div>
              </div>
            </section>
            <section className="profile-second">
              <div className="profile-panel" style={{gridArea: 'desc'}}>
                <h2 className="recomendation-title">
                  <img src={pr1} alt="zdj" id="pr1" />
                  Opis profilu
                </h2>
                <p className="profile-desc">
                  {profileData?.description}
                </p>
                <button className="edit-pr-action-btn">
                  Edytuj 
                  <img src={editIcon} />
                </button>
              </div>
              <div className="profile-panel" style={{gridArea: 'list'}}>
                <h2 className="recomendation-title">
                  <img src={pr2} alt="zdj" id="pr2" />
                  Specjalizacje
                </h2>
                <ul className="profile-list">
                  {profileData?.specializations}
                </ul>
                <button className="edit-pr-action-btn">
                  Edytuj 
                  <img src={editIcon} />
                </button>
              </div>
              <div className="profile-panel" style={{gridArea: 'awards'}}>
                <h2 className="recomendation-title">
                  <img src={pr3} alt="zdj" id="pr3" />
                  Certyfikaty i dyplomy
                </h2>
                <div className="certificates">
                  {profileData?.certificates?.map((cer, i) => (
                    <div key={i} className="certificate">
                      <h3 className="cer-title">Certyfikat z ukończenia szkolenia:</h3>
                      <h4 className="cer-name">
                        {cer.title}
                      </h4>
                      <span className="cer-place-info">{cer.issued_by}</span><br />
                      <span className="cer-more-info">Issued {cer.issued_date}</span><br />
                      <span className="cer-more-info">Identyfikator poświadczenia {cer.identyficatior}</span><br />
                      <img src={certificate} className="cer-img" alt="Certyfikat" />
                    </div>
                  ))}
                  {profileData?.certyficates?.length === 0 && <h3 className="no-trainers-text">Brak certyfikatów</h3>}
                </div>
                <button onClick={() => setShowCerPopup(true)} className="edit-pr-action-btn">
                  Dodaj
                  <img src={addIcon} id="act2" />
                </button>
              </div>
              <div className="profile-panel" style={{gridArea: 'events'}}>
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

                  return(
                    <div key={i} className="rec-event">
                      <div className="rec-event-first-row">
                        <h3 className="rec-event-name">{ev.event_title || "Tytuł"}</h3>
                        <span className="rec-event-price-status">Płatny</span>
                      </div>
                      <div className="rec-event-informations">
                        <span className="rec-event-information">{ev.category_name || "Joga"}</span>
                        <span className="rec-event-information">{ev.additional_info.age_limit}</span>
                        <span className="rec-event-information">{advancedLevels[ev.additional_info.advanced_level]}</span>
                      </div>
                      <div className="rec-event-more-info-wrapper">
                        <div className="rec-event-more-info">
                          <ul className="rec-event-more-info-list">
                            <li><img src={recClock} /> {formattedDate}</li>
                            <li><img src={recLoc} /> {ev.city}, {ev.street}</li>
                            <li><img src={recPeople} /> {ev.available_places} miejsc</li>
                          </ul>
                        </div>
                        <button onClick={() => navigate(`/eventy/${ev.id}`)} className="rec-event-show-details-btn">Zobacz szczegóły <Arrow /></button>
                      </div>
                    </div>
                  )
                })}
                {profileData?.events?.length === 0 && <h3 className="no-trainers-text">Brak wydarzeń</h3>}
              </div>
            </div>
          </section>
          <section className="profile-media">
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
                  {mediaType === "posts" &&
                    <div className="posts-box">
                      <div onClick={() => alert("dodano")} className="add-post-box">
                        <span>+</span>
                      </div>
                      <div className="posts">
                        {profileData?.posts?.map((post, i) => (
                          <div key={i} className="post">
                            <img src={post.images[0].image || empty} alt="post-image" className="post-img" />
                          </div>
                        ))}
                        {profileData?.posts?.length === 0 && <h3 className="no-trainers-text">Brak postów, stwórz nowy!</h3>}
                      </div>
                    </div>
                  }
                  {mediaType === "albums" &&
                    <div className="images-box">
                      <div onClick={() => alert("dodano")} className="add-post-box image">
                        <span>+</span>
                      </div>
                      <div className="pr-images">
                        {albums.map((img, i) => (
                          <div key={i} className="pr-image">
                            <img src={img.img || empty} alt="img-image" className="img-img" />
                          </div>
                        ))}
                        {albums.length === 0 && <h3 className="no-trainers-text">Brak albumów, stwórz nowy!</h3>}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
        }
        {selected == "data" &&
          <div className="profile-user-data">
            <section className="user-data-panel ud-pfp">
              <div className="user-data-pfp-wrapper">
                <img src={circlePfp} alt="Zdjęcie profilowe" />
                <div className="change-pfp-icon"><img src={editIcon2} /></div>
              </div>
              <div className="ud-user-name-box">
                <h2 className="ud-user-name">{userData.name} {userData.surname}</h2>
                <span className="ud-user-status">{!me?.subscription ? "Użytkownik" : me.subscription.plan_name}</span>
              </div>
            </section>
            <section className="user-data-panel ud-with-content">
              <div className="ud-container">
                <h3 className="ud-container-title">Dane podstawowe</h3>
                <div className="user-data-content">
                  <div className="ud-info-box">
                    <span className="ud-info-title">Imię</span><br />
                    <span className="ud-info-value">{userData.name}</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Nazwisko</span><br />
                    <span className="ud-info-value">{userData.surname}</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Płeć</span><br />
                    <span className="ud-info-value">{userData.sex !== "none" ? userData.sex : "Nie podano"}</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Data urodzenia</span><br />
                    <span className="ud-info-value">{userData.birth_day || "Nie podano"}</span>
                  </div>
                </div>
                <button className="edit-pr-action-btn">
                  Edytuj 
                  <img src={editIcon} />
                </button>
              </div>
            </section>
            <section className="user-data-panel ud-with-content">
              <div className="ud-container">
                <h3 className="ud-container-title">Dane kontaktowe</h3>
                <div className="user-data-content">
                  <div className="ud-info-box">
                    <span className="ud-info-title">E-mail</span><br />
                    <span className="ud-info-value">example123@example.com</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Nr. telefonu</span><br />
                    <span className="ud-info-value">123 456 789</span>
                  </div>
                </div>
                <button className="edit-pr-action-btn">
                  Edytuj 
                  <img src={editIcon} />
                </button>
              </div>
            </section>
          </div>
        }
        {selected == "place" &&
          <div className="place-create-box">
            <div className="cp-title-box">
              <h2 className="cp-title">Twoje miejsce, Twoje zasady</h2>
              <p className="cp-desc">
                Wybierz, w jaki sposób chcesz dodać swoją placówkę — 
                tylko oznacz ją na mapie lub zyskaj pełne możliwości 
                zarządzania nią i wydarzeniami.
              </p>
            </div>
            <div className="place-choice-box">
              <div 
                className={`place-choice ${placeType == "first" ? "selected" : placeType ? "disabled" : ""}`}
                onClick={() => setPlaceType("first")}
              >
                <h3 className="place-choice-title">Pokaż się na mapie</h3>
                <img 
                  src={placeType == "first" ? orPlaceChoice1 : placeType ? placeChoice1 : orPlaceChoice1} 
                  className="place-choice-img" 
                />
                <p className="place-choice-desc">
                  Oznacz swoją lokalizację, aby inni mogli łatwo Cię znaleźć.
                  Idealne, jeśli chcesz po prostu zaznaczyć obecność swojej 
                  placówki bez dodatkowych funkcji zarządzania.
                </p>
                <span className="place-choice-price">Wstępny koszt 29 PLN</span>
              </div>
              <div 
                className={`place-choice ${placeType == "second" ? "selected" : placeType ? "disabled" : ""}`}
                onClick={() => setPlaceType("second")}
              >
                <h3 className="place-choice-title">Prowadź, planuj i działaj</h3>
                <img 
                  src={placeType == "second" ? orPlaceChoice2 : (placeType ? placeChoice2 : orPlaceChoice2)} 
                  className="place-choice-img" 
                />
                <p className="place-choice-desc">
                  Zyskaj pełną kontrolę — twórz wydarzenia, przypisuj trenerów,
                  edytuj informacje i obserwuj aktywność. Dostępne funkcje 
                  zależą od wybranego planu.
                </p>
                <span className="place-choice-price">Wstępny koszt 119 PLN</span>
              </div>
            </div>
            <div className="cp-next-stage-btn-box">
              <button 
                disabled={!placeType} 
                className="cp-ns-btn"
                onClick={() => {
                  placeType == "first" ? 
                    navigate("/placowki/dodawanie-placowki")
                  :
                    navigate("/placowki/wybor-planu")
                }}
              >
                Dalej
              </button>
            </div>
          </div>
        }
      </main>
    </>
  )
}

export default EditProfile