import "./../../../styles/surveys.css";
import whiteField1 from "./../../../assets/svgs/whiteField1.svg";
import redBin from "./../../../assets/svgs/red-bin.svg";
import dots from "./../../../assets/svgs/dots.svg";
import blackWarn from "./../../../assets/svgs/black-warn.svg";
import { useRef } from "react";

function CommonHeader({ data, onUpdate, deleteField }) {
  const icons = {
    "Tekst krótki": whiteField1,
    "Tekst długi": whiteField1,
  };

  const checkboxRef = useRef(null);

  return (
    <>
      <div className="asf-header">
        <div className="asf-header-left">
          <div className="asf-header-img-wrapper">
            <img src={icons[data.type]} alt="" />
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
