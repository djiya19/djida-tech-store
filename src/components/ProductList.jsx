
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ search }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/products"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Failed to retrieve products");
        }

        // Adapt MongoDB fields to the existing frontend structure
        const formattedProducts = data.products.map((product) => ({
          ...product,
          id: product._id,
          image: `${import.meta.env.BASE_URL}${product.imageUrl.replace(/^\//, "")}`,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="empty-message">Loading products...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
  }

  return (
    <section id="products">
      <div className="section-heading">
        <h2>Our Products</h2>
        <p>Discover our latest tech essentials.</p>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="empty-message">No products found.</p>
      )}
    </section>
  );
}

export default ProductList;
