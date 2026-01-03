import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import ToTimeForFit from "../Loadings/ToTimeForFit.jsx";
import { useState, useEffect, useContext } from "react";
import './../../../styles/homepage.css'
import { FaSearch as Search, FaArrowRight as Arrow, FaRegClock as Clock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import category from './../../../assets/images/category.png';
import finalCategory from './../../../assets/images/last-category.png';
import rec1 from './../../../assets/images/rec1.png';
import rec2 from './../../../assets/images/rec2.png';
import { BiMap as PinMap } from "react-icons/bi";
import recClock from './../../../assets/images/rec-clock.png';
import recLoc from './../../../assets/images/rec-loc.png';
import recPeople from './../../../assets/images/rec-people.png';
import rec3 from './../../../assets/images/rec3.png';
import ac1 from './../../../assets/images/ac1.png';
import ac2 from './../../../assets/images/ac2.png';
import ac3 from './../../../assets/images/ac3.png';
import ac4 from './../../../assets/images/ac4.png';
import "react-day-picker/style.css";
import Calendar from "../components/Calendar.jsx";

function HomePage() {
  const isLoggedIn = true;
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  }, [])

  if (isLoading) return <ToTimeForFit />

  return(
    <>
      <NavBar route="Home" title="Home" isNotProfileVisible={!isLoggedIn} />
      <SideBar />
      <main className="home-page-container">
        <div className="home-page">
          {!isLoggedIn ?
            <>
              <header className="upper-btns">
                <div className="search-wrapper">
                  <input type="text" placeholder="Wyszukaj" className="search-bar"/>
                  <Search className="search-icon" />
                </div>
                <button onClick={() => navigate('/')} className="log-in-btn">Zaloguj się</button>
              </header>
              <section className="hp-categories-box">
                <h2 className="hp-categories-title">Kategorie</h2>
                <div className="hp-categories">
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={category} alt="Kategoria" />
                    <span className="hp-category-title">Joga</span>
                  </div>
                  <div className="hp-category">
                    <img src={finalCategory} alt="Kategoria" />
                    <span className="hp-category-title">Więcej</span>
                  </div>
                </div>
              </section>
            </>
            :
            <>
              <header className="user-greeting-box">
                <h1 className="user-greeting">Witaj ponownie, Andrzej!</h1>
              </header>
              <section className="user-stats">
                <div className="user-stat">
                  <div className="user-stat-icon" id="orange">
                    <img src={ac1} alt="Ikona aktywności" />
                  </div>
                  <span className="user-stat-name">Eventy w miesiącu</span>
                  <span className="user-stat-value">8</span>
                </div>
                <div className="user-stat">
                  <div className="user-stat-icon" id="purple">
                    <img src={ac2} alt="Ikona aktywności" />
                  </div>
                  <span className="user-stat-name">Aktywne dni w miesiącu</span>
                  <span className="user-stat-value">25</span>
                </div>
                <div className="user-stat">
                  <div className="user-stat-icon" id="blue">
                    <img src={ac3} alt="Ikona aktywności" />
                  </div>
                  <span className="user-stat-name">Godziny przetrenowane</span>
                  <span className="user-stat-value">30</span>
                </div>
                <div className="user-stat">
                  <div className="user-stat-icon" id="green">
                    <img src={ac4} alt="Ikona aktywności" />
                  </div>
                  <span className="user-stat-name">Najczęściej wybierana kategoria</span>
                  <span className="user-stat-value">Joga</span>
                </div>
              </section>
            </>
          }
          <section className={`recomendations ${isLoggedIn ? 'logged-recomendations' : ''}`}>
            {isLoggedIn &&
              <div className="training-plan-container" style={{gridArea: 'plan'}}>
                <h2 className="recomendation-title">
                  <img src={rec3} alt="zdj" />
                  Twój plan treningowy
                </h2>
                <div className="training-plan-content">
                  <Calendar selected={selected} onSelect={setSelected} />
                  <div className="training-plan-items-box">
                    <h3 className="training-plan-items-date">Wtorek, 25 Październik 2025</h3>
                    <div className="training-plan-items">
                      <div className="training-plan-item">
                        <div className="training-plan-item-left">
                          <h4 className="training-plan-item-title">Joga dla zdrowia</h4>
                          <span className="training-plan-item-date">
                            <Clock className="tpi-clock" />
                            <i>14:30</i>
                          </span>
                        </div>
                        <Link to='' className="tp-to-event-btn">Przejdź do wydarzenia</Link>
                      </div>
                      <div className="training-plan-item">
                        <div className="training-plan-item-left">
                          <h4 className="training-plan-item-title">Joga dla zdrowia</h4>
                          <span className="training-plan-item-date">
                            <Clock className="tpi-clock" />
                            <i>14:30</i>
                          </span>
                        </div>
                        <Link to='' className="tp-to-event-btn">Przejdź do wydarzenia</Link>
                      </div>
                      <div className="training-plan-item">
                        <div className="training-plan-item-left">
                          <h4 className="training-plan-item-title">Joga dla zdrowia</h4>
                          <span className="training-plan-item-date">
                            <Clock className="tpi-clock" />
                            <i>14:30</i>
                          </span>
                        </div>
                        <Link to='' className="tp-to-event-btn">Przejdź do wydarzenia</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className="recomended-places-container" style={{gridArea: 'places'}}>
              <h2 className="recomendation-title">
                <img id="ic1" src={rec1} alt="zdj" />
                Polecane miejsca w regionie
              </h2>
              <div className="recomended-places">
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
                <div className="rec-place">
                  <div><h3 className="rec-place-name">My fitnes place</h3></div>
                  <div><span className="rec-place-localization">
                    <PinMap className="rec-loc-icon"/>
                    Katowice, Park Tysiąclecia
                  </span></div>
                  <div><span className="rec-place-type">
                    Siłownia
                  </span></div>
                  <div><Link><button className="go-to-place-btn">Przejdź do placówki <Arrow /></button></Link></div>
                </div>
              </div>
            </div>
            <div className="recomended-events-container" style={{gridArea: 'events'}}>
              <h2 className="recomendation-title">
                <img id="ic2" src={rec2} alt="" />
                Może cię zainteresować
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

export default HomePage