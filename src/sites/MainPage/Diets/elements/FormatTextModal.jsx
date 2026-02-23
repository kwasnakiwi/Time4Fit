import { useRef, useState } from "react";
import "./../../../../styles/popup.css";
import A from "./../../../../assets/svgs/A.svg";
import B from "./../../../../assets/svgs/B.svg";
import I from "./../../../../assets/svgs/I.svg";
import U from "./../../../../assets/svgs/U.svg";
import S from "./../../../../assets/svgs/S.svg";
import left from "./../../../../assets/svgs/left.svg";
import middle from "./../../../../assets/svgs/middle.svg";
import right from "./../../../../assets/svgs/right.svg";
import ul from "./../../../../assets/svgs/ul.svg";
import ol from "./../../../../assets/svgs/ol.svg";
import cl from "./../../../../assets/svgs/cl.svg";
import quotes from "./../../../../assets/svgs/quotes.svg";

function FormatTextModal({ setShowFormatTextModal }) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [fsize, setFsize] = useState(14);

  const colorInputRef = useRef(null);

  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowFormatTextModal(false)}
        style={{ zIndex: 3 }}
      />
      <div className="template-modal">
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-info-text">
              <h3>Edytor tekstu</h3>
              <span>Formatuj tekst</span>
            </div>
          </div>
          <span
            className="close-modal"
            onClick={() => setShowFormatTextModal(false)}
          >
            ✕
          </span>
        </header>
        <section
          className="template-modal-content"
          style={{ paddingTop: "12px", paddingBottom: 0 }}
        >
          <div className="modal-format-options">
            <div className="modal-format-option">
              <div className="format-wrapper">
                <img
                  style={{ cursor: "pointer" }}
                  src={A}
                  alt=""
                  onClick={() => colorInputRef.current.click()}
                />
                <div
                  className="selected-color"
                  style={{ backgroundColor: color }}
                  onClick={() => colorInputRef.current.click()}
                />
                <input
                  type="color"
                  hidden
                  ref={colorInputRef}
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-format-option">
              <div className="modal-fsize-format">
                <span onClick={() => setFsize((prev) => prev + 1)}>+</span>
                <input
                  type="number"
                  min={1}
                  value={fsize}
                  onChange={(e) => setFsize(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value < 1) {
                      e.target.value = 1;
                      setFsize(1);
                    }
                  }}
                />
                <span
                  onClick={() => {
                    if (!(fsize <= 1)) {
                      setFsize((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </span>
              </div>
            </div>
            <div className="modal-format-option">
              <img src={B} alt="" />
              <img src={I} alt="" />
              <img src={U} alt="" />
              <img src={S} alt="" />
            </div>
            <div className="modal-format-option">
              <img src={left} alt="" />
              <img src={middle} alt="" />
              <img src={right} alt="" />
            </div>
            <div className="modal-format-option">
              <img src={ul} alt="" />
              <img src={ol} alt="" />
              <img src={cl} alt="" />
            </div>
            <div className="modal-format-option">
              <img src={quotes} alt="" />
            </div>
          </div>
          <div className="modal-large-text-input">
            <textarea
              className="modal-large-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Przepis..."
            />
          </div>
        </section>
        <section className="template-modal-btns space-between">
          <button
            className="template-modal-btn cancel"
            onClick={() => setShowFormatTextModal(false)}
          >
            Wróc do tworzenia potrawy
          </button>
          <button
            className="template-modal-btn accept"
            onClick={() => setShowFormatTextModal(false)}
          >
            Dodaj tekst
          </button>
        </section>
      </div>
    </>
  );
}

export default FormatTextModal;
