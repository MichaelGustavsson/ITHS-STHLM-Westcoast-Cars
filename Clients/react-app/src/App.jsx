// Importera VehicleList som då representerar tabellen av bilar...
import VehicleList from "./Vehicles/VehicleList";
// Min första komponent
// JavaScript funktioner, det går att använda
// JavaScript klasser, men ingen gör detta längre
// i nya projekt...
// Steg 1. Skapa funktionen
function App(){

    // Steg 2. returnera JSX(html med eventuella dynamiska skript...)
    return (
        <main>
            <h1 className="page-title">Administrera bilar</h1>       
            <VehicleList/>
        </main>
    )
}

// Steg 3. exportera komponenten(funktionen)
export default App;