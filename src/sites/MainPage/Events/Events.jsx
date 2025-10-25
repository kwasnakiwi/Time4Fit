import { useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/mainpage.css'
import { FaAngleDown as AngleDown, FaSlidersH as Settings, FaSearch as Search } from "react-icons/fa";
import { BiMap as PinMap } from "react-icons/bi";
import { Link } from "react-router-dom";
import eventImg from '../../../assets/images/event.png'
function Events(){
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async () => {
        try{
          const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}`); // GET
          const data = await response.json();

          if(!response.ok){
            throw new Error(data.details || "błąd");
          }

          setEvents((data.results || data || []).sort((a, b) => a.id - b.id));
          console.log(data.results)
        }
        catch(err){
          console.error(err)
        }
      }

    getEvents();
  }, [])

  return(
    <>
      <NavBar route="Eventy" title="Eventy"/>
      <SideBar />
      <main className="events-main">
        <div className="main-events-container">
          <nav className="top-filters">
            <div className="event-type-buttons">
              <button className="event-type-button event-type-button-selected">Płatne</button>
              <button className="event-type-button">Darmowe</button>
            </div>
            <div className="filters">
              <div className="selectt-wrapper">
                <select id="filter-cat-select" className="filter-cat-select">
                  <option>Kategoria</option>
                  <option>Sport</option>
                  <option>Edukacja</option>
                  <option>Joga</option>
                </select>
                <AngleDown className="icon"/>
              </div>
              <div className="selectt-wrapper">
                <select id="filter-time-select" className="filter-time-select">
                  <option>W tym tygodniu</option>
                  <option>Dzisiaj</option>
                  <option>W tym miesiącu</option>
                </select>
                <AngleDown className="icon"/>
              </div>
              <button className="filter-button" id="settings-button"><Settings /></button>
              <div className="selectt-wrapper">
                <input type="text" className="search-input" id="search-input" placeholder="Wyszukaj wydarzenia..." />
                <Search id="search-icon" className="icon"/>
              </div>
              <button id="map-icon" className="filter-button"><PinMap />Mapa wydarzeń</button>
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
                        <img src={eventImg} alt="event" />
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
                    <Link className="more-bout-event" to={`/events/${event.id}`}>Zobacz szczegóły ↗</Link>
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