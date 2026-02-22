import "./../../../../styles/diets.css";
import NavBar from "./../../components/NavBar.jsx";
import SideBar from "../../components/SideBar.jsx";
import { useEffect, useState } from "react";
import {
  FaSearch as Search,
  FaAngleDown as AngleDown,
  FaPlus as Plus,
} from "react-icons/fa";
import { apiFetch } from "../../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../../utils/Endopoints.jsx";
import Product from "../elements/Product.jsx";
import { createPortal } from "react-dom";
import AddProductModal from "../elements/AddProductModal.jsx";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [productsCategory, setProductsCategory] = useState("all");
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const getProducts = async () => {
    try {
      const response = await apiFetch(
        `${BASE_URL}${ENDPOINTS.dietListMyProduct}`,
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

      setProducts(data?.results || []);
      console.log("products:", data?.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleClickAddProductButton = () => {
    setShowAddProductModal(true);
  };

  return (
    <>
      {showAddProductModal &&
        createPortal(
          <AddProductModal
            setShowModal={setShowAddProductModal}
            setProducts={setProducts}
          />,
          document.body,
        )}
      <NavBar title="Lista produktów" route="Lista produktów" />
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
                  placeholder="Wyszukaj produkt..."
                />
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
                  <option value="">Alergeny</option>
                </select>
                <AngleDown className="arrow" />
              </div>
            </div>
            <div className="add-product-wrapper">
              <button
                className="add-product-btn"
                onClick={handleClickAddProductButton}
              >
                <Plus className="p-plus" /> Dodaj produkt
              </button>
            </div>
          </div>
          <div className="bottom">
            <button
              className={`product-category ${productsCategory === "all" ? "selected" : ""}`}
              onClick={() => setProductsCategory("all")}
            >
              Wszystkie
            </button>
            <button
              className={`product-category ${productsCategory === "dairy" ? "selected" : ""}`}
              onClick={() => setProductsCategory("dairy")}
            >
              Nabiał
            </button>
            <button
              className={`product-category ${productsCategory === "meat" ? "selected" : ""}`}
              onClick={() => setProductsCategory("meat")}
            >
              Mięso
            </button>
            <button
              className={`product-category ${productsCategory === "vegetables" ? "selected" : ""}`}
              onClick={() => setProductsCategory("vegetables")}
            >
              Warzywa
            </button>
            <button
              className={`product-category ${productsCategory === "bread" ? "selected" : ""}`}
              onClick={() => setProductsCategory("bread")}
            >
              Pieczywo
            </button>
            <button
              className={`product-category ${productsCategory === "fish" ? "selected" : ""}`}
              onClick={() => setProductsCategory("fish")}
            >
              Ryby
            </button>
          </div>
        </header>
        <section className="products">
          {[1, 2, 3, 4].map((pr, i) => (
            <Product
              key={i}
              title={pr.title || "Bez nazwy"}
              labelType={pr.label_type || "EU"}
              category={pr.category || "Brak kategorii"}
              packagingType={pr.packaging_type || "Opakowanie"}
              packagingSize={pr.packaging_size || 32}
              packagingMetric={pr.packaging_metric || "g"}
              nutrients={{
                kcal: 17,
                sodium_salt: 17,
                protein: 17,
                fat: 17,
                carbohydrates: 17,
              }}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default ProductsList;
