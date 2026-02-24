import { useEffect, useState } from "react";
import "./../../../styles/diets.css";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import {
  FaSearch as Search,
  FaAngleDown as AngleDown,
  FaPlus as Plus,
} from "react-icons/fa";
import ProductsList from "./Products/ProductsList";
import DishesList from "./Dishes/DishesList";
import { useNavigate, useLocation } from "react-router-dom";

function Diets() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const [filterType, setFilterType] = useState(
    queryParams.get("type") || "myProducts",
  );

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("type", filterType);
    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true },
    );
  }, [filterType, navigate, location.pathname]);

  const [search, setSearch] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [productsCategory, setProductsCategory] = useState("all");
  const [dishesCategory, setDishesCategory] = useState("all");
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [showAddIngredientsModal, setShowAddIngredientsModal] = useState(false);
  const [showFormatTextModal, setShowFormatTextModal] = useState(false);

  const handleClickAddProductButton = () => {
    setShowAddProductModal(true);
  };

  const handleClickAddDishButton = () => {
    setShowAddDishModal(true);
  };

  return (
    <>
      <NavBar title="Lista produktów" route="Lista produktów" />
      <SideBar />
      <main className="home-page-container">
        <header className="product-filters">
          <nav className="product-filters-types">
            <span
              className={`product-filters-type ${filterType === "menu" ? "selected" : ""}`}
              onClick={() => setFilterType("menu")}
            >
              Jadłospis
            </span>
            <span
              className={`product-filters-type ${filterType === "myDishes" ? "selected" : ""}`}
              onClick={() => setFilterType("myDishes")}
            >
              Moje potrawy
            </span>
            <span
              className={`product-filters-type ${filterType === "myProducts" ? "selected" : ""}`}
              onClick={() => setFilterType("myProducts")}
            >
              Moje produkty
            </span>
            <span
              className={`product-filters-type ${filterType === "supplements" ? "selected" : ""}`}
              onClick={() => setFilterType("supplements")}
            >
              Suplementacje
            </span>
            <span
              className={`product-filters-type ${filterType === "measurements" ? "selected" : ""}`}
              onClick={() => setFilterType("measurements")}
            >
              Pomiary i progres
            </span>
          </nav>
          <hr className="dish-line" style={{ margin: "12px 0" }} />
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
              {filterType === "myDishes" && (
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
              )}
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
              {filterType === "myDishes" && (
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
              )}
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
            <div
              className="add-product-wrapper"
              style={
                filterType === "myDishes" ? { maxWidth: "210px" } : undefined
              }
            >
              <button
                className="add-product-btn"
                onClick={
                  filterType === "myProducts"
                    ? handleClickAddProductButton
                    : filterType === "myDishes"
                      ? handleClickAddDishButton
                      : undefined
                }
              >
                <Plus className="p-plus" />{" "}
                {filterType === "myProducts"
                  ? "Dodaj produkt"
                  : filterType === "myDishes"
                    ? "Stwórz nową potrawę"
                    : undefined}
              </button>
            </div>
          </div>
          <div className="bottom">
            {filterType === "myProducts" && (
              <>
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
              </>
            )}
            {filterType === "myDishes" && (
              <>
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
              </>
            )}
          </div>
        </header>
        <section className="diets-content">
          {filterType === "myProducts" && (
            <ProductsList
              showAddProductModal={showAddProductModal}
              setShowAddProductModal={setShowAddProductModal}
            />
          )}
          {filterType === "myDishes" && (
            <DishesList
              showAddDishModal={showAddDishModal}
              showAddIngredientsModal={showAddIngredientsModal}
              showFormatTextModal={showFormatTextModal}
              setShowAddDishModal={setShowAddDishModal}
              setShowAddIngredientsModal={setShowAddIngredientsModal}
              setShowFormatTextModal={setShowFormatTextModal}
            />
          )}
        </section>
      </main>
    </>
  );
}

export default Diets;
