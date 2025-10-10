import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import Map from "./../components/Map.jsx";
import { useState, useEffect, useContext } from "react";
import './../../../styles/mainpage.css'
import footIcon from './../../../assets/images/foot.png'
import repeatIcon from './../../../assets/images/repeatIcon.png'
import { FaAngleDown as AngleDown, FaRegClock as Clock, FaRegCalendar as Calendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../../../utils/EventContext.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import { apiFetch } from "../../../interceptor/interceptor.jsx";

async function fetchPostalForCity(city, setPostial) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&country=Poland&format=json&addressdetails=1&accept-language=pl`
    );
    const data = await res.json();
    if (data.length > 0 && data[0].address.postcode) {
      setPostial(data[0].address.postcode);
    } else {
      setPostial("");
    }
  } catch (err) {
    console.error("Błąd pobierania kodu pocztowego:", err);
  }
}

function AddEvent1() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [showFormatted, setShowFormatted] = useState(false);
  const isPremium = true;
  const [repeatable, setRepeatable] = useState(true);
  const [repeatType, setRepeatType] = useState("everyDay");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postial, setPostial] = useState("");
  const { eventData, setEventData } = useContext(EventContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isPremium && repeatable){
      setRepeatable(false);
    }
  }, [isPremium, repeatable])

  useEffect(() => {
  const getCategories = async () => {
    try {
      const res = await apiFetch(`${BASE_URL}${ENDPOINTS.eventCategoryList}`);
      console.log("status:", res.status);
      
      const data = await res.json();
      console.log("Dane kategorii:", data);

      setCategories(data.results || data || []);
    } catch (err) {
      console.error(err);
    }
  };
  getCategories();
}, []);


  const formatted = date
    ? new Date(date).toLocaleDateString("pl-PL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
  const days = ["w niedzielę", 
                "w poniedziałek", 
                "w wtorek", 
                "w środę", 
                "w czwartek", 
                "w piątek", 
                "w sobotę"];

  const nextStage = () => {
    setEventData({
      ...eventData,
      title,
      category,
      shortDesc,
      longDesc,
      date,
      time,
      duration,
      city,
      street,
      postial,
    });

    navigate('/events/add-event/2/');
  }

  return (
    <>
      <NavBar route="Eventy / Tworzenie Eventu" title="Tworzenie Eventu" />
      <SideBar />
      <main className="events-main">
        <div className="main-events-container">
          <div className="steps">
            <div className="step active"><span>1. Najważniejsze informacje</span></div>
            <div className="step"><span>2. Szczegóły wydarzenia</span></div>
          </div>
          <div className="event-inputs">
            <div className="box-for-2-boxes">
              <div className="event-input-box">
                <h2 className="event-input-box-title">
                  <span className="num-icon">1</span>
                  Tytuł wydarzenia
                </h2>
                <input 
                  type="text" 
                  id="event-title-input" 
                  className="event-props-input" 
                  placeholder="Tytuł" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="event-input-box">
                <h2 className="event-input-box-title">
                  <span className="num-icon">2</span>
                  Kategoria
                </h2>
                <div className="select-wrapper">
                  <img src={footIcon} alt="Foot" className="foot-img" />
                  <select 
                    className="event-category-select" 
                    id="eventCategorySelect"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="">Wybierz kategorię</option>
                    {categories.length > 0 ? (
                      categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Ładowanie...</option>
                    )}
                  </select>
                  <AngleDown className="event-category-select-arrow" />
                </div>
              </div>
            </div>
            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon">3</span>
                Mały opis
                <span className="info-icon">&#9432;</span>
              </h2>
              <textarea
                id="event-small-desc-input" 
                className="event-props-input" 
                maxLength={200} 
                placeholder="Mały opis"
                value={shortDesc}
                onChange={e => setShortDesc(e.target.value)}
              />
            </div>
            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon">4</span>
                Duży opis
                <span className="info-icon">&#9432;</span>
              </h2>
              <textarea
                id="event-big-desc-input" 
                className="event-props-input" 
                maxLength={400} 
                placeholder="Duży opis"
                value={longDesc}
                onChange={e => setLongDesc(e.target.value)}
              />
            </div>
            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon">5</span>
                Data wydarzenia
              </h2>
              <div className="first-row">
                <div className="time-input-container">
                  <span className="event-props-label">Czas trwania</span>
                  <div className="time-input-box">
                    <Clock className="event-icon icon" />
                    <select 
                      className="event-time-select" 
                      id="eventTimeSelect"
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                    >
                      <option value={60}>60 min</option>
                      <option value={90}>90 min</option>
                      <option value={120}>120 min</option>
                      <option value={150}>150 min</option>
                      <option value={180}>180 min</option>
                    </select>
                    <AngleDown className="event-time-select-arrow" />
                  </div>
                </div>
                <div className="date-input-container">
                  <span className="event-props-label">Data wydarzenia</span>
                  <div className="time-input-box">
                    <Calendar className="event-icon icon" />
                    <input
                      type={showFormatted ? "text" : "date"}
                      value={showFormatted ? formatted.toString().slice(0, 1).toUpperCase() + formatted.toString().slice(1) : date}
                      readOnly={showFormatted}
                      onChange={(e) => setDate(e.target.value)}
                      onBlur={() => {
                        if(date) setShowFormatted(true);
                      }}
                      onFocus={() => {
                        setShowFormatted(false);
                      }}
                      className="event-props-input"
                      id="event-date-input"
                    />
                  </div>
                </div>
                <div className="time-input-container">
                  <span className="event-props-label">Godzina</span>
                  <div className="time-input-box">
                    <input 
                      type="time" 
                      className="event-props-input" 
                      id="event-hour-input" 
                      value={time}
                      onChange={e => setTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* 🔹 tu wraca sekcja powtarzalności */}
              <div className="second-row">
                {
                  isPremium ?
                  <div className="repeat-q-box">
                    <h2 className="repeat-q-text">Powtarzalne?</h2>
                    <div className="repeat-q-buttons">
                      <button id="rb1" className={repeatable ? "rpt-selected" : ""} onClick={(e) => setRepeatable(true)}>TAK</button>
                      <button id="rb2" className={repeatable ? "" : "rpt-selected"} onClick={(e) => setRepeatable(false)}>NIE</button>
                    </div>
                  </div>
                  :
                  <div className="repeat-q-box opacity-down">
                    <h2 className="repeat-q-text" style={{opacity: .5}}>Powtarzalne?</h2>
                    <div className="repeat-q-buttons" style={{opacity: .5}}>
                      <button id="rb1">TAK</button>
                      <button id="rb2" className="rpt-selected" >NIE</button>
                    </div>
                    <div className="opacity-down-popup">
                      <p>Tylko dla użytkowników Premium!</p>
                    </div>
                  </div>
                }
              </div>

              {/* 🔹 TU była zniknięta sekcja — teraz przywrócona */}
              <div className="third-row">
                {
                  repeatable ? 
                  <>
                    <div className="repeatable-selects-container">
                      <span className="event-props-label">Powtarzaj</span>
                      <div className="repeatable-selects-box">
                        <img src={repeatIcon} alt="repeaticon" className="repeatIcon" />
                        <select
                          className="event-props-input"
                          id="rp-select1"
                          value={repeatType}
                          onChange={(e) => setRepeatType(e.target.value)}
                        >
                          <option value="everyDay">Codziennie</option>
                          <option value="everyWeek">
                            Każdego tygodnia {date ? days[new Date(date).getDay()] : ""}
                          </option>
                          <option value="everyMonth">Każdego miesiąca</option>
                          <option value="everyYear">Każdego roku</option>
                        </select>
                        <AngleDown className="event-time-select-arrow"/>
                      </div>
                    </div>
                    <div className="rp-frequenacy-container">
                      <span className="event-props-label">Zakończ powtarzanie</span>
                      <div className="rp-freq-box">
                        <select className="event-props-input" id="rp-freq-select">
                          <option>Nigdy</option>
                          <option>Za 3 dni</option>
                          <option>Za tydzień</option>
                          <option>Za miesiąc</option>
                          <option>Za rok</option>
                        </select>
                        <AngleDown className="event-time-select-arrow"/>
                      </div>
                    </div>
                  </>
                  :
                  null
                }
              </div>
            </div>

            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon">6</span>
                Lokalizacja wydarzenia
              </h2>
              <div className="location-row">
                <div className="time-input-container">
                  <span className="event-props-label">Wybierz miasto</span>
                  <div className="time-input-box">
                    <select
                      className="event-time-select"
                      id="eventCitySelect"
                      value={city}
                      onChange={async (e) => {
                        const selectedCity = e.target.value;
                        setCity(selectedCity);
                        await fetchPostalForCity(selectedCity, setPostial);
                      }}
                    >
                      <option value="">Wybierz</option>
                      <option value="Warszawa">Warszawa</option>
                      <option value="Sosnowiec">Sosnowiec</option>
                      <option value="Dąbrowa Górnicza">Dąbrowa Górnicza</option>
                      <option value="Katowice">Katowice</option>
                      <option value="Będzin">Będzin</option>
                      <option value="Bytom">Bytom</option>
                    </select>
                    <AngleDown className="event-time-select-arrow" />
                  </div>
                </div>
                <div className="street-input-container">
                  <span className="event-props-label">Ulica</span>
                  <div className="time-input-box">
                    <input
                      className="event-props-input"
                      id="eventStreetInput"
                      placeholder="Ulica"
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                    />
                  </div>
                </div>
                <div className="postial-input-container">
                  <span className="event-props-label">Kod pocztowy</span>
                  <div className="time-input-box">
                    <input
                      type="text"
                      className="event-props-input"
                      id="eventPostialInput"
                      placeholder="00-000"
                      value={postial}
                      onChange={e => setPostial(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="map-row">
                <Map 
                  city={city} 
                  street={street} 
                  postial={postial} 
                  setCity={setCity} 
                  setStreet={setStreet} 
                  setPostial={setPostial} 
                />  
              </div>
            </div>
          </div>
          <div className="next-btn-box">
            <button className="next-stage" onClick={nextStage}>Następny etap</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddEvent1;
