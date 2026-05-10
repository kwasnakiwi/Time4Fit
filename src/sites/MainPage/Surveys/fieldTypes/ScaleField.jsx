import "./../../../../styles/surveys.css";

function ScaleField({ data, onUpdate }) {
  return (
    <>
      <span className="asf-scale-inputs-title">Skala ocen</span>
      <div className="asf-scale-inputs">
        <div className="asf-input-box">
          <label htmlFor="" className="asf-input-box-title">
            Od
          </label>
          <input
            type="number"
            className="as-input"
            value={data.min}
            onChange={(e) => onUpdate({ min: e.target.value })}
          />
        </div>
        <div className="asf-input-box">
          <label htmlFor="" className="asf-input-box-title">
            Do
          </label>
          <input
            type="number"
            className="as-input"
            value={data.max}
            onChange={(e) => onUpdate({ max: e.target.value })}
          />
        </div>
      </div>
    </>
  );
}

export default ScaleField;
