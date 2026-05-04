import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import "./../../../../styles/workouts.css";
import whitePlan from "./../../../../assets/svgs/whitePlan.svg";
import whiteSave from "./../../../../assets/svgs/whiteSave.svg";
import { useState } from "react";
import {
  FaAngleDown as AngleDown,
  FaPlus as Plus,
  FaSearch as Search,
} from "react-icons/fa";
import { createPortal } from "react-dom";
import ChoosePartModal from "./elements/ChoosePartModal";
import { useSearchParams } from "react-router-dom";
import TrainingPlanExercise from "./elements/TrainingPlanExercise";
import ConfigExerciseModal from "./elements/ConfigExerciseModal";

function AddTrainingPlan() {
  const [title, setTitle] = useState("");
  const [intensity, setIntensity] = useState("");
  const [advancedLevel, setAdvancedLevel] = useState("");
  const [priority, setPriority] = useState("");
  const [duration, setDuration] = useState(0);
  const [showChoosePartModal, setShowChoosePartModal] = useState(false);
  const [showChooseWorkoutsModal, setShowChooseWorkoutsModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const workoutCategory = searchParams.get("category") || "all";

  const updateURL = (key, value) => {
    let newParams = new URLSearchParams(searchParams);

    if (value != "" && value != null && value != undefined) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const workoutsCategories = [
    { name: "Wszystkie", category: "all" },
    { name: "Klatka piersiowa", category: "chest" },
    { name: "Nogi", category: "legs" },
    { name: "Biceps", category: "biceps" },
    { name: "Plecy", category: "back" },
  ];

  const planExercisesData = [
    {
      id: 1,
      part: "Biceps",
      title: "Uginanie ramion ze sztangą",
      sets: "5",
      reps: "12 - 6",
      weight: "20 - 40",
      timeout: 30,
    },
    {
      id: 2,
      part: "Klatka",
      title: "Wyciskanie hantli na skosie dodatnim",
      sets: "4",
      reps: "10",
      weight: "25",
      timeout: 60,
    },
    {
      id: 3,
      part: "Plecy",
      title: "Wiosłowanie sztangą w opadzie",
      sets: "4",
      reps: "8 - 12",
      weight: "60",
      timeout: 90,
    },
    {
      id: 4,
      part: "Triceps",
      title: "Prostowanie ramion na wyciągu górnym",
      sets: "3",
      reps: "15",
      weight: "15 - 20",
      timeout: 45,
    },
    {
      id: 5,
      part: "Nogi",
      title: "Przysiady ze sztangą",
      sets: "5",
      reps: "5",
      weight: "100",
      timeout: 120,
    },
  ];

  return (
    <>
      {showChoosePartModal &&
        createPortal(
          <ChoosePartModal
            setShowChoosePartModal={setShowChoosePartModal}
            setShowChooseWorkoutsModal={setShowChooseWorkoutsModal}
            showChooseWorkoutsModal={showChooseWorkoutsModal}
          />,
          document.body,
        )}
      
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
              {planExercisesData.length > 0 && (
                <span className="atp-enum">{planExercisesData.length}</span>
              )}
              Ćwiczenia
            </div>
            <button
              className="atp-box-header-button"
              onClick={() => setShowChoosePartModal(true)}
            >
              <Plus />
              Dodaj
            </button>
          </div>
          <div className="atp-workouts-content">
            {planExercisesData.length > 0 && (
              <header
                className="wk-top-filters"
                style={{ padding: "12px 20px" }}
              >
                <div className="top">
                  <div className="wk-top-filters-left">
                    <div className="filter-wrapper">
                      <input
                        placeholder="Wyszukaj ćwiczenia..."
                        className="p-filter-input"
                        type="text"
                      />
                      <Search className="p-search-icon" />
                    </div>
                  </div>
                </div>
                <div className="bottom" style={{ marginTop: "8px" }}>
                  {workoutsCategories.map((w, i) => (
                    <button
                      key={i}
                      className={`product-category ${workoutCategory === w.category ? "selected" : ""}`}
                      onClick={() => updateURL("category", w.category)}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
              </header>
            )}
            <div className="atp-exercises-wrapper">
              {planExercisesData.map((ex, i) => (
                <TrainingPlanExercise
                  key={ex.id}
                  i={i}
                  setSelectedExercise={setSelectedExercise}
                  part={ex.part}
                  title={ex.title}
                  sets={ex.sets}
                  reps={ex.reps}
                  weight={ex.weight}
                  timeout={ex.timeout}
                  className={selectedExercise == i ? "selected" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddTrainingPlan;
