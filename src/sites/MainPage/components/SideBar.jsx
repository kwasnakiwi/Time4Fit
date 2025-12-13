import logo from './../../../assets/images/appLogo.png';
import eventsIcon from './../../../assets/images/event-icon.png';
import eventsIconSelected from './../../../assets/images/orange-event-icon.png';
import './../../../styles/mainpage.css';
import { FaRegCalendar as Calendar, FaHouse as House } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';

function SideBar(){
  const location = useLocation();
  const navigate = useNavigate();

  return(
    <>
      <nav className='sidebar'>
        <img src={logo} alt="Logo" className='sidebar-logo' />
        <div className="sideicon-wrapper">
          <House 
            className={
              `sidebar-icon icon ${location.pathname == "/strona-glowna" ? 'sidebar-selected' : ''}`
            } 
            onClick={() => navigate("/strona-glowna")}
          />
        </div>
        <div className='sideicon-wrapper'>
          <Calendar 
            className={
                `sidebar-icon icon ${location.pathname == "/kalendarz" ? 'sidebar-selected' : ''}`
            }  
            onClick={() => navigate("/kalendarz")}
          />
        </div>
        <div className='sideicon-wrapper'>
          <img
            style={{maxHeight: "22px"}}
            src={location.pathname.startsWith("/eventy") ? eventsIconSelected : eventsIcon}
            className={
                `sidebar-icon icon ${location.pathname == "/eventy" ? 'sidebar-selected' : ''}`
            }  
            onClick={() => navigate("/eventy")}
          />
        </div>
      </nav>
    </>
  )
}

export default SideBar