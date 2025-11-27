import { useState } from "react";
import { FaAngleLeft as AngleLeft, FaAngleRight as AngleRight } from "react-icons/fa";

const weekDays = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
const monthNames = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];

export default function Calendar({ selected, onSelect }) {
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();

  // pierwszy dzień miesiąca
  const firstDay = new Date(year, month, 1).getDay(); 
  const startingDay = (firstDay === 0 ? 7 : firstDay) - 1;

  // liczba dni w miesiącu
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < startingDay; i++) {
    days.push(null); // puste pola
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const prevMonth = () => setDate(new Date(year, month - 1, 1));
  const nextMonth = () => setDate(new Date(year, month + 1, 1));
  const todayDate = new Date();
  const todayDay = todayDate.getDate();
  const todayMonth = todayDate.getMonth();
  const todayYear = todayDate.getFullYear();


  return (
    <div className="calendar">
      <div className="cal-header">
        <button onClick={prevMonth}><AngleLeft /></button>
        <span>{monthNames[month]} {year}</span>
        <button onClick={nextMonth}><AngleRight /></button>
      </div>

      <div className="cal-weekdays">
        {weekDays.map(w => <div key={w}>{w}</div>)}
      </div>

      <div className="cal-days">
        {days.map((day, i) => (
          <div
            key={i}
            className={
              day
              ? selected?.getDate() === day &&
                selected.getMonth() === month &&
                selected.getFullYear() === year
                  ? "day selected"
                  : todayDay === day &&
                    todayMonth === month &&
                    todayYear === year
                      ? "day today"
                      : "day"
              : "day"
            }

            onClick={() => day && onSelect(new Date(year, month, day))}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}
