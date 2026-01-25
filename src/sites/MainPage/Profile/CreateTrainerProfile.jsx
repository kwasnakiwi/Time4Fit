import { useNavigate } from "react-router-dom";
import "./../../../styles/profile.css";
import { FaArrowLeft as ArrowLeft } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

import ctp1 from "./../../../assets/images/ctp1.png";
import ctp2 from "./../../../assets/images/ctp2.png";
import ctp3 from "./../../../assets/images/ctp3.png";
import ctp4 from "./../../../assets/images/ctp4.png";
import { apiFetch } from "../../../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints";

function CreateTrainerProfile(){
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pickSpecialization, setPickSpecialization] = useState("");
  const [desc, setDesc] = useState("");
  const [pfp, setPfp] = useState(null);
  const [preview, setPreview] = useState(null);
  const [specializations, setSpecializations] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(file)

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);
    setPfp(file);
    setPreview(url);
  };

  const handleCreateProfile = async () => {
    
    try{
      if (!pfp) {
        throw new Error("Dodaj zdjęcie profilowe");
      }

      const formData = new FormData();

      formData.append("description", desc);
      formData.append("specializations", specializations);
      formData.append("business_email", email);
      formData.append("phone_business", phoneNumber);
      formData.append("img_profile", pfp);
      formData.append("pick_specialization", pickSpecialization);

      const response = await apiFetch(`${BASE_URL}${ENDPOINTS.trainerProfiles}`, {
        method: "POST",
        body: formData
      })

      let data = null;
      try{
        data = await response.json();
      } 
      catch{
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.details || "Błąd tworzenia profilu");
      }

      console.log(data);
    }
    catch(err){
      console.error(err);
    }
    finally{
      setDesc(null);
      setEmail(null);
      setPfp(null);
      setPhoneNumber(null);
      setPickSpecialization(null);
      setPreview(null);
      setSpecializations(null);

      navigate("/profil/edycja")
    }
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return(
    <>
      <header className="ctp-header">
        <ArrowLeft onClick={() => navigate(-1)} className="ctp-arrow"/> 
        <h1 className="ctp-header-text">Stwórz swój Personalny profil trenera</h1>
      </header>
      <section className="ctp-section">
        <div className="ctp-form">
          <div className="ctp-field" style={{gridArea: "basic"}}>
            <div className="ctp-field-desc">
              <div className="ctp-field-img"><img src={ctp1} alt="" /></div>
              <div className="ctp-field-text">
                <h3>Dane podstawowe&nbsp;<span className="required">*</span></h3>
                <span>Podstawowe informacje kontaktowe oraz zakres prowadzonych zajęć</span>
              </div>
            </div>
            <div className="ctp-field-inputs">
              <div className="ctp-input-box">
                <label htmlFor="mail" className="ctp-input-name">Mail kontaktowy</label>
                <input 
                  type="text"
                  placeholder="Example@example.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="ctp-input"
                  name="mail"
                />
              </div>
              <div className="ctp-input-box">
                <label htmlFor="phone" className="ctp-input-name">Numer kontaktowy</label>
                <input 
                  type="text"
                  placeholder="123 123 123" 
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="ctp-input"
                  name="phone"
                />
              </div>
            </div>
            <div className="ctp-field-input">
              <div className="ctp-input-box">
                <label htmlFor="specialization" className="ctp-input-name">Prowadzone zajęcia</label>
                <input 
                  type="text"
                  placeholder="Joga" 
                  value={pickSpecialization}
                  onChange={e => setPickSpecialization(e.target.value)}
                  className="ctp-input"
                  name="specialization"
                />
              </div>
            </div>
          </div>
          <div className="ctp-field" style={{gridArea: "img"}}>
            <div className="ctp-field-desc">
              <div className="ctp-field-img"><img src={ctp3} alt="" /></div>
              <div className="ctp-field-text">
                <h3>Zdjęcie</h3>
                <span>Dodaj zdjęcie, które będzie widoczne w Twoim profilu</span>
              </div>
            </div>
            <div className="ctp-pfp-wrapper" onClick={() => inputRef.current.click()}>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              {preview
                ? <img src={preview} alt="" className="ctp-pfp" />
                : <div className="ctp-pfp-placeholder">+</div>
              }
            </div>
          </div>
          <div className="ctp-field" style={{gridArea: "desc"}}>
            <div className="ctp-field-desc">
              <div className="ctp-field-img"><img src={ctp2} alt="" /></div>
              <div className="ctp-field-text">
                <h3>Opis profilu</h3>
                <span>Krótka informacja o Tobie, Twoim doświadczeniu lub stylu pracy</span>
              </div>
            </div>
            <div className="ctp-field-input">
              <div className="ctp-input-box">
                <textarea
                  type="text"
                  placeholder="Opis..." 
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="ctp-input desc"
                  name="desc"
                />
              </div>
            </div>
          </div>
          <div className="ctp-field" style={{gridArea: "spec"}}>
            <div className="ctp-field-desc">
              <div className="ctp-field-img"><img src={ctp4} alt="" /></div>
              <div className="ctp-field-text">
                <h3>Specjalizacje</h3>
                <span>Obszary, w których się specjalizujesz</span>
              </div>
            </div>
            <div className="ctp-field-input">
              <div className="ctp-input-box">
                <textarea
                  type="text"
                  placeholder="Przykład..." 
                  value={specializations}
                  onChange={e => setSpecializations(e.target.value)}
                  className="ctp-input desc"
                  name="desc"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ctp-button-box">
          <button className="ctp-button" onClick={handleCreateProfile}>Dalej</button>
        </div>
      </section>
    </>
  )
}

export default CreateTrainerProfile