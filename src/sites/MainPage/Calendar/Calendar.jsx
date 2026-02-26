import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import "./../../../styles/calendar.css";
import CalEvent from "./cal_components/CalEvent";
import { FaAngleDown as AngleDown } from "react-icons/fa";
import { UserContext } from "../../../utils/UserContext";

function Calendar() {
  const [calendarType, setCalendarType] = useState("day");
  const [events, setEvents] = useState([]);

  const HOURS = Array.from({ length: 24 }, (_, i) => i);
  const COLUMNS = 7;

  useEffect(() => {
    setEvents([
      {
        start: "9:30",
        end: "12:00",
        title: "Test1",
      },
      {
        start: "11:30",
        end: "12:10",
        title: "Test2",
      },
      {
        start: "0:30",
        end: "7:00",
        title: "Test3",
      },
      {
        start: "12:00",
        end: "17:00",
        title: "Test4",
      },
    ]);
  }, []);

  const getEventPosition = (time) => {
    let h, m;
    [h, m] = time.split(":");
    console.log(h, m);
    m = Number(m);
    h = Number(h);
    m = h * 68 + m;
    return m;
  };

  return (
    <>
      <NavBar route="Kalendarz" title="Kalendarz" />
      <SideBar />
      <div className="home-page-container">
        <header className="cal-filters-box">
          <div className="cal-filters-selects">
            <div className="cal-filter-wrapper">
              <select className="cal-filter-select">
                <option value="">Filtr 1</option>
                <option value="">Lorem</option>
                <option value="">Lorem</option>
              </select>
              <AngleDown className="icon" />
            </div>
            <div className="cal-filter-wrapper">
              <select className="cal-filter-select">
                <option value="">Filtr 2</option>
                <option value="">Lorem</option>
                <option value="">Lorem</option>
              </select>
              <AngleDown className="icon" />
            </div>
          </div>
          <div className="cal-select">
            <button
              className={`cal-select-btn ${calendarType == "day" ? "selected" : ""}`}
              onClick={() => setCalendarType("day")}
            >
              Dzień
            </button>
            <button
              className={`cal-select-btn ${calendarType == "week" ? "selected" : ""}`}
              onClick={() => setCalendarType("week")}
            >
              Tydzień
            </button>
            <button
              className={`cal-select-btn ${calendarType == "month" ? "selected" : ""}`}
              onClick={() => setCalendarType("month")}
            >
              Miesiąc
            </button>
          </div>
        </header>
        <section className="calendar-box">
          <div className="calendar-head">
            <h1 className="cal-day-name">Wtorek</h1>
            <div className="cal-day-num">8</div>
          </div>
          <div className="day-grid-wrapper">
            <div className="day-grid">
              {/* GODZINY */}
              <div className="time-column">
                {HOURS.map((h) => (
                  <div key={h} className="time-label">
                    {h.toString().padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              {/* SIATKA */}
              <div className="grid-area">
                {/* poziome linie (godziny) */}
                {HOURS.map((h) => (
                  <div key={h} className="hour-row" />
                ))}

                {/* pionowe linie */}
                {Array.from({ length: COLUMNS - 1 }).map((_, i) => (
                  <div
                    key={i}
                    className="vertical-line"
                    style={{ left: `${((i + 1) / COLUMNS) * 100}%` }}
                  />
                ))}

                {/* eventy */}
                {events.map((ev, i) => (
                  <div
                    className="cal-event"
                    key={i}
                    style={{
                      height: `${getEventPosition(ev.end) - getEventPosition(ev.start)}px`,
                      width: "200px",
                      backgroundColor: "limegreen",
                      position: "absolute",
                      top: getEventPosition(ev.start),
                    }}
                  >
                    {ev.title}
                    <br />
                    {ev.start.padStart(5, "0")} do {ev.end.padStart(5, "0")}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Calendar;
