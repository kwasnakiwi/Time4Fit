import React, { useState, useEffect } from "react";
import "../../../styles/calendar.css";
import {
  FaAngleLeft as AngleLeft,
  FaAngleRight as AngleRight,
  FaAngleDown as AngleDown,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import CalEvent from "./cal_components/CalEvent.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";

const events = [
  // --- TYDZIEŃ 13-19 KWIETNIA 2026 ---
  {
    id: 1,
    eventName: "Tokarka T-100",
    startTime: "2026-04-14T08:00:00",
    endTime: "2026-04-14T11:00:00",
  },
  {
    id: 2,
    eventName: "Frezarka F-50",
    startTime: "2026-04-16T14:00:00",
    endTime: "2026-04-16T16:30:00",
  },

  // --- TYDZIEŃ 20-26 KWIETNIA 2026 ---
  {
    id: 3,
    eventName: "Prasa P-200",
    startTime: "2026-04-20T07:00:00",
    endTime: "2026-04-20T10:30:00",
  },
  {
    id: 4,
    eventName: "Wiertarka X",
    startTime: "2026-04-20T08:00:00",
    endTime: "2026-04-20T11:00:00",
  },
  {
    id: 5,
    eventName: "Frezarka Y",
    startTime: "2026-04-20T09:00:00",
    endTime: "2026-04-20T12:00:00",
  },
  {
    id: 6,
    eventName: "Frezarka Y (Duplikat czasu)",
    startTime: "2026-04-20T09:00:00",
    endTime: "2026-04-20T12:00:00",
  },
  {
    id: 7,
    eventName: "Frezarka Y (Popołudnie)",
    startTime: "2026-04-20T12:00:00",
    endTime: "2026-04-20T15:00:00",
  },
  {
    id: 8,
    eventName: "Wiertarka CNC",
    startTime: "2026-04-21T10:00:00",
    endTime: "2026-04-21T14:30:00",
  },
  {
    id: 9,
    eventName: "Linia A1",
    startTime: "2026-04-22T15:00:00",
    endTime: "2026-04-22T18:00:00",
  },
  {
    id: 10,
    eventName: "Linia A2 (Kolizja)",
    startTime: "2026-04-22T16:00:00",
    endTime: "2026-04-22T19:00:00",
  },
  {
    id: 11,
    eventName: "Robot S",
    startTime: "2026-04-23T08:30:00",
    endTime: "2026-04-23T11:00:00",
  },
  {
    id: 12,
    eventName: "Kompresor",
    startTime: "2026-04-24T12:00:00",
    endTime: "2026-04-24T15:00:00",
  },
  {
    id: 13,
    eventName: "Suwnica B",
    startTime: "2026-04-25T09:00:00",
    endTime: "2026-04-25T13:00:00",
  },
  {
    id: 14,
    eventName: "Wentylacja",
    startTime: "2026-04-26T14:00:00",
    endTime: "2026-04-26T17:30:00",
  },

  // --- TYDZIEŃ 27 KWIETNIA - 03 MAJA 2026 ---
  {
    id: 15,
    eventName: "Podnośnik P-10",
    startTime: "2026-04-27T06:00:00",
    endTime: "2026-04-27T09:00:00",
  },
  {
    id: 16,
    eventName: "Piec Hartowniczy",
    startTime: "2026-04-29T10:00:00",
    endTime: "2026-04-29T15:00:00",
  },
  {
    id: 17,
    eventName: "Zasilacz Awaryjny",
    startTime: "2026-05-01T08:00:00",
    endTime: "2026-05-01T12:00:00",
  },
  {
    id: 18,
    eventName: "Brama Wjazdowa",
    startTime: "2026-05-03T18:00:00",
    endTime: "2026-05-03T21:00:00",
  },
];

function Calendar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTime, setCurrentTime] = useState(new Date());

  const calendarType = searchParams.get("type") || "day";
  const dateParam = searchParams.get("date");
  const viewDate = dateParam ? new Date(dateParam) : new Date();
  const HOURS = Array.from({ length: 24 }, (_, i) => i);

  const navigate = useNavigate();

  const handleNavigate = (direction) => {
    const newDate = new Date(viewDate);

    if (calendarType === "day") {
      newDate.setDate(viewDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (calendarType === "week") {
      newDate.setDate(viewDate.getDate() + (direction === "next" ? 7 : -7));
    } else if (calendarType === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    const dateString = `${year}-${month}-${day}`;
    updateURL("date", dateString);
  };

  const updateURL = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    value ? newParams.set(key, value) : newParams.delete(key);
    setSearchParams(newParams, { replace: true });
  };

  const getCurrentWeek = (selectedDate) => {
    const dayOfWeek = selectedDate.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return {
        date: d,
        dayNumber: d.getDate(),
        isToday: d.toDateString() === new Date().toDateString(),
      };
    });
  };

  const getCurrentMonth = (selectedDate) => {
    const days = [];
    const todayString = new Date().toDateString();

    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    );

    const startDayOfWeek = firstDayOfMonth.getDay();
    const diffToMonday = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(firstDayOfMonth.getDate() - diffToMonday);

    const endDayOfWeek = lastDayOfMonth.getDay();
    const diffToSunday = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(lastDayOfMonth.getDate() + diffToSunday);

    const tempDate = new Date(startDate);
    tempDate.setHours(0, 0, 0, 0);

    while (tempDate <= endDate) {
      days.push({
        date: new Date(tempDate),
        dayNumber: tempDate.getDate(),
        isToday: tempDate.toDateString() === todayString,
        isCurrentMonth: tempDate.getMonth() === selectedDate.getMonth(),
      });
      tempDate.setDate(tempDate.getDate() + 1);
    }
    return days;
  };

  const currentWeekDays = getCurrentWeek(viewDate);
  const firstDay = currentWeekDays[0].date;
  const lastDay = currentWeekDays[6].date;
  const currentMonthDays = getCurrentMonth(viewDate);

  const formatMonth = (d) => d.toLocaleDateString("pl-PL", { month: "long" });
  const formatYear = (d) => d.getFullYear();

  let weekRangeDisplay = "";
  if (firstDay.getMonth() === lastDay.getMonth()) {
    weekRangeDisplay = `${firstDay.getDate()}-${lastDay.getDate()} ${formatMonth(firstDay)} ${formatYear(firstDay)}`;
  } else {
    const firstMonthStr = formatMonth(firstDay);
    const lastMonthStr = formatMonth(lastDay);
    if (firstDay.getFullYear() === lastDay.getFullYear()) {
      weekRangeDisplay = `${firstDay.getDate()} ${firstMonthStr} – ${lastDay.getDate()} ${lastMonthStr} ${formatYear(firstDay)}`;
    } else {
      weekRangeDisplay = `${firstDay.getDate()} ${firstMonthStr} ${formatYear(firstDay)} – ${lastDay.getDate()} ${lastMonthStr} ${formatYear(lastDay)}`;
    }
  }

  const getPositionedEventsForDay = (events) => {
    if (!events || events.length === 0) return [];
    const sorted = [...events].sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );

    const results = [];
    let currentGroup = [];
    let groupMaxEnd = 0;

    const processGroup = (group) => {
      const columns = [];
      group.forEach((event) => {
        const eventStart = new Date(event.startTime).getTime();
        let placed = false;
        for (let i = 0; i < columns.length; i++) {
          const lastEventInCol = columns[i][columns[i].length - 1];
          if (new Date(lastEventInCol.endTime).getTime() <= eventStart) {
            columns[i].push(event);
            placed = true;
            break;
          }
        }
        if (!placed) columns.push([event]);
      });

      return columns.flatMap((column, colIdx) =>
        column.map((event) => ({
          ...event,
          colIdx,
          totalCols: columns.length,
        })),
      );
    };

    sorted.forEach((event) => {
      const eventStart = new Date(event.startTime).getTime();
      const eventEnd = new Date(event.endTime).getTime();
      if (eventStart >= groupMaxEnd && currentGroup.length > 0) {
        results.push(...processGroup(currentGroup));
        currentGroup = [];
        groupMaxEnd = 0;
      }
      currentGroup.push(event);
      groupMaxEnd = Math.max(groupMaxEnd, eventEnd);
    });

    if (currentGroup.length > 0) {
      results.push(...processGroup(currentGroup));
    }
    return results;
  };

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NavBar title="Kalendarz" route="Kalendarz" />
      <SideBar />
      <main className="home-page-container">
        <header className="rc-filters">
          <div className="rc-navigators">
            <AngleLeft
              onClick={() => handleNavigate("prev")}
              className="rc-icon"
            />
            <div className="rc-filters-days">
              <span
                style={{
                  textAlign: "center",
                  display: "block",
                  minWidth: calendarType === "month" ? "150px" : "300px",
                }}
              >
                {calendarType === "day"
                  ? viewDate.toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : calendarType === "week"
                    ? weekRangeDisplay
                    : currentMonthDays[7].date.toLocaleDateString("pl-PL", {
                        month: "long",
                        year: "numeric",
                      })}
              </span>
            </div>
            <AngleRight
              onClick={() => handleNavigate("next")}
              className="rc-icon"
            />

            <div className="rc-filter-input-wrapper">
              <select id="filtr1">
                <option value="filtr1">Filtr 1</option>
              </select>
              <AngleDown />
            </div>
            <div className="rc-filter-input-wrapper">
              <select id="filtr2">
                <option value="filtr2">Filtr 2</option>
              </select>
              <AngleDown />
            </div>
          </div>

          <div className="rc-type-select">
            {["day", "week", "month"].map((type) => (
              <button
                key={type}
                className={`rc-type-button ${calendarType === type ? "selected" : ""}`}
                onClick={() => updateURL("type", type)}
              >
                {type === "week"
                  ? "Tydzień"
                  : type === "month"
                    ? "Miesiąc"
                    : "Dzień"}
              </button>
            ))}
          </div>
        </header>

        <div className="rc-container">
          <div className="rc-wrapper">
            {/* Nagłówki dni (Top Bar) */}
            <div
              className={`rc-top ${calendarType !== "month" ? "before" : ""}`}
            >
              {calendarType === "day" ? (
                <div
                  className="rc-top-day selected"
                  style={{ gridColumn: "2 / 9" }}
                >
                  <span className="rc-week-day">
                    {viewDate.toLocaleDateString("pl-PL", { weekday: "long" })}
                  </span>
                  <span className="rc-day">{viewDate.getDate()}</span>
                </div>
              ) : (
                currentWeekDays.map((d, i) => (
                  <div
                    key={i}
                    className={`rc-top-day ${d.isToday ? "selected" : ""}`}
                  >
                    <span className="rc-week-day">
                      {d.date.toLocaleDateString("pl-PL", { weekday: "long" })}
                    </span>
                    {calendarType === "week" && (
                      <span className="rc-day">{d.dayNumber}</span>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Główna siatka (Grid) */}
            <div
              className={`rc-day-grid-wrapper ${calendarType === "month" ? "month" : ""}`}
            >
              {/* Lewa kolumna z godzinami dla Widoku Dnia i Tygodnia */}
              {(calendarType === "day" || calendarType === "week") && (
                <div className="rc-hours-label">
                  {HOURS.map((h) => (
                    <div key={h} className="rc-hour">
                      <span>{h}:00</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Kontener Gridu dla Widoku Dnia i Tygodnia */}
              {(calendarType === "day" || calendarType === "week") && (
                <div className="rc-grid-wrapper">
                  {HOURS.map((h) => (
                    <div key={h} className="rc-row" />
                  ))}

                  {/* Pionowe linie separatorów (tylko dla tygodnia) */}
                  {calendarType === "week" &&
                    Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="rc-vertical-line"
                        style={{ left: `${(i / 7) * 100}%` }}
                      />
                    ))}

                  <div
                    className="rc-current-time-line"
                    style={{
                      top:
                        currentTime.getHours() * 60 + currentTime.getMinutes(),
                    }}
                  />
                  {calendarType === "day"
                    ? (() => {
                        const dayEvents = events.filter(
                          (item) =>
                            new Date(item.startTime).toDateString() ===
                            viewDate.toDateString(),
                        );
                        const positioned = getPositionedEventsForDay(dayEvents);
                        return positioned.map((item, i) => {
                          const subWidth = 100 / item.totalCols;
                          const leftPos = item.colIdx * subWidth;
                          return (
                            <CalEvent
                              key={i}
                              id={item.id}
                              start={new Date(item.startTime)}
                              end={new Date(item.endTime)}
                              name={item.eventName}
                              styleOverride={{
                                left: `${leftPos}%`,
                                width: `${subWidth}%`,
                              }}
                            />
                          );
                        });
                      })()
                    : currentWeekDays.map((day, dayIdx) => {
                        const dayEvents = events.filter(
                          (item) =>
                            new Date(item.startTime).toDateString() ===
                            day.date.toDateString(),
                        );
                        const positioned = getPositionedEventsForDay(dayEvents);
                        return positioned.map((item, i) => {
                          const baseWidth = 100 / 7;
                          const subWidth = baseWidth / item.totalCols;
                          const leftPos =
                            dayIdx * baseWidth + item.colIdx * subWidth;
                          return (
                            <CalEvent
                              key={i}
                              id={item.id}
                              start={new Date(item.startTime)}
                              end={new Date(item.endTime)}
                              name={item.eventName}
                              styleOverride={{
                                left: `${leftPos}%`,
                                width: `${subWidth}%`,
                              }}
                            />
                          );
                        });
                      })}
                </div>
              )}
              {calendarType === "month" && (
                <div className="rc-month-grid">
                  {currentMonthDays.map((d, i) => {
                    const dayEvents = events.filter(
                      (item) =>
                        new Date(item.startTime).toDateString() ===
                        d.date.toDateString(),
                    );

                    return (
                      <div
                        key={i}
                        className={`rc-month-cell ${!d.isCurrentMonth ? "grey" : ""} ${d.isToday ? "today" : ""}`}
                        onClick={() => {
                          const year = d.date.getFullYear();
                          const month = String(d.date.getMonth() + 1).padStart(
                            2,
                            "0",
                          );
                          const day = String(d.date.getDate()).padStart(2, "0");
                          const dateString = `${year}-${month}-${day}`;

                          navigate(`/kalendarz?type=day&date=${dateString}`);
                        }}
                      >
                        <div className="rc-month-day-header">
                          <span>{d.dayNumber}</span>
                        </div>
                        <div className="rc-month-events-container">
                          {dayEvents.slice(0, 3).map((e, idx) => (
                            <CalEvent
                              key={idx}
                              id={e.id}
                              start={new Date(e.startTime)}
                              end={new Date(e.endTime)}
                              name={e.eventName}
                              isSmall
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="rc-month-more-events">
                              + {dayEvents.length - 3} więcej
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Calendar;
