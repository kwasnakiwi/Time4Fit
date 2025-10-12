import { useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/mainpage.css'
import { useParams } from "react-router-dom";
import eventImg from '../../../assets/images/event.png'
import { FaRegCalendar as Calendar } from "react-icons/fa";
import { BiMap as Pin } from "react-icons/bi";
import StaticMap from "../components/StaticMap.jsx";

function EventDetails(){
	const { id } = useParams();
	const [eventDetails, setEventDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const getEventDetails = async () => {
			try{
				const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}${id}`);
				const data = await response.json();

				if (!response.ok) {
          throw new Error(data.details || "Błąd wczytywania eventu");
        }

				setEventDetails(data);
			}
			catch(err){
				console.error(err);
			}
			finally{
				setIsLoading(false)
			}
		}

		getEventDetails();
	}, [id]);

  
	if (isLoading) return <h1 style={{textAlign: 'center'}}>Ładowanie...</h1>
	if (!eventDetails) return <h1 style={{textAlign: 'center'}}>Nie znaleziono wydarzenia.</h1>

	const date = new Date(eventDetails.date_time_event);
	const formattedDate = date.toLocaleString("pl-PL", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});

	const capitalizedDate = formattedDate.slice(0, 1).toUpperCase() + formattedDate.slice(1)


	return(
		<>
			<NavBar route='Eventy / Szczegóły Eventu' title='Szczegóły Eventu' />
			<SideBar />
			<main className="events-main">
        <div className="main-events-container">
					<header className="top-filters">
					  <div className="event-type-buttons">
              <button className="event-type-button event-type-button-selected">Wydarzenie</button>
              <button className="event-type-button">Lista uczestników</button>
							<button className="event-type-button">Zaproszenia</button>
            </div>
						<div className="edit-delete-btns">
							<button className="event-type-button delete-event-btn">Usuń wydarzenie</button>
							<button className="event-type-button edit-event-btn">Edytuj wydarzenie</button>
						</div>
					</header>
					<div className="event-details-content">
						<div className="event-details-content-left">
							<div className="event-important-details">
								<img src={eventImg} alt="zdjecie wydarzenia" />
								<div className="event-details-wrapper">
									<div className="event-details-title-box">
										<div className="title-date">
											<h2 className="event-details-title">{eventDetails.title}</h2>
											<p className="event-details-date"><Calendar className="icon" />{capitalizedDate}</p>
										</div>
										<div className="people-price">
											<div className="event-details-places">
												<span className="event-details-span">Miejsca:</span><br />
												<span className="event-details-content-span">{eventDetails.event_participant_count} / {eventDetails.additional_info.places_for_people_limit}</span>
											</div>
											<div className="event-details-price">
												<span className="event-details-span">Cena:</span><br />
												<span className="event-details-content-span orange">{eventDetails.additional_info.price} PLN</span>
											</div>
										</div>
									</div>
									<hr className="event-details-line" />
									<div className="event-details-long-desc-box">
										<h3 className="event-details-long-desc-title">W skrócie</h3>
										<p className="event-details-long-desc">{eventDetails.long_desc}</p>
									</div>
									<hr className="event-details-line" />
									<div className="event-details-localization-box">
										<h3 className="event-details-long-desc-title"><Pin class="icon" /> Lokalizacja</h3>
										<span className="event-details-localization">
											{ eventDetails.flat_number ? `${eventDetails.city}, ${eventDetails.street} ${eventDetails.street_number}/${eventDetails.flat_number}` : `${eventDetails.city}, ${eventDetails.street} ${eventDetails.street_number}`}
										</span>
										<StaticMap 
											lat={eventDetails.latitude}
											lng={eventDetails.longitude}
											city={eventDetails.city}
											street={eventDetails.street}
											streetNumber={eventDetails.street_number}
											postial={eventDetails.postial}
										/>
									</div>
								</div>
							</div>
							<div className="event-details-list-box event-important-details">
								<h3 className="event-details-list-title">Zasady udziału i wskazówki dla uczestników</h3>
								<ol className="event-details-list">
									<li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nihil!</li>
									<li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nihil!</li>
									<li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nihil!</li>
									<li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nihil!</li>
									<li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nihil!</li>
									<li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nihil!</li>
									<li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nihil!</li>
								</ol>
							</div>
						</div>
						<div className="event-details-content-right">
							sigma
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default EventDetails