import { Link } from "react-router-dom"

export function Navigation() {
  return (
    <div>
        <Link to="/recetas">
            <h1>Aplicacion de Recetas</h1>
        </Link>
        <Link to="/recetas-add">Agregar una nueva receta</Link>
        <Link to="/ingredientes">Ver Ingredientes</Link>
        <Link to="/ingredientes-add">Agregar un nuevo ingrediente</Link>
    </div>
  )
}