import "./../../../../../styles/workouts.css";
import blueDiamond from "./../../../../../assets/svgs/blue-diamond.svg";
import yellowDiamond from "./../../../../../assets/svgs/yellow-diamond.svg";
import redTraingle from "./../../../../../assets/svgs/red-traingle.svg";
import orangeList from "./../../../../../assets/svgs/orangeList.svg";
import purpleClock from "./../../../../../assets/svgs/purpleClock.svg";
import whiteClock from "./../../../../../assets/svgs/whiteClock.svg";

function TrainingPlan({
  hardLevel,
  category,
  intensity,
  intensityLabel,
  name,
  part,
  priority,
  amount,
  time,
}) {
  const level = hardLevel === 0 ? "green" : hardLevel === 1 ? "yellow" : "red";
  const figure =
    intensity === 0
      ? blueDiamond
      : intensity === 1
        ? yellowDiamond
        : redTraingle;
  const levelLabel =
    hardLevel === 0
      ? "Początkujący"
      : hardLevel === 1
        ? "Z doświadczeniem"
        : "Zaawansowany";

  return (
    <>
      <div className="tp-wrapper">
        <div className={`tp-top-bar ${level}`} />
        <div className="tp-content">
          <div className="tp-top">
            <span className="tp-category">{category}</span>
            <div className="tp-intensity">
              <img src={figure} alt="" />
              <span>{intensityLabel}</span>
            </div>
          </div>
          <div className="tp-title-box">
            <h3 className="tp-title">{name}</h3>
            <span className="tp-part">{part}</span>
          </div>
          <hr className="tp-line" />
          <div className="tp-informations">
            <div className="tp-info-boxes">
              <div className="grey">
                <span className="name">Stopień zaawansowania</span>
                <span className={`value level ${level}`}>{levelLabel}</span>
              </div>
              <div className="grey">
                <span className="name">Priorytet</span>
                <span className={`value`}>{priority}</span>
              </div>
            </div>
            <div className="tp-info-boxes">
              <div className="flex">
                <div className="img-wrapper" id="list">
                  <img src={orangeList} alt="" />
                </div>
                <div>
                  <span className="name">Ilość ćwiczeń</span>
                  <span className="value">{amount}</span>
                </div>
              </div>
              <div className="flex">
                <div className="img-wrapper" id="clock">
                  <img src={purpleClock} alt="" />
                </div>
                <div>
                  <span className="name">Czas trwania</span>
                  <span className="value">{time}</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="tp-line" />
          <div className="tp-footer">
            <div className="tp-eq-box">
              <span className="title">Wymagany sprzęt</span>
              <div className="tp-eq">
                {Array.from({ length: 6 }, (_, i) => i).map((_, i) => (
                  <div key={i} className="tp-eq-img-wrapper">
                    <img src={whiteClock} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <button className="tp-button">PRZYPISZ PLAN</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainingPlan;
