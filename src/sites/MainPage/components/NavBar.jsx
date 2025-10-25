import { FaRegBell as Bell,
         FaArrowLeft as LeftArrow,
         FaAngleDown as AngleDown } from "react-icons/fa";
import pfp from './../../../assets/images/pfp.png';
import './../../../styles/mainpage.css';
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
    </>
  );
}

export default NavBar;
