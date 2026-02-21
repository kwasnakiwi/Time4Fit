import "./../../../../styles/diets.css";
import nut1 from "./../../../../assets/images/nut1.png";
import nut2 from "./../../../../assets/images/nut2.png";
import nut3 from "./../../../../assets/images/nut3.png";
import nut4 from "./../../../../assets/images/nut4.png";
import prInfo1 from "./../../../../assets/images/product-i1.png";
import prInfo2 from "./../../../../assets/images/product-i2.png";
import prAction1 from "./../../../../assets/images/productAction1.png";
import prAction2 from "./../../../../assets/images/productAction2.png";
import coffee from "./../../../../assets/svgs/coffee.svg";
import exampleDish from "./../../../../assets/images/exampleDish.png";

function Dish({
  name,
  category,
  dietType,
  totalKcal,
  totalProtein,
  totalFat,
  totalCarbohydrates,
  displaySalt,
}) {
  return (
    <>
      <div className="dish">
        <div className="dish-top-row">
          <h2 className="product-title">{name}</h2>
          <div className="product-nutrients">
            <span className="product-nutrient purple">
              <img src={nut1} alt="" />
              <div>
                Kcal <span>{totalKcal}</span>
              </div>
            </span>
            <span className="product-nutrient blue">
              <img src={nut2} alt="" />
              <div>
                Białko <span>{totalProtein}g</span>
              </div>
            </span>
            <span className="product-nutrient yellow">
              <img src={nut3} alt="" />
              <div>
                Tłuszcze <span>{totalFat}g</span>
              </div>
            </span>
            <span className="product-nutrient green">
              <img src={nut4} alt="" />
              <div>
                Węglowodany <span>{totalCarbohydrates}g</span>
              </div>
            </span>
          </div>
          <div className="product-info">
            <span className="product-category-name">
              <img src={prInfo1} alt="" />
              {dietType}
            </span>
          </div>
          <div className="product-actions">
            <span className="dish-category-name">
              <img src={coffee} alt="" />
              {category}
            </span>
            <img src={prAction1} alt="" />
            <img src={prAction2} alt="" />
          </div>
        </div>
        <hr className="dish-line" />
        <div className="dish-bottom-row">
          <div className="dish-ingredients-box">
            <h3>Składniki</h3>
            <ul className="dish-ingredients">
              <li>Banan - 1 sztuka</li>
              <li>Serek wiejski Piątnica - 2 porcje</li>
              <li>Płatki owsiane górskie - 1.5 łyżki</li>
              <li>
                Izolat białka serwatki, 100% Natural Whey Protein - 1/4 porcji
              </li>
            </ul>
          </div>
          <img src={exampleDish} alt="" />
        </div>
      </div>
    </>
  );
}

export default Dish;
