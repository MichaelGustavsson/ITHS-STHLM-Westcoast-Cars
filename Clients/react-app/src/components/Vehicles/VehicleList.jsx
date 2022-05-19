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
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);

    const url = `${process.env.REACT_APP_BASEURL}/vehicles/list`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log('Hittade inga bilar, eller så gick något fel');
    } else {
      setVehicles(await response.json());
    }
  };

  const deleteVehicle = async (id) => {
    console.log(`Tar bort bilen med id ${id}`);
    const url = `${process.env.REACT_APP_BASEURL}/vehicles/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    console.log(response);

    if (response.status >= 200 && response.status <= 299) {
      console.log('Bilen borttagen');
      loadVehicles();
    } else {
      console.log('Det gick fel någonstans');
    }
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
          <VehicleItem
            vehicle={vehicle}
            key={vehicle.vehicleId}
            handleDeleteVehicle={deleteVehicle}
          />
        ))}
      </tbody>
    </table>
  );
}

export default VehicleList;
