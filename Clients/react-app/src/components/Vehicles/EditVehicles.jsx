import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditVehicle() {
  const params = useParams();
  const [vehicleId, setVehicleId] = useState('');
  const [regNo, setRegNo] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchVehicle(params.id);
  }, [params.id]);

  const fetchVehicle = async (id) => {
    const url = `${process.env.REACT_APP_BASEURL}/vehicles/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.log('Hittade inga bilar, eller så gick något fel');
    }

    const vehicle = await response.json();
    console.log(vehicle);
    setVehicleId(vehicle.vehicleId);
    setRegNo(vehicle.regNo);
    setMake(vehicle.vehicleName.split(' ')[0]);
    setModel(vehicle.vehicleName.split(' ')[1]);
    setModelYear(vehicle.modelYear);
    setMileage(vehicle.mileage);
    setImageUrl(vehicle.imageUrl);
    setValue(vehicle.value);
    setDescription(vehicle.description);
  };

  const onHandleVehicleIdTextChanged = (e) => {
    setVehicleId(e.target.value);
  };

  const onHandleRegNoTextChanged = (e) => {
    setRegNo(e.target.value);
  };
  const onHandleMakeTextChanged = (e) => {
    setMake(e.target.value);
  };
  const onHandleModelTextChanged = (e) => {
    setModel(e.target.value);
  };
  const onHandleModelYearTextChanged = (e) => {
    setModelYear(e.target.value);
  };
  const onHandleMileageTextChanged = (e) => {
    setMileage(e.target.value);
  };
  const onHandleImageUrlTextChanged = (e) => {
    setImageUrl(e.target.value);
  };
  const onHandleValueTextChanged = (e) => {
    setValue(e.target.value);
  };
  const onHandleDescriptionTextChanged = (e) => {
    setDescription(e.target.value);
  };

  const handleSaveVehicle = (e) => {
    e.preventDefault();
    const vehicle = {
      regNo,
      make,
      model,
      modelYear,
      mileage,
      imageUrl,
      value,
      description,
    };

    console.log(vehicle);

    saveVehicle(vehicle);
  };

  const saveVehicle = async (vehicle) => {
    const url = `${process.env.REACT_APP_BASEURL}/vehicles/${vehicleId}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    });

    console.log(response);

    if (response.status >= 200 && response.status <= 299) {
      console.log('Bilen är sparad');
    } else {
      console.log('Det gick fel någonstans');
    }
  };

  return (
    <>
      <h1 className='page-title'>Uppdatera fordon</h1>
      <section className='form-container'>
        <h4>Fordons information</h4>
        <section className='form-wrapper'>
          <form className='form' onSubmit={handleSaveVehicle}>
            <input
              onChange={onHandleVehicleIdTextChanged}
              value={vehicleId}
              type='hidden'
              id='vehicleId'
              name='vehicleId'
            />
            <div className='form-control'>
              <label htmlFor=''>Registreringsnummer</label>
              <input
                onChange={onHandleRegNoTextChanged}
                value={regNo}
                type='text'
                id='regNo'
                name='regNo'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='make'>Tillverkare</label>
              <input
                onChange={onHandleMakeTextChanged}
                value={make}
                type='text'
                id='make'
                name='make'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='model'>Modell</label>
              <input
                onChange={onHandleModelTextChanged}
                value={model}
                type='text'
                id='model'
                name='model'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='modelYear'>Modell År</label>
              <input
                onChange={onHandleModelYearTextChanged}
                value={modelYear}
                type='text'
                id='modelYear'
                name='modelYear'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='mileage'>Antal Km</label>
              <input
                onChange={onHandleMileageTextChanged}
                value={mileage}
                ype='text'
                id='mileage'
                name='mileage'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='imageUrl'>Bild url</label>
              <input
                onChange={onHandleImageUrlTextChanged}
                value={imageUrl}
                type='text'
                id='imageUrl'
                name='imageUrl'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='value'>Pris</label>
              <input
                onChange={onHandleValueTextChanged}
                value={value}
                type='text'
                id='value'
                name='value'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='description'>Beskrivning</label>
              <input
                onChange={onHandleDescriptionTextChanged}
                value={description}
                type='text'
                id='description'
                name='description'
              />
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

export default EditVehicle;
