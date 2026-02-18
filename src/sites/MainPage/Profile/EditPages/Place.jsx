import "./../../../../styles/profile.css";
import { useState } from "react";

import placeChoice1 from "./../../../../assets/images/p-choice1.png";
import placeChoice2 from "./../../../../assets/images/p-choice2.png";
import orPlaceChoice1 from "./../../../../assets/images/or-p-choice1.png";
import orPlaceChoice2 from "./../../../../assets/images/or-p-choice2.png";
import { useNavigate } from "react-router-dom";

function Place({}) {
  const [placeType, setPlaceType] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="place-create-box">
        <div className="cp-title-box">
          <h2 className="cp-title">Twoje miejsce, Twoje zasady</h2>
          <p className="cp-desc">
            Wybierz, w jaki sposób chcesz dodać swoją placówkę — tylko oznacz ją
            na mapie lub zyskaj pełne możliwości zarządzania nią i wydarzeniami.
          </p>
        </div>
        <div className="place-choice-box">
          <div
            className={`place-choice ${placeType == "first" ? "selected" : placeType ? "disabled" : ""}`}
            onClick={() => setPlaceType("first")}
          >
            <h3 className="place-choice-title">Pokaż się na mapie</h3>
            <img
              src={
                placeType == "first"
                  ? orPlaceChoice1
                  : placeType
                    ? placeChoice1
                    : orPlaceChoice1
              }
              className="place-choice-img"
            />
            <p className="place-choice-desc">
              Oznacz swoją lokalizację, aby inni mogli łatwo Cię znaleźć.
              Idealne, jeśli chcesz po prostu zaznaczyć obecność swojej placówki
              bez dodatkowych funkcji zarządzania.
            </p>
            <span className="place-choice-price">Wstępny koszt 29 PLN</span>
          </div>
          <div
            className={`place-choice ${placeType == "second" ? "selected" : placeType ? "disabled" : ""}`}
            onClick={() => setPlaceType("second")}
          >
            <h3 className="place-choice-title">Prowadź, planuj i działaj</h3>
            <img
              src={
                placeType == "second"
                  ? orPlaceChoice2
                  : placeType
                    ? placeChoice2
                    : orPlaceChoice2
              }
              className="place-choice-img"
            />
            <p className="place-choice-desc">
              Zyskaj pełną kontrolę — twórz wydarzenia, przypisuj trenerów,
              edytuj informacje i obserwuj aktywność. Dostępne funkcje zależą od
              wybranego planu.
            </p>
            <span className="place-choice-price">Wstępny koszt 119 PLN</span>
          </div>
        </div>
        <div className="cp-next-stage-btn-box">
          <button
            disabled={!placeType}
            className="cp-ns-btn"
            onClick={() => {
              placeType == "first"
                ? navigate("/placowki/dodawanie-placowki")
                : navigate("/placowki/wybor-planu");
            }}
          >
            Dalej
          </button>
        </div>
      </div>
    </>
  );
}

export default Place;
