import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/mainpage.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import eventImg from '../../../assets/images/event.png'

function EventInvitation(){


  return(
    <>
      <NavBar route='Eventy / Szczegóły Eventu / Zaproszenie do eventu' title='Zaproszenie do eventu' linkRoute="/eventy"/>
			<SideBar />
			<main className="events-main">
        <div className="main-events-container relative">
          <div className="event-invitation">
            <img src={eventImg} alt="Zdjęcie wydarzenia" />
            <div className="event-invitation-content">
              <p className="invitation-p">
                Otrzymałeś zaproszenie do wydarzenia:
              </p>
              <h2 className="event-invitation-title">Joga dla zdrowia</h2>
              <span className="event-invitation-autor">Utworzone przez: <Link to="#">Tomasz Kaliński</Link></span>
              <div className="event-info-box">
                <div className="event-info">
                  <span className="event-info-title">Kategoria:</span><br />
                  <span className="event-info-value">Joga</span>
                </div>
                <div className="event-info">
                  <span className="event-info-title">Grupa wiekowa:</span><br />
                  <span className="event-info-value">18+</span>
                </div>
                <div className="event-info">
                  <span className="event-info-title">Poziom zaawansowania:</span><br />
                  <span className="event-info-value">średniozaawansowany</span>
                </div>
                <div className="event-info">
                  <span className="event-info-title">Miejsca:</span><br />
                  <span className="event-info-value invitation-span"><b className="invitation-bold">35</b> / 50</span>
                </div>
              </div>
              <div className="invitation-buttons">
                <button className="invitation-btn cancel">Anuluj</button>
                <button className="invitation-btn accept">Zaakceptuj zaproszenie</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default EventInvitation