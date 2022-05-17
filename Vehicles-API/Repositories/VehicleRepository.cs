using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Vehicles_API.Data;
using Vehicles_API.Interfaces;
using Vehicles_API.Models;
using Vehicles_API.ViewModels;

namespace Vehicles_API.Repositories
{
  public class VehicleRepository : IVehicleRepository
  {
    private readonly VehicleContext _context;
    private readonly IMapper _mapper;

    // Injicera vårt data context och IMapper i konstruktorn
    public VehicleRepository(VehicleContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public async Task AddVehicleAsync(PostVehicleViewModel model)
    {
      // Steg 1. Omvandla PostVehicleViewModel till Vehicle typen..
      var make = await _context.Manufacturers.Include(c => c.Vehicles).Where(c => c.Name!.ToLower() == model.Make!.ToLower()).SingleOrDefaultAsync();

      if (make is null)
      {
        // Jag kastar ett fel uppåt i stacken(till min VehicleController metod AddVehicle)
        // Mottagarens ansvar att hantera detta. "Unhandled Exception"...
        throw new Exception($"Tyvärr vi har inte tillverkaren {model.Make} i systemet.");
      }

      var vehicleToAdd = _mapper.Map<Vehicle>(model);
      vehicleToAdd.Manufacturer = make;

      await _context.Vehicles.AddAsync(vehicleToAdd);
    }

    public async Task DeleteVehicleAsync(int id)
    {
      var response = await _context.Vehicles.FindAsync(id);

      if (response is null)
      {
        throw new Exception($"Vi kunde inte hitta någon bil med id {id}");
      }

      if (response is not null)
      {
        _context.Vehicles.Remove(response);
      }
    }

    public async Task<VehicleViewModel?> GetVehicleAsync(int id)
    {
      return await _context.Vehicles.Where(c => c.Id == id)
          .ProjectTo<VehicleViewModel>(_mapper.ConfigurationProvider)
          .SingleOrDefaultAsync();
    }

    public async Task<VehicleViewModel?> GetVehicleAsync(string regNumber)
    {
      return await _context.Vehicles.Where(c => c.RegNo!.ToLower() == regNumber.ToLower())
      .ProjectTo<VehicleViewModel>(_mapper.ConfigurationProvider)
          .SingleOrDefaultAsync();
    }

    public async Task<List<VehicleViewModel>> GetVehicleByMakeAsync(string make)
    {
      return await _context.Vehicles.Include(v => v.Manufacturer)
        .Where(c => c.Manufacturer.Name!.ToLower() == make.ToLower())
        .ProjectTo<VehicleViewModel>(_mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<List<VehicleViewModel>> ListAllVehiclesAsync()
    {
      return await _context.Vehicles.ProjectTo<VehicleViewModel>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
      return await _context.SaveChangesAsync() > 0;
    }

    public async Task UpdateVehicleAsync(int id, PostVehicleViewModel model)
    {
      // Steg 1. Försök hämta bilen på dess id...
      var vehicle = await _context.Vehicles.FindAsync(id);

      if (vehicle is null)
      {
        throw new Exception($"Vi kunde inte hitta något fordon med id: {id}");
      }

      // _mapper.Map<PostVehicleViewModel, Vehicle>(model, vehicle);
      vehicle.RegNo = model.RegNo;
      // vehicle.Make = model.Make;
      vehicle.Model = model.Model;
      vehicle.ModelYear = model.ModelYear;
      vehicle.Mileage = model.Mileage;
      vehicle.Value = model.Value;
      vehicle.Description = model.Description;
      vehicle.ImageUrl = model.ImageUrl;

      _context.Vehicles.Update(vehicle);
    }

    public async Task UpdateVehicleAsync(int id, PatchVehicleViewModel model)
    {
      // Steg 1. Försök hämta bilen på dess id...
      var vehicle = await _context.Vehicles.FindAsync(id);

      if (vehicle is null)
      {
        throw new Exception($"Vi kunde inte hitta något fordon med id: {id}");
      }

      vehicle.ModelYear = model.ModelYear;
      vehicle.Mileage = model.Mileage;

      _context.Vehicles.Update(vehicle);
    }
  }
}