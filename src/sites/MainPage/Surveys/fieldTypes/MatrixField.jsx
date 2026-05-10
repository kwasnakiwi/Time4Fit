import dots from "./../../../../assets/svgs/dots.svg";
import redBin from "./../../../../assets/svgs/red-bin.svg";
import "./../../../../styles/surveys.css";

function MatrixField({ data, onUpdate }) {
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
          Wierze (kolumny)
        </span>
        <span
          className="asf-add-option"
          onClick={() => onUpdate({ rows: [...data.rows, ""] })}
        >
          <span>+</span> Dodaj wiersz
        </span>
      </div>
      <div className="asf-select-options">
        {data.rows.map((opt, i) => (
          <div className="asf-select-option" key={i}>
            <input
              type="text"
              className="as-input"
              value={opt}
              onChange={(e) => {
                let newRows = [...data.rows];
                newRows[i] = e.target.value;
                onUpdate({ rows: newRows });
              }}
              placeholder={`Wiersz ${i + 1}`}
            />
            <img src={dots} alt="" />
            <img
              src={redBin}
              alt=""
              onClick={() =>
                onUpdate({
                  rows: data.rows.filter((_, idx) => idx !== i),
                })
              }
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "4px",
          marginTop: "18px",
        }}
      >
        <span className="asf-scale-inputs-title" style={{ margin: 0 }}>
          Kolumny (odpowiedzi)
        </span>
        <span
          className="asf-add-option"
          onClick={() => onUpdate({ columns: [...data.columns, ""] })}
        >
          <span>+</span> Dodaj kolumnę
        </span>
      </div>
      <div className="asf-select-options">
        {data.columns.map((opt, i) => (
          <div className="asf-select-option" key={i}>
            <input
              type="text"
              className="as-input"
              value={opt}
              onChange={(e) => {
                let newColumns = [...data.columns];
                newColumns[i] = e.target.value;
                onUpdate({ columns: newColumns });
              }}
              placeholder={`Kolumna ${i + 1}`}
            />
            <img src={dots} alt="" />
            <img
              src={redBin}
              alt=""
              onClick={() =>
                onUpdate({
                  columns: data.columns.filter((_, idx) => idx !== i),
                })
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default MatrixField;
