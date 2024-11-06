import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRecetas } from "./../api/recetas.api";

export function RecetasList() {
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        async function loadRecetas() {
            const response = await getAllRecetas();
            console.log(response);
            setRecetas(response.data);
        }
        loadRecetas();
       
    }, []);

    return (
        <div>
            <h1>Recetas</h1>
            <Link to="/recetas-add">Agregar una nueva receta</Link>
            {recetas.map((receta) => (
                <div key={receta.id_recetas}>
                    <h2>{receta.nombre_receta}</h2>
                    <p>{receta.descripcion}</p>
                    <p>{receta.porciones} porciones</p>
                    <Link to={`/recetas/${receta.id_recetas}`}>Ver receta</Link>
                    <hr />
                </div>
                ))}
        </div>
    );
}
