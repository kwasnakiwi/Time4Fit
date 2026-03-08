import { useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import "./../../../styles/mainpage.css";
import {
  FaAngleDown as AngleDown,
  FaSlidersH as Settings,
  FaSearch as Search,
} from "react-icons/fa";
import { BiMap as PinMap } from "react-icons/bi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import eventImg from "../../../assets/images/eventImg.png";
import { useDebounce } from "../../../hooks/useDebounce.js";

function Events() {
  const [events, setEvents] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // --- ZARZĄDZANIE URL ---
  const [searchParams, setSearchParams] = useSearchParams();

  // Pobieramy wartości parametrów bezpośrednio z URL
  const [localSearch, setLocalSearch] = useState(
    searchParams.get("search") || "",
  );
  const debouncedSearch = useDebounce(localSearch);

  const isFreeParam = searchParams.get("is_free"); // null, "true" lub "false"
  const categoryParam = searchParams.get("category") || "Kategoria";

  // Funkcja aktualizująca dowolny parametr w URL
  const updateURL = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "category"
    ) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams, { replace: true });
  };

  // --- EFEKTY ---

  // Synchronizacja debouncedSearch z adresem URL
  useEffect(() => {
    updateURL("search", debouncedSearch);
  }, [debouncedSearch]);

  // Pobieranie danych z API przy każdej zmianie parametrów w URL
  useEffect(() => {
    const getEvents = async () => {
      try {
        const query = searchParams.toString();
        // Pobieramy dane. Jeśli query jest puste, pobierze wszystkie.
        const response = await apiFetch(
          `${BASE_URL}${ENDPOINTS.eventEvents}${query ? `?${query}` : ""}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.details || "Błąd podczas pobierania danych");
        }

        const results = data.results || data || [];
        setEvents(results);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    getEvents();
  }, [searchParams]); // Reaguje na każdą zmianę w pasku adresu

  const handleFiltersApply = () => {
    setShowFilters(false);
  };

  return (
    <>
      <NavBar route="Eventy" title="Eventy" />
      <SideBar />
      <main className="events-main">
        <div className="main-events-container">
          <nav className="top-filters">
            <div className="event-type-buttons">
              <button
                className={`event-type-button ${isFreeParam === null ? "event-type-button-selected" : ""}`}
                onClick={() => updateURL("is_free", null)}
              >
                Wszystkie
              </button>
              <button
                className={`event-type-button ${isFreeParam === "false" ? "event-type-button-selected" : ""}`}
                onClick={() => updateURL("is_free", "false")}
              >
                Płatne
              </button>
              <button
                className={`event-type-button ${isFreeParam === "true" ? "event-type-button-selected" : ""}`}
                onClick={() => updateURL("is_free", "true")}
              >
                Darmowe
              </button>
            </div>

            <div className="filters">
              <div className="selectt-wrapper hom2">
                <select
                  id="filter-cat-select"
                  className="filter-cat-select"
                  value={categoryParam}
                  onChange={(e) => updateURL("category", e.target.value)}
                >
                  <option value="category">Kategoria</option>
                  <option value="sport">Sport</option>
                  <option value="education">Edukacja</option>
                  <option value="yoga">Joga</option>
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
                    {/* Tutaj możesz dodać kolejne selecty korzystające z updateFilters */}
                    <div className="filters-window-field">
                      <span>Przykładowy filtr</span>
                      <div className="filters-window-select-wrapper">
                        <select>
                          <option value="1">Opcja 1</option>
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
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
                <Search id="search-icon" className="icon" />
              </div>

              <button
                id="map-icon"
                className="filter-button hom2"
                onClick={() => navigate("/eventy/mapa-eventow")}
              >
                <PinMap />
                Mapa wydarzeń
              </button>
            </div>
          </nav>
          <div className="events">
            {events.length > 0 ? (
              events.map((event) => {
                const date = new Date(event.date_time_event);
                const formattedDate = date.toLocaleString("pl-PL", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const capitalizedDate =
                  formattedDate.slice(0, 1).toUpperCase() +
                  formattedDate.slice(1);

                const levels = {
                  none: "Brak",
                  beginner: "Początkujący",
                  "semi-advanced": "Średnio zaawansowany",
                  advanced: "Zaawansowany",
                };

                const advancedLevel =
                  levels[event.additional_info?.advanced_level] || "Brak";

                return (
                  <div key={event.id} className="event">
                    <div className="event-content">
                      <div className="event-content-left">
                        <p className="event-date">
                          {capitalizedDate} -{" "}
                          <span className="event-type">Event Cykliczny</span>
                        </p>
                        <h2 className="event-title">{event.title}</h2>
                        <p className="event-short-desc">{event.short_desc}</p>
                        <div className="event-info-box">
                          <div className="event-info">
                            <span className="event-info-title">Kategoria:</span>
                            <br />
                            <span className="event-info-value">
                              {event.category_name}
                            </span>
                          </div>
                          <div className="event-info">
                            <span className="event-info-title">
                              Grupa wiekowa:
                            </span>
                            <br />
                            <span className="event-info-value">
                              {event.additional_info?.age_limit}
                            </span>
                          </div>
                          <div className="event-info">
                            <span className="event-info-title">
                              Poziom zaawansowania:
                            </span>
                            <br />
                            <span className="event-info-value">
                              {advancedLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="event-content-right">
                        <div className="event-img-wrapper">
                          <img
                            className="ev-img"
                            src={event.event_image || eventImg}
                            alt="event"
                          />
                          <span className="event-img-location">
                            <PinMap className="img-location-pin icon" />{" "}
                            {event.city}, {event.street}
                          </span>
                          <span
                            className={`event-img-payable-status ${
                              event.additional_info?.price === 0
                                ? "green"
                                : "red"
                            }`}
                          >
                            {event.additional_info?.price === 0
                              ? "Bezpłatny"
                              : "Płatny"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="more-event-info">
                      <div className="progress-box">
                        <input
                          type="range"
                          min={0}
                          max={
                            event.additional_info?.places_for_people_limit ||
                            100
                          }
                          value={event.event_participant_count || 0}
                          readOnly
                          className="progress-range"
                          style={{
                            background: `linear-gradient(to right, #f57c00 ${
                              ((event.event_participant_count || 0) /
                                (event.additional_info
                                  ?.places_for_people_limit || 1)) *
                              100
                            }%, #ffd9b3 0%)`,
                          }}
                        />
                        <span className="quantity-of-people">
                          {event.event_participant_count} /{" "}
                          {event.additional_info?.places_for_people_limit}
                        </span>
                      </div>
                      <Link className="more-bout-event" to={`${event.id}`}>
                        Zobacz szczegóły <span className="hom">↗</span>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-trainers-text">Nie znaleziono wydarzeń.</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Events;
