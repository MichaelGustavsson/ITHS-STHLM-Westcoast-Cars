using Microsoft.AspNetCore.Mvc;
using MvcApp.Models;

namespace MvcApp.Controllers
{
  [Route("[controller]")]
  public class VehiclesController : Controller
  {
    private readonly IConfiguration _config;
    public VehiclesController(IConfiguration config)
    {
      _config = config;
    }

    [HttpGet()]
    public async Task<IActionResult> Index()
    {
      try
      {
        var vehicleService = new VehicleServiceModel(_config);

        var vehicles = await vehicleService.ListAllVehicles();
        return View("Index", vehicles);
      }
      catch (System.Exception)
      {

        throw;
      }

    }
  }
}