// Importera VehicleItem som då representerar en rad per bil...
import VehicleItem from "./VehicleItem";

// Skapa komponenten VehicleList
// Container för alla våra bilar i tabell format...
function VehicleList(){
    const vehicles = [
        {
          isValued: true,
          regNo: 'ABC123',
          make: 'Chevrolet',
          model: 'Corvette',
          vinNumber: 'WDD2122261B332573',
          color: 'Gray metallic',
          bodyType: 'Convertible',
          fuelType: 'Petrol',
          transmissionType: 'Automatic',
          numberOfGears: 9,
          modelYear: '2015',
          imageUrl: 'https://i.postimg.cc/N09fbtKZ/car1.jpg',
          mileage: 25000,
          numberOfDoors: 2,
          numberOfSeats: 2,
          value: 175000,
          numberOfKeys: 2,
          numberOfWheelsets: 1,
        },
        {
          isValued: true,
          regNo: 'DEF345',
          make: 'Ford',
          model: 'Mustang',
          vinNumber: 'WDD2122261B332573',
          color: 'Gray metallic',
          bodyType: 'Stationwagon/Estate',
          fuelType: 'Diesel',
          transmissionType: 'Automatic',
          numberOfGears: 9,
          modelYear: '2017',
          imageUrl: 'https://i.postimg.cc/Fsy2yyh8/car2.jpg',
          mileage: 48500,
          numberOfDoors: 4,
          numberOfSeats: 5,
          value: 175000,
          numberOfKeys: 2,
          numberOfWheelsets: 1,
        },
        {
          isValued: true,
          regNo: 'GHI678',
          make: 'Porsche',
          model: 'Alpine',
          vinNumber: 'WDD2122261B332573',
          color: 'Blue',
          bodyType: 'Convertible',
          fuelType: 'Petrol',
          transmissionType: 'Manual',
          numberOfGears: 4,
          modelYear: '1967',
          imageUrl: 'https://i.postimg.cc/85xqHwJQ/car3.jpg',
          mileage: 89000,
          numberOfDoors: 2,
          numberOfSeats: 2,
          value: 175000,
          numberOfKeys: 2,
          numberOfWheelsets: 1,
        },
        {
          isValued: true,
          regNo: 'JKL901',
          make: 'Mercedes',
          model: 'S500',
          vinNumber: 'WDD2122261B332573',
          color: 'Gray metallic',
          bodyType: 'Stationwagon/Estate',
          fuelType: 'Diesel',
          transmissionType: 'Automatic',
          numberOfGears: 9,
          modelYear: '2019',
          imageUrl: 'https://i.postimg.cc/MHRgrRVc/car4.jpg',
          mileage: 25000,
          numberOfDoors: 4,
          numberOfSeats: 4,
          value: 175000,
          numberOfKeys: 2,
          numberOfWheelsets: 1,
        },
        {
          isValued: true,
          regNo: 'MNO902',
          make: 'Mercedes',
          model: 'AMG',
          vinNumber: 'WDD2122261B332573',
          color: 'Gray metallic',
          bodyType: 'Stationwagon/Estate',
          fuelType: 'Diesel',
          transmissionType: 'Automatic',
          numberOfGears: 9,
          modelYear: '2014',
          imageUrl: 'https://i.postimg.cc/wj9n01vv/car5.jpg',
          mileage: 25000,
          numberOfDoors: 4,
          numberOfSeats: 4,
          value: 175000,
          numberOfKeys: 2,
          numberOfWheelsets: 1,
        },
      ];
    return (
        <table>
            <thead>
                <tr>
                    <th>Regnummer</th>
                    <th>Tillverkare</th>
                    <th>Modell</th>
                    <th>Modell År</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.map((vehicle) => (
                    <VehicleItem vehicle={vehicle} key={vehicle.regNo}/>
                ))}
            </tbody>
        </table>

    )
}

export default VehicleList;