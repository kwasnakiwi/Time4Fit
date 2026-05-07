import "./../../../styles/surveys.css";
import NavBar from "./../../../sites/MainPage/components/NavBar.jsx";
import SideBar from "./../../../sites/MainPage/components/SideBar.jsx";
import blackEye from "./../../../assets/svgs/blackEye.svg";
import whiteSave from "./../../../assets/svgs/whiteSave.svg";
import { useState } from "react";
import field1 from "./../../../assets/svgs/field1.svg";
import field2 from "./../../../assets/svgs/field2.svg";
import field3 from "./../../../assets/svgs/field3.svg";
import field4 from "./../../../assets/svgs/field4.svg";
import field5 from "./../../../assets/svgs/field5.svg";
import field6 from "./../../../assets/svgs/field6.svg";
import field7 from "./../../../assets/svgs/field7.svg";
import field8 from "./../../../assets/svgs/field8.svg";
import field9 from "./../../../assets/svgs/field9.svg";
import { FaSearch as Search } from "react-icons/fa";
import TextField from "./fieldTypes/TextField.jsx";
import SelectField from "./fieldTypes/SelectField.jsx";
import MultiselectField from "./fieldTypes/MultiselectField.jsx";
import YesNoField from "./fieldTypes/YesNoField.jsx";
import ScaleField from "./fieldTypes/ScaleField.jsx";
import NumberField from "./fieldTypes/NumberField.jsx";
import DateField from "./fieldTypes/DateField.jsx";
import MatrixField from "./fieldTypes/MatrixField.jsx";
import FilesField from "./fieldTypes/FilesField.jsx";
import CommonHeader from "./CommonHeader.jsx";

function AddSurvey() {
  const [qSearch, setQSearch] = useState("");
  const [addedFields, setAddedFields] = useState([]);

  const QUESTION_COMPONENTS = {
    "Tekst krótki": TextField,
    "Tekst długi": TextField,
    Select: SelectField,
    Multiselect: MultiselectField,
    "Tak/Nie": YesNoField,
    "Skala ocen": ScaleField,
    "Pole liczbowe": NumberField,
    Data: DateField,
    Macierz: MatrixField,
    Pliki: FilesField,
  };

  const surveyFieldTypes = [
    {
      name: "Tekst krótki",
      desc: "Krótka odpowiedź tekstowa",
      icon: field1,
    },
    {
      name: "Tekst długi",
      desc: "długa odpowiedź tekstowa",
      icon: field1,
    },
    {
      name: "Select",
      desc: "Jednokrotny wybór",
      icon: field2,
    },
    {
      name: "Multiselect",
      desc: "Wielokrotny wybór",
      icon: field3,
    },
    {
      name: "Tak/Nie",
      desc: "Pytania binarne",
      icon: field4,
    },
    {
      name: "Skala ocen",
      desc: "Odpowiedź w skali",
      icon: field5,
    },
    {
      name: "Pole liczbowe",
      desc: "Krótka odpowiedź liczbowa",
      icon: field6,
    },
    {
      name: "Data",
      desc: "Wybór daty",
      icon: field7,
    },
    {
      name: "Macierz",
      desc: "Tabela odpowiedzi",
      icon: field8,
    },
    {
      name: "Pliki",
      desc: "Przesyłanie Plików",
      icon: field9,
    },
  ];

  const addField = (field) => {
    const newField = {
      id: crypto.randomUUID(),
      type: field.name,
      typeDesc: field.desc,
      title: "",
      desc: "",
      isRequired: false,

      options: field.name === "Select" ? ["Opcja 1"] : [],
      min: field.name === "Skala ocen" ? 1 : null,
      max: field.name === "Skala ocen" ? 5 : null,
    };
    setAddedFields([...addedFields, newField]);
  };

  const updateField = (id, newData) => {
    setAddedFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...newData } : field,
      ),
    );
  };

  const deleteField = (id) => {
    setAddedFields((prevFields) =>
      prevFields.filter((field) => id !== field.id),
    );
  };

  return (
    <>
      <NavBar title="Dodaj ankietę" route="Ankiety / Dodaj ankietę" />
      <SideBar />
      <main className="home-page-container">
        <div className="as-wrapper">
          <div className="left">
            {addedFields.map((fieldData) => {
              const SpecificComponent = QUESTION_COMPONENTS[fieldData.type];

              return (
                <div key={fieldData.id} className="asf-field-wrapper as-panel">
                  <CommonHeader
                    data={fieldData}
                    onUpdate={(newData) => updateField(fieldData.id, newData)}
                    deleteField={deleteField}
                  />
                  {SpecificComponent && (
                    <SpecificComponent
                      data={fieldData}
                      onUpdate={(newData) => updateField(fieldData.id, newData)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="right">
            <div className="as-panel as-buttons">
              <button className="as-button view">
                <img src={blackEye} alt="" />
                Podgląd
              </button>
              <button className="as-button save">
                <img src={whiteSave} alt="" />
                Zapisz
              </button>
            </div>
            <div className="as-panel as-field-types-wrapper">
              <div className="as-field-types-header">
                <h3>Typy pytań</h3>
                <p>Kliknij lub przeciągnij</p>
                <div className="as-field-type-search-wrapper">
                  <Search className="search" />
                  <input
                    type="text"
                    className="as-input as-search-input"
                    value={qSearch}
                    onChange={(e) => setQSearch(e.target.value)}
                    placeholder="Wyszukaj komponent"
                  />
                </div>
              </div>
              <div className="as-field-types">
                {surveyFieldTypes.map((field, i) => (
                  <div
                    key={i}
                    onClick={() => addField(field)}
                    className="as-field-type"
                  >
                    <div className="as-img-wrapper">
                      <img src={field.icon} alt="" />
                    </div>
                    <div className="as-field-type-text">
                      <span className="name">{field.name}</span>
                      <span className="desc">{field.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddSurvey;
