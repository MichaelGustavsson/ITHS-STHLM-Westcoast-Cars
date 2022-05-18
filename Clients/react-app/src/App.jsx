// Här importerar vi Reacts react-router-dom
// Reacts navigerings motor...
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importera kompenenten Navbar...
import Navbar from './components/navbar/Navbar';
// Importera komponenten Home...
import Home from './components/home/Home';
// Importera VehicleList som då representerar tabellen av bilar...
import VehicleList from './components/Vehicles/VehicleList';

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
        </Routes>
      </main>
    </Router>
  );
}

// Steg 3. exportera komponenten(funktionen)
export default App;
