import logo from "./../../../assets/svgs/logo.svg";
import logo2 from "./../../../assets/images/logo2.png";
import t4b from "./../../../assets/images/t4b.png";
import t4f from "./../../../assets/images/t4f.png";
import diets from "./../../../assets/svgs/diets.svg";
import dietsSelected from "./../../../assets/svgs/dietsSelected.svg";
import home from "./../../../assets/svgs/home.svg";
import homeSelected from "./../../../assets/svgs/homeSelected.svg";
import calendar from "./../../../assets/svgs/calendar.svg";
import calendarSelected from "./../../../assets/svgs/calendarSelected.svg";
import events from "./../../../assets/svgs/events.svg";
import eventsSelected from "./../../../assets/svgs/eventsSelected.svg";
import training from "./../../../assets/svgs/training.svg";
import trainingSelected from "./../../../assets/svgs/trainingSelected.svg";
import trainers from "./../../../assets/svgs/trainers.svg";
import trainersSelected from "./../../../assets/svgs/trainersSelected.svg";

import "./../../../styles/mainpage.css";
import { FaRegCalendar as Calendar, FaHouse as House } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar({ ist4b }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <nav className={`sidebar ${ist4b ? "t4b" : ""}`}>
        <img src={!ist4b ? logo : logo2} alt="Logo" className="sidebar-logo" />
        <div className="sideicon-wrapper">
          <img
            style={{ maxHeight: "22px" }}
            src={
              location.pathname.startsWith("/strona-glowna")
                ? homeSelected
                : home
            }
            className={`sidebar-icon icon ${location.pathname == "/strona-glowna" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/strona-glowna")}
          />
        </div>
        <div className="sideicon-wrapper">
          <img
            style={{ maxHeight: "22px" }}
            src={
              location.pathname.startsWith("/kalendarz")
                ? calendarSelected
                : calendar
            }
            className={`sidebar-icon icon ${location.pathname == "/kalendarz" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/kalendarz")}
          />
        </div>
        <div className="sideicon-wrapper">
          <img
            style={{ maxHeight: "22px" }}
            src={
              location.pathname.startsWith("/eventy") ? eventsSelected : events
            }
            className={`sidebar-icon icon ${location.pathname == "/eventy" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/eventy")}
          />
        </div>
        <div className="sideicon-wrapper">
          <img
            style={{ maxHeight: "22px" }}
            src={
              location.pathname.startsWith("/cwiczenia")
                ? trainingSelected
                : training
            }
            className={`sidebar-icon icon ${location.pathname == "/cwiczenia" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/cwiczenia")}
          />
        </div>
        <div className="sideicon-wrapper">
          <img
            style={{ maxHeight: "22px" }}
            src={location.pathname.startsWith("/diety") ? dietsSelected : diets}
            className={`sidebar-icon icon ${location.pathname == "/diety" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/diety")}
          />
        </div>
        <div className="sideicon-wrapper">
          <img
            style={{ maxHeight: "22px" }}
            src={
              location.pathname.startsWith("/lista-trenerow")
                ? trainersSelected
                : trainers
            }
            className={`sidebar-icon icon ${location.pathname == "/lista-trenerow" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/lista-trenerow")}
          />
        </div>
        <div className={`sideicon-wrapper ${ist4b ? "t4f" : "t4b"}`} id="last">
          <img
            src={ist4b ? t4f : t4b}
            alt=""
            onClick={() =>
              navigate(
                `${ist4b ? "/strona-glowna" : "/time-4-biz/menu-placowek"}`,
              )
            }
          />
        </div>
      </nav>
    </>
  );
}

export default SideBar;
