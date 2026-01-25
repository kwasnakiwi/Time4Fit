import { useEffect, useState } from "react";

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


function EditProfile(){
  const [selected, setSelected] = useState("data");
  const [placeType, setPlaceType] = useState(null);
  const [mediaType, setMediaType] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [showCerPopup, setShowCerPopup] = useState(false);
  const [cerTitle, setCerTitle] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [cerIdentificator, setCerIdentificator] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [cerImages, setCerImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfileInfo = async () => {
      if(selected === "profile"){
        if(mediaType === "posts"){
          try{
            const response = await apiFetch(`${BASE_URL}${ENDPOINTS.posts}`);
            const data = await response.json();

            if(!response.ok){
              throw new Error(data.details);
            }

            setPosts(data.results || []);
            console.log("posty:", posts)
          }
          catch(err){
            console.error(err);
          }
        }
      }
    }
    getProfileInfo();
  }, [mediaType, selected])


  return(
    <>
      {showCerPopup &&
        <>
          <div className="code-popup-overlay" onClick={() => setShowGenerateCodePopup(false)} />
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
                <li className={selected == "profile" ? "pr-side-selected" : ""} onClick={() => setSelected("profile")}>
                  <div style={{width: "20px", height: "19px"}}>
                    <img src={selected == "profile" ? clPrSide1 : prSide1} />
                  </div>
                  Profil
                </li>
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
                <li className={selected == "place" ? "" : ""} onClick={() => navigate("/profil/edycja/stworz-profil-trenera")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "place" ? clPrSide6 : prSide6} />
                  </div>
                  Jestem trenerem
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
                    <img src={pfp} alt="Zdjęcie profilowe" />
                    <div className="pfp-site-text">
                      <h2 className="pfp-site-name">Andrzej Marek</h2>
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
                      <span className="contact-text-value">123 456 789</span>
                    </div>
                  </div>
                  <div className="pr-panel-contact-item">
                    <div className="pr-panel-contact-icon" id="blue"><Envelope /></div>
                    <div className="pr-panel-contact-text">
                      <span className="contact-text-title">Adres E-mail</span><br />
                      <span className="contact-text-value">a.marek@example.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'classes'}}>
                <div className="ach-box" id="blue"><img src={ach1} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Odbyte zajęcia</span><br />
                  <span className="contact-text-value">42</span>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'type'}}>
                <div className="ach-box" id="purple"><img src={ach2} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Prowadzi</span><br />
                  <span className="contact-text-value">Joga</span>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'rating'}}>
                <div className="ach-box" id="gold"><img src={ach3} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Ocena</span><br />
                  <span className="contact-text-value">4.7</span>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'joined'}}>
                <div className="ach-box" id="green"><img src={ach4} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Dołączył</span><br />
                  <span className="contact-text-value">15.08.2025</span>
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
                  Nazywam się Andrzej i od kilku lat pomagam ludziom odnaleźć więcej 
                  spokoju, elastyczności i lekkości w codziennym życiu. Uczę jogi w 
                  sposób przystępny i uważny — tak, aby każdy mógł praktykować we 
                  własnym tempie i czuć się swobodnie na macie. Łączę elementy pracy 
                  z oddechem, mobilności i technik relaksacyjnych, tworząc zajęcia, 
                  które wzmacniają ciało, ale też wyciszają głowę. Wierzę, że regularna 
                  praktyka potrafi odmienić samopoczucie, dlatego staram się budować 
                  przyjazną, wspierającą atmosferę na każdych zajęciach.
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
                  <li>Redukcja tkanki tłuszczowej</li>
                  <li>Budowa masy mięśniowej</li>
                  <li>Trening medyczny</li>
                  <li>Mobilność i stretching</li>
                  <li>Powrót do formy po przerwie</li>
                  <li>Trening kobiet po porodzie</li>
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
                  <div className="certificate">
                    <h3 className="cer-title">Certyfikat z ukończenia szkolenia:</h3>
                    <h4 className="cer-name">
                      Programowanie SIEMENS SIMATIC S7-1500 w TIA PORTAL poziom 1
                    </h4>
                    <span className="cer-place-info">EMT-Systems Centrum Szkoleń Inżynierskich</span><br />
                    <span className="cer-more-info">Issued wrz 2025</span><br />
                    <span className="cer-more-info">Identyfikator poświadczenia 250/BUR/2025</span><br />
                    <img src={certificate} className="cer-img" alt="Certyfikat" />
                  </div>
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
                <div className="rec-event">
                  <div className="rec-event-first-row">
                    <h3 className="rec-event-name">Joga dla zdrowia</h3>
                    <span className="rec-event-price-status">Płatny</span>
                  </div>
                  <div className="rec-event-informations">
                    <span className="rec-event-information">Joga</span>
                    <span className="rec-event-information">+18</span>
                    <span className="rec-event-information">Średniozaawansowany</span>
                  </div>
                  <div className="rec-event-more-info-wrapper">
                    <div className="rec-event-more-info">
                      <ul className="rec-event-more-info-list">
                        <li><img src={recClock} /> Paź 25, 19:00</li>
                        <li><img src={recLoc} /> Katowice, Park tysiąclecia</li>
                        <li><img src={recPeople} /> 6 miejsc</li>
                      </ul>
                    </div>
                    <Link><button className="rec-event-show-details-btn">Zobacz szczegóły <Arrow /></button></Link>
                  </div>
                </div>
                <div className="rec-event">
                  <div className="rec-event-first-row">
                    <h3 className="rec-event-name">Joga dla zdrowia</h3>
                    <span className="rec-event-price-status">Płatny</span>
                  </div>
                  <div className="rec-event-informations">
                    <span className="rec-event-information">Joga</span>
                    <span className="rec-event-information">+18</span>
                    <span className="rec-event-information">Średniozaawansowany</span>
                  </div>
                  <div className="rec-event-more-info-wrapper">
                    <div className="rec-event-more-info">
                      <ul className="rec-event-more-info-list">
                        <li><img src={recClock} /> Paź 25, 19:00</li>
                        <li><img src={recLoc} /> Katowice, Park tysiąclecia</li>
                        <li><img src={recPeople} /> 6 miejsc</li>
                      </ul>
                    </div>
                    <Link><button className="rec-event-show-details-btn">Zobacz szczegóły <Arrow /></button></Link>
                  </div>
                </div>
                <div className="rec-event">
                  <div className="rec-event-first-row">
                    <h3 className="rec-event-name">Joga dla zdrowia</h3>
                    <span className="rec-event-price-status">Płatny</span>
                  </div>
                  <div className="rec-event-informations">
                    <span className="rec-event-information">Joga</span>
                    <span className="rec-event-information">+18</span>
                    <span className="rec-event-information">Średniozaawansowany</span>
                  </div>
                  <div className="rec-event-more-info-wrapper">
                    <div className="rec-event-more-info">
                      <ul className="rec-event-more-info-list">
                        <li><img src={recClock} /> Paź 25, 19:00</li>
                        <li><img src={recLoc} /> Katowice, Park tysiąclecia</li>
                        <li><img src={recPeople} /> 6 miejsc</li>
                      </ul>
                    </div>
                    <Link><button className="rec-event-show-details-btn">Zobacz szczegóły <Arrow /></button></Link>
                  </div>
                </div>
                <div className="rec-event">
                  <div className="rec-event-first-row">
                    <h3 className="rec-event-name">Joga dla zdrowia</h3>
                    <span className="rec-event-price-status">Płatny</span>
                  </div>
                  <div className="rec-event-informations">
                    <span className="rec-event-information">Joga</span>
                    <span className="rec-event-information">+18</span>
                    <span className="rec-event-information">Średniozaawansowany</span>
                  </div>
                  <div className="rec-event-more-info-wrapper">
                    <div className="rec-event-more-info">
                      <ul className="rec-event-more-info-list">
                        <li><img src={recClock} /> Paź 25, 19:00</li>
                        <li><img src={recLoc} /> Katowice, Park tysiąclecia</li>
                        <li><img src={recPeople} /> 6 miejsc</li>
                      </ul>
                    </div>
                    <Link><button className="rec-event-show-details-btn">Zobacz szczegóły <Arrow /></button></Link>
                  </div>
                </div>
                <div className="rec-event">
                  <div className="rec-event-first-row">
                    <h3 className="rec-event-name">Joga dla zdrowia</h3>
                    <span className="rec-event-price-status">Płatny</span>
                  </div>
                  <div className="rec-event-informations">
                    <span className="rec-event-information">Joga</span>
                    <span className="rec-event-information">+18</span>
                    <span className="rec-event-information">Średniozaawansowany</span>
                  </div>
                  <div className="rec-event-more-info-wrapper">
                    <div className="rec-event-more-info">
                      <ul className="rec-event-more-info-list">
                        <li><img src={recClock} /> Paź 25, 19:00</li>
                        <li><img src={recLoc} /> Katowice, Park tysiąclecia</li>
                        <li><img src={recPeople} /> 6 miejsc</li>
                      </ul>
                    </div>
                    <Link><button className="rec-event-show-details-btn">Zobacz szczegóły <Arrow /></button></Link>
                  </div>
                </div>
                <div className="rec-event">
                  <div className="rec-event-first-row">
                    <h3 className="rec-event-name">Joga dla zdrowia</h3>
                    <span className="rec-event-price-status">Płatny</span>
                  </div>
                  <div className="rec-event-informations">
                    <span className="rec-event-information">Joga</span>
                    <span className="rec-event-information">+18</span>
                    <span className="rec-event-information">Średniozaawansowany</span>
                  </div>
                  <div className="rec-event-more-info-wrapper">
                    <div className="rec-event-more-info">
                      <ul className="rec-event-more-info-list">
                        <li><img src={recClock} /> Paź 25, 19:00</li>
                        <li><img src={recLoc} /> Katowice, Park tysiąclecia</li>
                        <li><img src={recPeople} /> 6 miejsc</li>
                      </ul>
                    </div>
                    <Link><button className="rec-event-show-details-btn">Zobacz szczegóły <Arrow /></button></Link>
                  </div>
                </div>
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
                        {posts.map((post, i) => (
                          <div key={i} className="post">
                            <img src={post.images[0].image || empty} alt="post-image" className="post-img" />
                          </div>
                        ))}
                        {posts.length === 0 && <h3 className="no-trainers-text">Brak postów, stwórz nowy!</h3>}
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
                <h2 className="ud-user-name">Andrzej Marek</h2>
                <span className="ud-user-status">Użytkownik</span>
              </div>
            </section>
            <section className="user-data-panel ud-with-content">
              <div className="ud-container">
                <h3 className="ud-container-title">Dane podstawowe</h3>
                <div className="user-data-content">
                  <div className="ud-info-box">
                    <span className="ud-info-title">Imię</span><br />
                    <span className="ud-info-value">Andrzej</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Nazwisko</span><br />
                    <span className="ud-info-value">Marek</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Płeć</span><br />
                    <span className="ud-info-value">Mężczyzna</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Data urodzenia</span><br />
                    <span className="ud-info-value">15.08.1995</span>
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