import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import "./../../../styles/mainpage.css";
import { FaAngleDown as AngleDown, FaSlidersH as Settings, FaSearch as Search } from "react-icons/fa";
import locIcon from "./../../../assets/images/real-loc-pin.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { useNavigate } from "react-router-dom";
import eventImg from './../../../assets/images/event-joga-default.png';

function EventsMap() {
  const [showFilters, setShowFilters] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEventsMapInfo = async () => {
      try {
        const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}events_on_map/`);
        const baseData = await response.json();

        const detailedData = await Promise.all( 
          baseData.map(async (event) => {
            try {
              const res = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}${event.id}/`);
              const details = await res.json();
              return { ...event, ...details }; // łącz dane (pozycja + info)
            } 
            catch (err) {
              console.error(`Błąd pobierania szczegółów dla eventu ${event.id}`, err);
              return event; // zwróć podstawowe dane, jeśli szczegóły się nie pobiorą
            }
          })
        );

        console.log("Eventy z danymi:", detailedData);
        setEvents(detailedData);
      } catch (err) {
        console.error(err);
      }
    };
    getEventsMapInfo();
  }, []);


  const handleFiltersApply = () => {
    setShowFilters(false);
  };

  const customMarker = new Icon({
    iconUrl: locIcon,
    iconSize: [30, 38],
    iconAnchor: [15, 38]
  });

  return (
    <>
      <NavBar route="Eventy" title="Eventy" linkRoute="/events" />
      <SideBar />
      <main className="events-main">
        <div className="main-events-container">
          <nav className="top-filters">
            <div className="event-type-buttons">
              <button className="event-type-button event-type-button-selected">
                Płatne
              </button>
              <button className="event-type-button">Darmowe</button>
            </div>
            <div className="filters">
              <div className="selectt-wrapper hom2">
                <select id="filter-cat-select" className="filter-cat-select">
                  <option>Kategoria</option>
                  <option>Sport</option>
                  <option>Edukacja</option>
                  <option>Joga</option>
                </select>
                <AngleDown className="icon" />
              </div>
              <div className="selectt-wrapper hom2">
                <select id="filter-time-select" className="filter-time-select">
                  <option>W tym tygodniu</option>
                  <option>Dzisiaj</option>
                  <option>W tym miesiącu</option>
                </select>
                <AngleDown className="icon" />
              </div>
              <div className="filter-window">
                <button
                  className="filter-button"
                  id="settings-button"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Settings />
                </button>
                {showFilters && (
                  <div className="filters-window">
                    <h3>Filtry</h3>
                    <div className="filters-window-field">
                      <span>Filtr 1</span>
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
                      <span>Filtr 3</span>
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
                      <span>Filtr 4</span>
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
                      <span>Filtr 5</span>
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
                        onClick={() => setShowFilters(false)}
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
                )}
              </div>
              <div className="selectt-wrapper">
                <input
                  type="text"
                  className="search-input"
                  id="search-input"
                  placeholder="Wyszukaj..."
                />
                <Search id="search-icon" className="icon" />
              </div>
              <button
                id="map-icon"
                className="filter-button hom2"
                onClick={() => navigate("/events")}
              >
                Lista wydarzeń
              </button>
            </div>
          </nav>

          <div className="events-map-container">
            <MapContainer
              center={[52.237049, 21.017532]}
              minZoom={3}
              zoom={7}
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              maxBounds={[
                [-90, -180],
                [90, 180]
              ]}
              maxBoundsViscosity={1.0}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                noWrap
              />

              <MarkerClusterGroup 
                chunkedLoading
                animate={false}
                iconCreateFunction={(cluster) => {
                  const count = cluster.getChildCount();
                  return L.divIcon({
                    html: `<div class="custom-cluster">${count}</div>`,
                    className: "my-cluster-icon",
                    iconSize: [40, 40],
                  });
                }}
              >
                {events.map((ev, i) => {
                  const formattedDate = new Intl.DateTimeFormat("pl-PL", {
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  }).format(new Date(ev.date_time_event));

                  const levels = {
                    beginner: "Początkujący",
                    'semi-advanced': "Średniozaawansowany",
                    advanced: "Zaawansowany",
                    none: "Brak"
                  };
                  const advancedLevel = levels[ev.additional_info.advanced_level];

                  return(
                    <Marker
                      key={i}
                      position={[ev.latitude, ev.longitude]}
                      icon={customMarker}
                    >
                      <Popup maxWidth={1000}>
                        <div className="event-on-map-popup">
                          <div className="ev-popup-first-row">
                            <img src={eventImg} alt="Zdjęcie wydarzenia" />
                            <div className="ev-popup-informations">
                              <span className="ev-popup-date">{formattedDate.slice(0, 1).toUpperCase() + formattedDate.slice(1)}</span>
                              <span className="ev-popup-title">{ev.title}</span>
                              <span className="ev-popup-address">
                                ul. {ev.street} {ev.street_number ? `${ev.flat_number ? `${ev.street_number}/${ev.flat_number}` : `${ev.street_number}`}` : ''}
                              </span>
                            </div>
                          </div>
                          <div className="ev-popup-second-row">
                            <div className="ev-popup-item">
                              <span className="ev-popup-item-name">Kategoria:</span><br />
                              <span className="ev-popup-item-value">{ev.category || "Joga"}</span>
                            </div>
                            <div className="ev-popup-item">
                              <span className="ev-popup-item-name">Grupa wiekowa:</span><br />
                              <span className="ev-popup-item-value">{ev.additional_info.age_limit}</span>
                            </div>
                            <div className="ev-popup-item">
                              <span className="ev-popup-item-name">Poziom zaawansowania:</span><br />
                              <span className="ev-popup-item-value">{advancedLevel}</span>
                            </div>
                          </div>
                          <div className="ev-popup-third-row">
                            <button className="ev-popup-btn orange" onClick={() => navigate(`/events/${ev.id}`)}>Zobacz szczegóły</button>
                            <button className="ev-popup-btn">Obserwuj</button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )
                })}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </main>
    </>
  );
}

export default EventsMap;
