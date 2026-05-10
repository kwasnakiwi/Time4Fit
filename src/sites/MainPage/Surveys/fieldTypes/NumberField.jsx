import "./../../../../styles/surveys.css";

function NumberField({ data, onUpdate }) {
  return (
    <>
      <span className="asf-scale-inputs-title">Walidacja</span>
      <div className="asf-scale-inputs">
        <div className="asf-input-box">
          <label htmlFor="" className="asf-input-box-title">
            Min
          </label>
          <input
            type="number"
            className="as-input"
            value={data.min}
            onChange={(e) => onUpdate({ min: e.target.value })}
            placeholder="Brak"
          />
        </div>
        <div className="asf-input-box">
          <label htmlFor="" className="asf-input-box-title">
            Max
          </label>
          <input
            type="number"
            className="as-input"
            value={data.max}
            onChange={(e) => onUpdate({ max: e.target.value })}
            placeholder="Brak"
          />
        </div>
      </div>
    </>
  );
}

export default NumberField;
