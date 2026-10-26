
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <span className="category">{product.category}</span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-bottom">
          <strong>{product.price.toLocaleString("fr-DZ")} DA</strong>

          <button onClick={() => dispatch(addToCart(product))}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
