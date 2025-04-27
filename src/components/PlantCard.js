import React, { useState } from "react";

function PlantCard({ plant, onToggleSoldOut, onUpdatePlant, onDeletePlant }) {
  const { id, name, image, price, soldOut } = plant;
  const [newPrice, setNewPrice] = useState(price);

  function handleToggleClick() {
    onToggleSoldOut(id);
  }

  function handlePriceSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => onUpdatePlant(updatedPlant));
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(() => onDeletePlant(id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>

      <form onSubmit={handlePriceSubmit}>
        <input
          type="number"
          step="0.01"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button type="submit">Update Price</button>
      </form>

      {soldOut ? (
        <button onClick={handleToggleClick}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={handleToggleClick}>In Stock</button>
      )}

      <button onClick={handleDeleteClick} style={{ backgroundColor: "red", color: "white", marginTop: "5px" }}>
        Delete Plant
      </button>
    </li>
  );
}

export default PlantCard;
