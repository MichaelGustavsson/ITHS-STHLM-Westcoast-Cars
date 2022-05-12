'use strict';

/* ----------------------------------------------------------------
          Hämta html element som vi skall manipulera
  ---------------------------------------------------------------- */
const gallery = document.querySelector('.gallery-wrapper');
const modalDialog = document.querySelector('.modal'); //Dialogruta
const closeModalButton = document.querySelector('.close-modal'); //Knappen X i dialogrutan
const overlay = document.querySelector('.overlay');

const baseUrl = 'https://localhost:7237/api/v1/vehicles';

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
    let appUrl = image.baseURI.endsWith('#')
      ? image.baseURI.slice(0, -1)
      : image.baseURI;

    console.log(appUrl);

    let src = image.getAttribute('src');
    let id = image.getAttribute('id');
    let url = `details.html?vehicleId=${id}`;

    image.addEventListener('click', () => {
      openModal(src, url);
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

  const vehicles = await response.json();

  // alert.insertAdjacentHTML('beforeend', 'Vi hittade inga bilar');
  vehicles.forEach((vehicle) => {
    createHtml(vehicle);
  });

  loadImages();
};

const openModal = (imageSrc, url) => {
  const placeholder = modalDialog.querySelector('.modal-container');
  placeholder.innerHTML = `<img src="${imageSrc}" alt="En bil"/>
  <a class="btn" href="${url}">Mer Info</a>`;

  modalDialog.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modalDialog.classList.add('hidden');
  overlay.classList.add('hidden');
};

/* ------------------------------------------------------------
    Hantera händelser i JavaScript...
--------------------------------------------------------------*/
//Hanterar att stänga vår dialogruta genom att lyssna efter klick på stäng knappen...
closeModalButton.addEventListener('click', closeModal);
document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    if (!modalDialog.classList.contains('hidden')) closeModal();
  }
});

getVehicles();
