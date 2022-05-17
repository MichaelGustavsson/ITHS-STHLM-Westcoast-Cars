using System.ComponentModel.DataAnnotations;

namespace razorApp.ViewModels
{
    public class CreateVehicleViewModel
    {
        [Display(Name = "Registreringsnummer")]
        public string RegNo { get; set; }
        [Display(Name = "Tillverkare")]
        public string Make { get; set; }
        [Display(Name = "Modell")]
        public string Model { get; set; }
        [Display(Name = "Modell År")]
        public int ModelYear { get; set; }
        [Display(Name = "Antal Km")]
        public int Mileage { get; set; }
        [Display(Name = "Bild Url")]
        public string ImageUrl { get; set; }
        [Display(Name = "Beskrivning")]
        public string Description { get; set; }
        [Display(Name = "Pris")]
        public int Value { get; set; }
    }
}