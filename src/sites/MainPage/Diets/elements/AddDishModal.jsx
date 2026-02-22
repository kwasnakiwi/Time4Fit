import { useState, useRef } from "react";
import sett from "./../../../../assets/svgs/sett.svg";
import "./../../../../styles/popup.css";
import leaf from "./../../../../assets/svgs/leaf.svg";
import coffee from "./../../../../assets/svgs/coffee.svg";
import clock from "./../../../../assets/svgs/clock.svg";
import { FaAngleDown as AngleDown, FaPlus as Plus } from "react-icons/fa";
import macro1 from "./../../../../assets/svgs/macro1.svg";
import macro2 from "./../../../../assets/svgs/macro2.svg";
import macro3 from "./../../../../assets/svgs/macro3.svg";
import macro4 from "./../../../../assets/svgs/macro4.svg";
import macro5 from "./../../../../assets/svgs/macro5.svg";
import exclamationMark from "./../../../../assets/svgs/!.svg";
import img from "./../../../../assets/svgs/img.svg";
import redBin from "./../../../../assets/svgs/red-bin.svg";
import cubes from "./../../../../assets/svgs/cubes.svg";
import { createPortal } from "react-dom";
import AddIngredientsModal from "./AddIngredientsModal";

function AddDishModal({ setShowAddDishModal, setShowAddIngredientsModal }) {
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [category, setCategory] = useState("");
  const [dietType, setDietType] = useState("");
  const [time, setTime] = useState("");
  const [kcal, setKcal] = useState(1);
  const [protein, setProtein] = useState(1);
  const [fat, setFat] = useState(1);
  const [carbohydrates, setCarbohydrates] = useState(1);
  const [sodiumSalt, setSodiumSalt] = useState(1);
  const [allergens, setAllergens] = useState([]);
  const [allergenInputValue, setAllergenInputValue] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const imageInputRef = useRef(null);

  const handleAddAlergen = () => {
    if (!allergenInputValue) return;
    setAllergens((prev) => [...prev, allergenInputValue]);
    setAllergenInputValue("");
  };

  const handleRemoveAlergen = (id) => {
    setAllergens((prev) => prev.filter((_, i) => i !== id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddDish = async () => {
    return;
  };
  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowAddDishModal(false)}
      />
      <div className="template-modal dish-modal">
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-img-wrapper">
              <img src={sett} alt="" />
            </div>
            <div className="template-modal-info-text">
              <h3>Tworzenie potrawy</h3>
              <span>Stwórz potrawę</span>
            </div>
          </div>
          <span
            className="close-modal"
            onClick={() => setShowAddDishModal(false)}
          >
            ✕
          </span>
        </header>
        <section className="template-modal-content">
          <div className="template-modal-input-box">
            <label htmlFor="name-input" className="template-modal-title">
              Nazwa potrawy
            </label>
            <input
              type="text"
              className="template-modal-input"
              name="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nazwa..."
            />
          </div>
          <div
            className="template-modal-input-box"
            style={{ position: "relative", marginTop: "12px" }}
          >
            <label htmlFor="recipe-input" className="template-modal-title">
              Przepis
            </label>
            <textarea
              className="template-modal-input textarea"
              value={recipe}
              name="recipe-input"
              onChange={(e) => setRecipe(e.target.value)}
              placeholder="Przepis..."
              maxLength={250}
              style={{ height: "118px" }}
            />
            <span className="length-counter" style={{ top: 0, right: 0 }}>
              {recipe.length}/250
            </span>
          </div>
          <div className="template-modal-info-inputs">
            <div className="template-modal-input-box">
              <label
                htmlFor="cat-select"
                className="template-modal-title flex secondery"
              >
                <img src={coffee} alt="" />
                Kategoria produktu
              </label>
              <div className="tm-select-wrapper">
                <select
                  name="cat-select"
                  className="template-modal-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="breakfast">Śniadanie</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
            <div className="template-modal-input-box">
              <label
                htmlFor="diet-select"
                className="template-modal-title flex secondery"
              >
                <img src={leaf} alt="" />
                Typ diety
              </label>
              <div className="tm-select-wrapper">
                <select
                  name="diet-select"
                  className="template-modal-input"
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                >
                  <option value="normal">Normalna</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
            <div className="template-modal-input-box">
              <label
                htmlFor="time-input"
                className="template-modal-title flex secondery"
              >
                <img src={clock} alt="" />
                Czas robienia potrawy
              </label>
              <input
                type="text"
                name="time-input"
                className="template-modal-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="40min..."
              />
            </div>
          </div>
          <div className="modal-nutrients-inputs">
            <h2 className="template-modal-title-bold">
              Makroskładniki (Na porcję)
            </h2>
            <div className="modal-nutrients">
              <div className="modal-nutrient purple">
                <label htmlFor="nutrient1" className="modal-nutrient-name">
                  <img src={macro1} alt="" />
                  Kalorie (kcal)
                </label>
                <input
                  className="modal-nutrient-value"
                  type="number"
                  min={1}
                  name="nutrient1"
                  placeholder="0"
                  value={kcal}
                  onChange={(e) => setKcal(e.target.value)}
                />
              </div>
              <div className="modal-nutrient cyan">
                <label htmlFor="nutrient2" className="modal-nutrient-name">
                  <img src={macro2} alt="" />
                  Sól (g)
                </label>
                <input
                  className="modal-nutrient-value"
                  type="number"
                  min={1}
                  name="nutrient2"
                  placeholder="0"
                  value={sodiumSalt}
                  onChange={(e) => setSodiumSalt(e.target.value)}
                />
              </div>
              <div className="modal-nutrient blue">
                <label htmlFor="nutrient3" className="modal-nutrient-name">
                  <img src={macro3} alt="" />
                  Białko (g)
                </label>
                <input
                  className="modal-nutrient-value"
                  type="number"
                  min={1}
                  name="nutrient3"
                  placeholder="0"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              </div>
              <div className="modal-nutrient yellow">
                <label htmlFor="nutrient4" className="modal-nutrient-name">
                  <img src={macro4} alt="" />
                  Tłuszcze (g)
                </label>
                <input
                  className="modal-nutrient-value"
                  type="number"
                  min={1}
                  name="nutrient4"
                  placeholder="0"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
              </div>
              <div className="modal-nutrient green">
                <label htmlFor="nutrient5" className="modal-nutrient-name">
                  <img src={macro5} alt="" />
                  Węglowodany (g)
                </label>
                <input
                  className="modal-nutrient-value"
                  type="number"
                  min={1}
                  name="nutrient5"
                  placeholder="0"
                  value={carbohydrates}
                  onChange={(e) => setCarbohydrates(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="quantity-inputs">
            <h2 className="template-modal-title-bold">
              <img src={cubes} alt="" />
              Składniki
            </h2>
            <div className="modal-ingredients-list-wrapper">
              <ol className="modal-ingredients-list">
                {[1, 2, 3, 4].map((ing, i) => (
                  <li key={i}>
                    <input
                      type="text"
                      className="template-modal-input"
                      id="product"
                      placeholder="Produkt..."
                    />
                    <input
                      type="number"
                      className="template-modal-input"
                      id="amount"
                      placeholder="1..."
                    />
                    <div className="tm-select-wrapper" id="type">
                      <select className="template-modal-input">
                        <option value="spoon">Łyżka (15g)</option>
                      </select>
                      <AngleDown className="arrow" />
                    </div>
                    <span className="delete-ingredient">
                      <img src={redBin} alt="" />
                    </span>
                    <span className="ing-enumeration">{i + 1}</span>
                  </li>
                ))}
              </ol>
            </div>
            <button
              className="modal-add-ingredient add-product-btn"
              onClick={() => {
                setShowAddIngredientsModal(true);
              }}
            >
              <Plus className="p-plus" /> Dodaj
            </button>
          </div>
          <div className="modal-allergens-box">
            <h2 className="template-modal-title-bold flex">
              <img src={exclamationMark} alt="" />
              Alergeny
            </h2>
            <div className="modal-allergens">
              {allergens.map((al, i) => (
                <span className="modal-allergen" key={i}>
                  {al}
                  <span onClick={() => handleRemoveAlergen(i)}>✕</span>
                </span>
              ))}
            </div>
            <div className="template-modal-add-input-box">
              <input
                type="text"
                className="template-modal-input"
                name="add-allergen"
                value={allergenInputValue}
                onChange={(e) => setAllergenInputValue(e.target.value)}
                placeholder="Dodaj alergen"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddAlergen();
                  }
                }}
              />
              <button className="modal-add-allergen" onClick={handleAddAlergen}>
                <Plus className="modal-add" />
                Dodaj
              </button>
            </div>
          </div>
          <div className="template-modal-image-input-box">
            <h2
              className="template-modal-title-bold flex"
              style={{ marginBottom: "16px" }}
            >
              <img src={img} alt="" />
              Zdjęcie
            </h2>
            <input
              type="file"
              hidden
              accept="image/*"
              ref={imageInputRef}
              onChange={(e) => handleImageChange(e)}
            />
            {preview ? (
              <img
                className="template-modal-image-preview"
                onClick={() => imageInputRef.current.click()}
                src={preview}
              />
            ) : (
              <div
                className="template-modal-add-image"
                onClick={() => imageInputRef.current.click()}
              >
                <span>+</span>
              </div>
            )}
          </div>
        </section>
        <hr className="template-modal-line" />
        <section className="template-modal-btns">
          <button
            className="template-modal-btn cancel"
            onClick={() => setShowAddDishModal(false)}
          >
            Anuluj
          </button>
          <button className="template-modal-btn accept" onClick={handleAddDish}>
            Dodaj
          </button>
        </section>
      </div>
    </>
  );
}

export default AddDishModal;
