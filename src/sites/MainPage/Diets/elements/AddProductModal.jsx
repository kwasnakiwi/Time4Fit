import "./../../../../styles/popup.css";
import sett from "./../../../../assets/svgs/sett.svg";
import leaf from "./../../../../assets/svgs/leaf.svg";
import cubes from "./../../../../assets/svgs/cubes.svg";
import macro1 from "./../../../../assets/svgs/macro1.svg";
import macro2 from "./../../../../assets/svgs/macro2.svg";
import macro3 from "./../../../../assets/svgs/macro3.svg";
import macro4 from "./../../../../assets/svgs/macro4.svg";
import macro5 from "./../../../../assets/svgs/macro5.svg";
import i from "./../../../../assets/svgs/i.svg";
import exclamationMark from "./../../../../assets/svgs/!.svg";
import barcodeIcon from "./../../../../assets/svgs/barcode.svg";
import img from "./../../../../assets/svgs/img.svg";

import { FaAngleDown as AngleDown, FaPlus as Plus } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../../../../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "../../../../utils/Endopoints";

function AddProductModal({ setShowModal, setProducts }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isUS, setIsUS] = useState(false);
  const [packagingType, setPackagingType] = useState("");
  const [packagingSize, setPackagingSize] = useState(100);
  const [packagingMetric, setPackagingMetric] = useState("");
  const [kcal, setKcal] = useState(1);
  const [protein, setProtein] = useState(1);
  const [fat, setFat] = useState(1);
  const [carbohydrates, setCarbohydrates] = useState(1);
  const [sodiumSalt, setSodiumSalt] = useState(1);
  const [allergens, setAllergens] = useState([]);
  const [allergenInputValue, setAllergenInputValue] = useState("");
  const [barcode, setBarcode] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mainAllergens, setMainAllergens] = useState([]);

  const imageInputRef = useRef(null);

  useEffect(() => {
    const getAllergens = async () => {
      try {
        const response = await apiFetch(
          `${BASE_URL}${ENDPOINTS.dietAllergensHelper}`,
        );

        let data = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error(data?.error);
        }

        setMainAllergens(data);
        console.log("allergens:", data)
      } catch (err) {
        console.log(err);
      }
    };

    getAllergens();
  }, []);

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

  // macro
  const calculateTotal = (value100g) => {
    const val = parseFloat(value100g);
    const size = parseFloat(packagingSize);
    if (isNaN(val) || isNaN(size)) return 0;

    const result = (val / 100) * size;

    return Math.round(result * 10) / 10;
  };

  const handleAddProduct = async () => {
    const formData = new FormData();

    formData.append("title", name);
    formData.append("label_type", isUS ? "US" : "EU");
    formData.append("category", 0);
    formData.append("packaging_type", 0);
    formData.append("packaging_size", packagingSize);
    formData.append("packaging_metric", 0);
    formData.append("barcode", barcode);
    formData.append("allergens", allergens);
    formData.append("kcal", kcal);
    formData.append("protein", protein);
    formData.append("fat", fat);
    formData.append("carbohydrates", carbohydrates);
    formData.append("sodium_salt", sodiumSalt);

    try {
      const response = await apiFetch(
        `${BASE_URL}${ENDPOINTS.dietCreateProduct}`,
        {
          method: "POST",
          body: formData,
        },
      );

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.details);
      }

      setProducts((prev) => [...prev, data]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowModal(false)}
      />
      <div className={`template-modal ${isUS ? "US" : ""}`}>
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-img-wrapper">
              <img src={sett} alt="" />
            </div>
            <div className="template-modal-info-text">
              <h3>Dodawanie produktu</h3>
              <span>Dodaj produkt</span>
            </div>
          </div>
          <span className="close-modal" onClick={() => setShowModal(false)}>
            ✕
          </span>
        </header>
        <section className="template-modal-content">
          <div className="header-inputs">
            <div className="template-modal-input-box" id="name">
              <label htmlFor="name-input" className="template-modal-title">
                Nazwa produktu
              </label>
              <input
                type="text"
                name="name-input"
                className="template-modal-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nazwa..."
              />
            </div>
            <div className="template-modal-input-box" id="category">
              <label htmlFor="cat-select" className="template-modal-title flex">
                <img src={leaf} alt="" />
                Kategoria produktu
              </label>
              <div className="tm-select-wrapper">
                <select
                  name="cat-select"
                  className="template-modal-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="dairy">Nabiał</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
            <div className="template-modal-input-box" id="type">
              <label htmlFor="type-switch" className="template-modal-title">
                EU/USA
              </label>
              <div className="input-switch-wrapper">
                <label className="input-switch">
                  <input
                    type="checkbox"
                    name="type-switch"
                    value={isUS}
                    onChange={() => setIsUS((v) => !v)}
                  />
                  <span className="input-switch-back" />
                </label>
              </div>
            </div>
          </div>
          <div className="quantity-inputs">
            <h2
              className="template-modal-title-bold"
              style={{ marginBottom: "12px" }}
            >
              <img src={cubes} alt="" />
              Porcje produkty
            </h2>
            <div className="template-modal-input-box">
              <label htmlFor="pType-input" className="template-modal-title">
                Wartość na
              </label>
              <div className="tm-select-wrapper">
                <select
                  name="pType-select"
                  className="template-modal-input"
                  value={packagingType}
                  onChange={(e) => setPackagingType(e.target.value)}
                >
                  <option value="porcja">1 Porcja</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
            <div className="template-modal-input-box">
              <label htmlFor="pSize-input" className="template-modal-title">
                Porcja ma
              </label>
              <div className="p-size-inputs">
                <input
                  type="number"
                  min={0}
                  name="pSize-input"
                  className="template-modal-input"
                  value={packagingSize}
                  onChange={(e) => setPackagingSize(e.target.value)}
                  placeholder="100..."
                />
                <div className="tm-select-wrapper">
                  <select
                    name="pMetric-select"
                    className="template-modal-input"
                    value={packagingMetric}
                    onChange={(e) => setPackagingMetric(e.target.value)}
                  >
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                    {isUS && <option value="oz">oz</option>}
                  </select>
                  <AngleDown className="arrow" />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-nutrients-inputs">
            <h2 className="template-modal-title-bold">
              Makroskładniki ({!isUS ? "100g" : "per serving"})
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
                  {!isUS ? "Sól (g)" : "Sód (mg)"}
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
          <div
            className={`modal-nutrients-inputs read-only ${isUS ? "collapsed" : ""}`}
          >
            <div className="collapsible-wrapper">
              <div className="relative">
                <div className="modal-nutrients">
                  <div className="modal-nutrient purple">
                    <label htmlFor="nutrient1" className="modal-nutrient-name">
                      Kalorie (kcal)
                    </label>
                    <input
                      className="modal-nutrient-value"
                      type="number"
                      min={1}
                      name="nutrient1"
                      placeholder="0"
                      readOnly
                      value={calculateTotal(kcal)}
                    />
                  </div>
                  <div className="modal-nutrient cyan">
                    <label htmlFor="nutrient2" className="modal-nutrient-name">
                      Sól (g)
                    </label>
                    <input
                      className="modal-nutrient-value"
                      type="number"
                      min={1}
                      name="nutrient2"
                      placeholder="0"
                      readOnly
                      value={calculateTotal(sodiumSalt)}
                    />
                  </div>
                  <div className="modal-nutrient blue">
                    <label htmlFor="nutrient3" className="modal-nutrient-name">
                      Białko (g)
                    </label>
                    <input
                      className="modal-nutrient-value"
                      type="number"
                      min={1}
                      name="nutrient3"
                      placeholder="0"
                      readOnly
                      value={calculateTotal(protein)}
                    />
                  </div>
                  <div className="modal-nutrient yellow">
                    <label htmlFor="nutrient4" className="modal-nutrient-name">
                      Tłuszcze (g)
                    </label>
                    <input
                      className="modal-nutrient-value"
                      type="number"
                      min={1}
                      name="nutrient4"
                      placeholder="0"
                      readOnly
                      value={calculateTotal(fat)}
                    />
                  </div>
                  <div className="modal-nutrient green">
                    <label htmlFor="nutrient5" className="modal-nutrient-name">
                      Węglowodany (g)
                    </label>
                    <input
                      className="modal-nutrient-value"
                      type="number"
                      min={1}
                      name="nutrient5"
                      placeholder="0"
                      readOnly
                      value={calculateTotal(carbohydrates)}
                    />
                  </div>
                </div>
                <h2 className="template-modal-title-bold absolute">
                  Makroskładniki (Na cały produkt)
                </h2>
                <img src={i} alt="" className="absolute top-right-zero" />
              </div>
            </div>
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
          <div
            className="template-modal-input-box"
            style={{ marginTop: "12px" }}
          >
            <label htmlFor="barcode-input" className="template-modal-title">
              Kod kreskowy
            </label>
            <div className="relative">
              <input
                type="text"
                name="barcode-input"
                className="template-modal-input"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="000 000..."
                style={{ maxWidth: "calc(100% - 40px)" }}
              />
              <span className="barcode-icon">
                <img src={barcodeIcon} alt="" />
              </span>
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
            onClick={() => setShowModal(false)}
          >
            Anuluj
          </button>
          <button
            className="template-modal-btn accept"
            onClick={handleAddProduct}
          >
            Dodaj
          </button>
        </section>
      </div>
    </>
  );
}

export default AddProductModal;
