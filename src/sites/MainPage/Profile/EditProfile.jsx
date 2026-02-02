import { useContext, useEffect, useRef, useState } from "react";

import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import './../../../styles/profile.css';
import './../../../styles/components.css';

import prSide1 from './../../../assets/images/pr-side1.png';
import prSide2 from './../../../assets/images/pr-side2.png';
import prSide3 from './../../../assets/images/pr-side3.png';
import prSide4 from './../../../assets/images/pr-side4.png';
import prSide5 from './../../../assets/images/pr-side5.png';
import prSide6 from './../../../assets/images/pr-side6.png';
import prSide7 from './../../../assets/images/pr-side7.png';
import clPrSide1 from './../../../assets/images/cl-pr-side1.png';
import clPrSide2 from './../../../assets/images/cl-pr-side2.png';
import clPrSide3 from './../../../assets/images/cl-pr-side3.png';
import clPrSide4 from './../../../assets/images/cl-pr-side4.png';
import clPrSide5 from './../../../assets/images/cl-pr-side5.png';
import clPrSide6 from './../../../assets/images/cl-pr-side6.png';
import clPrSide7 from './../../../assets/images/cl-pr-side7.png';
import pfp from './../../../assets/images/pfp2.png';
import ach1 from './../../../assets/images/ach1.png';
import ach2 from './../../../assets/images/ach2.png';
import ach3 from './../../../assets/images/ach3.png';
import ach4 from './../../../assets/images/ach4.png';
import pr1 from './../../../assets/images/pr-icon1.png';
import pr2 from './../../../assets/images/pr-icon2.png';
import pr3 from './../../../assets/images/pr-icon3.png';
import certificate from './../../../assets/images/certificate.png';
import editIcon from './../../../assets/images/edit-icon.png';
import addIcon from './../../../assets/images/add-icon.png';
import circlePfp from './../../../assets/images/circle-pfp.png';
import editIcon2 from './../../../assets/images/edit-icon2.png';
import placeChoice1 from './../../../assets/images/p-choice1.png';
import placeChoice2 from './../../../assets/images/p-choice2.png';
import orPlaceChoice1 from './../../../assets/images/or-p-choice1.png';
import orPlaceChoice2 from './../../../assets/images/or-p-choice2.png';

import empty from './../../../assets/images/eventImg.png'

import cer1 from './../../../assets/images/cer1.png';
import cer2 from './../../../assets/images/cer2.png';
import cer3 from './../../../assets/images/cer3.png';
import cer4 from './../../../assets/images/cer4.png';
import cer5 from './../../../assets/images/cer5.png';
import cer6 from './../../../assets/images/cer6.png';
import cer7 from './../../../assets/images/cer7.png';

import { FaRegFlag as Flag,
         FaRegEye as Eye,
         FaRegEnvelope as Envelope,
         FaPhoneAlt as Phone,
         FaArrowRight as Arrow } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import pr4 from './../../../assets/images/pr-icon4.png';
import recClock from './../../../assets/images/rec-clock.png';
import recLoc from './../../../assets/images/rec-loc.png';
import recPeople from './../../../assets/images/rec-people.png';
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";

import { BiX as XMark } from "react-icons/bi";
import plus from "./../../../assets/images/+.png"
import popup1 from "./../../../assets/images/popup1.png"
import { UserContext } from "../../../utils/UserContext.jsx";


