import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleSoldOut, onUpdatePlant, onDeletePlant }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onToggleSoldOut={onToggleSoldOut}
          onUpdatePlant={onUpdatePlant}
          onDeletePlant={onDeletePlant}
        />
      ))}
    </ul>
  );
}

export default PlantList;
