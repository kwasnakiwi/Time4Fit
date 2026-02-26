import { useState } from "react";
import "./../../../../styles/popup.css";
import { FaSearch as Search } from "react-icons/fa";
import Product from "./Product";

function AddProductToMenuModal({ setShowModal }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowModal(false)}
      />
      <div className="template-modal" style={{ maxWidth: "1032px" }}>
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-info-text">
              <h3>Dodawanie</h3>
              <span>Dodaj produkt lub potrawę do jadłospisu</span>
            </div>
          </div>
          <span className="close-modal" onClick={() => setShowModal(false)}>
            ✕
          </span>
        </header>
        <section className="template-modal-content">
          <div className="filter-wrapper s">
            <Search className="p-search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-filter-input"
              placeholder="Wyszukaj produkt..."
            />
          </div>
          <div
            className="modal-products-list"
            style={{ borderRadius: "8px", marginTop: "20px" }}
          >
            {[1, 2, 3, 4, 6, 7, 8, 9, 10].map((pr, i) => (
              <Product
                key={i}
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
        </section>
				<hr className="template-modal-line" />
				<section className="template-modal-btns">
          <button
            className="template-modal-btn accept"
            onClick={() => setShowAddIngredientsModal(false)}
          >
            Dodaj
          </button>
        </section>
      </div>
    </>
  );
}

export default AddProductToMenuModal;
