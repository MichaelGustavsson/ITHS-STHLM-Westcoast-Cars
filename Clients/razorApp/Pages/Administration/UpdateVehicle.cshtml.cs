using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using razorApp.ViewModels;

namespace razorApp.Pages.Administration
{
    public class UpdateVehicle : PageModel
    {
        private readonly ILogger<UpdateVehicle> _logger;
        private readonly string _baseUrl;
        private readonly HttpClient _http;
        private readonly IConfiguration _config;

        [BindProperty]
        public UpdateVehicleViewModel VehicleModel { get; set; }
        public UpdateVehicle(ILogger<UpdateVehicle> logger, IConfiguration config)
        {
            _config = config;
            _logger = logger;
            _baseUrl = _config.GetValue<string>("baseUrl");
            _http = new HttpClient();
        }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            var url = $"{_baseUrl}/vehicles/{id}";

            var vehicle = await _http.GetFromJsonAsync<VehicleViewModel>(url);

            var vehicleToUpdate = new UpdateVehicleViewModel
            {
                VehicleId = vehicle.VehicleId,
                RegNo = vehicle.RegNo,
                Make = vehicle.VehicleName.Split(" ")[0],
                Model = vehicle.VehicleName.Split(" ")[1],
                ModelYear = vehicle.ModelYear,
                Mileage = vehicle.Mileage,
                Description = vehicle.Description,
                ImageUrl = vehicle.ImageUrl,
                Value = vehicle.Value
            };

            VehicleModel = vehicleToUpdate;

            _http.Dispose();

            return Page();
        }

        public async Task OnPostAsync()
        {

            var url = $"{_baseUrl}/vehicles/{VehicleModel.VehicleId}";

            var response = await _http.PutAsJsonAsync(url, VehicleModel);

            if (!response.IsSuccessStatusCode)
            {
                string reason = await response.Content.ReadAsStringAsync();
                Console.WriteLine(reason);
            }
        }
    }
}