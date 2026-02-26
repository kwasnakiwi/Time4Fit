import { useState } from "react";
import "./../../../../styles/diets.css";
import {
  FaAngleLeft as Left,
  FaAngleRight as Right,
  FaPlus as Plus,
} from "react-icons/fa";
import orangeCalendar from "./../../../../assets/svgs/orangeCalendar.svg";
import menu1 from "./../../../../assets/svgs/coffee.svg";
import menu2 from "./../../../../assets/svgs/menu2.svg";
import menu3 from "./../../../../assets/svgs/menu3.svg";
import menu4 from "./../../../../assets/svgs/menu4.svg";
import menu5 from "./../../../../assets/svgs/menu5.svg";
import CircularProgress from "../elements/circularProgress";
import { createPortal } from "react-dom";
import AddProductToMenuModal from "../elements/AddProductToMenuModal";

function Menu({ showAddProductToMenuModal, setShowAddProductToMenuModal }) {
  const [menuDate, setMenuDate] = useState(new Date());

  const handleChangeDate = (direction) => {
    const newDate = new Date(menuDate); // Tworzymy kopię obecnej daty

    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1); // Cofamy o 1 dzień
    } else if (direction === "next") {
      newDate.setDate(newDate.getDate() + 1); // Idziemy do przodu o 1 dzień
    }

    setMenuDate(newDate); // Aktualizujemy stan
  };

  return (
    <>
      {showAddProductToMenuModal &&
        createPortal(
          <AddProductToMenuModal setShowModal={setShowAddProductToMenuModal} />,
          document.body,
        )}
      <div className="menu-wrapper">
        <header className="menu-date">
          <Left
            className="menu-date-arrow"
            onClick={() => handleChangeDate("prev")}
          />
          <span>
            <img src={orangeCalendar} alt="" />
            {/* data (z wielkiej litery) */}
            {menuDate
              .toLocaleDateString("pl-PL", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              .slice(0, 1)
              .toUpperCase() +
              menuDate
                .toLocaleDateString("pl-PL", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
                .slice(1)}
          </span>
          <Right
            className="menu-date-arrow"
            onClick={() => handleChangeDate("next")}
          />
        </header>
        <div className="menu-content">
          <div className="menu-panel">
            <h3 className="menu-panel-title">
              <img
                src={menu1}
                alt=""
                style={{ width: "18px", height: "18px" }}
              />
              Śniadanie
            </h3>
            <hr className="dish-line" style={{ margin: "16px 0 12px" }} />
            <span className="menu-panel-text">Suma posiłku:</span>
            <button
              className="add-dish-to-menu"
              onClick={() => setShowAddProductToMenuModal(true)}
            >
              <Plus className="add-dish-to-menu-plus" /> Dodaj potrawę
            </button>
          </div>
          <div className="menu-panel">
            <h3 className="menu-panel-title">
              <img src={menu2} alt="" />
              II Śniadanie
            </h3>
            <hr className="dish-line" style={{ margin: "16px 0 12px" }} />
            <span className="menu-panel-text">Suma posiłku:</span>
            <button
              className="add-dish-to-menu"
              onClick={() => setShowAddProductToMenuModal(true)}
            >
              <Plus className="add-dish-to-menu-plus" /> Dodaj potrawę
            </button>
          </div>
          <div className="menu-panel">
            <h3 className="menu-panel-title">
              <img src={menu3} alt="" />
              Obiad
            </h3>
            <hr className="dish-line" style={{ margin: "16px 0 12px" }} />
            <span className="menu-panel-text">Suma posiłku:</span>
            <button
              className="add-dish-to-menu"
              onClick={() => setShowAddProductToMenuModal(true)}
            >
              <Plus className="add-dish-to-menu-plus" /> Dodaj potrawę
            </button>
          </div>
          <div className="menu-panel">
            <h3 className="menu-panel-title">
              <img src={menu4} alt="" />
              Podwieczorek
            </h3>
            <hr className="dish-line" style={{ margin: "16px 0 12px" }} />
            <span className="menu-panel-text">Suma posiłku:</span>
            <button
              className="add-dish-to-menu"
              onClick={() => setShowAddProductToMenuModal(true)}
            >
              <Plus className="add-dish-to-menu-plus" /> Dodaj potrawę
            </button>
          </div>
          <div className="menu-panel">
            <h3 className="menu-panel-title">
              <img src={menu5} alt="" />
              Kolacja
            </h3>
            <hr className="dish-line" style={{ margin: "16px 0 12px" }} />
            <span className="menu-panel-text">Suma posiłku:</span>
            <button
              className="add-dish-to-menu"
              onClick={() => setShowAddProductToMenuModal(true)}
            >
              <Plus className="add-dish-to-menu-plus" /> Dodaj potrawę
            </button>
          </div>
        </div>
        <div className="menu-bottom-wrapper">
          <div className="menu-stats">
            <CircularProgress
              value={2170}
              max={2200}
              label="Kcal"
              gradientColors={["#531C8E", "#A617F9", "#B445F5"]}
              textColor="#BB15FC"
              id="kcal"
            />
            <CircularProgress
              value={1900}
              max={2200}
              label="Białko"
              gradientColors={["#1C398E", "#1744F9", "#4553F5"]}
              textColor="#155DFC"
              id="protein"
            />
            <CircularProgress
              value={1300}
              max={2200}
              label="Tłus."
              gradientColors={["#7B3306", "#F95B17", "#F57A45"]}
              textColor="#E27100"
              id="fat"
            />
            <CircularProgress
              value={700}
              max={2200}
              label="Węgl."
              gradientColors={["#0D542B", "#17F95B", "#45F54B"]}
              textColor="#00A63E"
              id="carbohydrates"
            />
            <CircularProgress
              value={1900}
              max={2200}
              label="Sól"
              gradientColors={["#1C7D8E", "#17F2F9", "#45E3F5"]}
              textColor="#00CED5"
              id="salt"
            />
          </div>
          <div className="add-new-block-wrapper">
            <button className="add-dish-to-menu" style={{ position: "static" }}>
              <Plus className="add-dish-to-menu-plus" />
              Dodaj nowy blok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
