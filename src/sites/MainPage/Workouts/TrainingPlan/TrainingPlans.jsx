import {
  FaSearch as Search,
  FaAngleDown as AngleDown,
  FaPlus as Plus,
} from "react-icons/fa";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import "./../../../../styles/workouts.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import TrainingPlan from "./elements/TrainingPlan";

function TrainingPlans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get("page") || "workouts";

  const updateURL = (key, value) => {
    let newParams = new URLSearchParams(searchParams);

    if (value != "" && value != null && value != undefined) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const trainingPlansData = [
    {
      id: 1,
      name: "Mocny Chest Day",
      category: "Siłowy",
      part: "Klatka piersiowa",
      hardLevel: 2, // Zaawansowany -> red
      intensity: 2, // redTraingle
      intensityLabel: "Wysoka",
      priority: "Wysoki",
      amount: 8,
      time: 90,
      equipment: ["Sztanga", "Hantle", "Ławka"],
    },
    {
      id: 2,
      name: "Full Body Workout",
      category: "Ogólnorozwojowy",
      part: "Całe ciało",
      hardLevel: 0, // Początkujący -> green
      intensity: 0, // blueDiamond
      intensityLabel: "Niska",
      priority: "Średni",
      amount: 6,
      time: 45,
      equipment: ["Mata", "Gumy oporowe"],
    },
    {
      id: 3,
      name: "Potężne Plecy",
      category: "Kulturystyka",
      part: "Plecy",
      hardLevel: 1, // Z doświadczeniem -> yellow
      intensity: 1, // yellowDiamond
      intensityLabel: "Średnia",
      priority: "Najwyższy",
      amount: 10,
      time: 75,
      equipment: ["Drążek", "Wyciąg", "Hantle"],
    },
    {
      id: 4,
      name: "Biceps & Triceps Blast",
      category: "Siłowy",
      part: "Ramiona",
      hardLevel: 1,
      intensity: 2,
      intensityLabel: "Wysoka",
      priority: "Średni",
      amount: 12,
      time: 60,
      equipment: ["Sztanga łamana", "Hantle"],
    },
  ];

  return (
    <>
      <NavBar title="Plany treningowe" route="Plany treningowe" />
      <SideBar />
      <main className="home-page-container">
        <header className="wk-top-filters">
          <div className="top">
            <div className="wk-top-filters-left">
              <div className="event-type-buttons">
                <button
                  className={`event-type-button ${page === "workouts" ? "event-type-button-selected" : ""}`}
                  onClick={() => updateURL("page", "workouts")}
                >
                  Ćwiczenia
                </button>
                <button
                  className={`event-type-button ${page === "diets" ? "event-type-button-selected" : ""}`}
                  onClick={() => updateURL("page", "diets")}
                >
                  Diety
                </button>
              </div>
            </div>
            <div className="wk-top-filters-right">
              <button
                onClick={() => navigate("dodaj-plan-treningowy")}
                className="add-product-btn"
              >
                <Plus />
                Utwórz nowy plan treningowy
              </button>
            </div>
          </div>
          <div className="bottom" style={{ position: "relative" }}>
            <div className="filter-wrapper" style={{ maxWidth: "291px" }}>
              <input
                placeholder="Wyszukaj ćwiczenia..."
                className="p-filter-input"
                type="text"
              />
              <Search className="p-search-icon" />
            </div>
            <div className="filter-wrapper" style={{ maxWidth: "130px" }}>
              <select className="p-filter-input">
                <option value="">Partia ciała</option>
              </select>
              <AngleDown className="arrow" />
            </div>
            <div className="filter-wrapper" style={{ maxWidth: "223px" }}>
              <select className="p-filter-input">
                <option value="">Stopień zaawansowania</option>
              </select>
              <AngleDown className="arrow" />
            </div>
            <div className="filter-wrapper" style={{ maxWidth: "119px" }}>
              <select className="p-filter-input">
                <option value="">Kategorie</option>
              </select>
              <AngleDown className="arrow" />
            </div>
            <div className="filter-wrapper" style={{ maxWidth: "147px" }}>
              <select className="p-filter-input">
                <option value="">Intensywność</option>
              </select>
              <AngleDown className="arrow" />
            </div>
            <button className="clear-filters">Wyczyść filtry</button>
          </div>
        </header>
        <div className="plans-container">
          {trainingPlansData.map((plan) => (
            <TrainingPlan
              key={plan.id}
              name={plan.name}
              category={plan.category}
              part={plan.part}
              hardLevel={plan.hardLevel}
              intensity={plan.intensity}
              intensityLabel={plan.intensityLabel}
              priority={plan.priority}
              amount={plan.amount}
              time={plan.time}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default TrainingPlans;
