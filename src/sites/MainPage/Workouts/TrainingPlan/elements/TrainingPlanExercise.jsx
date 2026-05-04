import "./../../../../../styles/workouts.css";
import dots from "./../../../../../assets/svgs/dots.svg";
import redBin from "./../../../../../assets/svgs/red-bin.svg";
import orangeEdit from "./../../../../../assets/svgs/orangeEdit.svg";

function TrainingPlanExercise({
  i,
  setSelectedExercise,
  part,
  title,
  sets,
  reps,
  weight,
  timeout,
  className,
}) {
  return (
    <>
      <div
        className={`tp-exercise ${className}`}
        onClick={() => setSelectedExercise(i)}
      >
        <div className="tp-exercise-box dots-wrapper">
          {className == "selected" && <img src={dots} alt="" />}
        </div>
        <div className="tp-exercise-box">
          <span className="name">Partia</span>
          <span className="value box orange">{part}</span>
        </div>
        <div className="tp-exercise-box">
          <span className="name">Ćwiczenie</span>
          <span className="value">{title}</span>
        </div>
        <div className="tp-exercise-box center">
          <span className="name">Serie</span>
          <span className="value box purple">{sets}</span>
        </div>
        <div className="tp-exercise-box center">
          <span className="name">Powtórzenia</span>
          <span className="value box magenta">{reps}</span>
        </div>
        <div className="tp-exercise-box center">
          <span className="name">Ciężar</span>
          <span className="value box teal">{weight} kg</span>
        </div>
        <div className="tp-exercise-box center">
          <span className="name">Przerwa</span>
          <span className="value box green">{timeout}sec</span>
        </div>
        <div className="tp-exercise-box actions">
          <img src={redBin} alt="" />
          <img src={orangeEdit} alt="" />
        </div>
      </div>
    </>
  );
}

export default TrainingPlanExercise;
