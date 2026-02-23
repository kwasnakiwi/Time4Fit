import { useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import "./../../../../styles/diets.css";
import {
  FaSearch as Search,
  FaAngleDown as AngleDown,
  FaPlus as Plus,
} from "react-icons/fa";
import Dish from "../elements/Dish";
import { createPortal } from "react-dom";
import AddDishModal from "../elements/AddDishModal";
import AddIngredientsModal from "../elements/AddIngredientsModal";
import FormatTextModal from "../elements/FormatTextModal";

function DishesList() {
  const [dishesCategory, setDishesCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([]);
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [showAddIngredientsModal, setShowAddIngredientsModal] = useState(false);
  const [showFormatTextModal, setShowFormatTextModal] = useState(false);

  const handleClickAddDishButton = () => {
    setShowAddDishModal(true);
  };

  return (
    <>
      {showFormatTextModal &&
        createPortal(
          <FormatTextModal setShowFormatTextModal={setShowFormatTextModal} />,
          document.body,
        )}
      {showAddDishModal &&
        createPortal(
          <AddDishModal
            setShowAddDishModal={setShowAddDishModal}
            setShowAddIngredientsModal={setShowAddIngredientsModal}
            setShowFormatTextModal={setShowFormatTextModal}
          />,
          document.body,
        )}
      {showAddIngredientsModal &&
        createPortal(
          <AddIngredientsModal
            setShowAddDishModal={setShowAddDishModal}
            setShowAddIngredientsModal={setShowAddIngredientsModal}
          />,
          document.body,
        )}
      <NavBar title="Lista potraw" route="Lista potraw" />
      <SideBar />
      <main className="home-page-container">
        <header className="product-filters">
          <div className="top">
            <div className="product-left-filters">
              <div className="filter-wrapper">
                <Search className="p-search-icon" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  id=""
                  className="p-filter-input"
                  name="pSearch"
                  placeholder="Wyszukaj potrawę..."
                />
              </div>
              <div className="filter-wrapper">
                <select
                  type="text"
                  id=""
                  className="p-filter-input"
                  name="pRange"
                >
                  <option value="">Zakres kalorii od - do</option>
                </select>
                <AngleDown className="arrow" />
              </div>
              <div className="filter-wrapper">
                <select
                  type="text"
                  id=""
                  className="p-filter-input"
                  name="pMacro"
                >
                  <option value="">Makroskładnik dominujący</option>
                </select>
                <AngleDown className="arrow" />
              </div>
              <div className="filter-wrapper">
                <select
                  type="text"
                  id=""
                  className="p-filter-input"
                  name="pAlergens"
                >
                  <option value="">Typ diety</option>
                </select>
                <AngleDown className="arrow" />
              </div>
              <div className="filter-wrapper">
                <select
                  type="text"
                  id=""
                  className="p-filter-input"
                  name="pAlergens"
                >
                  <option value="">Alergeny</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
            <div className="add-product-wrapper" style={{ maxWidth: "203px" }}>
              <button
                className="add-product-btn"
                onClick={handleClickAddDishButton}
              >
                <Plus className="p-plus" /> Stwórz nową potrawę
              </button>
            </div>
          </div>
          <div className="bottom">
            <button
              className={`product-category ${dishesCategory === "all" ? "selected" : ""}`}
              onClick={() => setDishesCategory("all")}
            >
              Wszystkie
            </button>
            <button
              className={`product-category ${dishesCategory === "breakfast" ? "selected" : ""}`}
              onClick={() => setDishesCategory("breakfast")}
            >
              Śniadanie
            </button>
            <button
              className={`product-category ${dishesCategory === "2ndBreakfast" ? "selected" : ""}`}
              onClick={() => setDishesCategory("2ndBreakfast")}
            >
              II Śniadanie
            </button>
            <button
              className={`product-category ${dishesCategory === "dinner" ? "selected" : ""}`}
              onClick={() => setDishesCategory("dinner")}
            >
              Obiad
            </button>
            <button
              className={`product-category ${dishesCategory === "dessert" ? "selected" : ""}`}
              onClick={() => setDishesCategory("dessert")}
            >
              Podwieczorek
            </button>
            <button
              className={`product-category ${dishesCategory === "supper" ? "selected" : ""}`}
              onClick={() => setDishesCategory("supper")}
            >
              Kolacja
            </button>
          </div>
        </header>
        <section className="dishes">
          {[1, 2, 3, 4].map((dish, i) => (
            <Dish
              key={i}
              dishId={i}
              name={dish.name || "Bez nazwy"}
              category={dish.category || "Brak kategorii"}
              dietType={dish.diet_type || "Normalna"}
              totalKcal={dish.total_kcal || 0}
              totalProtein={dish.total_protein || 0}
              totalFat={dish.total_fat || 0}
              totalCarbohydrates={dish.total_carbohydrates || 0}
              displaySalt={dish.display_salt || 0}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default DishesList;
