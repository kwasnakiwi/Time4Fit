import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import { useState, useEffect } from "react";
import './../../../styles/mainpage.css';
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";

function AddEvent2(){
  const [advancedLevel, setAdvancedLevel] = useState("begginer");
  const [count, setCount] = useState(1);
  const [ageLimit, setAgeLimit] = useState("<12");
  const [isPublic, setIsPublic] = useState(true);
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState(0);
  const [isPaymentInApp, setIsPaymentInApp] = useState(true);
  const isPremium = true;
  const [specialGuests, setSpecialGuests] = useState([{name: "", surname: ""}]);
  const [error, setError] = useState('');

  const title = localStorage.getItem('title');
  const category = localStorage.getItem('category');
  const shortDesc = localStorage.getItem('shortDesc');
  const longDesc = localStorage.getItem('longDesc');
  const duration = localStorage.getItem('duration');
  const date = localStorage.getItem('date');
  const time = localStorage.getItem('time');
  const street = localStorage.getItem('street');
  const postial = localStorage.getItem('postial');
  const city = localStorage.getItem('city');
  const lat = localStorage.getItem('lat');
  const lng = localStorage.getItem('lng')

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
    if(!isFree){
      setIsPaymentInApp(true)
    }
  }, [isFree]);

  const handleAddEvent = async () => {
    console.log("Kliknięto przycisk — handleAddEvent uruchomione");
    setError('')

    if(  !title 
      || !category 
      || !shortDesc 
      || !longDesc 
      || !duration 
      || !date 
      || !time 
      || !street 
      || !postial 
      || !city 
      || !lat
      || !lng
      || !advancedLevel 
      || !count
      || !ageLimit
      ) return;

    if(!isFree && !price) return;

    try{
      const response = await fetch(`${BASE_URL}${ENDPOINTS.eventEvents}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          category: category,
          short_desc: shortDesc,
          long_desc: longDesc,
          date_time_event: date + 'T' + time + ':00.000Z',
          duration_min: duration,
          latitude: lat,
          longitude: lng,
          public_event: isPublic,
          country: 'poland',
          city: city,
          street: street,
          street_number: "20",
          flat_number: "9",
          zip_code: postial,
          additional_info: {
            advanced_level: advancedLevel,
            places_for_people_limit: count,
            age_limit: ageLimit,
            participant_list_show: false,
            free: isFree,
            price: isFree ? 0 : price,
            payment_in_app: isPaymentInApp,
            special_guests: [
              {
                name: specialGuests.name,
                surname: specialGuests.surname
              }
            ]
          }
        })
      });

      let data;

      try{
        data = await response.json();
      }
      catch{
        data = null;
      }

      console.log(data);
    }
    catch(err){
      console.error(err);
    }
  }

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
                  className={`event-button ${advancedLevel === 'begginer' ? "ev-btn-selected" : ""}`}
                  onClick={e => {
                    setAdvancedLevel("begginer")
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