import "./../../../../styles/surveys.css";
import whiteField1 from "./../../../../assets/svgs/whiteField1.svg";
import whiteField2 from "./../../../../assets/svgs/whiteField2.svg";
import whiteField3 from "./../../../../assets/svgs/whiteField3.svg";
import whiteField4 from "./../../../../assets/svgs/whiteField4.svg";
import whiteField5 from "./../../../../assets/svgs/whiteField5.svg";
import whiteField6 from "./../../../../assets/svgs/whiteField6.svg";
import whiteField7 from "./../../../../assets/svgs/whiteField7.svg";
import whiteField8 from "./../../../../assets/svgs/whiteField8.svg";
import whiteField9 from "./../../../../assets/svgs/whiteField9.svg";
import redBin from "./../../../../assets/svgs/red-bin.svg";
import dots from "./../../../../assets/svgs/dots.svg";
import blackWarn from "./../../../../assets/svgs/black-warn.svg";
import { useRef } from "react";

function CommonHeader({ data, onUpdate, deleteField }) {
  const icons = {
    "Tekst krótki": whiteField1,
    "Tekst długi": whiteField1,
    "Skala ocen": whiteField2,
    "Pole liczbowe": whiteField3,
    Select: whiteField4,
    Multiselect: whiteField5,
    "Tabela pytań": whiteField6,
    "Tak/Nie": whiteField7,
    Data: whiteField8,
    Pliki: whiteField9,
  };

  const checkboxRef = useRef(null);

  return (
    <>
      <div className="asf-header">
        <div className="asf-header-left">
          <div className="asf-header-img-wrapper">
            <img
              className={`${data.type === "Skala ocen" ? "margin-right" : ""}`}
              src={icons[data.type]}
              alt=""
            />
          </div>
          <div className="asf-header-text">
            <span className="asf-type">{data.type}</span>
            <span className="asf-type-desc">{data.typeDesc}</span>
          </div>
        </div>
        <div className="asf-header-right">
          <img src={dots} alt="" />
          <img onClick={() => deleteField(data.id)} src={redBin} alt="" />
        </div>
      </div>
      <hr className="asf-line" />
      <div className="asf-common-inputs">
        <div className="asf-input-box">
          <label htmlFor="" className="asf-input-box-title">
            Treść pytania *
          </label>
          <input
            type="text"
            className="as-input"
            placeholder="Wpisz treść pytania..."
            value={data.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
          <span className="asf-length-counter">{data.title.length}/50</span>
        </div>
        <div className="asf-input-box">
          <label htmlFor="" className="asf-input-box-title">
            Opis / podpowiedź
          </label>
          <textarea
            className="as-input textarea"
            placeholder="Opcjonalny opis lub wskazówka..."
            value={data.desc}
            onChange={(e) => onUpdate({ desc: e.target.value })}
          />
          <span className="asf-length-counter">{data.desc.length}/50</span>
        </div>
      </div>
      <div className="asf-is-required-wrapper">
        <span className="asf-is-required-text">
          <img src={blackWarn} alt="" />
          Pole wymagane
        </span>
        <div
          className="asf-switch-wrapper"
          onClick={() => checkboxRef.current.click()}
        >
          <input
            type="checkbox"
            className="asf-switch"
            checked={data.isRequired}
            onChange={() => onUpdate({ isRequired: !data.isRequired })}
            hidden
            ref={checkboxRef}
          />
        </div>
      </div>
    </>
  );
}

export default CommonHeader;
