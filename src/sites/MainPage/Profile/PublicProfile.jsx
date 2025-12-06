import { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Success from "../components/popups/Success";
import './../../../styles/profile.css';
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
import { FaRegFlag as Flag,
         FaRegEye as Eye,
         FaRegEnvelope as Envelope,
         FaPhoneAlt as Phone,
         FaArrowRight as Arrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import Warning from "../components/popups/Warning.jsx";
import Error from "../components/popups/Error.jsx";

function PublicProfile(){
  const [showPopup, setShowPopup] = useState(true);

  return(
    <>
      <NavBar title="Profil" route="Ustawienia konta / Profil" linkRoute="/home-page"/>
      <SideBar />
      <main className="home-page-container">
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
                <img src={pr1} alt="zdj" />
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
            </div>
            <div className="profile-panel" style={{gridArea: 'list'}}>
              <h2 className="recomendation-title">
                <img src={pr2} alt="zdj" />
                Specjalizacje
              </h2>
              <ul className="profile-list">
                <li>Redukcja tkanki tłuszczowej</li>
                <li>Budowa masy mięśniowej</li>
                <li>Trening medyczny</li>
                <li>Mobilność i stretching</li>
                <li>Powrót do formy po przerwie</li>
                <li>Trening kobiet po porodzie</li>
                <li>Regeneracja i wyciszenie</li>
              </ul>
            </div>
            <div className="profile-panel" style={{gridArea: 'awards'}}>
              <h2 className="recomendation-title">
                <img src={pr3} alt="zdj" />
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
        </div>
      </main>
    </>
  )
}

export default PublicProfile