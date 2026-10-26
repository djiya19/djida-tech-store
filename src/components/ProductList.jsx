
import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductList({ search }) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
