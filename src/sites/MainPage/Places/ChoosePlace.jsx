import { useState } from "react"
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import './../../../styles/places.css'
import { useNavigate } from "react-router-dom";

function ChoosePlace(){
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();

  const backgrounds = {
    0: `linear-gradient(to right, #FFE6D0 0%)`,
    1: `linear-gradient(to right, #E96D00 0%, #E96D00 26%, #FFE6D0 26%)`,
    2: `linear-gradient(to right, #E96D00 0%, #E96D00 50%, #FFE6D0 50%)`,
    3: `linear-gradient(to right, #E96D00 0%, #E96D00 74%, #FFE6D0 74%)`,
    4: `linear-gradient(to right, #E96D00 100%)`,
  }

  const labels = [
    "Mała placówka do 15 pracowników",
    "Średnia placówka",
    "Duża placówka",
    "Plan custom"
  ]

  const selectedStyle = {
    fontWeight: "600",
    color: "#000000"
  };

  const prices = {
    1: 120,
    2: 175,
    3: 200,
    4: 300
  }

  return(
    <>
      <NavBar title="Wybieranie planu" route="Placówka / Wybieranie planu" />
      <SideBar />
      <main className="home-page-container">
        <div className="choose-place-container">
          <div className="choose-place-text">
            <h2 className="choose-place-title">Wybierz plan dla swojej placówki</h2>
            <p className="choose-place-desc">
              Nie ma znaczenia, czy prowadzisz klub osiedlowy czy 
              stadion – plan dopasuje się do Ciebie. 💪
            </p>
          </div>
          <div className="choose-place-list-box">
            <h3 className="choose-place-list-title">Twój plan to więcej niż tylko abonament: </h3>
            <ul className="choose-place-list">
              <li>Widoczność na mapie obiektów sportowych 📍</li>
              <li>Zarządzanie wydarzeniami i grafikami 📅</li>
              <li>Dodawanie trenerów i pracowników 👥</li>
              <li>Statystyki i raporty 📊</li>
              <li>Nieograniczona ilość eventów wewnątrz placówki 🎉</li>
              <li>Integracja płatności i abonamentów 💳</li>
            </ul>
          </div>
          <div className="choose-place-slider-box">
            <input 
              type="range"
              min={0}
              max={4}
              step={1}
              value={selected}
              onChange={e => {
                const value = Number(e.target.value)
                if (value < 1) return
                setSelected(value)
              }}
              className="choose-place-slider"
            />
            <div 
              className="dot-box"
              style={{background: backgrounds[selected]}}
            >
              <div className="cp-dot" id="dot1" style={{opacity: 0}}></div>
              <div className="cp-dot" id="dot2"></div>
              <div className="cp-dot" id="dot3"></div>
              <div className="cp-dot" id="dot4"></div>
              <div className="cp-dot" id="dot5"></div>
            </div>
            <div className="cp-labels">
              {labels.map((label, i) => (
                <div className="cp-label-wrapper" key={i}>
                  <p className="cp-label" style={selected === i + 1 ? selectedStyle : undefined}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="cp-price-box">
            <p className="cp-price">{prices[selected]} PLN / Miesiąc</p>
          </div>
          <div className="cp-next-stage-btn-box">
            <button 
              className="cp-ns-btn"
              onClick={() => navigate("/placowki/dodawanie-placowki")}
            >
              Następny etap
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default ChoosePlace