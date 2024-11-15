import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRecetaIngredientes } from "../api/recetaIngrediente.api";
import { getAllRecetas } from "../api/recetas.api";  // Importa la API de recetas
import { getAllIngredientes } from "../api/ingrediente.api";  // Importa la API de ingredientes
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function RecetaIngredienteList() {
    const [recetasIngredientes, setRecetasIngredientes] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            const recetasResponse = await getAllRecetas();
            const ingredientesResponse = await getAllIngredientes();
            const recetaIngredienteResponse = await getAllRecetaIngredientes();
            
            setRecetas(recetasResponse.data);
            setIngredientes(ingredientesResponse.data);
            setRecetasIngredientes(recetaIngredienteResponse.data);
        }
        loadData();
    }, []);

    // Función para obtener el nombre de la receta por su ID
    const getRecetaNameById = (id) => {
        const receta = recetas.find((receta) => receta.id_recetas === id);
        return receta ? receta.nombre_receta : 'Desconocida';
    };

    // Función para obtener el nombre del ingrediente por su ID
    const getIngredienteNameById = (id) => {
        const ingrediente = ingredientes.find((ingrediente) => ingrediente.id_ingrediente === id);
        return ingrediente ? ingrediente.nombre_ingrediente : 'Desconocido';
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h1>Recetas-Ingredientes</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-7">
                    <Link className="btn btn-warning" to="/recetaIngrediente-add">Agregar una nueva relación receta-ingrediente</Link>
                </div>
            </div>

            <div className="row">
                {recetasIngredientes.map(recetaIngrediente => (
                    <div className="col-md-4 mt-3" key={recetaIngrediente.id_receta_ingredientes} 
                        onClick={() => navigate('/recetaIngrediente/' + recetaIngrediente.id_receta_ingredientes)}>
                        
                        <Card>
                            <Card.Body>
                                <Card.Title>Receta: {getRecetaNameById(recetaIngrediente.id_recetas)}</Card.Title>
                                <Card.Text>Ingrediente: {getIngredienteNameById(recetaIngrediente.id_ingredientes)}</Card.Text>
                                <Card.Text>Cantidades: {recetaIngrediente.cantidades}</Card.Text>
                                <Button variant="primary">Ver Detalles</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecetaIngredienteList;
