import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/mainpage.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import eventImg from '../../../assets/images/eventImg.png'
import { FaRegCalendar as Calendar,
         FaRegStar as Star, 
         FaAngleDown as AngleDown,
         FaEnvelope as Envelope, 
         FaPhoneAlt as Phone,
         FaCheck as CheckMark } from "react-icons/fa";
import { BiMap as Pin, BiX as XMark} from "react-icons/bi";
import StaticMap from "../components/StaticMap.jsx";
import pfp from './../../../assets/images/staff-pfp.png'
import Map from "../components/Map.jsx";
import footIcon from './../../../assets/images/foot.png';
import leaveIcon1 from './../../../assets/images/leave1.png'
import leaveIcon2 from './../../../assets/images/leave2.png'
import { LocationContext } from "../../../utils/LocationContext.jsx";
import { QRCodeCanvas } from "qrcode.react";
import plus from "./../../../assets/images/+.png"

function EventDetails(){
	const { id, access_code } = useParams();
	const { lat, lng } = useContext(LocationContext);
	const [eventDetails, setEventDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showPopup, setShowPopup] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
	const [count, setCount] = useState(1);
	const [showFormatted, setShowFormatted] = useState(false);
	const [price, setPrice] = useState(0);
	const [shortDesc, setShortDesc] = useState("");
	const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postial, setPostial] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
	const [longDesc, setLongDesc] = useState("");
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("");
	const [advancedLevel, setAdvancedLevel] = useState("");
	const [ageLimit, setAgeLimit] = useState("");
	const [isPublic, setIsPublic] = useState(true);
  const [showGenerateCodePopup, setShowGenerateCodePopup] = useState(false);
	const [specialGuests, setSpecialGuests] = useState([{name: "", nickname: "", surname: ""}]);
  const [isCodeOneUse, setIsCodeOneUse] = useState(true);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [invitations, setInvitations] = useState([]);
  const [participants, setParticipants] = useState([
  // {
  //   id: 1,
  //   user: {
  //     id: 1,
  //     email: "jan.kowalski@example.com",
  //     profile: {
  //       name: "Jan",
  //       surname: "Kowalski",
  //       phone_number: "+48 501 123 456",
  //       profile_picture: "https://randomuser.me/api/portraits/men/32.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: true,
  //   presence: true
  // },
  // {
  //   id: 2,
  //   user: {
  //     id: 2,
  //     email: "anna.nowak@example.com",
  //     profile: {
  //       name: "Anna",
  //       surname: "Nowak",
  //       phone_number: "+48 502 987 654",
  //       profile_picture: "https://randomuser.me/api/portraits/women/68.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: true,
  //   presence: false
  // },
  // {
  //   id: 3,
  //   user: {
  //     id: 3,
  //     email: "piotr.zielinski@example.com",
  //     profile: {
  //       name: "Piotr",
  //       surname: "Zieliński",
  //       phone_number: "+48 503 111 222",
  //       profile_picture: "https://randomuser.me/api/portraits/men/41.jpg"
  //     }
  //   },
  //   role: "organizer",
  //   paid_status: false,
  //   presence: true
  // },
  // {
  //   id: 4,
  //   user: {
  //     id: 4,
  //     email: "magda.kwiatkowska@example.com",
  //     profile: {
  //       name: "Magda",
  //       surname: "Kwiatkowska",
  //       phone_number: "+48 505 444 555",
  //       profile_picture: "https://randomuser.me/api/portraits/women/59.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: true,
  //   presence: true
  // },
  // {
  //   id: 5,
  //   user: {
  //     id: 5,
  //     email: "adam.nowicki@example.com",
  //     profile: {
  //       name: "Adam",
  //       surname: "Nowicki",
  //       phone_number: "+48 506 333 777",
  //       profile_picture: "https://randomuser.me/api/portraits/men/64.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: false,
  //   presence: false
  // },
  // {
  //   id: 6,
  //   user: {
  //     id: 6,
  //     email: "maria.wisniewska@example.com",
  //     profile: {
  //       name: "Maria",
  //       surname: "Wiśniewska",
  //       phone_number: "+48 507 888 999",
  //       profile_picture: "https://randomuser.me/api/portraits/women/44.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: true,
  //   presence: true
  // },
  // {
  //   id: 7,
  //   user: {
  //     id: 7,
  //     email: "michal.wojcik@example.com",
  //     profile: {
  //       name: "Michał",
  //       surname: "Wójcik",
  //       phone_number: "+48 508 222 333",
  //       profile_picture: "https://randomuser.me/api/portraits/men/12.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: false,
  //   presence: true
  // },
  // {
  //   id: 8,
  //   user: {
  //     id: 8,
  //     email: "karolina.lewandowska@example.com",
  //     profile: {
  //       name: "Karolina",
  //       surname: "Lewandowska",
  //       phone_number: "+48 509 444 555",
  //       profile_picture: "https://randomuser.me/api/portraits/women/25.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: true,
  //   presence: false
  // },
  // {
  //   id: 9,
  //   user: {
  //     id: 9,
  //     email: "tomasz.kaczmarek@example.com",
  //     profile: {
  //       name: "Tomasz",
  //       surname: "Kaczmarek",
  //       phone_number: "+48 510 777 111",
  //       profile_picture: "https://randomuser.me/api/portraits/men/70.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: false,
  //   presence: false
  // },
  // {
  //   id: 10,
  //   user: {
  //     id: 10,
  //     email: "katarzyna.dabrowska@example.com",
  //     profile: {
  //       name: "Katarzyna",
  //       surname: "Dąbrowska",
  //       phone_number: "+48 511 222 444",
  //       profile_picture: "https://randomuser.me/api/portraits/women/14.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: true,
  //   presence: true
  // },
  // {
  //   id: 11,
  //   user: {
  //     id: 11,
  //     email: "pawel.mazur@example.com",
  //     profile: {
  //       name: "Paweł",
  //       surname: "Mazur",
  //       phone_number: "+48 512 333 888",
  //       profile_picture: "https://randomuser.me/api/portraits/men/28.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: true,
  //   presence: false
  // },
  // {
  //   id: 12,
  //   user: {
  //     id: 12,
  //     email: "ewelina.olszewska@example.com",
  //     profile: {
  //       name: "Ewelina",
  //       surname: "Olszewska",
  //       phone_number: "+48 513 987 654",
  //       profile_picture: "https://randomuser.me/api/portraits/women/39.jpg"
  //     }
  //   },
  //   role: "participant",
  //   paid_status: false,
  //   presence: true
  // }
]);


	const location = useLocation();
  const navigate = useNavigate();

  const page = new URLSearchParams(location.search).get("page") || "main";

  const changePage = (newPage) => {
    navigate(`?page=${newPage}`, { replace: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (!params.get("page")) {
      params.set("page", "main");
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [location.search, navigate]);


	useEffect(() => {
    const fetchEvent = async () => {
      try{
        const res = await apiFetch(
          id
            ? `${BASE_URL}${ENDPOINTS.eventEvents}${id}/`
            : `${BASE_URL}${ENDPOINTS.eventEvents}by-code/${access_code}/`
        );
        const data = await res.json();
        if (!res.ok) throw new Error();
        setEventDetails(data);
        console.log("dane eventu", data)
      } 
      catch(e){
        console.error(e);
      } 
      finally{
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id, access_code]);

	const eventParticipants = // eventDetails.event_participant_count ||
														0;

  useEffect(() => {
    const getParticipantList = async () => {
      if(page === "list"){
        try{
          const response = await apiFetch(`${BASE_URL}/event/${id}/event-participant-list/`);
          console.log("status:", response.status);

          if(!response.ok){
            return;
          }

          const data = await response.json();
          console.log("dane listy uczestnikow:", data);

          setParticipants(data.results || []);
          console.log("participants", participants)
        }
        catch(err){
          console.error(err);
        }
      }
    }
    getParticipantList();
  }, [id, page]);

  useEffect(() => {
    if(page === "invitations"){
      getInvitations();
    }
  }, [id, page])

  const getInvitations = async () => {
    try{
      const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}${id}/invitations/`);
      console.log("satus:", response.status);

      if(!response.ok) return;

      const data = await response.json();
      console.log("dane zaproszeń:", data);

      setInvitations(data || []);
      console.log(invitations);
    }
    catch(err){
      console.error(err);
    }
  }

	const addGuest = () => {
    const hasEmptyFields = specialGuests.some((guest) => (
      guest.name.trim() === "" || guest.surname.trim() === ""
    ))

    if(hasEmptyFields){
      return;
    }
		setSpecialGuests(g => [...g, { name: "", nickname: "", surname: "" }]);
	}

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...specialGuests];
    updatedGuests[index][field] = value;
    setSpecialGuests(updatedGuests);
  }

  
	if (isLoading) return <h1 style={{textAlign: 'center'}}>Ładowanie...</h1>
	if (!eventDetails) return <h1 style={{textAlign: 'center'}}>Nie znaleziono wydarzenia.</h1>

	const datee = new Date(eventDetails.date_time_event);
	const formattedDate = datee.toLocaleString("pl-PL", {
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
  const advanced_level = levels[eventDetails.additional_info.advanced_level];

	const formatted = date
    ? new Date(date).toLocaleDateString("pl-PL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

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

		navigate('/eventy');
	};

	const handleDeleteCancel = () => {
		setShowPopup(false);
	};

  const handleEditSave = async () => {
    try{
			const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}${id}/`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: title || eventDetails.title,
					category : null,
					short_desc: shortDesc || eventDetails.short_desc,
					long_desc: longDesc || eventDetails.long_desc,
					date_time_event: date ? new Date(date).toISOString() : eventDetails.date_time_event,
					duration_min: eventDetails.duration_min,
					latitude: lat || eventDetails.latitude,
					longitude: lng || eventDetails.longitude,
					public_event: isPublic,
					country: "poland",
					city: city || eventDetails.city,
					street: street || eventDetails.street,
					street_number: streetNumber || eventDetails.street_number,
					flat_number: flatNumber || eventDetails.flat_number ? flatNumber || eventDetails.flat_number : null,
					zip_code: postial || eventDetails.zip_code,
					additional_info: {
						advanced_level: advancedLevel || eventDetails.additional_info.advanced_level,
						places_for_people_limit: count || eventDetails.additional_info.places_for_people_limit,
						age_limit: ageLimit || eventDetails.additional_info.age_limit,
						price: price || eventDetails.additional_info.price,
						payment_in_app: eventDetails.additional_info.payment_in_app,
						special_guests:
							specialGuests.length > 0
              ? specialGuests.map(g => ({
                  name: g.name || "",
									nickname: g.nickname || "",
                  surname: g.surname || ""
                }))
              : eventDetails.additional_info.special_guests,
					} 
				}),
			});

			if(!response.ok) throw new Error("Błąd");

			const data = await response.json();
			setEventDetails(data);
			setIsEditing(false);
			console.log(data);
		}
		catch(err){
			console.error(err);
		}
  }

  const handleEditCancel = () => {
    setIsEditing(false);
  }

	const handleStartEdit = () => {
		setIsEditing(true);

		setTitle(eventDetails.title);
		setDate(eventDetails.date_time_event);
		setShortDesc(eventDetails.short_desc);
		setLongDesc(eventDetails.long_desc);
		setPrice(eventDetails.additional_info.price);
		setCount(eventDetails.additional_info.places_for_people_limit);
		setCity(eventDetails.city);
		setStreet(eventDetails.street);
		setStreetNumber(eventDetails.street_number);
		setFlatNumber(eventDetails.flat_number || "");
		setPostial(eventDetails.zip_code);
		setAdvancedLevel(eventDetails.additional_info.advanced_level);
		setAgeLimit(eventDetails.additional_info.age_limit);
		setIsPublic(eventDetails.public_event);

		if(specialGuests.length === 1 && specialGuests[0].name === "" && specialGuests[0].surname === "") {
			setSpecialGuests(eventDetails.additional_info.special_guests || []);
		}
  }

  const handleClickGenerateCode = () => {
    setShowGenerateCodePopup(true);
  }

  const handleAddInvitation = async () => {
    try{
      const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}${id}/invitations/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_one_use: isCodeOneUse,
          is_active: isCodeValid
        })
      });

      if(!response.ok) return;

      const data = await response.json();

      console.log("zaproszenie:", data)

      await getInvitations();
    }
    catch(err){
      console.error(err);
    }

    setShowGenerateCodePopup(false)
  }
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handleDeactivateCode = async codeId  => {
    try{
      await apiFetch(
        `${BASE_URL}${ENDPOINTS.eventEvents}${id}/invitations/${codeId}/deactivate/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "",
        }
      )

      getInvitations();
    }
    catch(err){
      console.error(err)
    }
  }

  const handleActivateCode = async codeId => {
    try{
      await apiFetch(
        `${BASE_URL}${ENDPOINTS.eventEvents}${id}/invitations/${codeId}/activate/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "",
        }
      )
      
      getInvitations();
    }
    catch(err){
      console.error(err)
    }
  }

  const handleShare = async (code) => {
    const shareUrl = `http://localhost:5173/eventy/zaproszenie/event/${code}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Zaproszenie na wydarzenie",
          text: "Dołącz do mojego wydarzenia!",
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled", err);
      }
    } else {
      // fallback
      navigator.clipboard.writeText(shareUrl);
      alert("Link skopiowany do schowka");
    }
  };


	return(
		<>
			{showPopup && 
        <div className="delete-event-popup">
          <h1>Czy napewno chcesz usunąć to wydarzenie?</h1>
          <p>Wszytskie informacje o nim zostaną usunięte i nie będzie można ich przywrócić</p>
          <div className="delete-event-popup-btns">
            <button className="delete-event-popup-cancel-btn event-type-button edit-event-btn ed" onClick={handleDeleteCancel} >Anuluj</button>
            <button className="delete-event-popup-cancel-btn event-type-button delete-event-btn ed" onClick={handleDeleteConfirm}>Tak, usuń</button>
          </div>
        </div>
      }
			<NavBar 
        route='Eventy / Szczegóły Eventu' 
        title='Szczegóły Eventu' 
        linkRoute="/eventy" 
        firstFunction={!isEditing ? handleDeleteClick : handleEditCancel} 
        secondFunction={!isEditing ? handleStartEdit : handleEditSave}
        firstBtnText={!isEditing ? "Usuń" : "Anuluj"}
        secondBtnText={!isEditing ? "Edytuj" : "Zapisz"}
        page={page}
      />
			<SideBar />
			<main className="events-main">
        <div className="main-events-container">
					<header className="top-filters">
					  <div className="event-type-buttons">
              <button 
                className={`event-type-button ed ${page === "main" ? 'event-type-button-selected' : ""}`}
                onClick={e => {
                  changePage("main");
                }}
              >
                Wydarzenie
              </button>
              <button 
                className={`event-type-button ed ${page === "list" ? 'event-type-button-selected' : ""}`}
                onClick={e => {
                  changePage("list");
                }}
              >
                Lista uczestników
              </button>
							<button 
                className={`event-type-button ed ${page === "invitations" ? 'event-type-button-selected' : ""}`}
                onClick={e => {
                  changePage("invitations");
                }}
              >
                Zaproszenia
                </button>
            </div>
						<div className="edit-delete-btns">
              {page === "main" && !eventDetails.role_in_event 
                ? 
                  <>
                    <button className="event-type-button ed" onClick={() => alert("zaobserwowano")}>Obserwuj</button>
                    <button className="event-type-button ed edit-event-btn" onClick={() => alert("dołączono")}>Dołącz do wydarzenia</button>
                  </>
                :
                  <>
                    {page === "main" && !isEditing && (
                      <>
                        <button className="event-type-button ed delete-event-btn" onClick={handleDeleteClick}>Usuń wydarzenie</button>
                        <button className="event-type-button ed edit-event-btn" onClick={handleStartEdit}>Edytuj wydarzenie</button>
                      </>
                    )}
                    {page === "main" && isEditing && (
                      <>
                        <button className="event-type-button ed delete-event-btn" onClick={handleEditSave}>Zapisz</button>
                        <button className="event-type-button ed edit-event-btn" onClick={handleEditCancel}>Anuluj</button>
                      </>
                    )}
                  </>
              }
              
              {page === "invitations" && (
                <button className="event-type-button generate-btn" onClick={handleClickGenerateCode}>Wygeneruj nowy kod</button>
              )}
            </div>
					</header>
					{page === "main" &&
            <div className="event-details-content">
              <div className="event-details-content-left">
                <div className="event-important-details">
                  <img className="evd-img" src={eventDetails.event_image || eventImg} alt="zdjecie wydarzenia" />
                  {!isEditing ?
                    <div className="event-details-wrapper">
                      <div className="event-details-title-box">
                        <div className="title-date">
                          <h2 className="event-details-title">{eventDetails.title}</h2>
                          <p className="event-details-date"><Calendar className="icon" />{capitalizedDate}</p>
                        </div>
                        <div className="people-price">
                          <div className="event-details-places">
                            <span className="event-details-span">Miejsca:</span><br />
                            <span className="event-details-content-span">{eventParticipants} / {eventDetails.additional_info.places_for_people_limit}</span>
                          </div>
                          <hr className="people-line-price som-line" />
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
                      <hr className="event-details-line hom" />
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
                    :
                    <div className="event-details-wrapper">
                    <div className="event-details-title-box">
                      <div className="title-date">
                        <input 
                          type="text" 
                          id="event-details-title-input" 
                          className="event-details-props-input" 
                          placeholder={eventDetails.title}
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                        />
                        <input
                          type={showFormatted ? "text" : "date"}
                          value={showFormatted ? formatted.toString().slice(0, 1).toUpperCase() + formatted.toString().slice(1) : date}
                          readOnly={showFormatted}
                          onChange={(e) => setDate(e.target.value)}
                          onBlur={() => {
                            if(date) setShowFormatted(true);
                          }}
                          onFocus={() => {
                            setShowFormatted(false);
                          }}
                          className="event-details-props-input"
                          id="event-details-date-input"
                        />
                      </div>
                      <div className="people-price">
                        <div className="event-details-places">
                          <span className="event-details-span">Miejsca:</span><br />
                          <input 
                            className="event-details-props-input"
                            id="event-details-number-of-participants-input"
                            type="number" 
                            max={100} 
                            min={1} 
                            value={count}
                            onChange={e => {
                              setCount(e.target.value)
                            }}
                            onBlur={e => {
                              if(e.target.value > 100){
                                e.target.value = 100
                                setCount(100)
                              }
                              else if(e.target.value <= 0){
                                e.target.value = 1
                                setCount(1)
                              }
                            }}
                          />
                        </div>
                        <div className="event-details-price">
                          <span className="event-details-span">Cena:</span><br />
                          <div className="cena-wrapper">
                            <input 
                              type="number" 
                              className="event-details-props-input"
                              id="event-details-price-input"
                              value={price}
                              onChange={e => {
                                setPrice(e.target.value)
                              }}
                              onBlur={e => {
                                if(e.target.value < 0){
                                  setPrice(0)
                                  e.target.value = 0
                              }}}
                            />
                            <span className="zl">zł</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="event-details-line" />
                    <div className="event-details-long-desc-box">
                      <h3 className="event-details-long-desc-title">W skrócie</h3>
                      <textarea
                          id="event-details-small-desc-input" 
                          className="event-details-props-input" 
                          maxLength={200} 
                          placeholder={eventDetails.short_desc}
                          value={shortDesc}
                          onChange={e => setShortDesc(e.target.value)}
                        />
                    </div>
                    <hr className="event-details-line" />
                    <div className="event-details-localization-box">
                      <h3 className="event-details-long-desc-title"><Pin className="icon" /> Lokalizacja</h3>
                      <div className="location-row edit-location-row">
                        <div className="time-input-container">
                          <span className="event-props-label">Wybierz miasto</span>
                          <div className="time-input-box">
                            <select
                              className="event-time-select"
                              id="eventDeatilsCitySelect"
                              value={city}
                              onChange={async (e) => {
                                const selectedCity = e.target.value;
                                setCity(selectedCity);
                              }}
                            >
                              <option value="">Wybierz</option>
                              <option value="Warszawa">Warszawa</option>
                              <option value="Sosnowiec">Sosnowiec</option>
                              <option value="Dąbrowa Górnicza">Dąbrowa Górnicza</option>
                              <option value="Katowice">Katowice</option>
                              <option value="Będzin">Będzin</option>
                              <option value="Bytom">Bytom</option>
                            </select>
                            <AngleDown className="event-time-select-arrow" />
                          </div>
                        </div>
                        <div className="street-input-container">
                          <span className="event-props-label">Ulica</span>
                          <div className="time-input-box">
                            <input
                              className="event-details-props-input"
                              id="eventDetailsStreetInput"
                              placeholder="Ulica"
                              value={street}
                              onChange={e => setStreet(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="street-number-input-container">
                          <span className="event-props-label">Nr. ulicy</span>
                          <div className="time-input-box">
                            <input
                              type="text"
                              className="event-details-props-input"
                              id="eventDetailsStreetNumberInput"
                              placeholder="00"
                              value={streetNumber}
                              onChange={e => setStreetNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flat-number-input-container">
                          <span className="event-props-label">Nr. lokalu</span>
                          <div className="time-input-box">
                            <input
                              type="text"
                              className="event-details-props-input"
                              id="eventDetailsFlatNumberInput"
                              placeholder="00"
                              value={flatNumber}
                              onChange={e => setFlatNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="postial-input-container">
                          <span className="event-props-label">Kod pocztowy</span>
                          <div className="time-input-box">
                            <input
                              type="text"
                              className="event-details-props-input"
                              id="eventDetailsPostialInput"
                              placeholder="00-000"
                              value={postial}
                              onChange={e => setPostial(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="map-row">
                        <Map 
                          city={city} 
                          street={street} 
                          postial={postial} 
                          streetNumber={streetNumber}
                          setCity={setCity} 
                          setStreet={setStreet} 
                          setPostial={setPostial}
                          setStreetNumber={setStreetNumber}
                          initialLat={eventDetails.latitude}
                          initialLng={eventDetails.longitude}
                        />  
                      </div>
                    </div>
                  </div>
                  }
                </div>
                {!isEditing ? 
                  <div className="event-details-list-box event-important-details hom-desc">
                    <h3 className="event-details-list-title">Zasady udziału i wskazówki dla uczestników</h3>
                    <p className="event-details-long-desc">
                      {eventDetails.long_desc}
                    </p>
                  </div>
                  :
                  <div className="event-details-list-box event-important-details hom-desc">
                    <h3 className="event-details-list-title">Zasady udziału i wskazówki dla uczestników</h3>
                    <textarea
                      id="event-details-big-desc-input" 
                      className="event-details-props-input" 
                      maxLength={400} 
                      placeholder={eventDetails.long_desc}
                      value={longDesc}
                      onChange={e => setLongDesc(e.target.value)}
                    />
                  </div>
                }
              </div>
              <div className="event-details-content-right">
                {!isEditing ?
                  <div className="event-details-list-box event-important-details">
                    <h3 className="event-details-list-title">Szczegóły organizacyjne</h3>
                    <div className="event-details-details">
                      <div className="event-details-detail">
                        <h4 className="event-details-detail-title">Kategoria:</h4>
                        <p className="event-details-detail-content">{eventDetails.category_name}</p>
                      </div>
                      <div className="event-details-detail">
                        <h4 className="event-details-detail-title">Poziom zaawansowania:</h4>
                        <p className="event-details-detail-content">{advanced_level}</p>
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
                  :
                  <div className="event-details-list-box event-important-details">
                    <h3 className="event-details-list-title">Szczegóły organizacyjne</h3>
                    <div className="event-details-details">
                      <div className="event-details-detail">
                        <h4 className="event-details-detail-title">Kategoria:</h4>
                        <div className="select-wrapper">
                          <img src={footIcon} alt="Foot" className="foot-img" />
                          <select 
                            className="event-time-select" 
                            id="eventDetailsCategorySelect"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                          >
                            <option value="">Wybierz kategorię</option>
                            {categories.length > 0 ? (
                              categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.name}
                                </option>
                              ))
                            ) : (
                              <option disabled>Ładowanie...</option>
                            )}
                          </select>
                          <AngleDown className="event-category-select-arrow" />
                        </div>
                      </div>
                      <div className="event-details-detail">
                        <h4 className="event-details-detail-title">Poziom zaawansowania:</h4>
                        <div className="ed-advanced-level-btns">
                          <button 
                            className={`ed-advanced-level-btn ${advancedLevel === "beginner" ? `ed-selected` : ""}`}
                            onClick={e => setAdvancedLevel("beginner")}
                          >
                            Początkujący
                          </button>
                          <button 
                            className={`ed-advanced-level-btn ${advancedLevel === "semi-advanced" ? `ed-selected` : ""}`}
                            onClick={e => setAdvancedLevel("semi-advanced")}
                          >
                            Średnio zaawansowany
                          </button>
                          <button 
                            className={`ed-advanced-level-btn ${advancedLevel === "advanced" ? `ed-selected` : ""}`}
                            onClick={e => setAdvancedLevel("advanced")}
                          >
                            Zaawansowany
                          </button>
                          <button 
                            className={`ed-advanced-level-btn ${advancedLevel === "none" ? `ed-selected` : ""}`}
                            onClick={e => setAdvancedLevel("none")}
                          >
                            Brak
                          </button>
                        </div>
                      </div>
                      <div className="event-details-detail">
                        <h4 className="event-details-detail-title">Grupa wiekowa:</h4>
                        <div className="ed-advanced-level-btns">
                          <button 
                            className={`ed-advanced-level-btn ${ageLimit === "<12" ? `ed-selected` : ""}`}
                            onClick={e => setAgeLimit("<12")}
                          >
                            &lt;12
                          </button>
                          <button 
                            className={`ed-advanced-level-btn ${ageLimit === "12 - 16" ? `ed-selected` : ""}`}
                            onClick={e => setAgeLimit("12 - 16")}
                          >
                            12 - 16
                          </button>
                        </div>
                      </div>
                      <div className="event-details-detail">
                        <h4 className="event-details-detail-title">Dostępność wydarzenia:</h4>
                        <div className="ed-advanced-level-btns">
                          <button 
                            className={`ed-advanced-level-btn ${isPublic ? `ed-selected` : ""}`}
                            onClick={e => setIsPublic(true)}
                          >
                            Publiczne
                          </button>
                          <button 
                            className={`ed-advanced-level-btn ${!isPublic ? `ed-selected` : ""}`}
                            onClick={e => setIsPublic(false)}
                          >
                            Prywatne
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <div className="event-details-list-box event-important-details">
                  <h3 className="event-details-list-title">Kadra wydarzenia</h3>
                  <div className="staff-box">
                    {eventDetails.trainer_list.map((trainer, i) => (
                      <div key={i} className="staff">
                        <img src={pfp} alt="zdjecie profilowe" />
                        <div className="staff-content">
                          <h4 className="staff-name">{trainer.name} {trainer.surname}</h4>
                          <span className="staff-class">{trainer.role}</span>
                          <p className="staff-desc">
                            {trainer.desc}
                          </p>
                          <div className="staff-profile-btn-wrapper">
                            <button className="staff-profile-btn">Zobacz profil</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {eventDetails.trainer_list.length === 0 && <h4 className="no-trainers-text">Brak danych</h4>}
                  </div>
                  <hr className="event-details-line" />
                  <div className="event-details-special-guests-box">
                    <h3 className="event-details-long-desc-title"><Star className="icon" /> Goście specjalni</h3>
                    <div className="event-details-special-guests">
                      {!isEditing ? (
                        <div className="event-details-special-guests">
                          {eventDetails.additional_info.special_guests && eventDetails.additional_info.special_guests.length > 0 ? eventDetails.additional_info.special_guests.map((guest, i) => (
                            <div key={guest.id || i} className="event-details-special-guest">
                              <span className="event-details-special-guests-enumerate">{`${i + 1}.`}</span>
                              <h4 className="event-details-special-guest-name">{guest.name} {guest.nickname ? `"${guest.nickname}"` : ""} {guest.surname}</h4>
                            </div>
                          )): "Brak"}
                        </div>
                      ) : (
                        <div className="event-details-special-guests">
                          {specialGuests.map((guest, i) => (
                            <div key={i} className="event-details-special-guest">
                              <span className="event-details-special-guests-enumerate">{i + 1}.</span>
                              <input
                                type="text"
                                placeholder="Imię"
                                className="event-details-props-input"
                                value={guest.name}
                                onChange={(e) => handleGuestChange(i, "name", e.target.value)}
                              />
                              <input
                                type="text"
                                placeholder="Pseudonim"
                                className="event-details-props-input"
                                value={guest.nickname}
                                onChange={(e) => handleGuestChange(i, "nickname", e.target.value)}
                              />
                              <input
                                type="text"
                                placeholder="Nazwisko"
                                className="event-details-props-input"
                                value={guest.surname}
                                onChange={(e) => handleGuestChange(i, "surname", e.target.value)}
                              />
                            </div>
                          ))}
                          <button
                            className="add-special-guest"
                            onClick={addGuest}
                          >
                            + Dodaj gościa specjalnego
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {!isEditing ? 
                  <div className="event-details-list-box event-important-details som-desc">
                    <h3 className="event-details-list-title">Zasady udziału i wskazówki dla uczestników</h3>
                    <p className="event-details-long-desc">
                      {eventDetails.long_desc}
                    </p>
                  </div>
                  :
                  <div className="event-details-list-box event-important-details som-desc">
                    <h3 className="event-details-list-title">Zasady udziału i wskazówki dla uczestników</h3>
                    <textarea
                      id="event-details-big-desc-input" 
                      className="event-details-props-input" 
                      maxLength={400} 
                      placeholder={eventDetails.long_desc}
                      value={longDesc}
                      onChange={e => setLongDesc(e.target.value)}
                    />
                  </div>
                }
              </div>
            </div>
          }
          {page === "list" &&
            <div className="participant-list-container">
              <div className="list-header">
                <h3 id="pr-id" className="list-header-title">Nr.</h3>
                <h3 id="pr-user" className="list-header-title">Uczestnik</h3>
                <h3 className="list-header-title">Kontakt</h3>
                <h3 className="list-header-title">Zapłacone</h3>
                <h3 id="pr-presence" className="list-header-title">Obecność</h3>
                <h3 id="pr-actions" className="list-header-title">Akcje</h3>
              </div>
              {participants.length === 0 && 
                <h3 style={{fontSize: "30px"}} className="no-trainers-text">Brak uczestników</h3>
              }
              {participants.map((p, i) => (
                <div key={i}>
                  <div className="participant-row">
                    <div className="hom5">
                      <span className="pr-enumerate">{i + 1}.</span>
                      <div>
                        <div className="pr-enumerate-box">
                          <span className="pr-enumerate">{i + 1}.</span>
                        </div>
                        <div className="pr-user">
                          <img className="pr-pfp" src={p.user.profile.profile_picture} alt="Zdjęcie profilowe" />
                          <div className="pr-user-details">
                            <h4 className="pr-user-name"><span>{p.user.profile.name}</span> <span>{p.user.profile.surname}</span></h4>
                            <span className="pr-user-join-date">Dołączył/a: 02-2025</span>
                          </div>
                        </div>
                        <div className="pr-contact">
                          <p className="pr-email"><Envelope className="contact-icon"/> {p.user.email}</p><br />
                          <p className="pr-tel"><Phone className="contact-icon"/> {p.user.profile.phone_number}</p>
                        </div>
                        <div className="pr-pay-status">
                          <div className={`pay-status-box ${p.paid_status ? 'green' : 'red'}`}>
                            <span>{p.paid_status ? 'Opłacone' : 'Nieopłacone'}</span>
                          </div>
                        </div>
                        <div className="pr-presence">
                          <div className={`presence-box ${p.presence ? 'green' : 'red'}`}>
                            <span>{p.presence ? <CheckMark className="presence-icon checkmark" /> : <XMark className="presence-icon xmark" />}</span>
                          </div>
                        </div>
                        <div className="pr-actions">
                          <img 
                            src={Math.floor(Math.random() * 2) + 1 == 1 ? leaveIcon1 : leaveIcon2} 
                            alt="Akcja" 
                            className="action" 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pr-enumerate-box">
                      <span className="pr-enumerate">{i + 1}.</span>
                    </div>
                    <div className="pr-user">
                      <img className="pr-pfp" src={p.user.profile.profile_picture} alt="Zdjęcie profilowe" />
                      <div className="pr-user-details">
                        <h4 className="pr-user-name"><span>{p.user.profile.name}</span> <span>{p.user.profile.surname}</span></h4>
                        <span className="pr-user-join-date">Dołączył/a: 02-2025</span>
                      </div>
                    </div>
                    <div className="pr-contact">
                      <p className="pr-email"><Envelope className="contact-icon"/> {p.user.email}</p><br />
                      <p className="pr-tel"><Phone className="contact-icon"/> {p.user.profile.phone_number}</p>
                    </div>
                    <div className="pr-pay-status">
                      <div className={`pay-status-box ${p.paid_status ? 'green' : 'red'}`}>
                        <span>{p.paid_status ? 'Opłacone' : 'Nieopłacone'}</span>
                      </div>
                    </div>
                    <div className="pr-presence">
                      <div className={`presence-box ${p.presence ? 'green' : 'red'}`}>
                        <span>{p.presence ? <CheckMark className="presence-icon checkmark" /> : <XMark className="presence-icon xmark" />}</span>
                      </div>
                    </div>
                    <div className="pr-actions">
                      <img 
                        src={Math.floor(Math.random() * 2) + 1 == 1 ? leaveIcon1 : leaveIcon2} 
                        alt="Akcja" 
                        className="action" 
                      />
                    </div>
                  </div>
                  <hr className="pr-list-line"/>
                </div>
              ))}
            </div>
          }
          {page === "invitations" &&
            <>
              {showGenerateCodePopup &&
                <>
                  <div className="code-popup-overlay" onClick={() => setShowGenerateCodePopup(false)} />
                  <div className="code-popup">
                    <div className="code-popup-heading">
                      <h3>Generowanie kodu</h3>
                      <p>Wygeneruj kod zaproszeniowy</p>
                      <XMark 
                        className="code-x" 
                        style={{cursor: "pointer"}} 
                        onClick={e => setShowGenerateCodePopup(false)}
                      />
                    </div>
                    <div className="code-content">
                      <span className="settings-text"><img src={plus} alt="settings" /> Ustawienia zaproszenia</span>
                      <div className="code-switch">
                        <span>Kod jednorazowy</span>
                        <div className="switches">
                          <button 
                            className={`switch-button ${isCodeOneUse ? 'code-selected' : ''} s1`}
                            onClick={e => setIsCodeOneUse(true)}
                          >
                            TAK
                          </button>
                          <button 
                            className={`switch-button ${!isCodeOneUse ? 'code-selected' : ''} s2`}
                            onClick={e => setIsCodeOneUse(false)}
                          >
                            NIE
                          </button>
                        </div>
                      </div>
                      <div className="code-switch">
                        <span>Kod jest aktywny?</span>
                        <div className="switches">
                          <button 
                            className={`switch-button ${isCodeValid ? 'code-selected' : ''} s1`}
                            onClick={e => setIsCodeValid(true)}
                          >
                            TAK
                          </button>
                          <button 
                            className={`switch-button ${!isCodeValid ? 'code-selected' : ''} s2`}
                            onClick={e => setIsCodeValid(false)}
                          >
                            NIE
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr className="code-popup-line" />
                    <div className="code-popup-btns">
                      <button 
                        className="code-popup-btn cancel"
                        onClick={e => setShowGenerateCodePopup(false)}
                      >
                          Anuluj
                      </button>
                      <button 
                        className="code-popup-btn add"
                        onClick={handleAddInvitation}
                      >
                          Dodaj
                      </button>
                    </div>
                  </div>
                </>
              }
              <div className="invitations-container">
                <div className="invitations">
                  {invitations.map((inv, i) => (
                    <div key={i}  className="invitation-box">
                      <div className="invitation">
                        <QRCodeCanvas 
                          value={`http://localhost:5173/eventy/zaproszenie/event/${inv.code}`}
                          size={120}
                          bgColor="#ffffff"
                          fgColor="#000000"
                          level="H"
                        />
                        <div className="invitation-content">
                          <div className="invitation-first-row hom3">
                            <div className="invitation-first-row-box">
                              <span className="invitation-first-row-box-title">Nr. kodu</span><br />
                              <span className="invitation-first-row-box-content">{inv.code}</span>
                            </div>
                            <div className="invitation-first-row-box">
                              <span className="invitation-first-row-box-title">Data utworzenia</span><br />
                              <span className="invitation-first-row-box-content">{formatDate(inv.created_at)}</span>
                            </div>
                            <div className="invitation-first-row-box">
                              <span className="invitation-first-row-box-title">Utworzony przez</span><br />
                              <span className="invitation-first-row-box-content">{eventDetails.author_full_name}</span>
                            </div>
                          </div>
                          <div className="invitation-second-row">
                            <div className="invitation-second-row-link">
                              <span className="invitation-second-row-span">Link zaproszeniowy</span><br />
                              <input 
                                type="text"
                                readOnly
                                value={`http://localhost:5173/eventy/zaproszenie/event/${inv.code}`}
                                className="invitation-second-row-input"
                              />
                            </div>
                            <div className="invitation-second-row-button-box">
                              <button 
                                className={`invitation-second-row-button ${inv.is_valid ? "red" : "green"}`}
                                onClick={() =>
                                  inv.is_valid 
                                    ? handleDeactivateCode(inv.id)
                                    : handleActivateCode(inv.id)
                                }
                              >
                                {inv.is_valid ? "Dezaktywuj" : "Aktywuj"}
                              </button>
                              <button className="invitation-second-row-button share" onClick={() => handleShare(inv.code)}>
                                Udostępnij
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="invitation-first-row som2">
                        <div className="invitation-first-row-box">
                          <span className="invitation-first-row-box-title">Nr. kodu</span><br />
                          <span className="invitation-first-row-box-content">{inv.code}</span>
                        </div>
                        <div className="invitation-first-row-box">
                          <span className="invitation-first-row-box-title">Data utworzenia</span><br />
                          <span className="invitation-first-row-box-content">{formatDate(inv.created_at)}</span>
                        </div>
                        <div className="invitation-first-row-box">
                          <span className="invitation-first-row-box-title">Utworzony przez</span><br />
                          <span className="invitation-first-row-box-content">{eventDetails.author_full_name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="generate-code-plus" onClick={handleClickGenerateCode}>+</div>
                </div>
              </div>
            </>
          }
				</div>
			</main>
		</>
	)
}

export default EventDetails