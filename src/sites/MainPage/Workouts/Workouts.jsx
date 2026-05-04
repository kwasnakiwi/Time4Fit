import { useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import "./../../../styles/workouts.css";
import {
  FaSearch as Search,
  FaAngleDown as AngleDown,
  FaPlus as Plus,
} from "react-icons/fa";
import Workout from "./elements/Workout";
import { useState } from "react";
import { createPortal } from "react-dom";
import AddWorkoutModal from "./elements/AddWorkoutModal.jsx";

function Workouts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);

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

  const workoutsData = [
    {
      id: 1,
      category: "chest",
      part: "Klatka piersiowa",
      exercise: "Wyciskanie hantli na ławce płaskiej",
      level: 1,
      equipment: "Hantle",
      complexity: 1,
    },
    {
      id: 2,
      category: "legs",
      part: "Czworogłowe uda",
      exercise: "Przysiad ze sztangą na karku",
      level: 2,
      equipment: "Sztanga",
      complexity: 2,
    },
    {
      id: 3,
      category: "back",
      part: "Najszerszy grzbietu",
      exercise: "Podciąganie na drążku",
      level: 2,
      equipment: "Drążek",
      complexity: 2,
    },
    {
      id: 4,
      category: "biceps",
      part: "Biceps",
      exercise: "Uginanie ramion z hantlami",
      level: 0,
      equipment: "Hantle",
      complexity: 0,
    },
    {
      id: 5,
      category: "chest",
      part: "Klatka piersiowa",
      exercise: "Rozpiętki na maszynie",
      level: 0,
      equipment: "Maszyna",
      complexity: 0,
    },
    {
      id: 6,
      category: "legs",
      part: "Pośladki",
      exercise: "Martwy ciąg na prostych nogach",
      level: 1,
      equipment: "Sztanga",
      complexity: 1,
    },
  ];

  return (
    <>
      {showAddWorkoutModal &&
        createPortal(
          <AddWorkoutModal setShowModal={setShowAddWorkoutModal} />,
          document.body,
        )}
      <NavBar title="Ćwiczenia" route="Ćwiczenia" />
      <SideBar />
      <main className="home-page-container">
        <header className="wk-top-filters">
          <div className="top">
            <div className="wk-top-filters-left">
              <div className="filter-wrapper" style={{ maxWidth: "291px" }}>
                <input
                  placeholder="Wyszukaj ćwiczenia..."
                  className="p-filter-input"
                  type="text"
                />
                <Search className="p-search-icon" />
              </div>
              <div className="filter-wrapper" style={{ maxWidth: "196px" }}>
                <select className="p-filter-input">
                  <option value="">Złożoność techniczna</option>
                </select>
                <AngleDown className="arrow" />
              </div>
              <div className="filter-wrapper" style={{ maxWidth: "163px" }}>
                <select className="p-filter-input">
                  <option value="">Poziom trudności</option>
                </select>
                <AngleDown className="arrow" />
              </div>
              <div className="filter-wrapper" style={{ maxWidth: "97px" }}>
                <select className="p-filter-input">
                  <option value="">Sprzęt</option>
                </select>
                <AngleDown className="arrow" />
              </div>
              <div className="filter-wrapper" style={{ maxWidth: "120px" }}>
                <select className="p-filter-input">
                  <option value="">Typ ruchu</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
            <div className="wk-top-filters-right">
              <button
                onClick={() => setShowAddWorkoutModal(true)}
                className="add-product-btn"
              >
                <Plus />
                Dodaj ćwiczenie
              </button>
            </div>
          </div>
          <div className="bottom">
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
        <section className="wk-workouts">
          {workoutsData
            .filter(
              (w) =>
                workoutCategory === "all" || w.category === workoutCategory,
            )
            .map((workout) => (
              <Workout
                key={workout.id}
                category={workout.category}
                part={workout.part}
                exercise={workout.exercise}
                level={workout.level}
                equipment={workout.equipment}
                complexity={workout.complexity}
              />
            ))}
        </section>
      </main>
    </>
  );
}

export default Workouts;
