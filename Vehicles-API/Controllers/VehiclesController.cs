using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Vehicles_API.Interfaces;
using Vehicles_API.Models;
using Vehicles_API.ViewModels;

namespace Vehicles_API.Controllers
{
  [ApiController]
  [Route("api/v1/vehicles")]
  public class VehiclesController : ControllerBase
  {
    // Deklarera en referens variabel för att hålla en konkret instans av en klass
    // som implementer interface IVehicleRepository
    private readonly IVehicleRepository _vehicleRepo;

    // Skapa en konstruktor med dependency injicering av en implementering av interface IVehicleRepository
    public VehiclesController(IVehicleRepository vehicleRepo)
    {
      _vehicleRepo = vehicleRepo;
    }

    //Skapa en endpoint som lyssnar efter url anrop api/v1/vehicles/list
    [HttpGet("list")]
    [Authorize()]
    public async Task<ActionResult<List<VehicleViewModel>>> ListVehicles()
    {
      // Anropa metoden ListAllVehiclesAsync i vårt repository.
      return Ok(await _vehicleRepo.ListAllVehiclesAsync());
    }

    // [HttpGet("list")]
    // public async Task<ActionResult<ResponseViewModel>> ListVehicles()
    // {
    //   // Anropa metoden ListAllVehiclesAsync i vårt repository.
    //   var data = await _vehicleRepo.ListAllVehiclesAsync();
    //   var jsonString = JsonSerializer.Serialize(data);

    //   var response = new ResponseViewModel{
    //     Data = jsonString,
    //     StatusCode = 200,
    //     Count = data.Count,
    //     PageNumber = 1,
    //     PageSize = 50
    //   };

    //   return response;
    // }

    // Skapa en endpoint som lyssnar efter url anrop api/v1/vehicles/id
    [HttpGet("{id}")]    
    public async Task<ActionResult<VehicleViewModel>> GetVehicleById(int id)
    {
      // Anropa metoden GetVehiclesAsync i vårt repository
      var response = await _vehicleRepo.GetVehicleAsync(id);

      // Kontroller om vi inte har fått någon bil eller fordon tillbaka
      if (response is null)
        // I så fall returnera ett 404 NotFound meddelande
        return NotFound($"Vi kunde inte hitta någon bil med id: {id}");

      // Annars returnera bilen eller fordonet
      return Ok(response);
    }

    // Skapa en endpoint som lyssnar efter url anrop api/v1/vehicles/byregno/regNo
    // Detta gör vi för att REST inte kan hantera överlagrade metoder.
    // Utan istället får vi bygga ut vår endpoint
    [HttpGet("byregno/{regNo}")]
    public async Task<ActionResult<Vehicle>> GetVehicleByRegNo(string regNo)
    {
      // Anropa metoden GetVehicleAsync i vårt repository och skicka med regNo
      var response = await _vehicleRepo.GetVehicleAsync(regNo);

      // Kontroller om vi inte har fått någon bil eller fordon tillbaka
      if (response is null)
        // I så fall returnera ett 404 NotFound meddelande
        return NotFound($"Vi kunde inte hitta någon bil med registreringsnummer: {regNo}");

      // Annars returnera bilen eller fordonet
      return Ok(response);
    }

    // Skapa en endpoint som lyssnar efter url anrop api/v1/vehicles?make=tillverkare
    // Detta gör vi för att visa att vi kan hantera QueryString anrop
    // i våra endpoints
    // Observera att vi använder [FromQuery] framför argumentet i metoden.
    [HttpGet()]
    public async Task<ActionResult<List<VehicleViewModel>>> GetVehiclesByMake([FromQuery] string make)
    {
      // Här gör vi en One-Liner och hämtar alla bilar som en tillverkare har i 
      // vårt system...
      return Ok(await _vehicleRepo.GetVehicleByMakeAsync(make));
    }

