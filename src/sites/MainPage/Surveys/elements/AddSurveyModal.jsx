import "./../../../../styles/popup.css";
import sett from "./../../../../assets/svgs/sett.svg";
import orangeSurvey from "./../../../../assets/svgs/orangeSurvey.svg";
import { useRef, useState } from "react";
import { FaAngleDown as AngleDown } from "react-icons/fa";

function AddSurveyModal({ setShowModal }) {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [category, setCategory] = useState("");
  const [notify, setNotify] = useState(true);

  const checkboxRef = useRef(null);

  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowModal(false)}
      />
      <div className="template-modal dish-modal" style={{ maxWidth: "517px" }}>
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-img-wrapper">
              <img src={sett} alt="" />
            </div>
            <div className="template-modal-info-text">
              <h3>Ustawienie końcowe ankiety</h3>
              <span>Dostosuj ankiete</span>
            </div>
          </div>
          <span className="close-modal" onClick={() => setShowModal(false)}>
            ✕
          </span>
        </header>
        <section className="template-modal-content">
          <div className="template-modal-input-box">
            <label htmlFor="" className="template-modal-title secondery">
              Tytuł ankiety
            </label>
            <input
              type="text"
              className="template-modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div
            className="template-modal-input-box"
            style={{ marginTop: "12px" }}
          >
            <label htmlFor="" className="template-modal-title secondery">
              Informacje zwrotne
            </label>
            <textarea
              className="template-modal-input"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              style={{ height: "118px" }}
            />
          </div>
          <div
            className="template-modal-input-box"
            style={{ marginTop: "12px" }}
          >
            <label htmlFor="" className="template-modal-title secondery flex">
              <img src={orangeSurvey} alt="" />
              Kategoria ankiety
            </label>
            <div className="tm-select-wrapper">
              <select
                className="template-modal-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Brak</option>
              </select>
              <AngleDown className="arrow" />
            </div>
          </div>
          <div
            className="template-modal-input-box"
            style={{
              marginTop: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <label htmlFor="" className="template-modal-title secondery">
              Powiadom mnie, gdy podopieczny wypełni ankietę
            </label>
            <div
              className="asf-switch-wrapper"
              onClick={() => checkboxRef.current.click()}
            >
              <input
                type="checkbox"
                className="asf-switch"
                checked={notify}
                onChange={() => setNotify((n) => !n)}
                hidden
                ref={checkboxRef}
              />
            </div>
          </div>
        </section>
        <hr className="template-modal-line" />
        <section className="template-modal-btns">
          <button
            className="template-modal-btn cancel"
            onClick={() => setShowModal(false)}
          >
            Anuluj
          </button>
          <button
            className="template-modal-btn accept"
            onClick={() => setShowModal(false)}
          >
            Stwórz ankiete
          </button>
        </section>
      </div>
    </>
  );
}

export default AddSurveyModal;
