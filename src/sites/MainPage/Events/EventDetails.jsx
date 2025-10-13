import { useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/mainpage.css'
import { useNavigate, useParams } from "react-router-dom";
import eventImg from '../../../assets/images/event.png'
import { FaRegCalendar as Calendar, FaRegStar as Star } from "react-icons/fa";
import { BiMap as Pin } from "react-icons/bi";
import StaticMap from "../components/StaticMap.jsx";
import pfp from './../../../assets/images/staff-pfp.png'

function EventDetails(){
	const { id } = useParams();
	const [eventDetails, setEventDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showPopup, setShowPopup] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const getEventDetails = async () => {
			try{
				const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}${id}/`);
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

	const levels = {
		none: "Brak",
		beginner: "Początkujący",
		"semi-advanced": "Średnio zaawansowany",
		advanced: "Zaawansowany"
  };
  const advancedLevel = levels[eventDetails.additional_info.advanced_level];

	const handleDeleteClick = () => {
		setShowPopup(true);
	};

	const handleDeleteConfirm = async () => {
		try{
			const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}${id}/`,{
				method: "DELETE",
			});

			if (!response.ok) {
        throw new Error("Błąd podczas usuwania");
      }

		}
		catch(err){
			console.error(err);
		}
		finally{
			setShowPopup(false);
		}

		navigate('/events');
	};

	const handleDeleteCancel = () => {
		setShowPopup(false);
	};

	return(
		<>
			{showPopup && <div className="delete-event-popup">
				<h1>Czy napewno chcesz usunąć to wydarzenie?</h1>
				<p>Wszytskie informacje o nim zostaną usunięte i nie będzie można ich przywrócić</p>
				<div className="delete-event-popup-btns">
					<button className="delete-event-popup-cancel-btn event-type-button edit-event-btn" onClick={handleDeleteCancel} >Anuluj</button>
					<button className="delete-event-popup-cancel-btn event-type-button delete-event-btn" onClick={handleDeleteConfirm}>Tak, usuń</button>
				</div>
			</div>}
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
							<button className="event-type-button delete-event-btn" onClick={handleDeleteClick}>Usuń wydarzenie</button>
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
										<p className="event-details-long-desc">{eventDetails.short_desc}</p>
									</div>
									<hr className="event-details-line" />
									<div className="event-details-localization-box">
										<h3 className="event-details-long-desc-title"><Pin className="icon" /> Lokalizacja</h3>
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
							<div className="event-details-list-box event-important-details">
								<h3 className="event-details-list-title">Szczegóły organizacyjne</h3>
								<div className="event-details-details">
									<div className="event-details-detail">
										<h4 className="event-details-detail-title">Kategoria:</h4>
										<p className="event-details-detail-content">{eventDetails.category_name}</p>
									</div>
									<div className="event-details-detail">
										<h4 className="event-details-detail-title">Poziom zaawansowania:</h4>
										<p className="event-details-detail-content">{advancedLevel}</p>
									</div>
									<div className="event-details-detail">
										<h4 className="event-details-detail-title">Grupa wiekowa:</h4>
										<p className="event-details-detail-content">{eventDetails.additional_info.age_limit}</p>
									</div>
									<div className="event-details-detail">
										<h4 className="event-details-detail-title">Dostępność wydarzenia:</h4>
										<p className="event-details-detail-content">{eventDetails.public_event ? "Publiczne" : "Prywatne"}</p>
									</div>
								</div>
							</div>
							<div className="event-details-list-box event-important-details">
								<h3 className="event-details-list-title">Kadra wydarzenia</h3>
								<div className="staff-box">
									<div className="staff">
										<img src={pfp} alt="zdjecie profilowe" />
										<div className="staff-content">
											<h4 className="staff-name">Tomasz Nowak</h4>
											<span className="staff-class">Założyciel</span>
											<p className="staff-desc">
												Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
												Illum asperiores quibusdam quisquam, minus fugiat voluptatem 
												cumque dolore nihil autem sunt inventore eligendi, magni, 
												corporis reprehenderit?
											</p>
											<div className="staff-profile-btn-wrapper">
												<button className="staff-profile-btn">Zobacz profil</button>
											</div>
										</div>
									</div>
									<div className="staff">
										<img src={pfp} alt="zdjecie profilowe" />
										<div className="staff-content">
											<h4 className="staff-name">Tomasz Nowak</h4>
											<span className="staff-class">Założyciel</span>
											<p className="staff-desc">
												Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
												Illum asperiores quibusdam quisquam, minus fugiat voluptatem 
												cumque dolore nihil autem sunt inventore eligendi, magni, 
												corporis reprehenderit?
											</p>
											<div className="staff-profile-btn-wrapper">
												<button className="staff-profile-btn">Zobacz profil</button>
											</div> 
										</div>
									</div>
									<div className="staff">
										<img src={pfp} alt="zdjecie profilowe" />
										<div className="staff-content">
											<h4 className="staff-name">Tomasz Nowak</h4>
											<span className="staff-class">Założyciel</span>
											<p className="staff-desc">
												Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
												Illum asperiores quibusdam quisquam, minus fugiat voluptatem 
												cumque dolore nihil autem sunt inventore eligendi, magni, 
												corporis reprehenderit?
											</p>
											<div className="staff-profile-btn-wrapper">
												<button className="staff-profile-btn">Zobacz profil</button>
											</div>
										</div>
									</div>
								</div>
								<hr className="event-details-line" />
								<div className="event-details-special-guests-box">
									<h3 className="event-details-long-desc-title"><Star className="icon" /> Goście specjalni</h3>
									<div className="event-details-special-guests">
										{eventDetails.additional_info.special_guests.map((guest, i) => (
											<div key={guest.id} className="event-details-special-guest">
												<span className="event-details-special-guests-enumerate">{i + 1}.</span>
												<h4 className="event-details-special-guest-name">{guest.name} {guest.surname}</h4>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default EventDetails