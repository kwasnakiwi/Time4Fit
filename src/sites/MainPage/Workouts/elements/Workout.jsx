import "./../../../../styles/workouts.css";
import redBin from "./../../../../assets/svgs/red-bin.svg";
import orangeEdit from "./../../../../assets/svgs/orangeEdit.svg";

function Workout({ category, part, exercise, level, equipment, complexity }) {
  const levelConfig = {
    0: { levelLabel: "Początkujący", levelClassName: "green" },
    1: { levelLabel: "Doświadczony", levelClassName: "yellow" },
    2: { levelLabel: "Zaawansowany", levelClassName: "red" },
  };

  const categoryConfig = {
    "chest": "Klatka piersiowa",
    "legs": "Nogi",
    "biceps": "Biceps",
    "back": "Plecy",
  }

  const { levelLabel, levelClassName } = levelConfig[level] || levelConfig[0];
  const categoryLabel = categoryConfig[category];

  return (
    <>
      <div className="wk-workout">
        <div className="wk-element">
          <span className="name">Kategoria</span>
          <span className="value box orange">{categoryLabel}</span>
        </div>
        <div className="wk-element">
          <span className="name">Partia</span>
          <span className="value box orange">{part}</span>
        </div>
        <div className="wk-element">
          <span className="name">Ćwiczenie</span>
          <span className="value">{exercise}</span>
        </div>
        <div className="wk-element">
          <span className="name" style={{ textAlign: "center" }}>
            Poziom trudności
          </span>
          <span
            className={`value box ${levelClassName}`}
            style={{ textAlign: "center" }}
          >
            {levelLabel}
          </span>
        </div>
        <div className="wk-element">
          <span className="name" style={{ textAlign: "center" }}>
            Sprzęt
          </span>
          <span className="value box grey" style={{ textAlign: "center" }}>
            {equipment}
          </span>
        </div>
        <div className="wk-element">
          <span className="name" style={{ textAlign: "center" }}>
            Złożoność
          </span>
          <span
            className="value small-box purple"
            style={{ textAlign: "center" }}
          >
            {complexity}
          </span>
        </div>
        <div className="wk-element actions">
          <img className="delete" src={redBin} alt="" />
          <img className="edit" src={orangeEdit} alt="" />
        </div>
      </div>
    </>
  );
}

export default Workout;
