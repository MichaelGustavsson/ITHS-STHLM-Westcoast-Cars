
function VehicleItem({vehicle}){
    
    return(
        <tr>
            <td>{vehicle.regNo}</td>
            <td>{vehicle.make}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.modelYear}</td>
        </tr>
    )
}

export default VehicleItem;