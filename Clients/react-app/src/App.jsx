// Här importerar vi Reacts react-router-dom
// Reacts navigerings motor...
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importera kompenenten Navbar...
import Navbar from './components/navbar/Navbar';
// Importera komponenten Home...
import Home from './components/home/Home';
// Importera VehicleList som då representerar tabellen av bilar...
import VehicleList from './components/Vehicles/VehicleList';
// Importera AddVehicle komponenten...
import AddVehicle from './components/Vehicles/AddVehicle';
// Importera EditVehicle komponenten...
import EditVehicle from './components/Vehicles/EditVehicles';
// Importera Login komponenten...
import Login from './components/authentication/Login';

// Importera huvud css filerna...
import './utilities.css';
import './styles.css';

// Min första komponent
// JavaScript funktioner, det går att använda
// JavaScript klasser, men ingen gör detta längre
// i nya projekt...
// Steg 1. Skapa funktionen
function App() {
  // Steg 2. returnera JSX(html med eventuella dynamiska skript...)
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/list' element={<VehicleList />} />
          <Route path='/add' element={<AddVehicle />} />
          <Route path='/edit/:id' element={<EditVehicle />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
}

// Steg 3. exportera komponenten(funktionen)
export default App;
