import {
  FaRegBell as Bell,
  FaArrowLeft as LeftArrow,
  FaAngleDown as AngleDown,
  FaBars as Hamburger,
} from "react-icons/fa";
import pfp from "./../../../assets/images/pfp.png";
import mobileLogo from "./../../../assets/images/mobile-logo.png";
import "./../../../styles/navbar.css";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { apiFetch } from "../../../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints";
import { UserContext } from "../../../utils/UserContext";

function NavBar({
  route,
  ist4b,
  title,
  linkRoute,
  firstFunction,
  secondFunction,
  firstBtnText,
  secondBtnText,
  page,
}) {
  const { me, loading, isLoggedIn } = useContext(UserContext);

  const handleBellHover = (e) => {
    const bell = e.currentTarget;
    bell.classList.add("animated-bell");
    bell.addEventListener(
      "animationend",
      () => bell.classList.remove("animated-bell"),
      { once: true },
    );
  };

  const navigate = useNavigate();

  if (loading) return <h1>Ładowanie...</h1>;

  return (
    <>
      <nav className="navbar">
        <div className="route-box">
          <h5 className="route">{route ?? "-"}</h5>
          <h3 className={`nav-title ${ist4b ? "t4b" : ""}`}>
            <span onClick={() => navigate(-1)}>
              <LeftArrow className="icon" />
            </span>
            {title ?? "-"}
          </h3>
        </div>
        {isLoggedIn && (
          <Bell
            className={`notification-icon ${ist4b ? "t4b" : ""}`}
            onMouseEnter={handleBellHover}
          />
        )}
        {isLoggedIn ? (
          <Link
            to={"/profil/edycja"}
            style={{ color: "black", textDecoration: "none" }}
          >
            <div className="profile-box-container">
              <div className="profile-box">
                <img src={pfp} alt="Profile" />
                <div className="name-data">
                  <h4 className="name-data-text bold">
                    {me?.profile?.name} {me?.profile?.surname}
                  </h4>
                  <h4 className="name-data-text">
                    {!me.subscription
                      ? "Użytkownik"
                      : me?.subscription?.plan_name}
                  </h4>
                </div>
                <AngleDown className="icon" />
              </div>
            </div>
          </Link>
        ) : (
          <button onClick={() => navigate("/")} className="log-in-btn">
            Zaloguj się
          </button>
        )}
      </nav>

      {/* mobile */}
      <nav className="mobile-nav">
        <div className="row-sidebar">
          <Hamburger className="hamburger" />
          <img className="mob-logo" src={mobileLogo} alt="4 FIT" />
          <div className="notification-profile">
            <Bell onMouseEnter={handleBellHover} className="mob-bell-icon" />
            <img src={pfp} alt="profile picture" />
          </div>
        </div>
        <div className="mob-navbar">
          <div className="mob-route-box">
            <h5 className="mob-route">{route ?? "-"}</h5>
            <div className="mob-navbar-content">
              <h3 className="mob-nav-title">
                <Link to={linkRoute ?? "#"}>
                  <span>
                    <LeftArrow className="icon" />
                  </span>
                </Link>
                {title ?? "-"}
              </h3>
              {page === "main" && (
                <div className="nav-operate-buttons">
                  <button
                    className="nav-operate-btn delete"
                    onClick={firstFunction ?? ""}
                  >
                    {firstBtnText ?? "-"}
                  </button>
                  <button
                    className="nav-operate-btn edit"
                    onClick={secondFunction ?? ""}
                  >
                    {secondBtnText ?? "-"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
