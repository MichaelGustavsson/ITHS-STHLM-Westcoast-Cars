using Microsoft.AspNetCore.Mvc;
using MvcApp.Models;
using MvcApp.ViewModels;

namespace MvcApp.Controllers
{
  [Route("[controller]")]
  public class VehiclesController : Controller
  {
    private readonly IConfiguration _config;
    private readonly VehicleServiceModel _vehicleService;

    public VehiclesController(IConfiguration config)
    {
      _config = config;
      _vehicleService = new VehicleServiceModel(_config);
    }

    [HttpGet()]
    public async Task<IActionResult> Index()
    {
      try
      {
        // var vehicleService = new VehicleServiceModel(_config);

        var vehicles = await _vehicleService.ListAllVehicles();
        return View("Index", vehicles);
      }
      catch (System.Exception)
      {

        throw;
      }
    }

    // Create metod för HttpGet har som syfte att skapa ett objekt
    // Som vi skickar till en vy som skall presentera ett inmatningsformulär...
    [HttpGet("Create")]
    public IActionResult Create()
    {
      // Här måste vi skapa en instans av vy modellen CreateViewModel
      var vehicle = new CreateVehicleViewModel();
      return View("Create", vehicle);
    }

    // Fungera som mottagare av formulärets data
    [HttpPost("Create")]
    public async Task<IActionResult> Create(CreateVehicleViewModel vehicle)
    {
      // Här kommer vi att kontakta vårt API och spara ner bilen i databasen.

      //Kontrollera så att allt data är medskickat är med...
      if (!ModelState.IsValid)
      {
        return View("Create", vehicle);
      }

      //Måste vi anropa vårt API för att spara bilen...
      // var vehicleService = new VehicleServiceModel(_config);

      if (await _vehicleService.CreateVehicle(vehicle))
      {
        return View("Confirmation");
      }

      return View("Create", vehicle);
    }

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(int id)
    {
      try
      {
        // Hämta den specika bilen ifrån vårt API...
        // var vehicleService = new VehicleServiceModel(_config);
        var vehicle = await _vehicleService.FindVehicle(id);
        return View("Details", vehicle);
      }
      catch (Exception ex)
      {
        //Vi bör returnera en felsida med information
        //Return View("Error", errorObject);
        //Eller skapa en ViewBag t ex ViewBag.ErrorMessage = ???
        //Returnera vyn Details och titta på om ErrorMessage innehåller någon information
        //Glöm inte att kontrollera så att ErrorMessage egenskapen existerar på ViewBag objektet...
        Console.WriteLine(ex.Message);
        return View("Error");
      }
    }
  }

}