import { useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/mainpage.css'
import { FaAngleDown as AngleDown, FaSlidersH as Settings, FaSearch as Search } from "react-icons/fa";
import { BiMap as PinMap } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import eventImg from '../../../assets/images/event.png'
import { useDebounce } from "../../../hooks/useDebounce.js";
function Events(){
  const [events, setEvents] = useState([])
//   {
//     id: 1,
//     title: "Trening biegowy – Przygotowanie do 5 km",
//     short_desc:
//       "Dołącz do wspólnego treningu biegowego, podczas którego popracujesz nad techniką, oddechem i wytrzymałością.",
//     category_name: "Bieganie",
//     date_time_event: "2025-02-05T17:00:00",
//     city: "Katowice",
//     street: "Kościuszki",
//     additional_info: {
//       age_limit: "16+",
//       advanced_level: "semi-advanced", 
//       price: 0,
//       places_for_people_limit: 20,
//     },
//     event_participant_count: 7,
//     event_img: '/src/assets/images/ev1.png',
//     event_route: '/eventy/test'
//   },
//   {
//     id: 2,
//     title: "Fitness funkcjonalny w plenerze",
//     short_desc:
//       "Zajęcia ogólnorozwojowe oparte na naturalnych wzorcach ruchu – cardio + siła.",
//     category_name: "Fitness",
//     date_time_event: "2025-02-06T18:30:00",
//     city: "Sosnowiec",
//     street: "Główna",
//     additional_info: {
//       age_limit: "18+",
//       advanced_level: "none", 
//       price: 20,
//       places_for_people_limit: 25,
//     },
//     event_participant_count: 10,
//     event_img: '/src/assets/images/ev2.png'
//   },
//   {
//     id: 3,
//     title: "Trening siłowy z własną masą ciała",
//     short_desc:
//       "Dynamiczne ćwiczenia typu push-up, plank, przysiady i podskoki.",
//     category_name: "Trening siłowy",
//     date_time_event: "2025-02-07T19:00:00",
//     city: "Katowice",
//     street: "Chorzowska",
//     additional_info: {
//       age_limit: "18+",
//       advanced_level: "beginner", 
//       price: 0,
//       places_for_people_limit: 18,
//     },
//     event_participant_count: 4,
//     event_img: '/src/assets/images/ev3.png'
//   },
//   {
//     id: 4,
//     title: "Jazda na rolkach – technika i koordynacja",
//     short_desc:
//       "Nauka równowagi, hamowania i płynnej jazdy na rolkach.",
//     category_name: "Sporty wrotkarskie",
//     date_time_event: "2025-02-08T15:00:00",
//     city: "Bytom",
//     street: "Parkowa",
//     additional_info: {
//       age_limit: "12+",
//       advanced_level: "beginner",
//       price: 0,
//       places_for_people_limit: 15,
//     },
//     event_participant_count: 6,
//     event_img: '/src/assets/images/ev4.png'
//   },
//   {
//     id: 5,
//     title: "Piłka nożna – sparing amatorski",
//     short_desc:
//       "Luźny mecz dla miłośników piłki. Integracja + zabawa + proste schematy.",
//     category_name: "Piłka nożna",
//     date_time_event: "2025-02-09T20:00:00",
//     city: "Katowice",
//     street: "Sportowa",
//     additional_info: {
//       age_limit: "16+",
//       advanced_level: "advanced", 
//       price: 0,
//       places_for_people_limit: 22,
//     },
//     event_participant_count: 12,
//     event_img: '/src/assets/images/ev5.png'
//   },
//   {
//     id: 6,
//     title: "Trening rowerowy MTB – podstawy",
//     short_desc:
//       "Wprowadzenie do jazdy terenowej, zakręty i pokonywanie przeszkód.",
//     category_name: "Kolarstwo górskie",
//     date_time_event: "2025-02-10T10:00:00",
//     city: "Dąbrowa Górnicza",
//     street: "Leśna",
//     additional_info: {
//       age_limit: "18+",
//       advanced_level: "beginner",
//       price: 30,
//       places_for_people_limit: 12,
//     },
//     event_participant_count: 3,
//     event_img: '/src/assets/images/ev6.png'
//   },
// ]);

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFree, setIsFree] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("title") || "");
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (debouncedSearch.trim()) {
      params.set("title", debouncedSearch.trim());
    }

    navigate(`/eventy?${params.toString()}`, { replace: true });
  }, [debouncedSearch]);

  useEffect(() => {
    const getEvents = async () => {
      try{

        const params = new URLSearchParams(location.search);
        const titleParam = params.get("title") || "";
        const isFreeParam = params.get("is_free") || "";
        setIsFree(
          isFreeParam == "true"
            ? true
            : false
        )

        const response = await apiFetch(
          `${BASE_URL}${ENDPOINTS.eventEvents}?title=${titleParam}&is_free=${isFreeParam}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.details || "błąd");
        }

        const results = data.results || data || [];

        setEvents(results);
      } 
      catch (err) {
        console.error(err);
      }
    };

    getEvents();
  }, [location.search]);

  const handleFiltersApply = () => {
    setShowFilters(false);
  }

  const applySearch = () => {
    const params = new URLSearchParams(location.search);

    if (searchTerm.trim()) {
      params.append("title", searchTerm);
      console.log(params)
    }

    navigate(`/eventy?${params.toString()}`);
  };

  const setIsFreeParam = () => {
    const params = new URLSearchParams(location.search);

    if (params.get("is_free")) params.set("is_free", true)
    else params.append("is_free", true)

    navigate(`/eventy?${params.toString()}`)
  }
  
  const setIsNotFreeParam = () => {
    const params = new URLSearchParams(location.search);

    if (params.get("is_free")) params.set("is_free", false)
    else params.append("is_free", false)

    navigate(`/eventy?${params.toString()}`)
  }

  return(
    <>
      <NavBar route="Eventy" title="Eventy"/>
      <SideBar />
      <main className="events-main">
        <div className="main-events-container">
          <nav className="top-filters">
            <div className="event-type-buttons">
              <button 
                className={
                  `event-type-button ${!isFree ? "event-type-button-selected" : ""}`
                }
                onClick={setIsNotFreeParam}
              >
                Płatne
              </button>
              <button 
                className={
                  `event-type-button ${isFree ? "event-type-button-selected" : ""}`
                }
                onClick={setIsFreeParam}
              >
                Darmowe
              </button>
            </div>
            <div className="filters">
              <div className="selectt-wrapper hom2">
                <select id="filter-cat-select" className="filter-cat-select">
                  <option>Kategoria</option>
                  <option>Sport</option>
                  <option>Edukacja</option>
                  <option>Joga</option>
                </select>
                <AngleDown className="icon"/>
              </div>
              <div className="selectt-wrapper hom2">
                <select id="filter-time-select" className="filter-time-select">
                  <option>W tym tygodniu</option>
                  <option>Dzisiaj</option>
                  <option>W tym miesiącu</option>
                </select>
                <AngleDown className="icon"/>
              </div>
              <div className="filter-window">
                <button 
                  className="filter-button" 
                  id="settings-button" 
                  onClick={e => setShowFilters(!showFilters)}
                >
                  <Settings />
                </button>
                {showFilters &&
                  <>
                    <div className="filters-window">
                      <h3>Filtry</h3>
                      <div className="filters-window-field">
                        <span>Filtr 1</span><br />
                        <div className="filters-window-select-wrapper">
                          <select id="filters-window-select1">
                            <option value="1">Opcja</option>
                            <option value="2">Opcja</option>
                            <option value="3">Opcja</option>
                          </select>
                          <AngleDown className="filters-window-arrow" />
                        </div>
                      </div>
                      <div className="filters-window-field">
                        <span>Filtr 2</span>
                        <div className="time-selects">
                          <div className="filters-window-select-wrapper">
                            <select id="filters-window-time-select1">
                              <option value="1">15:00</option>
                              <option value="2">12:00</option>
                              <option value="3">14:00</option>
                            </select>
                            <AngleDown className="filters-window-arrow" />
                          </div>
                          <span className="dash">—</span>
                          <div className="filters-window-select-wrapper">
                            <select id="filters-window-time-select2">
                              <option value="1">22:00</option>
                              <option value="2">21:00</option>
                              <option value="3">20:00</option>
                            </select>
                            <AngleDown className="filters-window-arrow" />
                          </div>
                        </div>
                      </div>
                      <div className="filters-window-field">
                        <span>Filtr 3</span><br />
                        <div className="filters-window-select-wrapper">
                          <select id="filters-window-select3">
                            <option value="1">Opcja</option>
                            <option value="2">Opcja</option>
                            <option value="3">Opcja</option>
                          </select>
                          <AngleDown className="filters-window-arrow" />
                        </div>
                      </div>
                      <div className="filters-window-field">
                        <span>Filtr 4</span><br />
                        <div className="filters-window-select-wrapper">
                          <select id="filters-window-select4">
                            <option value="1">Opcja</option>
                            <option value="2">Opcja</option>
                            <option value="3">Opcja</option>
                          </select>
                          <AngleDown className="filters-window-arrow" />
                        </div>
                      </div>
                      <div className="filters-window-field">
                        <span>Filtr 5</span><br />
                        <div className="filters-window-select-wrapper">
                          <select id="filters-window-select5">
                            <option value="1">Opcja</option>
                            <option value="2">Opcja</option>
                            <option value="3">Opcja</option>
                          </select>
                          <AngleDown className="filters-window-arrow" />
                        </div>
                      </div>
                      <div className="filters-window-buttons">
                        <button 
                          className="filters-btn cancel" 
                          onClick={e => setShowFilters(false)}
                        >
                          Anuluj
                        </button>
                        <button 
                          className="filters-btn apply"
                          onClick={handleFiltersApply}
                        >
                          Zastosuj
                        </button>
                      </div>
                    </div>
                  </>
                }
              </div>
              <div className="selectt-wrapper">
                <input
                  type="text"
                  className="search-input"
                  id="search-input"
                  placeholder="Wyszukaj..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search id="search-icon" className="icon" onClick={applySearch} />
              </div>
              <button id="map-icon" className="filter-button hom2" onClick={() => navigate('/eventy/mapa-eventow')}><PinMap />Mapa wydarzeń</button>
            </div>
          </nav>
          <div className="events">
            {events.map((event) => {
              const date = new Date(event.date_time_event);
              const formattedDate = date.toLocaleString("pl-PL", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });

              const capitalizedDate = formattedDate.slice(0, 1).toUpperCase() + formattedDate.slice(1)
              const levels = {
                  none: "Brak",
                  beginner: "Początkujący",
                  "semi-advanced": "Średnio zaawansowany",
                  advanced: "Zaawansowany"
              };
              const advancedLevel = levels[event.additional_info.advanced_level];
              
              return (
                <div key={event.id} className="event">
                  <div className="event-content">
                    <div className="event-content-left">
                      <p className="event-date">{capitalizedDate} - <span className="event-type">Event Cykliczny</span></p>
                      <h2 className="event-title">{event.title}</h2>
                      <p className="event-short-desc">{event.short_desc}</p>
                      <div className="event-info-box">
                        <div className="event-info">
                          <span className="event-info-title">Kategoria:</span><br />
                          <span className="event-info-value">{event.category_name}</span>
                        </div>
                        <div className="event-info">
                          <span className="event-info-title">Grupa wiekowa:</span><br />
                          <span className="event-info-value">{event.additional_info.age_limit}</span>
                        </div>
                        <div className="event-info">
                          <span className="event-info-title">Poziom zaawansowania:</span><br />
                          <span className="event-info-value">{advancedLevel}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event-content-right">
                      <div className="event-img-wrapper"> 
                        <img src={event.event_img || eventImg} alt="event" />
                        <span className="event-img-location"><PinMap className="img-location-pin icon" /> {event.city}, {event.street} {/*{event.street_number ? event.street_number : ""}{event.flat_number ? `/${event.flat_number}` : ""}*/}</span>
                        <span className={`event-img-payable-status ${event.additional_info.price == 0 ? "green" : "red"}`}>{event.additional_info.price == 0 ? "Bezpłatny" : "Płatny"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="more-event-info">
                    <div className="progress-box">
                      <input 
                        type="range" 
                        min={0} 
                        max={event.additional_info.places_for_people_limit} 
                        value={event.event_participant_count} 
                        readOnly
                        className="progress-range"
                        style={{background: `linear-gradient(to right, #f57c00 ${(event.event_participant_count / event.additional_info.places_for_people_limit) * 100}%, #ffd9b3 0%)`}}
                      />
                      <span className="quantity-of-people">{event.event_participant_count} / {event.additional_info.places_for_people_limit}</span>
                    </div>
                    <Link className="more-bout-event" to={`${event.id}`}>Zobacz szczegóły <span className="hom">↗</span></Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default Events