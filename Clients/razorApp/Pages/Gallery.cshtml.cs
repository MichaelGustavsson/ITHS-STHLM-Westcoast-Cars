using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using razorApp.ViewModels;

namespace razorApp.Pages
{
  public class Gallery : PageModel
  {
    private readonly ILogger<Gallery> _logger;
    private readonly IConfiguration _config;

    [BindProperty]
    public List<VehicleViewModel> Vehicles { get; set; }
    public Gallery(ILogger<Gallery> logger, IConfiguration config)
    {
      _config = config;
      _logger = logger;
    }

    public async Task OnGet()
    {
      var baseUrl = _config.GetValue<string>("baseUrl");
      var url = $"{baseUrl}/vehicles/list";

      using var http = new HttpClient();
      Vehicles = await http.GetFromJsonAsync<List<VehicleViewModel>>(url);
    }
  }
}