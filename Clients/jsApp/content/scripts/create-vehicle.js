'use strict';

/* ----------------------------------------------------------------
    Hämta in alla html element som skall manipuleras...
---------------------------------------------------------------- */

const regNoInput = document.querySelector('#regNo');
const makeInput = document.querySelector('#make');
const modelInput = document.querySelector('#model');
const modelYearInput = document.querySelector('#modelYear');
const mileageInput = document.querySelector('#mileage');
const imageUrlInput = document.querySelector('#imageUrl');
const valueInput = document.querySelector('#value');
const descriptionInput = document.querySelector('#description');
const alertMessage = document.querySelector('.alert');

const saveBtn = document
  .querySelector('#save')
  .addEventListener('click', saveVehicle);

const baseUrl = 'https://localhost:7237/api/v1/vehicles';

async function saveVehicle(e) {
  e.preventDefault();

  let vehicle = {
    regNo: regNoInput.value,
    make: makeInput.value,
    model: modelInput.value,
    modelYear: modelYearInput.value,
    mileage: mileageInput.value,
    imageUrl: imageUrlInput.value,
    value: valueInput.value,
    description: descriptionInput.value,
  };
  console.log('save', vehicle);

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  });

  console.log(response);

  if (!response.ok) {
    const error = await response.json();
    if (error.statusCode === 400) {
      alertMessage.innerHTML = error.statusText;
      alertMessage.classList.remove('hidden');
      alertMessage.classList.add('alert-error');
    } else {
      alertMessage.innerHTML = 'Något gick fel när bilen skulle läggas till';
    }
  } else {
    alertMessage.classList.remove('hidden');
    alertMessage.classList.add('alert-success');
    alertMessage.innerHTML = 'Bilen är upplagd i systemet.';
  }

  // Töm ut inmatningsfälten...
  regNoInput.value = '';
  makeInput.value = '';
  modelInput.value = '';
  modelYearInput.value = '';
  mileageInput.value = '';
  imageUrlInput.value = '';
  valueInput.value = '';
  descriptionInput.value = '';
}
