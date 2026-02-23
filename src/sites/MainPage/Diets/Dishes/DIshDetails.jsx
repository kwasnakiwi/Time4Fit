import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import exampleDish from "./../../../../assets/images/exampleDish.png";
import nut1 from "./../../../../assets/images/nut1.png";
import nut2 from "./../../../../assets/images/nut2.png";
import nut3 from "./../../../../assets/images/nut3.png";
import nut4 from "./../../../../assets/images/nut4.png";
import prInfo1 from "./../../../../assets/images/product-i1.png";
import prAction1 from "./../../../../assets/svgs/whiteBin.svg";
import prAction2 from "./../../../../assets/svgs/whiteEdit.svg";
import coffee from "./../../../../assets/svgs/coffee.svg";
import nut5 from "./../../../../assets/svgs/macro2.svg";
import exclamationMark from "./../../../../assets/svgs/red-!.svg";
import "./../../../../styles/diets.css";
import { FaAngleLeft as AngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DishDetails() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar title="Potrawa" route="Lista potraw / Szczegóły" />
      <SideBar />
      <main className="home-page-container">
        <div className="dish dish-details">
          <div className="dish-top-row">
            <AngleLeft className="arrow" onClick={() => navigate(-1)} />
            <h2 className="product-title">Bez nazwy</h2>
            <div className="product-allergens">
              <span className="product-allergens-text">
                <img src={exclamationMark} alt="" />
                Alergeny
              </span>
              {[1, 2, 3].map((al, i) => (
                <span key={i} className="product-allergen">
                  {"Gluten"}
                </span>
              ))}
            </div>
            <div className="product-nutrients">
              <span className="product-nutrient purple">
                <img src={nut1} alt="" />
                <div>
                  Kcal <span>17</span>
                </div>
              </span>
              <span className="product-nutrient cyan">
                <img src={nut5} alt="" />
                <div>
                  Sól <span>17g</span>
                </div>
              </span>
              <span className="product-nutrient blue">
                <img src={nut2} alt="" />
                <div>
                  Białko <span>17g</span>
                </div>
              </span>
              <span className="product-nutrient yellow">
                <img src={nut3} alt="" />
                <div>
                  Tłuszcze <span>17g</span>
                </div>
              </span>
              <span className="product-nutrient green">
                <img src={nut4} alt="" />
                <div>
                  Węglowodany <span>17g</span>
                </div>
              </span>
            </div>
            <div className="product-info">
              <span className="product-category-name">
                <img src={prInfo1} alt="" />
                Normalna
              </span>
              <span className="dish-category-name">
                <img src={coffee} alt="" />
                Bez kategorii
              </span>
            </div>
            <div className="product-actions">
              <span className="product-action edit">
                <img src={prAction2} alt="" />
                Edytuj potrawę
              </span>
              <span className="product-action delete">
                <img src={prAction1} alt="" />
                Usuń potrawę
              </span>
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
          <hr className="dish-line" />
          <div className="dish-bottom-row">
            <div className="dish-ingredients-box">
              <h3>Przepis</h3>
              <p className="recipe">
                Płatki owsiane przełożyć do miseczki. Zalać wrzącą wodą, tak
                żeby woda była delikatnie ponad wsypane płatki. Kiedy płatki
                napęcznieją i zmiękną, dodać serek i odżywkę. Wymieszać z
                płatkami. Na koniec pokroić w banana w plasterki i wymieszać z
                owsianką.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DishDetails;
