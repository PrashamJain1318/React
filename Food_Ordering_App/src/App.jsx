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
        onClick={() => {
          if (food.available) {
            addToCart();
          } else {
            alert(`${food.name} is out of stock!`);
          }
        }}
      >
        {food.available ? "🛒 Add to Cart" : "❌ Out of Stock"}
      </button>
    </div>
  );
}
function App() {
  const [foodList, setFoodList] = useState(foods);
  const [cartCount, setCartCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [emoji, setEmoji] = useState("");
  function addToCart() {
    setCartCount(cartCount + 1);
  }
  function addFood(event) {
    event.preventDefault();
    const newFood = {
      id: foodList.length + 1,
      name: name,
      category: category,
      price: Number(price),
      emoji: emoji,
      available: true,
    };
    setFoodList([...foodList, newFood]);
    setName("");
    setCategory("");
    setPrice("");
    setEmoji("");
    setShowForm(false);
  }
  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Food Ordering App</h1>
          <p>Order your favorite food</p>
        </div>
        <div className="header-buttons">
          <button
            className="add-food-button"
            onClick={() => setShowForm(!showForm)}
          >
            ➕ Add Food
          </button>
          <div className="cart">
            🛒 Cart: {cartCount}
          </div>
        </div>
      </header>
      {showForm && (
        <form className="food-form" onSubmit={addFood}>
          <h2>Add New Food</h2>
          <input
            type="text"
            placeholder="Food name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Emoji"
            value={emoji}
            onChange={(event) => setEmoji(event.target.value)}
            required
          />
          <button type="submit">Add Food</button>
        </form>
      )}
      <main className="food-list">
        {foodList.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            addToCart={() => addToCart()}
          />
        ))}
      </main>
    </div>
  );
}

export default App;