import { FaRegBell as Bell,
         FaArrowLeft as LeftArrow,
         FaAngleDown as AngleDown,
         FaBars as Hamburger } from "react-icons/fa";
import pfp from './../../../assets/images/pfp.png';
import mobileLogo from './../../../assets/images/mobile-logo.png';
import './../../../styles/navbar.css';
import { Link } from "react-router-dom";

function NavBar(props) {

  const handleBellHover = (e) => {
    const bell = e.currentTarget;
    bell.classList.add("animated-bell");
    bell.addEventListener(
      "animationend",
      () => bell.classList.remove("animated-bell"),
      { once: true }
    );
  };

  return (
    <>
      <nav className="navbar">
        <div className="route-box">
          <h5 className="route">{props.route ?? "-"}</h5>
          <h3 className="nav-title">
            <Link to={props.linkRoute ?? "#"}><span><LeftArrow className="icon"/></span></Link>
            {props.title ?? "-"}
          </h3>
        </div>
        <Bell 
          className="notification-icon"
          onMouseEnter={handleBellHover}
        />
        <div className="profile-box">
          <img src={pfp} alt="Profile" />
          <div className="name-data">
            <h4 className="name-data-text bold">Andrzej Marek</h4>
            <h4 className="name-data-text">Użytkownik</h4>
          </div>
          <AngleDown className="icon" />
        </div>
      </nav>

      {/* mobile */}
      <nav className="mobile-nav">
        <div className="row-sidebar">
          <Hamburger className="hamburger" />
          <img className="mob-logo" src={mobileLogo} alt="4 FIT" />
          <div className="notification-profile">
            <Bell 
              onMouseEnter={handleBellHover}
              className="mob-bell-icon"
            />
            <img src={pfp} alt="profile picture" />
          </div>
        </div>
        <div className="mob-navbar">
          <div className="mob-route-box">
            <h5 className="mob-route">{props.route ?? "-"}</h5>
            <div className="mob-navbar-content">
              <h3 className="mob-nav-title">
                <Link to={props.linkRoute ?? "#"}><span><LeftArrow className="icon"/></span></Link>
                {props.title ?? "-"}
              </h3>
              {props.page === "main" &&
                <div className="nav-operate-buttons">
                  <button className="nav-operate-btn delete" onClick={props.firstFunction ?? ""}>{props.firstBtnText ?? "-"}</button>
                  <button className="nav-operate-btn edit" onClick={props.secondFunction ?? ""}>{props.secondBtnText ?? "-"}</button>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
