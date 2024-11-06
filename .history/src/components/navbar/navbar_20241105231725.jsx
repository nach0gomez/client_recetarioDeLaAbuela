import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './navbar.css';

export const Navbar = () => {


  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Cambia a true después de 50px de desplazamiento
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener al desmontar el componente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      {/* Logo */}
      <div className="navbar-logo">
        <img src="/src/assets/Image 97.png" alt="Logo" className="logo-icon" />
        <h1>Recetario de la Abuela</h1>
      </div>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="🔍 Buscar receta" />
      </div>

      {/* Enlaces de navegación */}
      <ul className="navbar-links">
        <li><Link to="/profile">Mi Perfil</Link></li>
        <li><Link to="/gallery" className="highlight">Galería de Recetas</Link></li>
        <li><Link to="/create">Crear mis recetas</Link></li>
      </ul>

      {/* Botón de Logout y foto de perfil */}
      <div className="navbar-actions">
        <button className="logout-button">Cerrar Sesión   <FontAwesomeIcon className='icono' icon={faSignOut} /></button>
        <img src="/src/assets/Avatar 25.png" alt="Profile" className="profile-picture" />
      </div>
    </nav>
  );
}

