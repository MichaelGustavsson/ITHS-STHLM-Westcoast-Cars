import { useNavigate } from 'react-router-dom';

function VehicleItem({ vehicle, handleDeleteVehicle }) {
  const navigate = useNavigate();

  const onEditClickHandler = () => {
    navigate(`/edit/${vehicle.vehicleId}`);
  };

  const onDeleteClickHandler = () => {    
    handleDeleteVehicle(vehicle.vehicleId);
  };

  return (
    <tr>
      <td>
        <span onClick={onEditClickHandler}>
          <i className='fa-solid fa-pencil edit'></i>
        </span>
      </td>
      <td>{vehicle.regNo}</td>
      <td>{vehicle.vehicleName}</td>
      <td>{vehicle.modelYear}</td>
      <td>{vehicle.mileage}</td>
      <td>
        <span onClick={onDeleteClickHandler}>
          <i className='fa-solid fa-trash-can delete'></i>
        </span>
      </td>
    </tr>
  );
}

export default VehicleItem;
