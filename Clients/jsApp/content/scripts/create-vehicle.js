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
const form = document.querySelector('#vehicle-form');

// Här anger vi url:en som pekar på vårt REST API...
const baseUrl = 'https://localhost:7237/api/v1/vehicles';

const saveVehicle = async (e) => {
  // Denna rad förhindrar standard beteende för ett formulär
  // som är att skicka formulärets data till servern.
  // Vi vill hantera sparandet av bilen internt i webbläsaren...
  e.preventDefault();

  // Här skapar vi ett JavaScript objekt genom att hämta in varje
  // varje inmatningselements värde via value egenskapen
  // och placerar detta i objektets egenskaper.
  // Observera att egenskapernas namn måste matcha det förväntade
  // json objektet på api sidan...
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

  // Här skapar vi ett anrop till vårt api.
  // Till fetch api:et anger vi som första argument url:en till vårt api.
  // Som andra argument skickar vi med ett objekt som konfigurerar http paketet.
  // I och med att vi skall skicka göra ett POST anrop så anger vi POST
  // som värde till egenskapen method.
  // Vi måste också tala om att det vi skickar är typen application/json
  // därför anger vi i egenskapen headers ett nytt objekt.
  // Där vi anger egenskapen Content-Type till POST.
  // Sist men inte minst så använder vi egenskapen body för att skicka med vårt data.
  // Vi gör detta genom att använda JavaScript metoden JSON.stringify som
  // tar vårt JavaScript objekt vehicle och omvandlar det till json...
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  });

  // Här kontrollerar om response inte är ok dvs något annat än 200 eller 201.
  if (!response.ok) {
    // Om vi hamnar här så betyder det att det inte gick att spara ner vår
    // nya bil.😱😞
    // Vad vi gör här är att asynkront läsa in eventuellt svar ifrån
    // response objektet genom att använda metoden json().
    const error = await response.json();
    // Vi kontrollerar om statuskoden som kommer tillbaka är 400.
    if (error.statusCode === 400) {
      console.log(error.statusText);
      // Om det är någon annan typ av fel t ex 500(Internal Server Error)
      // så fångar vi det här...
    } else {
      console.log('Något gick fel när bilen skulle läggas till');
    }
  } else {
    // Hamnar vi här så gick allt bra och vi kan vara nöjda och glada😁.
    console.log('Bilen är upplagd i systemet.');
  }

  // Avslutningsvis tömmer vi ut inmatningsfälten...
  regNoInput.value = '';
  makeInput.value = '';
  modelInput.value = '';
  modelYearInput.value = '';
  mileageInput.value = '';
  imageUrlInput.value = '';
  valueInput.value = '';
  descriptionInput.value = '';
};

/* -----------------------------------------------------------------------*/
//    Sätt upp händelser
/* -----------------------------------------------------------------------*/

// Här använder vi DOM metoden addEventListener där vi lyssnar på submit händelsen
// som sker när ett formulär skickas via klickning på en submit knapp
//och när det inträffar anropar vi metoden saveVehicle...
form.addEventListener('submit', saveVehicle);
