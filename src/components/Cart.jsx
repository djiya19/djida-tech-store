
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section id="cart" className="cart-section">
      <h2>Your Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>
                  {item.price.toLocaleString("fr-DZ")} DA ×{" "}
                  {item.quantity}
                </p>
              </div>

              <button
                className="remove-button"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">
            <strong>
              Total: {total.toLocaleString("fr-DZ")} DA
            </strong>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
