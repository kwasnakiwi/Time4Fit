import { useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/mainpage.css'

function Events(){
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async () => {
        try{
          const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}`);
          const data = await response.json();

          if(!response.ok){
            throw new Error(data.details || "błąd");
          }

          setEvents(data.results || data || []);
          console.log(data.results)
        }
        catch(err){
          console.error(err)
        }
      }

    getEvents();
  }, [])

  


  return(
    <>
      <NavBar route="Eventy" title="Eventy"/>
      <SideBar />
      <main className="events-main">
        <div className="main-events-container">
          {events.map(event => (
            <p key={event.id}>{event.id} {event.title} {event.category_name} {event.short_desc} {event.date_time_event} {event.additional_info.places_for_people_limit} {event.additional_info.price} {event.additional_info.advanced_level} {event.additional_info.age_limit}</p>
          ))}
        </div>
      </main>
    </>
  )
}

export default Events