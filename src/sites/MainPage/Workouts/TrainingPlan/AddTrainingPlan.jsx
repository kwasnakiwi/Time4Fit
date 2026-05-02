import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import "./../../../../styles/workouts.css";
import whitePlan from "./../../../../assets/svgs/whitePlan.svg";
import whiteSave from "./../../../../assets/svgs/whiteSave.svg";
import { useState } from "react";
import { FaAngleDown as AngleDown, FaPlus as Plus } from "react-icons/fa";

function AddTrainingPlan() {
  const [title, setTitle] = useState("");
  const [intensity, setIntensity] = useState("");
  const [advancedLevel, setAdvancedLevel] = useState("");
  const [priority, setPriority] = useState("");
  const [duration, setDuration] = useState(0);

  return (
    <>
      <NavBar
        title="Dodawanie planu treningowego"
        route="Ćwiczenia / Dodawanie planu treningowego"
      />
      <SideBar />
      <main className="home-page-container">
        <div className="atp-box">
          <div className="atp-box-header">
            <div className="atp-box-header-text">
              <div className="image-wrapper">
                <img src={whitePlan} alt="" />
              </div>
              Nowy plan treningowy
            </div>
            <button className="atp-box-header-button">
              <img src={whiteSave} alt="" />
              Zapisz
            </button>
          </div>
          <hr className="atp-box-line" />
          <div className="atp-box-content">
            <div className="template-modal-info-inputs">
              <div
                className="template-modal-input-box"
                style={{ width: "66%", position: "relative" }}
              >
                <label className="template-modal-title secondery" htmlFor="">
                  Tytuł
                </label>
                <input
                  type="text"
                  className="template-modal-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
                <span className="length-counter" style={{ top: 0, right: 0 }}>
                  {title.length}/50
                </span>
              </div>
              <div
                className="template-modal-input-box"
                style={{ width: "33%" }}
              >
                <label htmlFor="" className="template-modal-title secondery">
                  Intensywność
                </label>
                <div className="tm-select-wrapper">
                  <select
                    name=""
                    className="template-modal-input"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                  >
                    <option value="">Wybierz intensywność</option>
                  </select>
                  <AngleDown className="arrow" />
                </div>
              </div>
            </div>
            <div className="template-modal-info-inputs">
              <div
                className="template-modal-input-box"
                style={{ width: "45%" }}
              >
                <label htmlFor="" className="template-modal-title secondery">
                  Stopień zaawansowania
                </label>
                <div className="tm-select-wrapper">
                  <select
                    name=""
                    className="template-modal-input"
                    value={advancedLevel}
                    onChange={(e) => setAdvancedLevel(e.target.value)}
                  >
                    <option value="">Wybierz intensywność</option>
                  </select>
                  <AngleDown className="arrow" />
                </div>
              </div>
              <div
                className="template-modal-input-box"
                style={{ width: "45%" }}
              >
                <label htmlFor="" className="template-modal-title secondery">
                  Priorytet
                </label>
                <div className="tm-select-wrapper">
                  <select
                    name=""
                    className="template-modal-input"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="">Wybierz intensywność</option>
                  </select>
                  <AngleDown className="arrow" />
                </div>
              </div>
              <div
                className="template-modal-input-box"
                style={{ width: "10%" }}
              >
                <label className="template-modal-title secondery" htmlFor="">
                  Czas trwania
                </label>
                <input
                  type="number"
                  className="template-modal-input"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="00min"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="atp-workouts">
          <div className="atp-box-header workouts">
            <div className="atp-box-header-text">
              <div className="image-wrapper">
                <img src={whitePlan} alt="" />
              </div>
              Ćwiczenia
            </div>
            <button className="atp-box-header-button">
              <Plus />
              Dodaj
            </button>
          </div>
          <div className="atp-workouts-content">
            
          </div>
        </div>
      </main>
    </>
  );
}

export default AddTrainingPlan;
