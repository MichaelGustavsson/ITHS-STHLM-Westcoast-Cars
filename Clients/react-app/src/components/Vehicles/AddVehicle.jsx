function AddVehicle() {
  return (
    <>
      <h1 className='page-title'>Lägg till nytt fordon</h1>
      <section className='form-container'>
        <h4>Fordons information</h4>
        <section className='form-wrapper'>
          <form className='form' method='post'>
            <div className='form-control'>
              <label htmlFor=''>Registreringsnummer</label>
              <input type='text' id='regNo' name='regNo' />
            </div>
            <div className='form-control'>
              <label htmlFor='make'>Tillverkare</label>
              <input type='text' id='make' name='make' />
            </div>
            <div className='form-control'>
              <label htmlFor='model'>Modell</label>
              <input type='text' id='model' name='model' />
            </div>
            <div className='form-control'>
              <label htmlFor='modelYear'>Modell År</label>
              <input type='text' id='modelYear' name='modelYear' />
            </div>
            <div className='form-control'>
              <label htmlFor='mileage'>Antal Km</label>
              <input type='text' id='mileage' name='mileage' />
            </div>
            <div className='form-control'>
              <label htmlFor='imageUrl'>Bild url</label>
              <input type='text' id='imageUrl' name='imageUrl' />
            </div>
            <div className='form-control'>
              <label htmlFor='value'>Pris</label>
              <input type='text' id='value' name='value' />
            </div>
            <div className='form-control'>
              <label htmlFor='description'>Beskrivning</label>
              <input type='text' id='description' name='description' />
            </div>
            <div className='buttons'>
              <button type='submit' className='btn'>
                Spara
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default AddVehicle;
