import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import "./../../../styles/calendar.css";
import CalEvent from "./cal_components/CalEvent";
import { FaAngleDown as AngleDown } from "react-icons/fa";
import { UserContext } from "../../../utils/UserContext";
import { useSearchParams } from "react-router-dom";
import { apiFetch } from "../../../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints";

function Calendar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  const calendarType = searchParams.get("type") || "day";

  const HOURS = Array.from({ length: 24 }, (_, i) => i);
  const COLUMNS = 7;

  const currentWeekDay = new Date().toLocaleDateString("pl-PL", {
    weekday: "long",
  });
  const currentDay = new Date().toLocaleDateString("pl-PL", { day: "numeric" });

  useEffect(() => {
    const getTime = () => {
      const now = new Date();
      return now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
    };
    setCurrentTime(getTime());

    const interval = setInterval(() => {
      setCurrentTime(getTime()); 
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // setEvents([
    //   {
    //     start: "9:30",
    //     end: "12:00",
    //     title: "Test1",
    //   },
    //   {
    //     start: "11:30",
    //     end: "12:10",
    //     title: "Test2",
    //   },
    //   {
    //     start: "1:00",
    //     end: "2:00",
    //     title: "Test3",
    //   },
    //   {
    //     start: "12:00",
    //     end: "17:00",
    //     title: "Test4",
    //   },
    //   {
    //     start: "22:00",
    //     end: "23:15",
    //     title: "Test5",
    //   },
    // ]);

    const getEvents = async () => {
      try {
        const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}`);

        let data = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error(data?.details);
        }

        setEvents(data?.results || []);
        console.log("eventy na kalendarzu:", data?.results);
      } catch (err) {
        console.error(err);
      }
    };

    getEvents();
  }, []);

  const updateURL = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === null || value === undefined || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams, { replace: true });
  };

  const getEventPosition = (time) => {
    const [hours, minutes] = time.split(":");
    const totalMinutes = Number(hours) * 60 + Number(minutes);
    return totalMinutes * (68 / 60);
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
              onClick={() => updateURL("type", "day")}
            >
              Dzień
            </button>
            <button
              className={`cal-select-btn ${calendarType == "week" ? "selected" : ""}`}
              onClick={() => updateURL("type", "week")}
            >
              Tydzień
            </button>
            <button
              className={`cal-select-btn ${calendarType == "month" ? "selected" : ""}`}
              onClick={() => updateURL("type", "month")}
            >
              Miesiąc
            </button>
          </div>
        </header>
        <section className="calendar-box">
          <div className="calendar-head">
            <h1 className="cal-day-name">
              {currentWeekDay.slice(0, 1).toUpperCase() +
                currentWeekDay.slice(1)}
            </h1>
            <div className="cal-day-num">{currentDay}</div>
          </div>
          <div className="day-grid-wrapper">
            <div className="current-time-line" style={{top: getEventPosition(currentTime)}}>
              <span>{currentTime}</span>
              <div className="line-wrapper">
                <span className="circle" />
                <hr />
              </div>
            </div>
            <div className="hours-label">
              {HOURS.map((h, i) => (
                <div className="cal-hour" key={i}>
                  <span className="cal-hour-text">{h.toString()}:00</span>
                </div>
              ))}
            </div>
            <div className="calendar-grid">
              {HOURS.map((_, i) => (
                <div key={i} className="calendar-row" />
              ))}
              {Array.from({ length: COLUMNS + 1 }).map((_, i) => (
                <div
                  key={i}
                  className="vertical-line"
                  style={{ left: `${(i / COLUMNS) * 100}%` }}
                />
              ))}
              {events
                .filter(
                  (ev) =>
                    new Date(ev.date_time_event).toDateString() ===
                    new Date().toDateString(),
                )
                .map((ev) => {
                  const eventDate = new Date(ev.date_time_event);
                  const endDate = new Date(eventDate);
                  endDate.setHours(eventDate.getHours() + 2);

                  return {
                    ...ev,
                    start:
                      eventDate.getHours() +
                      ":" +
                      String(eventDate.getMinutes()).padStart(2, "0"),
                    end:
                      endDate.getHours() +
                      ":" +
                      String(endDate.getMinutes()).padStart(2, "0"),
                  };
                })
                .sort(
                  (a, b) =>
                    getEventPosition(a.start) - getEventPosition(b.start),
                )
                .map((ev, i, processedEvents) => (
                  <CalEvent
                    key={i}
                    index={i}
                    start={ev.start}
                    end={ev.end}
                    title={ev.title}
                    getEventPosition={getEventPosition}
                    events={processedEvents} // Przekazujemy tablicę z obliczonymi start/end!
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Calendar;
