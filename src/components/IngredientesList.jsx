import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllIngredientes } from "../api/ingrediente.api";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export function IngredientesList() {
    const [ingredientes, setIngredientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadIngredientes() {
            const response = await getAllIngredientes();
            console.log(response);
            setIngredientes(response.data);
        }
        loadIngredientes();
       
    }, []);

    return (

        <>
            {/*<div>
                <h1>Recetas</h1>
                <Link to="/ingredientes-add">Agregar un nuevo ingrediente</Link>
                {ingredientes.map((ingrediente) => (
                    <div key={ingrediente.id_ingrediente}>
                        <h2>{ingrediente.nombre_ingrediente}</h2>
                        <Link to={`/ingredientes/${ingrediente.id_ingrediente}`}>Ver Ingrediente</Link>
                        <hr />
                    </div>
                    ))}
            </div>*/}

            


            

            <div className="container">

                <div className="row">

                    <div className="col-md-2">
                        <h1>Ingredientes</h1>
                    </div>
                    
                </div>

                <div className="row">

                    {<div className="col-md-3">
                        <Link className="btn btn-info" to="/ingredientes-add">Agregar un nuevo ingrediente</Link>
                    </div>}
                </div>

                <div className="row">
                        
                    
                    {ingredientes.map(ingrediente => (<div className="col-md-4 mt-3" key={ingrediente.id_ingrediente} 
                                                onClick={()=>navigate('/ingredientes/'+ingrediente.id_ingrediente)}>
                            {/*<h1>{receta.nombre}</h1>
                            <h3>{receta.descripcion}</h3>
                            <h5>{receta.porciones}</h5>
                            <img src={receta.imagen} width="50px"/>*/}
                            
                            <Card >
                                <Card.Img variant="top" src="{ingrediente.imagen}" width="30px" height="150px"/>
                                <Card.Body>
                                    <Card.Title>Id Ingrediente: {ingrediente.id_ingrediente}</Card.Title>
                                    <Card.Text>Nombre Ingrediente: {ingrediente.nombre_ingrediente}</Card.Text>
                                    
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
