import { useState } from "react";
import foods from "./foods";
import "./App.css";

function FoodCard({ food, addToCart }) {
  return (
    <div className="food-card">
      <div className="food-emoji">{food.emoji}</div>

      <h2>{food.name}</h2>

      <p className="category">{food.category}</p>

      <p className="price">₹{food.price}</p>

      {food.available ? (
        <p className="available">Available</p>
      ) : (
        <p className="out-of-stock">Out of Stock</p>
      )}

      <button
        onClick={addToCart}
        disabled={!food.available}
      >
        {food.available ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);

  function addToCart() {
    setCartCount(cartCount + 1);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Food Ordering App</h1>

        <div className="cart">
          🛒 Cart: {cartCount}
        </div>
      </header>

      <main className="food-list">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            addToCart={addToCart}
          />
        ))}
      </main>
    </div>
  );
}

export default App;