import { useState } from "react";
import sett from "./../../../../assets/svgs/sett.svg";
import purplePerson from "./../../../../assets/svgs/purple-person.svg";
import orangeApp from "./../../../../assets/svgs/orange-app.svg";
import "./../../../../styles/popup.css";
import { FaAngleDown as AngleDown, FaSearch } from "react-icons/fa";
import Product from "./Product";

function AddIngredientsModal({ showAddDishModal, setShowAddIngredientsModal }) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showMyProducts, setShowMyProducts] = useState(true);
  const [showAppProducts, setShowAppProducts] = useState(true);
  const [selected, setSelected] = useState([]);

  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowAddIngredientsModal(false)}
        style={{ zIndex: 3 }}
      />
      <div className="template-modal" style={{ maxWidth: "1032px" }}>
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-info-text">
              <h3>Dodawanie składnika do potrawy</h3>
              <span>Dodaj składnik do potrawy</span>
            </div>
          </div>
          <span
            className="close-modal"
            onClick={() => {
              setShowAddIngredientsModal(false);
            }}
          >
            ✕
          </span>
        </header>
        <section className="template-modal-content">
          <div className="modal-dish-categories">
            <button
              className={`modal-dish-category ${category === "all" ? "selected" : ""}`}
              onClick={() => setCategory("all")}
            >
              Wszystkie
            </button>
            <button
              className={`modal-dish-category ${category === "dairy" ? "selected" : ""}`}
              onClick={() => setCategory("dairy")}
            >
              Nabiał
            </button>
            <button
              className={`modal-dish-category ${category === "meat" ? "selected" : ""}`}
              onClick={() => setCategory("meat")}
            >
              Mięso
            </button>
            <button
              className={`modal-dish-category ${category === "vegetables" ? "selected" : ""}`}
              onClick={() => setCategory("vegetables")}
            >
              Warzywa
            </button>
            <button
              className={`modal-dish-category ${category === "bread" ? "selected" : ""}`}
              onClick={() => setCategory("bread")}
            >
              Pieczywo
            </button>
            <button
              className={`modal-dish-category ${category === "fish" ? "selected" : ""}`}
              onClick={() => setCategory("fish")}
            >
              Ryby
            </button>
          </div>
          <div className="modal-dish-filters">
            <div className="filter-wrapper s">
              <FaSearch className="p-search-icon" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id=""
                className="p-filter-input"
                placeholder="Wyszukaj produkt..."
              />
            </div>
            <div className="filter-wrapper m">
              <select type="text" id="" className="p-filter-input">
                <option value="">Makroskładnik dominujący</option>
              </select>
              <AngleDown className="arrow" />
            </div>
            <div className="filter-wrapper a">
              <select type="text" id="" className="p-filter-input">
                <option value="">Alergeny</option>
              </select>
              <AngleDown className="arrow" />
            </div>
          </div>
          <div className="modal-product-list-box">
            <div
              className="modal-product-list-box-header my-products"
              onClick={() => setShowMyProducts((prev) => !prev)}
            >
              <h3>
                <img src={purplePerson} alt="" />
                Twoje produkty
              </h3>
              <AngleDown
                className="arrow"
                style={
                  showMyProducts
                    ? { transform: "rotate(-180deg) translateY(50%)" }
                    : undefined
                }
              />
            </div>
            <div
              className="modal-products-list"
              style={
                showMyProducts
                  ? { gridTemplateRows: "1fr" }
                  : { gridTemplateRows: "0fr", padding: "0" }
              }
            >
              <div style={{ minHeight: 0 }}>
                {[1, 2, 3, 4].map((pr, i) => (
                  <Product
                    title={pr.title || "Bez nazwy"}
                    category={pr.category || "Brak kategorii"}
                    packagingType={pr.packaging_type || "Opakowanie"}
                    packagingSize={pr.packaging_size || 67}
                    nutrients={
                      pr.nutrients || {
                        kcal: 17,
                        sodium_salt: 17,
                        protein: 17,
                        fat: 17,
                        carbohydrates: 17,
                      }
                    }
                    isSmall
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="modal-product-list-box">
            <div
              className="modal-product-list-box-header app-products"
              onClick={() => setShowAppProducts((prev) => !prev)}
            >
              <h3>
                <img src={orangeApp} alt="" />
                Produkty aplikacji
              </h3>
              <AngleDown
                className="arrow"
                style={
                  showAppProducts
                    ? { transform: "rotate(-180deg) translateY(50%)" }
                    : undefined
                }
              />
            </div>
            <div
              className="modal-products-list"
              style={
                showAppProducts
                  ? { gridTemplateRows: "1fr" }
                  : { gridTemplateRows: "0fr", padding: "0" }
              }
            >
              <div style={{ minHeight: 0 }}>
                {[1, 2, 3, 4].map((pr, i) => (
                  <Product
                    title={pr.title || "Bez nazwy"}
                    category={pr.category || "Brak kategorii"}
                    packagingType={pr.packaging_type || "Opakowanie"}
                    packagingSize={pr.packaging_size || 67}
                    nutrients={
                      pr.nutrients || {
                        kcal: 17,
                        sodium_salt: 17,
                        protein: 17,
                        fat: 17,
                        carbohydrates: 17,
                      }
                    }
                    isSmall
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <hr className="template-modal-line" />
        <section className="template-modal-btns space-between">
          <button
            className="template-modal-btn cancel"
            onClick={() => setShowAddIngredientsModal(false)}
          >
            Wróc do tworzenia potrawy
          </button>
          <button
            className="template-modal-btn accept"
            onClick={() => setShowAddIngredientsModal(false)}
          >
            Dodaj składnik 1
          </button>
        </section>
      </div>
    </>
  );
}

export default AddIngredientsModal;
