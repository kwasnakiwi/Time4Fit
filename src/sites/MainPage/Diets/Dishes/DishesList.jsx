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

function DishesList({
  showAddDishModal,
  showAddIngredientsModal,
  showFormatTextModal,
  setShowAddDishModal,
  setShowAddIngredientsModal,
  setShowFormatTextModal,
}) {
  const [dishes, setDishes] = useState([]);

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
    </>
  );
}

export default DishesList;
