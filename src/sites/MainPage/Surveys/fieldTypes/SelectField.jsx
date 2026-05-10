import { useState } from "react";
import "./../../../../styles/surveys.css";
import redBin from "./../../../../assets/svgs/red-bin.svg";
import dots from "./../../../../assets/svgs/dots.svg";

function SelectField({ data, onUpdate }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <span className="asf-scale-inputs-title" style={{ margin: 0 }}>
          Opcje wyboru
        </span>
        <span
          className="asf-add-option"
          onClick={() => onUpdate({ options: [...data.options, ""] })}
        >
          <span>+</span> Dodaj opcję
        </span>
      </div>
      <div className="asf-select-options">
        {data.options.map((opt, i) => (
          <div className="asf-select-option" key={i}>
            <input
              type="text"
              className="as-input"
              value={opt}
              onChange={(e) => {
                let newOptions = [...data.options];
                newOptions[i] = e.target.value;
                onUpdate({ options: newOptions });
              }}
              placeholder={`Opcja ${i + 1}`}
            />
            <img src={dots} alt="" />
            <img
              src={redBin}
              alt=""
              onClick={() =>
                onUpdate({
                  options: data.options.filter((_, idx) => idx !== i),
                })
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default SelectField;
