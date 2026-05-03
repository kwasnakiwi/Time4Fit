import { useState } from "react";
import bicepsIcon from "./../../../../../assets/svgs/bicepsIcon.svg";
import "./../../../../../styles/popup.css";
import "./../../../../../styles/workouts.css";

function ChooseWorkoutsModal({ setShowChooseWorkoutsModal, part }) {
  const [search, setSearch] = useState("");
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);

  const workoutsData = [
    {
      id: 1,
      category: "chest",
      part: "Klatka piersiowa",
      exercise: "Wyciskanie hantli na ławce płaskiej",
      muscles: "Klata, triceps, barki",
      level: 1,
      equipment: "Hantle",
      complexity: 1,
    },
    {
      id: 2,
      category: "legs",
      part: "Nogi",
      exercise: "Przysiad ze sztangą na karku",
      muscles: "Czworogłowe, pośladki, lędźwia",
      level: 2,
      equipment: "Sztanga",
      complexity: 2,
    },
    {
      id: 3,
      category: "back",
      part: "Plecy",
      exercise: "Podciąganie na drążku (nachwyt)",
      muscles: "Najszerszy grzbietu, bicepsy",
      level: 2,
      equipment: "Drążek",
      complexity: 2,
    },
    {
      id: 4,
      category: "biceps",
      part: "Biceps",
      exercise: "Uginanie ramion z hantlami z supinacją",
      muscles: "Biceps, przedramiona",
      level: 0,
      equipment: "Hantle",
      complexity: 0,
    },
    {
      id: 5,
      category: "chest",
      part: "Klatka piersiowa",
      exercise: "Rozpiętki na maszynie Butterfly",
      muscles: "Klatka piersiowa (środek)",
      level: 0,
      equipment: "Maszyna",
      complexity: 0,
    },
    {
      id: 6,
      category: "legs",
      part: "Nogi",
      exercise: "Martwy ciąg na prostych nogach",
      muscles: "Dwugłowe, pośladki, dół pleców",
      level: 1,
      equipment: "Sztanga",
      complexity: 1,
    },
    {
      id: 7,
      category: "back",
      part: "Plecy",
      exercise: "Wiosłowanie hantlem w opadzie",
      muscles: "Najszerszy, czworoboczny, tył barku",
      level: 1,
      equipment: "Hantle",
      complexity: 1,
    },
    {
      id: 8,
      category: "chest",
      part: "Klatka piersiowa",
      exercise: "Pompki na poręczach (Dips)",
      muscles: "Dół klatki, triceps, barki",
      level: 2,
      equipment: "Poręcze",
      complexity: 2,
    },
    {
      id: 9,
      category: "legs",
      part: "Nogi",
      exercise: "Wykroki chodzone",
      muscles: "Pośladki, czworogłowe",
      level: 1,
      equipment: "Hantle",
      complexity: 1,
    },
    {
      id: 10,
      category: "biceps",
      part: "Biceps",
      exercise: "Uginanie ramion na modlitewniku",
      muscles: "Biceps (krótka głowa)",
      level: 1,
      equipment: "Sztanga łamana",
      complexity: 1,
    },
  ];

  const toggleWorkout = (id) => {
    setSelectedWorkouts((prev) =>
      prev.includes(id)
        ? prev.filter((workoutId) => workoutId !== id)
        : [...prev, id],
    );
  };

  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowChooseWorkoutsModal(false)}
      />
      <div className="template-modal dish-modal" style={{ maxWidth: "1032px" }}>
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-img-wrapper">
              <img src={bicepsIcon} alt="" />
            </div>
            <div className="template-modal-info-text">
              <h3>Dodawanie ćwiczenia</h3>
              <span>Dodaj ćwiczenie do swojej listy</span>
            </div>
          </div>
          <span
            className="close-modal"
            onClick={() => setShowChooseWorkoutsModal(false)}
          >
            ✕
          </span>
        </header>

        <section className="template-modal-content">
          <div className="template-modal-input-box">
            <input
              type="text"
              className="template-modal-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Wyszukaj ćwiczenie..."
            />
          </div>

          <div className="tm-workouts-wrapper">
            {workoutsData.map((wk) => (
              <div
                key={wk.id}
                className={`tm-workout ${selectedWorkouts.includes(wk.id) ? "selected" : ""}`}
                onClick={() => toggleWorkout(wk.id)}
              >
                <span className="title">{wk.exercise}</span>
                <span className="parts">{wk.muscles}</span>
                <span className="equipment">{wk.equipment}</span>
              </div>
            ))}
          </div>
        </section>
        <hr className="template-modal-line" />
        <section className="template-modal-btns">
          <button
            className="template-modal-btn cancel"
            onClick={() => setShowChooseWorkoutsModal(false)}
          >
            Anuluj
          </button>
          <button
            className="template-modal-btn accept"
            onClick={() => setShowChooseWorkoutsModal(false)}
          >
            {selectedWorkouts.length > 0 && "x" + selectedWorkouts.length}{" "}
            Dodaj
          </button>
        </section>
      </div>
    </>
  );
}

export default ChooseWorkoutsModal;
