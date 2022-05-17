using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace razorApp.ViewModels
{
    public class UpdateVehicleViewModel : CreateVehicleViewModel
    {
        public int VehicleId { get; set; }
    }
}