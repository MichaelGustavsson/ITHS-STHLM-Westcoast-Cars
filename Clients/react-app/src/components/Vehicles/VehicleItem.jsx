function VehicleItem({ vehicle }) {
  return (
    <tr>
      <td>
        <span>
          <i className='fa-solid fa-pencil edit'></i>
        </span>
      </td>
      <td>{vehicle.regNo}</td>
      <td>{vehicle.make}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.modelYear}</td>
      <td></td>
    </tr>
  );
}

export default VehicleItem;
