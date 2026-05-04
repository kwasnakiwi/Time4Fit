import "./../../../../../styles/popup.css";
import sett from "./../../../../../assets/svgs/sett.svg";
import orangeBook from "./../../../../../assets/svgs/orangeBook.svg";
import { useRef, useState } from "react";
import { FaAngleDown as AngleDown, FaPlus as Plus } from "react-icons/fa";
import redBin from "./../../../../../assets/svgs/red-bin.svg";
import img from "./../../../../../assets/svgs/img.svg";
function ConfigExerciseModal({ id, setShowModal }) {
  const [videoLink, setVideoLink] = useState("");
  const [notes, setNotes] = useState("");
  const [rpe, setRpe] = useState(0);
  const [rate, setRate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [settings, setSettings] = useState([
    { weight: 0, reps: 0, timeout: 0 },
  ]);

  const imageInputRef = useRef(null);

  const handleSettingChange = (index, field, value) => {
    const newSettings = [...settings];
    newSettings[index] = { ...newSettings[index], [field]: value };
    setSettings(newSettings);
  };

  const addSetting = () => {
    if (
      !settings[settings.length - 1].weight ||
      !settings[settings.length - 1].reps ||
      !settings[settings.length - 1].timeout
    )
      return;
    setSettings([...settings, { weight: 0, reps: 0, timeout: 0 }]);
  };

  const removeSetting = (index) => {
    if (settings.length > 1) {
      setSettings(settings.filter((_, i) => i !== index));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddExercise = () => {
    return;
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
              <h3>Konfiguracja ćwiczenia</h3>
              <span>Dostosuj ćwiczenie</span>
            </div>
          </div>
          <span className="close-modal" onClick={() => setShowModal(false)}>
            ✕
          </span>
        </header>
        <section className="template-modal-content">
          <div className="template-modal-input-box">
            <label htmlFor="" className="template-modal-title">
              Link do filmu
            </label>
            <input
              type="text"
              className="template-modal-input"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
          </div>
          <div
            className="template-modal-input-box"
            style={{ position: "relative", marginTop: "12px" }}
          >
            <label htmlFor="" className="template-modal-title">
              Przepis
            </label>
            <textarea
              className="template-modal-input textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={250}
              style={{ height: "118px" }}
            />
            <span className="length-counter" style={{ top: 0, right: 0 }}>
              {notes.length}/250
            </span>
          </div>
          <div className="quantity-inputs">
            <h2 className="template-modal-title-bold">
              <img src={orangeBook} alt="" />
              Domyślne ustawienie ćwiczenia
            </h2>
            <div className="template-modal-info-inputs">
              <div className="template-modal-input-box">
                <label htmlFor="" className="template-modal-title">
                  RPE
                </label>
                <input
                  type="text"
                  className="template-modal-input"
                  value={rpe}
                  onChange={(e) => setRpe(e.target.value)}
                />
              </div>
              <div className="template-modal-input-box">
                <label htmlFor="" className="template-modal-title">
                  Tempo
                </label>
                <input
                  type="text"
                  className="template-modal-input"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="quantity-inputs">
            <h2 className="template-modal-title-bold">
              <img src={orangeBook} alt="" />
              Informacje ćwiczenia
            </h2>
            <div className="modal-ingredients-list-wrapper">
              <div className="modal-ingredients-names">
                <span style={{ width: "40px" }}>Seria</span>
                <span style={{ width: "100%" }}>Waga (kg)</span>
                <span style={{ width: "100%" }}>Powtórzenia</span>
                <span style={{ width: "100%" }}>Przerwa (sec)</span>
                <span style={{ width: "40px" }}>Akcja</span>
              </div>
              <ol
                className="modal-ingredients-list"
                style={{ marginTop: "4px" }}
              >
                {settings.map((el, i) => (
                  <li key={i}>
                    <input
                      type="number"
                      className="template-modal-input"
                      style={{
                        maxWidth: "none",
                      }}
                      value={el.weight}
                      onChange={(e) =>
                        handleSettingChange(i, "weight", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="template-modal-input"
                      style={{
                        maxWidth: "none",
                      }}
                      value={el.reps}
                      onChange={(e) =>
                        handleSettingChange(i, "reps", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="template-modal-input"
                      style={{
                        maxWidth: "none",
                      }}
                      value={el.timeout}
                      onChange={(e) =>
                        handleSettingChange(i, "timeout", e.target.value)
                      }
                    />
                    <span className="delete-ingredient">
                      <img
                        src={redBin}
                        alt=""
                        onClick={() => removeSetting(i)}
                      />
                    </span>
                    <span className="ing-enumeration">{i + 1}</span>
                  </li>
                ))}
              </ol>
              <button
                className="modal-add-ingredient add-product-btn"
                onClick={() => addSetting()}
              >
                <Plus className="p-plus" /> Dodaj
              </button>
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
            onClick={handleAddExercise}
          >
            Dodaj
          </button>
        </section>
      </div>
    </>
  );
}

export default ConfigExerciseModal;
