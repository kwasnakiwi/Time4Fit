import "./../../../../styles/popup.css";
import sett from "./../../../../assets/svgs/sett.svg";
import { FaAngleDown as AngleDown, FaPlus as Plus } from "react-icons/fa";
import coffee from "./../../../../assets/svgs/coffee.svg";
import { useRef, useState } from "react";
import cubes from "./../../../../assets/svgs/cubes.svg";
import redBin from "./../../../../assets/svgs/red-bin.svg";
import orangeBook from "./../../../../assets/svgs/orangeBook.svg";
import img from "./../../../../assets/svgs/img.svg";

function AddWorkoutModal({ setShowModal }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [hardLevel, setHardLevel] = useState("");
  const [moveType, setMoveType] = useState("");
  const [muscleGroups, setMuscleGroups] = useState("");
  const [complexity, setComplexity] = useState(0);
  const [equipment, setEquipment] = useState("");
  const [notes, setNotes] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [timeout, setTimeout] = useState(0);
  const [rpe, setRpe] = useState(0);
  const [rate, setRate] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowModal(false)}
      />
      <div className="template-modal dish-modal">
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-img-wrapper">
              <img src={sett} alt="" />
            </div>
            <div className="template-modal-info-text">
              <h3>Dodawanie ćwiczenia</h3>
              <span>Dodaj ćwiczenie</span>
            </div>
          </div>
          <span className="close-modal" onClick={() => setShowModal(false)}>
            ✕
          </span>
        </header>
        <section className="template-modal-content">
          <div className="template-modal-info-inputs">
            <div className="template-modal-input-box">
              <label className="template-modal-title secondery" htmlFor="">
                Nazwa ćwiczenia
              </label>
              <input
                type="text"
                className="template-modal-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="template-modal-input-box">
              <label htmlFor="" className="template-modal-title secondery">
                Kategoria
              </label>
              <div className="tm-select-wrapper">
                <select
                  name=""
                  className="template-modal-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="chest">Klatka</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
          </div>
          <div className="template-modal-info-inputs">
            <div className="template-modal-input-box">
              <label htmlFor="" className="template-modal-title secondery">
                Poziom trudności
              </label>
              <div className="tm-select-wrapper">
                <select
                  name=""
                  className="template-modal-input"
                  value={hardLevel}
                  onChange={(e) => setHardLevel(e.target.value)}
                >
                  <option value="chest">Klatka</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
            <div className="template-modal-input-box">
              <label htmlFor="" className="template-modal-title secondery">
                Typ ruchu
              </label>
              <div className="tm-select-wrapper">
                <select
                  name=""
                  className="template-modal-input"
                  value={moveType}
                  onChange={(e) => setMoveType(e.target.value)}
                >
                  <option value="isolated">Izolowany</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
          </div>
          <div className="template-modal-info-inputs">
            <div className="template-modal-input-box">
              <label className="template-modal-title secondery" htmlFor="">
                Grupy mięsniowe
              </label>
              <input
                type="text"
                className="template-modal-input"
                value={muscleGroups}
                onChange={(e) => setMuscleGroups(e.target.value)}
              />
            </div>
            <div
              className="template-modal-input-box"
              style={{ maxWidth: "147px" }}
            >
              <label
                className="template-modal-title secondery"
                htmlFor=""
                style={{ whiteSpace: "nowrap" }}
              >
                Złożoność techniczna
              </label>
              <input
                type="number"
                className="template-modal-input"
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                style={{ textAlign: "center" }}
              />
            </div>
            <div className="template-modal-input-box">
              <label htmlFor="" className="template-modal-title secondery">
                Sprzęt
              </label>
              <div className="tm-select-wrapper">
                <select
                  name=""
                  className="template-modal-input"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                >
                  <option value="gumy">Gumy oporowe</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
          </div>
          <div
            className="template-modal-input-box"
            style={{ position: "relative", marginTop: "12px" }}
          >
            <label htmlFor="" className="template-modal-title">
              Uwagi/Notatki
            </label>
            <textarea
              className="template-modal-input textarea"
              value={notes}
              name=""
              onChange={(e) => setNotes(e.target.value)}
              maxLength={250}
              style={{ height: "118px" }}
            />
            <span className="length-counter" style={{ top: 0, right: 0 }}>
              {notes.length}/250
            </span>
          </div>
          <div
            className="template-modal-input-box"
            style={{ marginTop: "12px" }}
          >
            <label className="template-modal-title secondery" htmlFor="">
              Link do filmu
            </label>
            <input
              type="text"
              className="template-modal-input"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
          </div>
          <div className="quantity-inputs">
            <h2 className="template-modal-title-bold">
              <img src={orangeBook} alt="" />
              Domyślne ustawienie ćwiczenia
            </h2>
            <div className="template-modal-info-inputs">
              <div className="template-modal-input-box">
                <label className="template-modal-title secondery" htmlFor="">
                  Serie
                </label>
                <input
                  type="number"
                  className="template-modal-input"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                />
              </div>
              <div className="template-modal-input-box">
                <label className="template-modal-title secondery" htmlFor="">
                  Powtórznia
                </label>
                <input
                  type="number"
                  className="template-modal-input"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
            </div>
            <div className="template-modal-info-inputs">
              <div className="template-modal-input-box">
                <label className="template-modal-title secondery" htmlFor="">
                  Ciężar
                </label>
                <input
                  type="number"
                  className="template-modal-input"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="template-modal-input-box">
                <label className="template-modal-title secondery" htmlFor="">
                  Przerwa
                </label>
                <input
                  type="number"
                  className="template-modal-input"
                  value={timeout}
                  onChange={(e) => setTimeout(e.target.value)}
                />
              </div>
            </div>
            <div className="template-modal-info-inputs">
              <div className="template-modal-input-box">
                <label className="template-modal-title secondery" htmlFor="">
                  RPE
                </label>
                <input
                  type="number"
                  className="template-modal-input"
                  value={rpe}
                  onChange={(e) => setRpe(e.target.value)}
                />
              </div>
              <div className="template-modal-input-box">
                <label className="template-modal-title secondery" htmlFor="">
                  Tempo
                </label>
                <input
                  type="string"
                  className="template-modal-input"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="template-modal-image-input-box">
            <h2
              className="template-modal-title-bold flex"
              style={{ marginBottom: "16px" }}
            >
              <img src={img} alt="" />
              Zdjęcie
            </h2>
            <input
              type="file"
              hidden
              accept="image/*"
              ref={imageInputRef}
              onChange={(e) => handleImageChange(e)}
            />
            {preview ? (
              <img
                className="template-modal-image-preview"
                onClick={() => imageInputRef.current.click()}
                src={preview}
              />
            ) : (
              <div
                className="template-modal-add-image"
                onClick={() => imageInputRef.current.click()}
              >
                <span>+</span>
              </div>
            )}
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
            Dodaj
          </button>
        </section>
      </div>
    </>
  );
}

export default AddWorkoutModal;
