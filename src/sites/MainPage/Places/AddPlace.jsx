import { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Map from "../components/Map";
import "./../../../styles/places.css";

import placeType1 from "./../../../assets/images/pt1.png";
import placeType2 from "./../../../assets/images/pt2.png";
import placeType3 from "./../../../assets/images/pt3.png";
import placeType4 from "./../../../assets/images/pt4.png";
import placeType5 from "./../../../assets/images/pt5.png";
import placeType6 from "./../../../assets/images/pt6.png";
import placeType7 from "./../../../assets/images/pt7.png";

import sPlaceType1 from "./../../../assets/images/pt-selected1.png";
import sPlaceType2 from "./../../../assets/images/pt-selected2.png";
import sPlaceType3 from "./../../../assets/images/pt-selected3.png";
import sPlaceType4 from "./../../../assets/images/pt-selected4.png";
import sPlaceType5 from "./../../../assets/images/pt-selected5.png";
import sPlaceType6 from "./../../../assets/images/pt-selected6.png";
import sPlaceType7 from "./../../../assets/images/pt-selected7.png";

import { FaAngleDown as AngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddPlace() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [placeType, setPlaceType] = useState([]);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postial, setPostial] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [openHours, setOpenHours] = useState([{
    days: [0, 1, 2, 3, 4],
    start: "08:00",
    end: "23:30",
    allDay: false
  }])
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [gallery, setGallery] = useState([]);
  const galleryInputRef = useRef(null);
  const navigate = useNavigate();

  const placeTypes = [
    { name: "Basen", basicImg: placeType1, selectedImg: sPlaceType1 },
    { name: "Boisko", basicImg: placeType2, selectedImg: sPlaceType2 },
    { name: "Korty", basicImg: placeType3, selectedImg: sPlaceType3 },
    { name: "Siłownia", basicImg: placeType4, selectedImg: sPlaceType4 },
    { name: "Sztuki walki", basicImg: placeType5, selectedImg: sPlaceType5 },
    { name: "Studio", basicImg: placeType6, selectedImg: sPlaceType6 },
    { name: "Inne", basicImg: placeType7, selectedImg: sPlaceType7 },
  ];

  const days = [
    { id: 0, label: "Pon" },
    { id: 1, label: "Wto" },
    { id: 2, label: "Śro" },
    { id: 3, label: "Czw" },
    { id: 4, label: "Pią" },
    { id: 5, label: "Sob" },
    { id: 6, label: "Nie" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(file)

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);
    setImageFile(file);
    setPreview(url);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    console.log(placeType)
  }, [placeType])

  const togglePlaceType = (typeName) => {
    setPlaceType((prev) =>
      prev.includes(typeName)
        ? prev.filter((t) => t !== typeName)
        : [...prev, typeName]
    );
  };

  const toggleDay = (index, dayId) => {
    setOpenHours(prev => 
      prev.map((block, i) => {
        if (i !== index) return block;

        const exists = block.days.includes(dayId);

        return{
          ...block,
          days: exists
            ? block.days.filter(d => d !== dayId)
            : [...block.days, dayId ]
        };
      })
    )
  }

  const updateHours = (index, field, value) => {
    setOpenHours(prev =>
      prev.map((block, i) =>
        i === index ? { ...block, [field]: value } : block
      )
    );
  };

  const toggleAllDay = index => {
    setOpenHours(prev =>
      prev.map((block, i) => 
        i === index
          ? {
              ...block,
              allDay: !block.allDay,
              start: !block.allDay ? "00:00" : block.start,
              end: !block.allDay ? "23:59" : block.end,
            }
          : block
      )
    )
  }

  const addOpenHours = () => {
    setOpenHours(prev => [
      ...prev,
      {
        days: [],
        start: "08:00",
        end: "23:30",
        allDay: false,
      },
    ]);
  };

  const handleGalleryChange = e => {
    const files = Array.from(e.target.files);

    setGallery(prev => {
      const newItems = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      return [...prev, ...newItems].slice(0, 30);
    });
    e.target.value = null;
  };
  
  const removeGalleryImage = index => {
    setGallery(prev => {
      URL.revokeObjectURL(prev[index].preview);

      return prev.filter((_, i) => i !== index);
    });
  };


  return (
    <>
      <NavBar
        title="Dodawanie placówki"
        route="Placówka / Wybieranie planu / Dodawanie placówki"
      />
      <SideBar />
      <main className="home-page-container">
        <div className="event-inputs">
          <div className="box-for-2-boxes">

            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon hom">1</span>
                Nazwa placówki
              </h2>
              <input
                type="text"
                className="event-props-input"
                id="place-name-input"
                placeholder="Nazwa"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="event-input-box">
              <h2 className="event-input-box-title">
                <span className="num-icon hom">2</span>
                Zdjęcie placówki
              </h2>
              <div className="image-input-wrapper">
                <div
                  className="img-input-box"
                  onClick={() => inputRef.current.click()}
                  style={{
                    border: !preview ? "2px dashed #ccc" : undefined,
                  }}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: 32, color: "#999" }}>+</span>
                  )}

                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="event-input-box">
            <h2 className="event-input-box-title">
              <span className="num-icon hom">3</span>
              Typ obiektu
            </h2>

            <div className="add-place-types">
              {placeTypes.map((place, i) => {
                const isSelected = placeType.includes(place.name);

                return (
                  <div
                    key={i}
                    className="add-place-type"
                    onClick={() => togglePlaceType(place.name)}
                  >
                    <div className={`add-place-type-img-wrapper ${isSelected ? "selected" : ""}`}>
                      <img
                        src={
                          isSelected
                            ? place.selectedImg
                            : place.basicImg
                        }
                        alt={place.name}
                      />
                    </div>
                    <h3 className="add-place-type-name">
                      {place.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="event-input-box">
            <h2 className="event-input-box-title">
              <span className="num-icon hom">4</span>
              Lokalizacja placówki
            </h2>
            <div className="location-row">
              <div className="time-input-container tiic">
                <span className="event-props-label">Wybierz miasto</span>
                <div className="time-input-box">
                  <select
                    className="event-time-select"
                    id="eventCitySelect"
                    value={city}
                    onChange={(e) => {
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
              <div className="street-input-container sic">
                <span className="event-props-label">Ulica</span>
                <div className="time-input-box">
                  <input
                    className="event-props-input"
                    id="eventStreetInput"
                    placeholder="Ulica"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                  />
                </div>
              </div>
              <div className="street-number-input-container snic">
                <span className="event-props-label">Nr. ulicy</span>
                <div className="time-input-box">
                  <input
                    type="text"
                    className="event-props-input"
                    id="eventStreetNumberInput"
                    placeholder="00"
                    value={streetNumber}
                    onChange={e => setStreetNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="flat-number-input-container hom">
                <span className="event-props-label">Nr. lokalu</span>
                <div className="time-input-box">
                  <input
                    type="text"
                    className="event-props-input"
                    id="eventFlatNumberInput"
                    placeholder="00"
                    value={flatNumber}
                    onChange={e => setFlatNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="postial-input-container pic">
                <span className="event-props-label">Kod pocztowy</span>
                <div className="time-input-box">
                  <input
                    type="text"
                    className="event-props-input"
                    id="eventPostialInput"
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
              />  
            </div>
          </div>
          <div className="event-input-box">
            <h2 className="event-input-box-title">
              <span className="num-icon">5</span>
              Godziny otwarcia
            </h2>
            <div className="place-open-hours-container">
              {openHours.map((block, index) => (
                  <div key={index} className="open-hours-block">
                    <span className="open-hours-block-enum">{index + 1}.</span>
                    <div className="days-row">
                      {days.map(day => (
                        <button
                          key={day.id}
                          className={`day-btn ${
                            block.days.includes(day.id) ? "selected" : ""
                          }`}
                          onClick={() => toggleDay(index, day.id)}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                    <div className="hours-row">
                      <input
                        className="event-props-input"
                        id="placeOpenHours1"
                        type="time"
                        value={block.start}
                        onChange={e =>
                          updateHours(index, "start", e.target.value)
                        }
                        disabled={block.allDay}
                      />
                      <span>—</span>
                      <input
                        className="event-props-input"
                        id="placeOpenHours2"
                        type="time"
                        value={block.end}
                        onChange={e =>
                          updateHours(index, "end", e.target.value)
                        }
                        disabled={block.allDay}
                      />
                    </div>
                    <label>
                      <input
                        type="checkbox"
                        checked={block.allDay}
                        onChange={() => toggleAllDay(index)}
                      />
                      Całodobowe?
                    </label>
                  </div>
                ))}

                <button onClick={addOpenHours} className="add-button" >
                  Dodaj alternatywne godziny otwarcia +
                </button>
            </div>
          </div>
          <div className="event-input-box">
            <h2 className="event-input-box-title">
              <span className="num-icon">6</span>
              Dane kontaktowe
            </h2>
            <div className="contact-data-box">
              <div className="contact-data">
                <span className="event-props-label">Adres E-mail</span>
                <input
                  type="email"
                  className="event-props-input"
                  id="placeEmailInput"
                  placeholder="E-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="contact-data">
                <span className="event-props-label">Nr. telefonu</span>
                <input
                  type="tel"
                  className="event-props-input"
                  id="placePhoneInput"
                  placeholder="Nr. telefonu"
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="event-input-box">
            <h2 className="event-input-box-title">
              <span className="num-icon">7</span>
              Galeria placówki
            </h2>
            <div className="gallery-container">
              {gallery.length < 30 && (
                  <div
                    className="galery-add"
                    onClick={() => galleryInputRef.current.click()}
                  >
                    <span>+</span>
                  </div>
                )}
              <div className="place-galery-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  ref={galleryInputRef}
                  onChange={handleGalleryChange}
                />
                
                {gallery.map((img, i) => (
                  <div key={i} className="galery-image">
                    <img src={img.preview} alt="" />
                    <div 
                      className="x-img"
                      onClick={() => removeGalleryImage(i)}
                    >
                      ✕
                    </div>
                  </div>
                ))}
              </div>
              <span className="galery-counter">
                {gallery.length} / 30
              </span>
            </div>
          </div>
        </div>
        <div className="cp-next-stage-btn-box" style={{margin: "20px 20px 20px 0"}}>
          <button 
            className="cp-ns-btn"
            onClick={() => navigate("/time-4-biz/menu-placowek")}
          >
            Stwórz placówkę
          </button>
        </div>
      </main>
    </>
  );
}

export default AddPlace;
