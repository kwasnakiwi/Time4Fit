import "./../../../../../styles/workouts.css";
import whiteFire from "./../../../../../assets/svgs/whiteFire.svg";

function Diet({
  category,
  mealsCount,
  title,
  calories,
  macros,
  dietaryRestrictions,
  note,
  actionLabel,
}) {
  return (
    <>
      <div className="tp-wrapper">
        <div className="tp-top-bar green" />
        <div className="tp-content">
          <div className="tp-top">
            <span className="tp-category">{category}</span>
            <div className="tp-intensity">
              <span>{mealsCount}</span>
            </div>
          </div>
          <div className="tp-title-box">
            <h3 className="tp-title">{title}</h3>
          </div>
          <div className="dp-calories-box">
            <div className="dp-calories-box-left">
              <h3>Kaloryczność</h3>
              <p>
                <strong>{calories}</strong> kcal
              </p>
            </div>
            <div className="dp-calories-box-right">
              <div className="dp-img-box">
                <img src={whiteFire} alt="" />
              </div>
            </div>
          </div>
          <div className="dp-macros">
            {macros.map((macro, i) => (
              <div className={`dp-macro ${macro.colorScheme}`} key={i}>
                <span className="dp-label">{macro.label}</span>
                <span className="dp-value">{macro.value}</span>
              </div>
            ))}
          </div>
          <hr className="tp-line" />
          <div className="dp-text">
            <span className="dp-text-label">Ograniczenia żywieniowe</span>
            <p className="dp-text-value">{dietaryRestrictions}</p>
          </div>
          <hr className="tp-line" />
          <div className="dp-text">
            <span className="dp-text-label">Notatka</span>
            <p className="dp-text-value">{note}</p>
          </div>
          <button className="tp-button" style={{marginTop: "18px"}}>{actionLabel}</button>
        </div>
      </div>
    </>
  );
}

export default Diet;
