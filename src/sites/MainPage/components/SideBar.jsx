import logo from "./../../../assets/images/appLogo.png";
import logo2 from "./../../../assets/images/logo2.png";
import eventsIcon from "./../../../assets/images/event-icon.png";
import eventsIconSelected from "./../../../assets/images/orange-event-icon.png";
import t4b from "./../../../assets/images/t4b.png";
import t4f from "./../../../assets/images/t4f.png";

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
          <House
            className={`sidebar-icon icon ${location.pathname == "/strona-glowna" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/strona-glowna")}
          />
        </div>
        <div className="sideicon-wrapper">
          <Calendar
            className={`sidebar-icon icon ${location.pathname == "/kalendarz" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/kalendarz")}
          />
        </div>
        <div className="sideicon-wrapper">
          <img
            style={{ maxHeight: "22px" }}
            src={
              location.pathname.startsWith("/eventy")
                ? eventsIconSelected
                : eventsIcon
            }
            className={`sidebar-icon icon ${location.pathname == "/eventy" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/eventy")}
          />
        </div>
        <div className="sideicon-wrapper">
          <img
            style={{ maxHeight: "22px" }}
            src={
              location.pathname.startsWith("/lista-trenerow")
                ? eventsIconSelected
                : eventsIcon
            }
            className={`sidebar-icon icon ${location.pathname == "/lista-trenerow" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/lista-trenerow")}
          />
        </div>
        <div className="sideicon-wrapper">
          <img
            style={{ maxHeight: "22px" }}
            src={
              location.pathname.startsWith("/produkty")
                ? eventsIconSelected
                : eventsIcon
            }
            className={`sidebar-icon icon ${location.pathname == "/produkty" ? "sidebar-selected" : ""} ${ist4b ? "t4b" : ""}`}
            onClick={() => navigate("/produkty")}
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
