import "./../../../../styles/diets.css";
import nut1 from "./../../../../assets/images/nut1.png";
import nut2 from "./../../../../assets/images/nut2.png";
import nut3 from "./../../../../assets/images/nut3.png";
import nut4 from "./../../../../assets/images/nut4.png";
import nut5 from "./../../../../assets/svgs/macro2.svg";
import prInfo1 from "./../../../../assets/images/product-i1.png";
import prInfo2 from "./../../../../assets/images/product-i2.png";
import prAction1 from "./../../../../assets/images/productAction1.png";
import prAction2 from "./../../../../assets/images/productAction2.png";

function Product({
  title,
  labelType,
  category,
  packagingType,
  packagingSize,
  packagingMetric,
  nutrients,
  isSmall,
}) {
  return (
    <>
      <div className="product">
        <h2 className="product-title">{title}</h2>
        <div className="product-nutrients">
          <span className="product-nutrient purple">
            <img src={nut1} alt="" />
            <div>
              Kcal <span>{nutrients.kcal}</span>
            </div>
          </span>
          <span className="product-nutrient cyan">
            <img src={nut5} alt="" />
            <div>
              Sól <span>{nutrients.sodium_salt}g</span>
            </div>
          </span>
          <span className="product-nutrient blue">
            <img src={nut2} alt="" />
            <div>
              Białko <span>{nutrients.protein}g</span>
            </div>
          </span>
          <span className="product-nutrient yellow">
            <img src={nut3} alt="" />
            <div>
              Tłuszcze <span>{nutrients.fat}g</span>
            </div>
          </span>
          <span className="product-nutrient green">
            <img src={nut4} alt="" />
            <div>
              Węglowodany <span>{nutrients.carbohydrates}g</span>
            </div>
          </span>
        </div>
        <span className={`product-category-name top`}>
          <img src={prInfo1} alt="" />
          {category}
        </span>
        <div className="product-info">
          {!isSmall && (
            <span className={`product-category-name`}>
              <img src={prInfo1} alt="" />
              {category}
            </span>
          )}
          <span className="product-packaging">
            <img src={prInfo2} alt="" />
            {packagingType} {packagingSize}g
          </span>
        </div>
        {!isSmall && (
          <div className="product-actions">
            <img src={prAction1} alt="" />
            <img src={prAction2} alt="" />
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
