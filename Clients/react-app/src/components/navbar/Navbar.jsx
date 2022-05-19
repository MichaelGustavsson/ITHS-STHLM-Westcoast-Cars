import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav id='navbar'>
      <h1 className='logo'>
        <span className='text-primary'>
          <i className='fas fa-car'></i> Westcoast
        </span>
        Cars
      </h1>
      <ul>
        <li>
          <NavLink to='/'>Start sida</NavLink>
          <NavLink to='/list'>Lager fordon</NavLink>
          <NavLink to='/add'>Lägg till fordon</NavLink>
          <NavLink to='/login'>Logga in</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
