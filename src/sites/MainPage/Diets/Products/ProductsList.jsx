import "./../../../../styles/diets.css";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../../utils/Endopoints.jsx";
import Product from "../elements/Product.jsx";
import { createPortal } from "react-dom";
import AddProductModal from "../elements/AddProductModal.jsx";

function ProductsList({ showAddProductModal, setShowAddProductModal }) {
  const [products, setProducts] = useState([]);

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
    </>
  );
}

export default ProductsList;
