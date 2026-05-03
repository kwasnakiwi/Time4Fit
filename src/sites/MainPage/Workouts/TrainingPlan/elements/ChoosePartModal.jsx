import "./../../../../../styles/popup.css";
import "./../../../../../styles/workouts.css";
import bicepsIcon from "./../../../../../assets/svgs/bicepsIcon.svg";
import other from "./../../../../../assets/svgs/other.svg";
import fullBody from "./../../../../../assets/svgs/fullBody.svg";
import cardio from "./../../../../../assets/svgs/cardio.svg";
import legs from "./../../../../../assets/svgs/legs.svg";
import thighs from "./../../../../../assets/svgs/thighs.svg";
import stomach from "./../../../../../assets/svgs/stomach.svg";
import forearm from "./../../../../../assets/svgs/forearm.svg";
import triceps from "./../../../../../assets/svgs/triceps.svg";
import biceps from "./../../../../../assets/svgs/biceps.svg";
import shoulders from "./../../../../../assets/svgs/shoulders.svg";
import back from "./../../../../../assets/svgs/back.svg";
import chest from "./../../../../../assets/svgs/chest.svg";
import { useState } from "react";
import { createPortal } from "react-dom";
import ChooseWorkoutsModal from "./ChooseWorkoutsModal";

function ChoosePartModal({
  setShowChoosePartModal,
  setShowChooseWorkoutsModal,
  showChooseWorkoutsModal,
}) {
  const [selectedPartIdx, setSelectedPartIdx] = useState(0);

  const options = [
    { label: "Klatka piersiowa", svg: chest },
    { label: "Plecy", svg: back },
    { label: "Barki", svg: shoulders },
    { label: "Biceps", svg: biceps },
    { label: "Triceps", svg: triceps },
    { label: "Przedramię", svg: forearm },
    { label: "Brzuch", svg: stomach },
    { label: "Uda", svg: thighs },
    { label: "Nogi", svg: legs },
    { label: "Kardio", svg: cardio },
    { label: "Fullbody", svg: fullBody },
    { label: "Inne", svg: other },
  ];

  const handlePartClick = (idx) => {
    setSelectedPartIdx(idx);

    setShowChooseWorkoutsModal(true);
  };

  return (
    <>
      {showChooseWorkoutsModal &&
        createPortal(
          <ChooseWorkoutsModal
            setShowChooseWorkoutsModal={setShowChooseWorkoutsModal}
            part={selectedPartIdx}
          />,
          document.body,
        )}
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowChoosePartModal(false)}
      />
      <div className="template-modal dish-modal" style={{ maxWidth: "1032px" }}>
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-img-wrapper">
              <img src={bicepsIcon} alt="" />
            </div>
            <div className="template-modal-info-text">
              <h3>Dodawanie ćwiczenia</h3>
              <span>Dodaj ćwiczenie</span>
            </div>
          </div>
          <span
            className="close-modal"
            onClick={() => setShowChoosePartModal(false)}
          >
            ✕
          </span>
        </header>
        <section
          className="template-modal-content parts-wrapper"
          style={{ padding: "5% 5%" }}
        >
          {options.map((opt, i) => (
            <div
              key={i}
              className={`tm-body-part ${i === selectedPartIdx ? "selected" : ""}`}
              onClick={() => handlePartClick(i)}
            >
              <img src={opt.svg} alt="" />
              <span>{opt.label}</span>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default ChoosePartModal;
