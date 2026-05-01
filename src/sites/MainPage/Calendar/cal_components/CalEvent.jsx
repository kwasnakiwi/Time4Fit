import React from "react";
import "../../../../styles/calendar.css";
import { useNavigate } from "react-router-dom";

function CalEvent({ name, start, end, width, styleOverride, id, isSmall }) {
  const colors = ["#D8F6DC", "#DEF1F7", "#DEDFF7", "#F7F7DE"];
  const borderColors = ["#4EDF62", "#53CFF6", "#5361F6", "#E3F653"];

  const colorIndex = id ? id % colors.length : 0;
  const backgroundColor = colors[colorIndex];
  const borderColor = borderColors[colorIndex];

  const navigate = useNavigate();

  const getElementLeftProp = () => {
    const day = start.getDay() === 0 ? 6 : start.getDay() - 1;
    return day * (100 / 7);
  };

  const getElementStyle = (start, end) => {
    const HOUR_HEIGHT = 60; // musi być zgodne z CSS (.rc-row height)
    const MINUTE_HEIGHT = HOUR_HEIGHT / 60; // czyli 1px za minutę

    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const endMinutes = end.getHours() * 60 + end.getMinutes();
    const duration = endMinutes - startMinutes;

    return {
      top: `${startMinutes * MINUTE_HEIGHT}px`,
      height: `${duration * MINUTE_HEIGHT}px`,
      position: "absolute",
      left: `${getElementLeftProp()}%`,
      right: 0,
      zIndex: 10,
      width: "100%",
      maxWidth: `${width}%`,
      backgroundColor: backgroundColor,
      borderLeft: `4px solid ${borderColor}`,
      ...styleOverride,
    };
  };

  const getTimeDisplay = (time) => {
    const d = new Date(time);
    return (
      d.getHours().toString() + ":" + d.getMinutes().toString().padStart(2, "0")
    );
  };

  return (
    <>
      {!isSmall ? (
        <div
          onClick={() => navigate(`/eventy/${id}`)}
          className="rc-element"
          style={getElementStyle(start, end)}
        >
          <span className="ev-name">{name}</span>
          <br />
          <span>
            {getTimeDisplay(start)} - {getTimeDisplay(end)}
          </span>
        </div>
      ) : (
        <div
          onClick={() => navigate(`/eventy/${id}`)}
          className="rc-month-event-strip"
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <span className="rc-event-dot"></span>
          <span className="rc-event-name" style={{ color: borderColor }}>
            {name}
          </span>
        </div>
      )}
    </>
  );
}

export default CalEvent;
