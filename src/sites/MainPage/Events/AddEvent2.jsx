import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import { useState, useEffect, useContext } from "react";
import './../../../styles/mainpage.css';
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";
import { LocationContext } from "../../../utils/LocationContext.jsx";
import { EventContext } from "../../../utils/EventContext.jsx";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { useNavigate } from "react-router-dom";

function AddEvent2(){
  const [advancedLevel, setAdvancedLevel] = useState("beginner");
  const [count, setCount] = useState(1);
  const [ageLimit, setAgeLimit] = useState("<12");
  const [isPublic, setIsPublic] = useState(true);
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState(0);
  const [isPaymentInApp, setIsPaymentInApp] = useState(true);
  const isPremium = true;
  const [specialGuests, setSpecialGuests] = useState([{name: "", surname: ""}]);
  const [error, setError] = useState('');
  const access = localStorage.getItem("access");
  const navigate = useNavigate();

  const { eventData } = useContext(EventContext);
  const { lat, lng } = useContext(LocationContext);


  const addGuest = () => {
    const hasEmptyFields = specialGuests.some((guest) => (
      guest.name.trim() === "" || guest.surname.trim() === ""
    ))

    if(hasEmptyFields){
      return;
    }
    setSpecialGuests(g => [...g, {name: "", surname: ""}])
  }

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...specialGuests];
    updatedGuests[index][field] = value;
    setSpecialGuests(updatedGuests);
  }
  

  useEffect(() => {
    if(isFree){
      setPrice(0);
      setIsPaymentInApp(false);
    }
    else if(!isFree){
      setIsPaymentInApp(true)
    }
  }, [isFree]);

  const handleAddEvent = async () => {
    console.log("Kliknięto przycisk — handleAddEvent uruchomione");
    setError('');

    console.log("eventData:", eventData);
    console.log("lat/lng:", lat, lng);
    console.log("specialGuests:", specialGuests);

    const formattedGuests = specialGuests
      .filter(g => g.name.trim() && g.surname.trim())
      .map(g => ({
        name: g.name.trim(),
        surname: g.surname.trim(),
      }));

    try {
          const response = await apiFetch(`${BASE_URL}${ENDPOINTS.eventEvents}`, {
            method: "POST",
            body: JSON.stringify({
              title: eventData.title,
              category: eventData.category,
              short_desc: eventData.shortDesc,
              long_desc: eventData.longDesc,
              date_time_event: new Date(`${eventData.date}T${eventData.time}`).toISOString(),
              duration_min: parseInt(eventData.duration),
              latitude: lat,
              longitude: lng,
              public_event: isPublic,
              country: "Poland",
              city: eventData.city,
              street: eventData.street,
              street_number: "20",
              flat_number: "9",
              zip_code: eventData.postial,
              additional_info: {
                advanced_level: advancedLevel,
                places_for_people_limit: parseInt(count),
                age_limit: ageLimit,
                participant_list_show: false,
                price: price,
                payment_in_app: isPaymentInApp,
                special_guests: formattedGuests,
              },
            }),
          });

      const data = await response.json();
      console.log("Odpowiedź z backendu:", data);

      if (!response.ok) {
        console.error("Błąd podczas tworzenia eventu:", data);
        setError(JSON.stringify(data));
        return;
      }

      navigate('/events')

      console.log("Event utworzony pomyślnie");
    } catch (err) {
      console.error("Błąd sieci lub JSON:", err);
      setError("Błąd połączenia z serwerem");
    }
  };


  return(
    <>
      <NavBar route="Eventy / Tworzenie Eventu" title="Tworzenie Eventu" />
      <SideBar />     
      <main className="events-main">
        <div className="main-events-container">
          <div className="steps steps2">
            <div className="step active"><span>1. Najważniejsze informacje</span></div>
            <div className="step active"><span>2. Szczegóły wydarzenia</span></div>
          </div>
          <div className="event-inputs">
            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon">7</span>
                Poziom zaawansowania
              </h2>
              <div className="event-buttons">
                <button 
                  className={`event-button ${advancedLevel === 'beginner' ? "ev-btn-selected" : ""}`}
                  onClick={e => {
                    setAdvancedLevel("beginner")
                  }}
                >Początkujący
                </button>
                <button 
                  className={`event-button ${advancedLevel === 'semi-advanced' ? "ev-btn-selected" : ""}`}
                  onClick={e => {
                    setAdvancedLevel("semi-advanced")
                  }}
                >Średnio zaawansowany
                </button>
                <button 
                  className={`event-button ${advancedLevel === 'advanced' ? "ev-btn-selected" : ""}`}
                  onClick={e => {
                    setAdvancedLevel("advanced")
                  }}
                >Zaawansowany
                </button>
                <button 
                  className={`event-button ${advancedLevel === 'none' ? "ev-btn-selected" : ""}`}
                  onClick={e => {
                    setAdvancedLevel("none")
                  }}
                >Brak
                </button>
              </div>
            </div>
            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon">8</span>
                Ilość miejsc
              </h2>
              <div className="number-of-participants-input-box">
                <span 
                  className="minus" 
                  onClick={e => {
                    if(count > 1){
                      setCount(c => c - 1)
                    }
                  }}
                >-
                </span>
                <input 
                  className="event-props-input-2"
                  id="event-number-of-participants-input"
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
                <span 
                  className="plus" 
                  onClick={e => {
                    if(count < 100){
                      setCount(c => c + 1)
                    }
                  }}
                >+
                </span>
              </div>
            </div>
            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon">9</span>
                Grupa wiekowa
              </h2>
              <div className="event-buttons">
                <button 
                  className={`event-button ${ageLimit === '<12' ? "ev-btn-selected" : ""}`}
                  onClick={e => {
                    setAgeLimit("<12")
                  }}
                >&lt; 12
                </button>
                <button 
                  className={`event-button ${ageLimit === '12 - 16' ? "ev-btn-selected" : ""}`}
                  onClick={e => {
                    setAgeLimit("12 - 16")
                  }}
                >12 - 16
                </button>
              </div>
            </div>
            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon">10</span>
                Wydarzenie publiczne?
              </h2>
              <div className="repeat-q-box">
                <div className="repeat-q-buttons">
                  <button
                    id="rb1"
                    className={isPublic ? "rpt-selected" : ""}
                    onClick={() => setIsPublic(true)}
                  >TAK
                  </button>
                  <button 
                    id="rb2" 
                    className={!isPublic ? "rpt-selected" : ""}
                    onClick={() => setIsPublic(false)}
                  >NIE
                  </button>
                </div>
              </div>
            </div>
            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon">11</span>
                Wydarzenie płatne?
              </h2>
              <div className="repeat-q-box">
                <div className="repeat-q-buttons">
                  <button
                    id="rb1"
                    className={!isFree ? "rpt-selected" : ""}
                    onClick={() => setIsFree(false)}
                  >TAK
                  </button>
                  <button 
                    id="rb2" 
                    className={isFree ? "rpt-selected" : ""}
                    onClick={() => setIsFree(true)}
                  >NIE
                  </button>
                </div>
                {!isFree ? 
                <>
                  <h2 className="event-input-box-title" style={{marginBottom: -8}}>Cena</h2>
                  <div className="event-price-input-box">
                    <input 
                      type="number" 
                      className="event-props-input"
                      id="event-price-input"
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
                    <span className="zl-text">zł</span>
                  </div>
                  <h2 className="event-input-box-title" style={{marginBottom: 0}}>Płatność w aplikacji?</h2>
                  <div className="repeat-q-buttons">
                    <button
                      id="rb1"
                      className={isPaymentInApp ? "rpt-selected" : ""}
                      onClick={() => setIsPaymentInApp(true)}
                    >TAK
                    </button>
                    <button 
                      id="rb2" 
                      className={!isPaymentInApp ? "rpt-selected" : ""}
                      onClick={() => setIsPaymentInApp(false)}
                    >NIE
                    </button>
                  </div>
                </>
                : null
                }
              </div>
            </div>
            {isPremium ?
              <div className="event-input-box">
                <h2 className="event-input-box-title">
                  <span className="num-icon">12</span>
                  Gość specjalny
                </h2>
                <div className="special-guests">
                  {specialGuests.map((guest, i) => (
                    <div key={i} className="guest-inputs">
                      <span className="enumeration">{`${i + 1}.`}</span>
                      <input 
                        type="text" 
                        className="event-props-input" 
                        id="guest-name-input" 
                        placeholder="Imię"
                        value={guest.name}
                        onChange={e => handleGuestChange(i, "name", e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="event-props-input" 
                        id="guest-surname-input" 
                        placeholder="Nazwisko"
                        value={guest.surname}
                        onChange={e => handleGuestChange(i, "surname", e.target.value)}
                      />
                    </div>
                  ))}
                  <button onClick={addGuest} className="add-special-guest">Dodaj gościa specjalnego +</button>
                </div>
              </div>
              : 
              <div className="event-input-box opacity-down">
                <h2 className="event-input-box-title">
                  <span className="num-icon">12</span>
                  Gość specjalny
                </h2>
                <div className="special-guests">
                  {specialGuests.map((guest, i) => (
                    <div key={i} className="guest-inputs">
                      <span className="enumeration">{`${i + 1}.`}</span>
                      <input 
                        type="text" 
                        className="event-props-input" 
                        id="guest-name-input" 
                        placeholder="Imię"
                        value={guest.name}
                        onChange={e => handleGuestChange(i, "name", e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="event-props-input" 
                        id="guest-surname-input" 
                        placeholder="Nazwisko"
                        value={guest.surname}
                        onChange={e => handleGuestChange(i, "surname", e.target.value)}
                      />
                    </div>
                  ))}
                  <button onClick={addGuest} className="add-special-guest">Dodaj gościa specjalnego +</button>
                </div>
                <div className="opacity-down-popup">
                  <p>Tylko dla użytkowników Premium!</p>
                </div>
              </div>
            } 
          </div>
          <div className="next-btn-box">
            <button className="next-stage" onClick={handleAddEvent}>Następny etap</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default AddEvent2