function EditProfile(){
  const { me, refetchMe } = useContext(UserContext);

  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({})
  const [selected, setSelected] = useState("data");
  const [placeType, setPlaceType] = useState(null);
  const [mediaType, setMediaType] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [showCerPopup, setShowCerPopup] = useState(false);
  const [cerTitle, setCerTitle] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [cerIdentificator, setCerIdentificator] = useState("");
  const [issuedDay, setIssuedDay] = useState(null);
  const [issuedMonth, setIssuedMonth] = useState(null);
  const [issuedYear, setIssuedYear] = useState(null);
  const [cerImages, setCerImages] = useState([]);
  const [cerEdit, setCerEdit] = useState(false);
  const [cerEditId, setCerEditId] = useState(null);
  const [pickSpecializationEdit, setPickSpecializationEdit] = useState({isEditing: false, value: ""});
  const [descEdit, setDescEdit] = useState({isEditing: false, value: ""});
  const [specializationsEdit, setSpecializationEdit] = useState({isEditing: false, value: ""});
  const navigate = useNavigate();

  const cerInputRef = useRef(null);

  useEffect(() => {
    const getUserData = async () => {
      try{
        const response = await apiFetch(`${BASE_URL}${ENDPOINTS.settings}`);

        let data;
        try{
          data = await response.json();
        }
        catch{
          data = null;
        }

        if(!response.ok){
          throw new Error(data?.error);
        }

        setUserData(data || {});
        console.log("settings:", data);
      }
      catch(err){
        console.error(err);
      }
    }

    getUserData();
  }, [])

  useEffect(() => {
    getProfileInfo();
  }, [selected])

  const getProfileInfo = async () => {
    if (!userData?.trainer_id) return;
    if(selected === "profile"){
      try{
        const response = await apiFetch(`
            ${BASE_URL}${ENDPOINTS.trainerFullProfile}${userData?.trainer_id}/
          `)
        
        let data;
        try{
          data = await response.json();
        }
        catch{
          data = null;
        }

        if(!response.ok){
          throw new Error(data?.error);
        }

        console.log("profil:", data);
        setProfileData(data || {});
      }
      catch(err){
        console.error(err);
      }
    }
  }

  useEffect(() => {
    if (!issuedYear || !issuedMonth || !issuedDay) return;

    const maxDays = getDaysInMonth(issuedYear, issuedMonth);
    if (issuedDay > maxDays) {
      setIssuedDay(maxDays);
    }
  }, [issuedMonth, issuedYear]);


  const getDaysInMonth = (year, month) => {
    if (!year || !month) return 31;
    return new Date(year, month, 0).getDate();
  };

  const handleCerImagesChange = e => {
    const files = Array.from(e.target.files);

    setCerImages(prev => {
      const newItems = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      return [...prev, ...newItems].slice(0, 4);
    });
    e.target.value = null;
  };

  const handleCerImageDelete = index => {
    setCerImages(prev => prev.filter((_, i) => i !== index));
  }
  const handleAddCertyficate = async () => {
    if(!cerTitle || !issuedBy || !issuedDay || !issuedMonth || !issuedYear || !cerImages){
      return;
    }
    const issuedDate = `${issuedYear}-${String(issuedMonth).padStart(2, "0")}-${String(issuedDay).padStart(2, "0")}`;
    const formData = new FormData();

    formData.append("title", cerTitle)
    formData.append("issued_by", issuedBy)
    formData.append("identyficatior", cerIdentificator)
    formData.append("issued_date", issuedDate)
    cerImages.forEach((img, i) => {
      formData.append("uploaded_images", img.file);
    })

    console.log(issuedDate)
    try{
      const response = await apiFetch(`${BASE_URL}${ENDPOINTS.trainerCertyficates}`, {
        method: "POST",
        body: formData
      })

      let data = null
      try{
        data = await response.json();
      }
      catch{
        data = null
      }

      if(!response.ok){
        throw new Error(data?.error)
      }

      setCerTitle("");
      setIssuedBy("")
      setCerIdentificator("")
      setIssuedDay(null)
      setIssuedMonth(null)
      setIssuedYear(null);
      setCerImages([]);

      await getProfileInfo();

      setShowCerPopup(false);
    }
    catch(err){
      console.error(err)
    }
  }

  const handleRemoveCertyficate = async cerId => {
    try{
      const response = await apiFetch(
        `${BASE_URL}${ENDPOINTS.trainerCertyficates}${cerId}/`,{ 
          method: "DELETE" 
        }
      );

      if(!response.ok){
        throw new Error("Nie udało się usunąć certyfikatu");
      }

      await getProfileInfo();
    } 
    catch(err){
      console.error(err);
    }
  };

  const handleEditProfileField = async (field, value) => {
    const formData = new FormData();

    formData.append(field, value);

    try{
      const response = await apiFetch(`${BASE_URL}${ENDPOINTS.trainerProfiles}${userData?.trainer_id}/`, {
        method: "PATCH",
        body: formData
      })

      let data = null
      try{
        data = await response.json()
      }
      catch{
        data = null;
      }

      if(!response.ok){
        throw new Error(data?.error);
      }

      await getProfileInfo();

      switch(field){
        case "description":
          setDescEdit({isEditing: false, value: ""});
          break;
        case "specializations":
          setSpecializationEdit({isEditing: false, value: ""})
          break;
        case "pick_specialization":
          setPickSpecializationEdit({isEditing: false, value: ""})
          break;
        default:
          console.error("Wrong field");
          break;
      }
    }
    catch(err){
      console.error(err);
    }
  }

  const handleEditCertyficate = async () => {
    if(!cerTitle || !issuedBy || !issuedDay || !issuedMonth || !issuedYear || !cerImages){
      return;
    }

    const formData = new FormData();
    const issuedDate = `${issuedYear}-${String(issuedMonth).padStart(2, "0")}-${String(issuedDay).padStart(2, "0")}`;

    formData.append("title", cerTitle)
    formData.append("issued_by", issuedBy)
    formData.append("identyficatior", cerIdentificator)
    formData.append("issued_date", issuedDate)
    cerImages.forEach((img, i) => {
      formData.append("uploaded_images", img.file);
    })

    try{
      const response = await apiFetch(`${BASE_URL}${ENDPOINTS.trainerCertyficates}${cerEditId}/`, {
        method: "PATCH",
        body: formData
      })

      let data = null;
      try{
        data = await response.json();
      }
      catch{
        data = null
      }

      if(!response.ok){
        throw new Error(data.error)
      }

      setCerTitle("");
      setIssuedBy("")
      setCerIdentificator("")
      setIssuedDay(null)
      setIssuedMonth(null)
      setIssuedYear(null);
      setCerImages([]);

      await getProfileInfo();

      setShowCerPopup(false);
      setCerEditId(null);
      setCerEdit(false);
    }
    catch(err){
      console.error(err);
    }
  }

  const handleClickEditCertyficate = (cerId, title, issuedBy, identyficator, day, month, year, images) => {
    setCerTitle(title);
    setIssuedBy(issuedBy)
    setCerIdentificator(identyficator)
    setIssuedDay(day)
    setIssuedMonth(month)
    setIssuedYear(year);
    setCerImages(
      Array.isArray(images)
        ? images.map(img => ({
            file: null,
            preview: img.image,
          }))
        : []
    );


    
    setCerEdit(true);
    setShowCerPopup(true);
    setCerEditId(cerId);
  }

  const advancedLevels = {
    beginner: "Początkujący",
    "semi-advanced": "Średniozaawansowany",
    advanced: "Zaawansowany",
    none: "Brak"
  }

  const formatDate1 = date => {
    return new Date(date).toLocaleDateString("pl-PL", {
      month: "short",
      year: "numeric"
    })
  }

  const formatDate2 = date => {
    const d = new Date(date)

    return {
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear()
    };
  }

  return(
    <>
    {showCerPopup &&
        <>
          <div style={{zIndex: 1112}} className="code-popup-overlay" onClick={() => setShowCerPopup(false)} />
          <div style={{width: "100%", maxWidth: "660px", zIndex: 1113}} className="code-popup">
            <div className="code-popup-heading evd">
              <div className="popup1-box"><img src={popup1} alt="" /></div>
              <div>
                <h3>Dyplomy i certyfikaty</h3>
                <p>Dodaj nowe osiągnięcie</p>
                <XMark 
                  className="code-x" 
                  style={{cursor: "pointer"}} 
                  onClick={e => setShowCerPopup(false)}
                />
              </div>
            </div>
            <div className="code-content">
              <h4 className="popup-setting">
                <img src={cer1} alt="" />
                Dane
              </h4>
              <div className="popup-input-box">
                <label className="popup-input-title" htmlFor="cer-title">
                  <img src={cer2} alt="" />
                  Wprowadź tytuł
                </label>
                <input 
                  type="text" 
                  value={cerTitle}
                  onChange={e => setCerTitle(e.target.value)}
                  className="popup-input"
                  name="cer-title"
                />
              </div>
              <div className="popup-input-box">
                <label className="popup-input-title" htmlFor="cer-title">
                  <img src={cer3} alt="" />
                  Wystawione przez
                </label>
                <input 
                  type="text" 
                  value={issuedBy}
                  onChange={e => setIssuedBy(e.target.value)}
                  className="popup-input"
                  name="cer-title"
                />
              </div>
              <div className="popup-input-box"> 
                <label className="popup-input-title" htmlFor="cer-title">
                  <img src={cer4} alt="" />
                  Identyfikator poświadczenia
                </label>
                <input 
                  type="text" 
                  value={cerIdentificator}
                  onChange={e => setCerIdentificator(e.target.value)}
                  className="popup-input"
                  name="cer-title"
                />
              </div>
              <h4 className="popup-setting">
                <img src={cer5} alt="" />
                Data wystawienia
              </h4>
              <div className="popup-date-inputs">
                <div className="popup-input-box">
                  <label>Dzień</label>
                  <select
                    className="popup-input"
                    value={issuedDay || ""}
                    disabled={!issuedMonth || !issuedYear}
                    onChange={e => setIssuedDay(Number(e.target.value))}
                  >
                    <option value="">--</option>
                    {Array.from(
                      { length: getDaysInMonth(issuedYear, issuedMonth) },
                      (_, i) => i + 1
                    ).map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div className="popup-input-box">
                  <label>Miesiąc</label>
                  <select
                    className="popup-input"
                    value={issuedMonth || ""}
                    onChange={e => setIssuedMonth(Number(e.target.value))}
                  >
                    <option value="">--</option>
                    {[
                      "Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec",
                      "Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"
                    ].map((name, i) => (
                      <option key={i + 1} value={i + 1}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="popup-input-box">
                  <label>Rok</label>
                  <select
                    className="popup-input"
                    value={issuedYear || ""}
                    onChange={e => setIssuedYear(Number(e.target.value))}
                  >
                    <option value="">--</option>
                    {Array.from({ length: 70 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>{year}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <h4 className="popup-setting">
                <img src={cer6} alt="" />
                Zdjęcia
                <span onClick={() => cerInputRef.current.click()} className={`add-cer-imgs ${cerImages?.length >= 4 ? "disabled" : ""}`}>
                  <img src={cer7} alt="" />
                  Dodaj zdjęcie +
                </span>
              </h4>
              <input 
                type="file"
                ref={cerInputRef}
                multiple
                accept="image/*"
                hidden
                onChange={handleCerImagesChange}
              />
              <div className="cer-images">
                {cerImages?.map((img, i) => (
                  <div className="cer-image-box" key={i}>
                    <div className="cer-image-wrapper">
                      <img
                        className="cer-image"
                        src={img.preview}
                        alt={`cert-${i}`}
                      />
                      <div
                        className="delete-cer-img"
                        onClick={() => handleCerImageDelete(i)}
                      >
                        ✕
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="code-popup-line" style={{margin: 0}} />
            <div className="code-popup-btns">
              <button 
                className="code-popup-btn cancel"
                onClick={e => setShowCerPopup(false)}
              >
                Anuluj
              </button>
              <button 
                className="code-popup-btn add"
                onClick={() => !cerEdit
                  ? handleAddCertyficate()
                  : handleEditCertyficate()
                }
              >
                {cerEdit ? "Akceptuj" : "Dodaj"}
              </button>
            </div>
          </div>
        </>
      }
      <NavBar title="Ustawienia konta" route="Ustawienia konta" linkRoute="/strona-glowna"/>
      <SideBar />
      <main className="home-page-container profile-edit-container">
        <div className="profile-edit-side">
          <nav className="profile-side-container">
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title">Użytkownik</h2>
              </div>
              <ul className="pr-side-part-list">
                
                <li className={selected == "data" ? "pr-side-selected" : ""} onClick={() => setSelected("data")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "data" ? clPrSide2 : prSide2} />
                  </div>
                  Dane użytkownika
                </li>
                <li className={selected == "safety" ? "pr-side-selected" : ""} onClick={() => setSelected("safety")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "safety" ? clPrSide3 : prSide3} />
                  </div>
                  Bezpieczeństwo
                </li>
                <li className={selected == "notifications" ? "pr-side-selected" : ""} onClick={() => setSelected("notifications")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "notifications" ? clPrSide4 : prSide4} />
                  </div>
                  Powiadomienia
                </li>
                <li className={selected == "payments" ? "pr-side-selected" : ""} onClick={() => setSelected("payments")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "payments" ? clPrSide5 : prSide5} />
                  </div>
                  Płatności
                </li>
              </ul>
            </section>
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title">Tworzenie</h2>
              </div>
              <ul className="pr-side-part-list">
                <li className={selected == "place" ? "pr-side-selected" : ""} onClick={() => setSelected("place")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "place" ? clPrSide6 : prSide6} />
                  </div>
                  Placówka
                </li>
                <li className={selected == "event" ? "pr-side-selected" : ""} onClick={() => setSelected("event")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "event" ? clPrSide7 : prSide7} />
                  </div>
                  Eventy
                </li>
              </ul>
            </section>
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title biz">Funkcje biznes</h2>
              </div>
               <ul className="pr-side-part-list">
                <li className={selected == "profile" ? "pr-side-selected" : ""} onClick={() => { !userData.is_trainer ? navigate("/profil/edycja/stworz-profil-trenera") : setSelected("profile") }}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "profile" ? clPrSide1 : prSide1} />
                  </div>
                  {userData.is_trainer ? "Mój trener" : "Jestem trenerem"}
                </li>
                <li onClick={() => setSelected("place")}>
                  <div style={{width: "20px", height: "20px"}}>
                    <img src={selected == "event" ? clPrSide7 : prSide7} />
                  </div>
                  Jestem placówką
                </li>
              </ul>
            </section>
          </nav>
        </div>
        {selected == "profile" &&
          <div className="profile">
            <section className="profile-main">
              <div className="profile-panel" style={{gridArea: 'main'}}>
                <div className="profile-pr-panel-1row">
                  <div className="pfp-site">
                    <img className="pr-img-pfp" src={profileData?.img_profile} alt="Zdjęcie profilowe" />
                    <div className="pfp-site-text">
                      <h2 className="pfp-site-name">{profileData?.profile?.name} {profileData?.profile?.surname}</h2>
                      <span className="pfp-site-work">Trener</span>
                    </div>
                  </div>
                  <div className="profile-pr-panel-btns">
                    <button className="pr-panel-btn views"><Eye /></button>
                    <button className="pr-panel-btn report"><Flag /></button>
                  </div>
                </div>
                <div className="profile-pr-panel-2row">
                  <div className="pr-panel-contact-item">
                    <div className="pr-panel-contact-icon" id="cyan"><Phone /></div>
                    <div className="pr-panel-contact-text">
                      <span className="contact-text-title">Nr. telefonu</span><br />
                      <span className="contact-text-value">{profileData?.phone_business}</span>
                    </div>
                  </div>
                  <div className="pr-panel-contact-item">
                    <div className="pr-panel-contact-icon" id="blue"><Envelope /></div>
                    <div className="pr-panel-contact-text">
                      <span className="contact-text-title">Adres E-mail</span><br />
                      <span className="contact-text-value">{profileData?.business_email}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'classes'}}>
                <div className="ach-box" id="blue"><img src={ach1} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Odbyte zajęcia</span><br />
                  <span className="contact-text-value">{profileData?.event_past}</span>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'type', position: "relative"}}>
                <div className="ach-box" id="purple"><img src={ach2} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Prowadzi</span><br />
                  {!pickSpecializationEdit.isEditing 
                    ? <span className="contact-text-value">{profileData?.pick_specialization}</span>
                    : <input 
                        type="text" 
                        value={pickSpecializationEdit.value || profileData?.pick_specialization} 
                        className="edit-profile-input" 
                        onChange={(e) => setPickSpecializationEdit(prev => ({...prev, value: e.target.value}))} 
                      />
                  }
                </div>
                <button 
                  onClick={() => { !pickSpecializationEdit.isEditing
                      ? setPickSpecializationEdit(prev => ({...prev, isEditing: true})) 
                      : handleEditProfileField("pick_specialization", pickSpecializationEdit.value || profileData?.pick_specialization)
                    }
                  }
                  style={{top: "10px"}} 
                  className="edit-pr-action-btn"
                >
                  {pickSpecializationEdit.isEditing ? "Zapisz" : "Edytuj"}
                  <img src={editIcon} />
                </button>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'rating'}}>
                <div className="ach-box" id="gold"><img src={ach3} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Ocena</span><br />
                  <span className="contact-text-value">{profileData?.rate_avg || "-"}</span>
                </div>
              </div>
              <div className="profile-panel achievement" style={{gridArea: 'joined'}}>
                <div className="ach-box" id="green"><img src={ach4} alt="ach" /></div>
                <div className="pr-panel-contact-text">
                  <span className="contact-text-title">Obserwujący</span><br />
                  <span className="contact-text-value">{profileData?.followers_count}</span>
                </div>
              </div>
            </section>
            <section className="profile-second">
              <div className="profile-panel" style={{gridArea: 'desc'}}>
                <h2 className="recomendation-title">
                  <img src={pr1} alt="zdj" id="pr1" />
                  Opis profilu
                </h2>
                {!descEdit.isEditing 
                    ? <p className="profile-desc">{profileData?.description}</p>
                    : <textarea 
                        type="text" 
                        value={descEdit.value || profileData?.description} 
                        className="edit-profile-input"
                        id="desc"
                        onChange={(e) => setDescEdit(prev => ({...prev, value: e.target.value}))} 
                      />
                  }
                <button 
                  onClick={() => { !descEdit.isEditing
                      ? setDescEdit(prev => ({...prev, isEditing: true})) 
                      : handleEditProfileField("description", descEdit.value || profileData?.description)
                    }
                  }
                  className="edit-pr-action-btn"
                >
                  {descEdit.isEditing ? "Zapisz" : "Edytuj"}
                  <img src={editIcon} />
                </button>
              </div>
              <div className="profile-panel" style={{gridArea: 'list'}}>
                <h2 className="recomendation-title">
                  <img src={pr2} alt="zdj" id="pr2" />
                  Specjalizacje
                </h2>
                {!specializationsEdit.isEditing 
                    ? <p className="profile-desc">{profileData?.specializations}</p>
                    : <textarea 
                        type="text" 
                        value={specializationsEdit.value || profileData?.specializations} 
                        className="edit-profile-input"
                        id="spec"
                        onChange={(e) => setSpecializationEdit(prev => ({...prev, value: e.target.value}))} 
                      />
                  }
                <button 
                  onClick={() => { !specializationsEdit.isEditing
                      ? setSpecializationEdit(prev => ({...prev, isEditing: true})) 
                      : handleEditProfileField("specializations", specializationsEdit.value || profileData?.specializations)
                    }
                  }
                  className="edit-pr-action-btn"
                >
                  {specializationsEdit.isEditing ? "Zapisz" : "Edytuj"}
                  <img src={editIcon} />
                </button>
              </div>
              <div className="profile-panel" style={{gridArea: 'awards'}}>
                <h2 className="recomendation-title">
                  <img src={pr3} alt="zdj" id="pr3" />
                  Certyfikaty i dyplomy
                </h2>
                <div className="certificates">
                  {profileData?.certyficates?.map((cer, i) => (
                    <div key={i} className="certificate">
                      <h3 className="cer-title">Certyfikat z ukończenia szkolenia:</h3>
                      <h4 className="cer-name">
                        {cer.title}
                      </h4>
                      <span className="cer-place-info">{cer.issued_by}</span><br />
                      <span className="cer-more-info">Issued {formatDate1(cer.issued_date)}</span><br />
                      <span className="cer-more-info">Identyfikator poświadczenia: {cer.identyficatior}</span><br />
                      <div className="cer-imgs">
                        {cer.images.map((img, idx) => (
                          <img key={idx} src={img.image} className="cer-img" alt="Certyfikat" />
                        ))}
                      </div>
                      {profileData?.certyficates?.length !== 1 && <hr style={{border: "1px solid #74747450", marginRight: "10px"}}/> }
                      <div className="cer-btns">
                        <button style={{position: "static"}} onClick={() => handleClickEditCertyficate(cer.id, cer.title, cer.issued_by, cer.identyficatior, formatDate2(cer.issued_date).day, formatDate2(cer.issued_date).month, formatDate2(cer.issued_date).year, cer.uploaded_images)} className="edit-pr-action-btn">
                          Edytuj
                          <img src={editIcon}/>
                        </button>
                        <button style={{position: "static"}} onClick={() => handleRemoveCertyficate(cer.id)} className="edit-pr-action-btn">
                          Usuń
                          <img src={addIcon} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {profileData?.certyficates?.length === 0 && <h3 className="no-trainers-text">Brak certyfikatów</h3>}
                </div>
                <button onClick={() => setShowCerPopup(true)} className="edit-pr-action-btn">
                  Dodaj
                  <img src={addIcon} id="act2" />
                </button>
              </div>
              <div className="profile-panel" style={{gridArea: 'events'}}>
              <h2 className="recomendation-title">
                <img src={pr4} alt="zdj" />
                Inne prowadzone zajęcia
              </h2>
              <div className="recomended-events">
                {profileData?.events?.map((ev, i) => {
                  const date = new Date(ev.date_time_event);
                  const formattedDate = date.toLocaleString("pl-PL", {
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return(
                    <div key={i} className="rec-event">
                      <div className="rec-event-first-row">
                        <h3 className="rec-event-name">{ev.title || "Brak tytułu"}</h3>
                        <span className={`rec-event-price-status ${ev.is_free ? "green" : ""}`}>{ev.is_free ? "Bezpłatny" : "Płatny"}</span>
                      </div>
                      <div className="rec-event-informations">
                        <span className="rec-event-information">{ev.category_name || "-"}</span>
                        <span className="rec-event-information">{ev.additional_info.age_limit}</span>
                        <span className="rec-event-information">{advancedLevels[ev.additional_info.advanced_level]}</span>
                      </div>
                      <div className="rec-event-more-info-wrapper">
                        <div className="rec-event-more-info">
                          <ul className="rec-event-more-info-list">
                            <li><img src={recClock} /> {formattedDate}</li>
                            <li><img src={recLoc} /> {ev.city}, {ev.street}</li>
                            <li><img src={recPeople} /> {ev.available_places} miejsc</li>
                          </ul>
                        </div>
                        <button onClick={() => navigate(`/eventy/${ev.id}`)} className="rec-event-show-details-btn">Zobacz szczegóły <Arrow /></button>
                      </div>
                    </div>
                  )
                })}
                {profileData?.events?.length === 0 && <h3 className="no-trainers-text">Brak wydarzeń</h3>}
              </div>
            </div>
          </section>
          <section className="profile-media">
            <div className="profile-panel">
              <h2 className="recomendation-title">
                <img src={pr3} alt="zdj" id="pr3" />
                Twoje media
              </h2>
              <div className="medias-container">
                <div className="media-selection">
                  <button 
                    className={`media-option ${mediaType === "posts" ? "selected" : ""}`}
                    onClick={() => setMediaType("posts")}
                  >
                    Posty
                  </button>
                  <button 
                    className={`media-option ${mediaType === "albums" ? "selected" : ""}`}
                    onClick={() => setMediaType("albums")}
                  >
                    Albumy
                  </button>
                </div>
                <div className="medias">
                  {mediaType === "posts" &&
                    <div className="posts-box">
                      <div onClick={() => alert("dodano")} className="add-post-box">
                        <span>+</span>
                      </div>
                      <div className="posts">
                        {profileData?.posts?.map((post, i) => (
                          <div key={i} className="post">
                            <img src={post.images[0].image || empty} alt="post-image" className="post-img" />
                          </div>
                        ))}
                        {profileData?.posts?.length === 0 && <h3 className="no-trainers-text">Brak postów, stwórz nowy!</h3>}
                      </div>
                    </div>
                  }
                  {mediaType === "albums" &&
                    <div className="images-box">
                      <div onClick={() => alert("dodano")} className="add-post-box image">
                        <span>+</span>
                      </div>
                      <div className="pr-images">
                        {albums.map((img, i) => (
                          <div key={i} className="pr-image">
                            <img src={img.img || empty} alt="img-image" className="img-img" />
                          </div>
                        ))}
                        {albums.length === 0 && <h3 className="no-trainers-text">Brak albumów, stwórz nowy!</h3>}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
        }
        {selected == "data" &&
          <div className="profile-user-data">
            <section className="user-data-panel ud-pfp">
              <div className="user-data-pfp-wrapper">
                <img src={circlePfp} alt="Zdjęcie profilowe" />
                <div className="change-pfp-icon"><img src={editIcon2} /></div>
              </div>
              <div className="ud-user-name-box">
                <h2 className="ud-user-name">{userData.name} {userData.surname}</h2>
                <span className="ud-user-status">{!me?.subscription ? "Użytkownik" : me.subscription.plan_name}</span>
              </div>
            </section>
            <section className="user-data-panel ud-with-content">
              <div className="ud-container">
                <h3 className="ud-container-title">Dane podstawowe</h3>
                <div className="user-data-content">
                  <div className="ud-info-box">
                    <span className="ud-info-title">Imię</span><br />
                    <span className="ud-info-value">{userData.name}</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Nazwisko</span><br />
                    <span className="ud-info-value">{userData.surname}</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Płeć</span><br />
                    <span className="ud-info-value">{userData.sex !== "none" ? userData.sex : "Nie podano"}</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Data urodzenia</span><br />
                    <span className="ud-info-value">{userData.birth_day || "Nie podano"}</span>
                  </div>
                </div>
                <button className="edit-pr-action-btn">
                  Edytuj 
                  <img src={editIcon} />
                </button>
              </div>
            </section>
            <section className="user-data-panel ud-with-content">
              <div className="ud-container">
                <h3 className="ud-container-title">Dane kontaktowe</h3>
                <div className="user-data-content">
                  <div className="ud-info-box">
                    <span className="ud-info-title">E-mail</span><br />
                    <span className="ud-info-value">{me?.email}</span>
                  </div>
                  <div className="ud-info-box">
                    <span className="ud-info-title">Nr. telefonu</span><br />
                    <span className="ud-info-value">{userData.phone_number || "Nie podano"}</span>
                  </div>
                </div>
                <button className="edit-pr-action-btn">
                  Edytuj 
                  <img src={editIcon} />
                </button>
              </div>
            </section>
          </div>
        }
        {selected == "place" &&
          <div className="place-create-box">
            <div className="cp-title-box">
              <h2 className="cp-title">Twoje miejsce, Twoje zasady</h2>
              <p className="cp-desc">
                Wybierz, w jaki sposób chcesz dodać swoją placówkę — 
                tylko oznacz ją na mapie lub zyskaj pełne możliwości 
                zarządzania nią i wydarzeniami.
              </p>
            </div>
            <div className="place-choice-box">
              <div 
                className={`place-choice ${placeType == "first" ? "selected" : placeType ? "disabled" : ""}`}
                onClick={() => setPlaceType("first")}
              >
                <h3 className="place-choice-title">Pokaż się na mapie</h3>
                <img 
                  src={placeType == "first" ? orPlaceChoice1 : placeType ? placeChoice1 : orPlaceChoice1} 
                  className="place-choice-img" 
                />
                <p className="place-choice-desc">
                  Oznacz swoją lokalizację, aby inni mogli łatwo Cię znaleźć.
                  Idealne, jeśli chcesz po prostu zaznaczyć obecność swojej 
                  placówki bez dodatkowych funkcji zarządzania.
                </p>
                <span className="place-choice-price">Wstępny koszt 29 PLN</span>
              </div>
              <div 
                className={`place-choice ${placeType == "second" ? "selected" : placeType ? "disabled" : ""}`}
                onClick={() => setPlaceType("second")}
              >
                <h3 className="place-choice-title">Prowadź, planuj i działaj</h3>
                <img 
                  src={placeType == "second" ? orPlaceChoice2 : (placeType ? placeChoice2 : orPlaceChoice2)} 
                  className="place-choice-img" 
                />
                <p className="place-choice-desc">
                  Zyskaj pełną kontrolę — twórz wydarzenia, przypisuj trenerów,
                  edytuj informacje i obserwuj aktywność. Dostępne funkcje 
                  zależą od wybranego planu.
                </p>
                <span className="place-choice-price">Wstępny koszt 119 PLN</span>
              </div>
            </div>
            <div className="cp-next-stage-btn-box">
              <button 
                disabled={!placeType} 
                className="cp-ns-btn"
                onClick={() => {
                  placeType == "first" ? 
                    navigate("/placowki/dodawanie-placowki")
                  :
                    navigate("/placowki/wybor-planu")
                }}
              >
                Dalej
              </button>
            </div>
          </div>
        }
      </main>
    </>
  )
}

export default EditProfile