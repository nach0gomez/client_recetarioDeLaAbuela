// Navbar.js
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src="/path/to/logo.png" alt="Logo" className="logo-icon" />
        <h1>Recetario de la abuela</h1>
      </div>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="🔍 Find Recipes by Ingredient" />
      </div>

      {/* Enlaces de navegación */}
      <ul className="navbar-links">
        <li><Link to="/profile">Mi Perfil</Link></li>
        <li><Link to="/gallery" className="highlight">Galería de Recetas</Link></li>
        <li><Link to="/create">Crear mis recetas</Link></li>
      </ul>

      {/* Botón de Logout y foto de perfil */}
      <div className="navbar-actions">
        <button className="logout-button">Logout ⟳</button>
        <img src="/path/to/profile.jpg" alt="Profile" className="profile-picture" />
      </div>
    </nav>
  );
}

export default Navbar;
