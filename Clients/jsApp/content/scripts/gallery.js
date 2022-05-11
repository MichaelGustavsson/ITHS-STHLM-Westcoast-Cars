'use strict';

/* ----------------------------------------------------------------
          Hämta html element som vi skall manipulera
  ---------------------------------------------------------------- */
const gallery = document.querySelector('.gallery-wrapper');
const alertMessage = document.querySelector('.alert');

const baseUrl = 'https://localhost:7227/api/v1/vehicles';

const createHtml = (vehicle) => {
  gallery.insertAdjacentHTML(
    'beforeend',
    `<div class="gallery-card">
    <h4>${vehicle.vehicleName}</h4>
    <img src="${vehicle.imageUrl}" id="${vehicle.vehicleId}" width="400"/>
    <p>Årsmodell ${vehicle.modelYear} | Antal Km ${vehicle.mileage}</p>
  </div>`
  );
};

const loadImages = () => {
  const images = document.querySelectorAll('.gallery-card img');
  images.forEach((image) => {
    let src = image.getAttribute('src');
    let id = image.getAttribute('id');

    image.addEventListener('click', () => {
      console.log(`Du klickade på bilden för bilen med id: ${id}`);
    });
  });
};

const getVehicles = async () => {
  const url = `${baseUrl}/list`;

  // Vi använder webbläsarens inbygga fetch api för att kommunicera med endpoints...
  const response = await fetch(url);

  if (!response.ok) {
    console.log('Oopps det blev fel här!');
  }
  console.log(response);

  const vehicles = await response.json();
  console.log(vehicles);

  // alert.insertAdjacentHTML('beforeend', 'Vi hittade inga bilar');
  vehicles.forEach((vehicle) => {
    createHtml(vehicle);
  });

  loadImages();
};

// function async getVehicles(){

// }

getVehicles();
