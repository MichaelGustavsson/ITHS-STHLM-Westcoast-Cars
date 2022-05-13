'use strict';

/* Hämta html element som objekt */
const pageTitle = document.querySelector('.page-title');
const vehicleImage = document.querySelector('#vehicleImage');
const modelYear = document.querySelector('#modelYear');
const mileage = document.querySelector('#mileage');
const value = document.querySelector('#value');
const description = document.querySelector('#description');

const baseUrl = 'https://localhost:7237/api/v1/vehicles';

const createHtml = (vehicle) => {
  pageTitle.innerHTML = vehicle.vehicleName;
  vehicleImage.setAttribute('src', vehicle.imageUrl);
  modelYear.innerHTML = `Årsmodell ${vehicle.modelYear}`;
  mileage.innerHTML = `Antal Km ${vehicle.mileage}`;
  value.innerHTML = `Pris ${vehicle.value}`;
  description.innerHTML = vehicle.description;
};

const pageLoad = async () => {
  const urlParams = new URLSearchParams(location.search);
  let vehicleId = 0;

  for (let [key, value] of urlParams) {
    if (key === 'vehicleId') {
      vehicleId = value;
    }
  }

  let vehicle = await getVehicle(vehicleId);
  createHtml(vehicle);
};

const getVehicle = async (vehicleId) => {
  const url = `${baseUrl}/${vehicleId}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.log('Oopps det blev fel här!');
  }

  const vehicle = await response.json();
  return vehicle;
};

pageLoad();
