import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import "./../../../../styles/eventspanel.css";
import {
  FaPlus as Plus,
  FaSearch as Search,
  FaAngleDown as AngleDown,
} from "react-icons/fa";
import epFilter1 from "./../../../../assets/svgs/ep-filter1.svg";
import epFilter2 from "./../../../../assets/svgs/ep-filter2.svg";
import epFilter3 from "./../../../../assets/svgs/ep-filter3.svg";
import epFilter4 from "./../../../../assets/svgs/ep-filter4.svg";
import epFilter5 from "./../../../../assets/svgs/ep-filter5.svg";
import { useState } from "react";

function EventsPanel() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cyclic, setCyclic] = useState(false);
  const [once, setOnce] = useState(false);
  const [group, setGroup] = useState(false);
  const [individual, setIndividual] = useState(false);

  const navigate = useNavigate();
  const type = searchParams.get("type") || "active";

  const updateURL = (key, value) => {
    let newParams = new URLSearchParams(searchParams);

    if (value != "" && value != null && value != undefined) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const handleChangeEventCategory = (category) => {
    switch (category) {
      case "cyclic":
        setOnce(false);
        setCyclic((prev) => !prev);
        break;
      case "once":
        setCyclic(false);
        setOnce((prev) => !prev);
        break;
      case "group":
        setIndividual(false);
        setGroup((prev) => !prev);
        break;
      case "individual":
        setGroup(false);
        setIndividual((prev) => !prev);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <NavBar title="Panel wydarzeń" route="Panel wydarzeń" />
      <SideBar />
      <main className="home-page-container">
        <header className="wk-top-filters">
          <div className="top">
            <div className="wk-top-filters-left">
              <div className="event-type-buttons">
                <button
                  className={`event-type-button ${type === "active" ? "event-type-button-selected" : ""}`}
                  onClick={() => updateURL("type", "active")}
                >
                  Aktywne
                </button>
                <button
                  className={`event-type-button ${type === "ended" ? "event-type-button-selected" : ""}`}
                  onClick={() => updateURL("type", "ended")}
                >
                  Zakończone
                </button>
                <button
                  className={`event-type-button ${type === "drafts" ? "event-type-button-selected" : ""}`}
                  onClick={() => updateURL("type", "drafts")}
                >
                  Wersje robocze
                </button>
              </div>
            </div>
            <div className="wk-top-filters-right">
              <button
                onClick={() => navigate("/eventy/dodawanie-eventu")}
                className="add-product-btn"
              >
                <Plus />
                Stwórz nowe wydarzenie
              </button>
            </div>
          </div>
          <div className="bottom" style={{ position: "relative" }}>
            <div className="filter-wrapper" style={{ maxWidth: "291px" }}>
              <input
                placeholder="Wyszukaj wydarzenia..."
                className="p-filter-input"
                type="text"
              />
              <Search className="p-search-icon" />
            </div>
            <div className="filter-wrapper" style={{ maxWidth: "116px" }}>
              <span
                className={`p-filter-input span ${cyclic ? "selected" : ""}`}
                onClick={() => handleChangeEventCategory("cyclic")}
              >
                <img src={epFilter1} alt="" />
                Cykliczne
              </span>
            </div>
            <div className="filter-wrapper" style={{ maxWidth: "144px" }}>
              <span
                className={`p-filter-input span ${once ? "selected" : ""}`}
                onClick={() => handleChangeEventCategory("once")}
              >
                <img src={epFilter2} alt="" />
                Jednorazowe
              </span>
            </div>
            <div className="filter-wrapper" style={{ maxWidth: "76px" }}>
              <select className="p-filter-input">
                <option value="">Filtr</option>
              </select>
              <AngleDown className="arrow" />
            </div>
            <div
              className="filter-wrapper"
              style={{ maxWidth: "116px", marginLeft: "auto" }}
            >
              <span
                className={`p-filter-input span ${cyclic ? "selected" : ""}`}
                onClick={() => handleChangeEventCategory("group")}
              >
                <img src={epFilter3} alt="" />
                Grupowe
              </span>
            </div>
          </div>
        </header>
      </main>
    </>
  );
}

export default EventsPanel;
