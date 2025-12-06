import { useState } from "react";
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
import pfp from './../../../assets/images/pfp2.png';
import ach1 from './../../../assets/images/ach1.png';
import ach2 from './../../../assets/images/ach2.png';
import ach3 from './../../../assets/images/ach3.png';
import ach4 from './../../../assets/images/ach4.png';
import pr1 from './../../../assets/images/pr-icon1.png';
import pr2 from './../../../assets/images/pr-icon2.png';
import pr3 from './../../../assets/images/pr-icon3.png';
import pr4 from './../../../assets/images/pr-icon4.png';
import certificate from './../../../assets/images/certificate.png';
import recClock from './../../../assets/images/rec-clock.png';
import recLoc from './../../../assets/images/rec-loc.png';
import recPeople from './../../../assets/images/rec-people.png';
import editIcon from './../../../assets/images/edit-icon.png';
import addIcon from './../../../assets/images/add-icon.png';
import { FaRegFlag as Flag,
         FaRegEye as Eye,
         FaRegEnvelope as Envelope,
         FaPhoneAlt as Phone,
         FaArrowRight as Arrow } from "react-icons/fa";
import { Link } from "react-router-dom";


function EditProfile(){
  const [selected, setSelected] = useState("profile");

  return(
    <>
      <NavBar title="Profil" route="Ustawienia konta / Profil" linkRoute="/strona-glowna"/>
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
                <li className={selected == "place" ? "pr-side-selected" : ""}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "place" ? clPrSide1 : prSide6} />
                  </div>
                  Placówka
                </li>
                <li className={selected == "event" ? "pr-side-selected" : ""}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "event" ? clPrSide1 : prSide7} />
                  </div>
                  Eventy
                </li>
              </ul>
            </section>
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title">Funkcje premium</h2>
              </div>
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
                  <hr className="certificates-line" />
                </div>
                <button className="edit-pr-action-btn">
                  Dodaj
                  <img src={addIcon} id="act2" />
                </button>
              </div>
              <div className="profile-panel pr-events" style={{gridArea: 'events'}}>
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
          </div>
        }
        {selected == "data" &&
          <h1>TYR TO CWEL</h1>
        }
      </main>
    </>
  )
}

export default EditProfile