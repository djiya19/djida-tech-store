import { useSelector } from "react-redux";
import logo from "../assets/djida-logo.png";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">
      <a href="/" className="brand">
        <img
          src={logo}
          alt="Djida Tech Store"
          className="brand-logo"
        />
      </a>

      <nav className="main-nav">
        <a href="#products">Products</a>
        <a href="#cart" className="cart-link">
          Cart({cartCount}) 
        </a>
      </nav>
    </header>
  );
}

export default Header;
