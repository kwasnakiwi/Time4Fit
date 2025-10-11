import { useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/mainpage.css'
import { useParams } from "react-router-dom";

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

	return(
		<>
			<NavBar route='Eventy / Szczegóły Eventu' title='Szczegóły Eventu' />
			<SideBar />
			<main className="events-main">
        <div className="main-events-container">
					<p>{eventDetails.long_desc}</p>
				</div>
			</main>
			
		</>
	)
}

export default EventDetails