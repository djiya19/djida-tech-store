
import { useState } from "react";
import Header from "./components/header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const categories = [
  { icon: "💻", name: "Ordinateurs" },
  { icon: "📱", name: "Smartphones" },
  { icon: "🎧", name: "Audio" },
  { icon: "🎮", name: "Gaming" },
  { icon: "⌚", name: "Accessoires" },
  { icon: "🏠", name: "Maison connectée" },
];

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <div className="hero-content">
            <span className="hero-tag">
              BIENVENUE CHEZ DJIDA
            </span>

            <h1>
              La technologie
              <br />
              <span>à portée de main.</span>
            </h1>

            <p>
              Découvrez une sélection de produits
              technologiques pour accompagner votre quotidien.
              Performance, style et innovation.
            </p>

            <a href="#products" className="hero-button">
              Découvrir nos produits <span>→</span>
            </a>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=85"
              alt="Sélection d'appareils électroniques"
            />
          </div>
        </section>

        <section className="benefits">
          <div className="benefit">
            <span>📦​</span>
            <div>
              <strong>Livraison rapide</strong>
              <p>En Algérie</p>
            </div>
          </div>

          <div className="benefit">
            <span>​👌</span>
            <div>
              <strong>Qualité sélectionnée</strong>
              <p>Des produits soigneusement choisis</p>
            </div>
          </div>

          <div className="benefit">
            <span>📲​</span>
            <div>
              <strong>Service client</strong>
              <p>À votre écoute</p>
            </div>
          </div>

        </section>

        <section className="categories-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">EXPLOREZ L'UNIVERS DE TECHNOLOGIE AVEC NOUS</span>
              <h2>Nos catégories</h2>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                className="category-card"
                key={category.name}
                onClick={() => setSearch(
                  category.name === "Ordinateurs"
                    ? "Laptop"
                    : category.name === "Smartphones"
                    ? "Phone"
                    : category.name === "Audio"
                    ? "Headphones"
                    : category.name === "Gaming"
                    ? "Gaming"
                    : category.name === "Accessoires"
                    ? "Watch"
                    : category.name
                )}
              >
                <span className="category-icon">
                  {category.icon}
                </span>
                <span>{category.name}</span>
                <span className="category-arrow">↗</span>
              </button>
            ))}
          </div>
        </section>

        <section className="catalog-section">
          <div className="section-heading catalog-heading">
            <div>
              <span className="eyebrow">NOTRE SÉLECTION</span>
              <h2>Les essentiels tech.</h2>
              <p>Découvrez nos produits et trouvez votre prochain coup de cœur.</p>
            </div>
          </div>

          <div className="search-container">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                Effacer
              </button>
            )}
          </div>

          <ProductList search={search} />
        </section>

        <Cart />
        
      </main>

      <footer className="footer" id="contact">
        <a href="#" className="footer-brand">
          DJIDA <span>TECH STORE</span>
        </a>
        <p>Votre univers technologique.</p>
        <div className="footer-links">
          <a href="#products">Produits</a>
          <a href="#about">À propos</a>
          <a href="mailto:contact@djida-store.example">Contact</a>
        </div>
        <p className="copyright">
          © 2026 DJIDA Tech Store · Projet académique WAMD
        </p>
      </footer>
    </>
  );
}

export default App;
