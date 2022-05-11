using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using MvcApp.ViewModels;

namespace MvcApp.Models
{
  public class VehicleServiceModel
  {
    private readonly string _baseUrl;
    private readonly JsonSerializerOptions _options;
    private readonly IConfiguration _config;

    public VehicleServiceModel(IConfiguration config)
    {
      _config = config;
      _baseUrl = $"{_config.GetValue<string>("baseUrl")}/vehicles";

      _options = new JsonSerializerOptions
      {
        PropertyNameCaseInsensitive = true
      };
    }

    public async Task<List<VehicleViewModel>> ListAllVehicles()
    {
      var url = $"{_baseUrl}/list";

      using var http = new HttpClient();
      var response = await http.GetAsync(url);

      if (!response.IsSuccessStatusCode)
      {
        throw new Exception("Det gick inget vidare");
      }

      var vehicles = await response.Content.ReadFromJsonAsync<List<VehicleViewModel>>();
      // var result = await response.Content.ReadAsStringAsync();
      // var vehicles = JsonSerializer.Deserialize<List<VehicleViewModel>>(result, _options);

      return vehicles ?? new List<VehicleViewModel>();
    }

    public async Task<VehicleViewModel> FindVehicle(int id)
    {
      var baseUrl = _config.GetValue<string>("baseUrl");
      var url = $"{baseUrl}/vehicles/{id}";

      using var http = new HttpClient();
      var response = await http.GetAsync(url);

      if (!response.IsSuccessStatusCode)
      {
        Console.WriteLine("Det gick inte att hitta bilen");
      }

      var vehicle = await response.Content.ReadFromJsonAsync<VehicleViewModel>();

      return vehicle ?? new VehicleViewModel();
    }

    public async Task<bool> CreateVehicle(CreateVehicleViewModel vehicle)
    {
      using var http = new HttpClient();
      var baseUrl = _config.GetValue<string>("baseUrl");
      var url = $"{baseUrl}/vehicles";

      var response = await http.PostAsJsonAsync(url, vehicle);

      if (!response.IsSuccessStatusCode)
      {
        string reason = await response.Content.ReadAsStringAsync();
        Console.WriteLine(reason);
        return false;
      }

      return true;
    }
  }
}