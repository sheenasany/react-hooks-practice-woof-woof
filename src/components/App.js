import React, { useState, useEffect } from "react";
import DogFilter from "./DogFilter";
import NavBar from "./NavBar";
import DogCardDisplay from "./DogCardDisplay"

function App() {
  const [doggos, setDoggos] = useState([])
  const [featuredDoggo, setFeaturedDoggo] = useState(null)
  const [goodDogsOnly, setGoodDogsOnly] = useState(false);

useEffect(() => {
  fetch("http://localhost:3001/pups")
    .then(res => res.json())
    .then(data => {
        setDoggos(data)
      })
}, [])

function onUpdateDog(updatedDog) {
  const updatedDogs = doggos.map((dog) =>
    dog.id === updatedDog.id ? updatedDog : dog
  );
  setDoggos(updatedDogs);
}

function handleToggleFilter() {
  setGoodDogsOnly((goodDogsOnly) => !goodDogsOnly);
}

const selectedDog = doggos.find((dog) => dog.id === featuredDoggo);

let displayDogs = doggos;
if (goodDogsOnly) {
  displayDogs = displayDogs.filter((dog) => dog.isGoodDog);
}

  return (
    <div className="App">
      <DogFilter goodDogsOnly={goodDogsOnly} onFilterClick={handleToggleFilter}/>
      <NavBar doggos={displayDogs} onClickDog={setFeaturedDoggo} />
      <DogCardDisplay doggo={selectedDog} onUpdateDog={onUpdateDog}   />
    </div>
  );
}

export default App;
