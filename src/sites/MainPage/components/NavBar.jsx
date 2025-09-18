import { FaRegBell as Bell,
         FaArrowLeft as LeftArrow,
         FaAngleDown as AngleDown,
                                  } from "react-icons/fa";
import pfp from './../../../assets/images/pfp.png';
import './../../../styles/mainpage.css'

function NavBar(props){

  return(
    <>
      <nav className="navbar">
        <div className="route-box">
          <h5 className="route">{props.route ?? "Eventy"}</h5>
          <h3 className="title"><span><LeftArrow className="icon"/></span>{props.title ?? "Eventy"}</h3>
        </div>
        <Bell className="notification-icon" />
        <div className="profile-box">
          <img src={pfp} />
          <div className="name-data">
            <h4 className="name-data-text bold">Andrzej Marek</h4>
            <h4 className="name-data-text">Użytkownik</h4>
          </div>
          <AngleDown className="icon" />
        </div>
      </nav>
    </>
  )
}

export default NavBar