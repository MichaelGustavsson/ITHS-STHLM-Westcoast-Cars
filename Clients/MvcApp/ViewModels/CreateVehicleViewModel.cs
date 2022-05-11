using System.ComponentModel.DataAnnotations;

namespace MvcApp.ViewModels
{
  public class CreateVehicleViewModel
  {
    [Required(ErrorMessage = "Registreringsnummer är obligatoriskt")]
    [Display(Name = "Registeringsnummer")]
    public string? RegNo { get; set; }
    [Required(ErrorMessage = "Tillverkare är obligatoriskt")]
    [Display(Name = "Tillverkare")]
    public string? Make { get; set; }
    [Required(ErrorMessage = "Modell är obligatoriskt")]
    [Display(Name = "Bil modell")]
    public string? Model { get; set; }
    [Required(ErrorMessage = "Modell År är obligatoriskt")]
    [Display(Name = "Modell år")]
    public int ModelYear { get; set; }
    [Required(ErrorMessage = "Antal Km är obligatoriskt")]
    [Display(Name = "Antal körda Km")]
    public int Mileage { get; set; }
    [Required(ErrorMessage = "Bild är obligatoriskt")]
    [Display(Name = "Skicka upp en bild")]
    public string? ImageUrl { get; set; }
    [Required(ErrorMessage = "Beskrivning av bilen är obligatoriskt")]
    [Display(Name = "Information/Beskrivning")]
    public string? Description { get; set; }
    [Required(ErrorMessage = "Priset är obligatoriskt")]
    [Display(Name = "Priset")]
    public int Value { get; set; }
  }
}