import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then(setPlants);
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function handleSearchChange(term) {
    setSearchTerm(term);
  }

  function handleToggleSoldOut(id) {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setPlants(updatedPlants);
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlants = plants.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
    );
    setPlants(updatedPlants);
  }

  function handleDeletePlant(deletedPlantId) {
    const updatedPlants = plants.filter((plant) => plant.id !== deletedPlantId);
    setPlants(updatedPlants);
  }

  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <PlantList
        plants={plantsToDisplay}
        onToggleSoldOut={handleToggleSoldOut}
        onUpdatePlant={handleUpdatePlant}
        onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;