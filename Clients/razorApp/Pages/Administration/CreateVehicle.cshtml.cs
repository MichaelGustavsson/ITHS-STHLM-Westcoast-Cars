using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using razorApp.ViewModels;

namespace razorApp.Pages.Administration
{
    public class CreateVehicle : PageModel
    {
        private readonly ILogger<CreateVehicle> _logger;

        // Model som databinds till codebehind och html presentationen
        [BindProperty]
        public CreateVehicleViewModel VehicleModel { get; set; }
        private readonly IConfiguration _config;

        public CreateVehicle(ILogger<CreateVehicle> logger, IConfiguration config)
        {
            _config = config;
            _logger = logger;
        }

        public void OnGet()
        {
        }

        public async Task OnPostAsync(){
            using var http = new HttpClient();

            var baseUrl = _config.GetValue<string>("baseUrl");
            var url = $"{baseUrl}/vehicles";
            var response = await http.PostAsJsonAsync(url, VehicleModel);

            if(!response.IsSuccessStatusCode){
                string reason = await response.Content.ReadAsStringAsync();
                Console.WriteLine(reason);
            }
        }
    }
}