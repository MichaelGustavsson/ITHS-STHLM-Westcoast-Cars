import { useEffect, useState } from 'react';
// Importera VehicleItem som då representerar en rad per bil...
import VehicleItem from './VehicleItem';

// Skapa komponenten VehicleList
// Container för alla våra bilar i tabell format...
function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  // useEffect körs varje gång som en ändring sker till Virtual DOM.
  // Vi kan ange en array [] med beroenden som måste starta useEffect...
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const url = `${process.env.REACT_APP_BASEURL}/vehicles/list`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log('Hittade inga bilar, eller så gick något fel');
    }
    setVehicles(await response.json());
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Regnummer</th>
          <th>Namn</th>
          <th>Modell År</th>
          <th>Antal Km</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => (
          <VehicleItem vehicle={vehicle} key={vehicle.vehicleId} />
        ))}
      </tbody>
    </table>
  );
}

export default VehicleList;
