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
import Diet from "./elements/Diet";

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
  const dietsData = [
    {
      id: 1,
      category: "Klasyczna",
      mealsCount: "20 posiłków",
      title: "Redukcja 2200 kcal",
      calories: 2200,
      macros: [
        { id: "protein", label: "Białko", value: "165g", colorScheme: "blue" },
        { id: "fat1", label: "Tłuszcze", value: "70g", colorScheme: "yellow" },
        { id: "fat2", label: "Tłuszcze", value: "70g", colorScheme: "yellow" },
        { id: "carbs", label: "Węgle", value: "220g", colorScheme: "green" },
      ],
      dietaryRestrictions: "brak",
      note: "brak",
      actionLabel: "PRZYPISZ DIETĘ",
    },
    {
      id: 2,
      category: "Wegetariańska",
      mealsCount: "15 posiłków",
      title: "Masa 3000 kcal",
      calories: 3000,
      macros: [
        { id: "protein", label: "Białko", value: "180g", colorScheme: "blue" },
        { id: "fat", label: "Tłuszcze", value: "90g", colorScheme: "yellow" },
        { id: "carbs", label: "Węgle", value: "370g", colorScheme: "green" },
      ],
      dietaryRestrictions: "Bez mięsa",
      note: "Plan 30-dniowy",
      actionLabel: "PRZYPISZ DIETĘ",
    },
    {
      id: 3,
      category: "Wegetariańska",
      mealsCount: "15 posiłków",
      title: "Masa 3000 kcal",
      calories: 3000,
      macros: [
        { id: "protein", label: "Białko", value: "180g", colorScheme: "blue" },
        { id: "fat", label: "Tłuszcze", value: "90g", colorScheme: "yellow" },
        { id: "carbs", label: "Węgle", value: "370g", colorScheme: "green" },
      ],
      dietaryRestrictions: "Bez mięsa",
      note: "Plan 30-dniowy",
      actionLabel: "PRZYPISZ DIETĘ",
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
                onClick={() =>
                  navigate(
                    page === "workouts"
                      ? "dodaj-plan-treningowy"
                      : "dodaj-plan-diety",
                  )
                }
                className="add-product-btn"
              >
                <Plus />
                {page === "workouts"
                  ? "Utwórz nowy plan treningowy"
                  : "Utwórz nowy plan diety"}
              </button>
            </div>
          </div>
          <div className="bottom" style={{ position: "relative" }}>
            <div className="filter-wrapper" style={{ maxWidth: "291px" }}>
              <input
                placeholder={
                  page === "workouts"
                    ? "Wyszukaj ćwiczenia..."
                    : "Wyszukaj diety..."
                }
                className="p-filter-input"
                type="text"
              />
              <Search className="p-search-icon" />
            </div>
            {page === "workouts" ? (
              <>
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
              </>
            ) : (
              <>
                <div className="filter-wrapper" style={{ maxWidth: "113px" }}>
                  <select className="p-filter-input">
                    <option value="">Cel diety</option>
                  </select>
                  <AngleDown className="arrow" />
                </div>
                <div className="filter-wrapper" style={{ maxWidth: "159px" }}>
                  <select className="p-filter-input">
                    <option value="">Złożoność diety</option>
                  </select>
                  <AngleDown className="arrow" />
                </div>
                <div className="filter-wrapper" style={{ maxWidth: "115px" }}>
                  <select className="p-filter-input">
                    <option value="">Typ diety</option>
                  </select>
                  <AngleDown className="arrow" />
                </div>
              </>
            )}
            <button className="clear-filters">Wyczyść filtry</button>
          </div>
        </header>
        <div className="plans-container">
          {page === "workouts"
            ? trainingPlansData.map((plan) => (
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
              ))
            : page === "diets" &&
              dietsData.map((diet) => (
                <Diet
                  key={diet.id}
                  category={diet.category}
                  mealsCount={diet.mealsCount}
                  title={diet.title}
                  calories={diet.calories}
                  macros={diet.macros}
                  dietaryRestrictions={diet.dietaryRestrictions}
                  note={diet.note}
                  actionLabel={diet.actionLabel}
                />
              ))}
        </div>
      </main>
    </>
  );
}

export default TrainingPlans;