    // Skapa en endpoint som lyssnar på POST anrop för att lägga till en ny bil/fordon.
    // Metoden tar som argument en instans av Vy modellen PostVehicleViewModel
    [HttpPost()]
    public async Task<ActionResult> AddVehicle(PostVehicleViewModel model)
    {
      // Vi kapslar anropet i ett try...catch block på grund av att vi 
      // eventuellt kan få ett ohanterat exception kastat ifrån
      // EntityFrameworkCore om t ex databasen inte svarar eller om 
      // något annat fel inträffar vid skrivning till databasen...
      try
      {

        // Vi gör här en kontroll om bilen redan existerar i systemet.
        // Detta kan vi refaktorera och kanske placera i repository metoden
        // AddVehicleAsync...
        if (await _vehicleRepo.GetVehicleAsync(model.RegNo!.ToLower()) is not null)
        {
          // Om vi hamnar här så existerar bilen/fordonet redan i systemet.
          // Så vi returnerar ett 400 BadRequest meddelande.
          var error = new ErrorViewModel{
            StatusCode = 400,
            StatusText = $"Registreringsnummer {model.RegNo} finns redan i systemet"
          };
          
          return BadRequest(error);
        }

        // Annars anropa metoden AddVehicleAsync i vårt repository och lägg till bilen/fordonet i EntityFrameworkCore's ChangeTracking.
        await _vehicleRepo.AddVehicleAsync(model);

        // Anropa metoden SaveAllAsync i vårt repository för att spara ner ändringar i databasen.
        if (await _vehicleRepo.SaveAllAsync())
        {
          // Returnera statuskoden 201(Created)
          return StatusCode(201);
        }

        // Om det inte gick att spara returnera ett server fel(500).
        return StatusCode(500, "Det gick inte att spara fordonet");
      }
      catch (Exception ex)
      {
        // Om vi hamnar här så betyder det att ett fel har inträffat
        // som inte är hanterat nedåt i anropskedjan(stacken).
        // Därför returnerar vi ett server fel(500 Internal Server Error).
        var error = new ErrorViewModel{
            StatusCode = 500,
            StatusText = ex.Message
          };
        return StatusCode(500, error);
      }
    }

    // Skapa en endpoint som lyssnar på PUT anrop url: api/v1/vehicles/id
    // för att kunna uppdatera en befintlig bil eller fordon.
    // Skicka med datat som skall uppdateras i metodens anrop i vårt fall en instans av
    // PostVehicleViewModel klassen.
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateVehicle(int id, PostVehicleViewModel model)
    {
      // Kapsla hela anropet i ett try...catch block
      // Anledningen är att metoden i vårt repository kastar ett exception om vi inte kan hitta bilen
      // som skall uppdateras...
      try
      {
        await _vehicleRepo.UpdateVehicleAsync(id, model);

        // Glöm inte att anropa SaveAllAsync för att spara ner ändringarna till databasen.
        if (await _vehicleRepo.SaveAllAsync())
        {
          // Om allt gick bra returnera status kod 204(NoContent), vi har inget att rapportera
          return NoContent(); //Status kod 204...
        }

        // Annars returnera status kod 500 (Internal Server Error)
        return StatusCode(500, "Ett fel inträffade när fordonet skulle uppdateras");

      }
      catch (Exception ex)
      {
        // Om vi hamnar här så har ett exception kastats ifrån metoden i vårt repository
        // och vi returnerar ett Internal Server Error meddelande.
        return StatusCode(500, ex.Message);
      }
    }

    // Skapa en endpoint som lyssnar på PATCH anrop url: api/v1/vehicles/id
    // för att kunna göra en mindre uppdatering av en befintlig bil eller fordon.
    // Skicka med datat som skall uppdateras i metodens anrop i vårt fall en instans av
    // PatchVehicleViewModel klassen.
    [HttpPatch("{id}")]
    public async Task<ActionResult> UpdateVehicle(int id, PatchVehicleViewModel model)
    {
      // Kapsla hela anropet i ett try...catch block
      // Anledningen är att metoden i vårt repository kastar ett exception om vi inte kan hitta bilen
      // som skall uppdateras...
      try
      {
        await _vehicleRepo.UpdateVehicleAsync(id, model);

        // Glöm inte att anropa SaveAllAsync för att spara ner ändringarna till databasen.
        if (await _vehicleRepo.SaveAllAsync())
        {
          // Om allt gick bra returnera status kod 204(NoContent), vi har inget att rapportera
          return NoContent();
        }

        // Annars returnera status kod 500 (Internal Server Error)
        return StatusCode(500, "Ett fel inträffade när fordonet skulle uppdateras");

      }
      catch (Exception ex)
      {
        // Om vi hamnar här så har ett exception kastats ifrån metoden i vårt repository
        // och vi returnerar ett Internal Server Error meddelande.
        return StatusCode(500, ex.Message);
      }
    }

    // Skapa en endpoint som lyssnar på DELETE anrop url: api/v1/vehicles/id
    // för att kunna ta bort en bil eller fordon ur systemet och databasen.
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteVehicle(int id)
    {
      // Kapsla hela anropet i ett try...catch block
      // Anledningen är att metoden i vårt repository kastar ett exception om vi inte kan hitta bilen
      // som skall tas bort...
      try
      {
        await _vehicleRepo.DeleteVehicleAsync(id);

        // Glöm inte att anropa SaveAllAsync för att spara ner ändringarna till databasen.
        if (await _vehicleRepo.SaveAllAsync())
        {
          // Om allt gick bra returnera status kod 204(NoContent), vi har inget att rapportera
          return NoContent();
        }

        // Annars returnera status kod 500 (Internal Server Error)
        return StatusCode(500, "Hoppsan något gick fel");
      }
      catch (Exception ex)
      {
        // Om vi hamnar här så har ett exception kastats ifrån metoden i vårt repository
        // och vi returnerar ett Internal Server Error meddelande.
        return StatusCode(500, ex.Message);
      }
    }
  }
}