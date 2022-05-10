using System.Text.Json.Serialization;

namespace MvcApp.ViewModels
{
  public class VehicleViewModel
  {
    public int VehicleId { get; set; }
    public string? RegNo { get; set; }
    public string? VehicleName { get; set; }
    public int ModelYear { get; set; }
    public int Mileage { get; set; }
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
    public int Value { get; set; }
  }
}