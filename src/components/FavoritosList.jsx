import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllFavoritos } from "../api/favoritos.api";
import { getAllRecetas } from "../api/recetas.api"; // Importa la API de recetas
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function FavoritosList() {
    const [favoritos, setFavoritos] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            const favoritosResponse = await getAllFavoritos();
            const recetasResponse = await getAllRecetas();
            
            setFavoritos(favoritosResponse.data);
            setRecetas(recetasResponse.data);
        }
        loadData();
    }, []);

    // Función para obtener el nombre de la receta por su ID
    const getRecetaNameById = (id) => {
        const receta = recetas.find((receta) => receta.id_recetas === id);
        return receta ? receta.nombre_receta : 'Desconocida';
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1>Favoritos</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-7">
                        <Link className="btn btn-info" to="/favoritos-add">Agregar un nuevo favorito</Link>
                    </div>
                </div>

                <div className="row">
                    {favoritos.map((favorito) => (
                        <div className="col-md-4 mt-3" key={favorito.id_favorito} 
                            onClick={() => navigate('/favoritos/' + favorito.id_favorito)}>

                            <Card>
                                <Card.Body>
                                    <Card.Title>Receta: {getRecetaNameById(favorito.id_recetas)}</Card.Title>
                                    <Card.Text>Comensales: {favorito.comensales}</Card.Text>
                                    <Button variant="primary">Ver Detalles</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FavoritosList;
