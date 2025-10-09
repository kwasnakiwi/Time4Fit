import logo from './../../../assets/images/appLogo.png';
import './../../../styles/mainpage.css';
import { FaRegCalendar as Calendar, FaHouse as House } from 'react-icons/fa6';

function SideBar(){
  

  return(
    <>
      <nav className='sidebar'>
        <img src={logo} alt="Logo" className='sidebar-logo' />
        <div className="sideicon-wrapper">
          <House className='sidebar-icon icon sidebar-selected' />
        </div>
        <div className='sideicon-wrapper'>
          <Calendar className='sidebar-icon icon' />
        </div>
      </nav>
    </>
  )
}

export default SideBar