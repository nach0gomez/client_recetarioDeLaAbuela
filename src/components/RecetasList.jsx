import { useEffect, useState } from "react";
import { getAllRecetas } from "./../api/recetas.api";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';

export function RecetasList() {
    const [recetas, setRecetas] = useState([]);
    const navigate= useNavigate()

    useEffect(() => {
        async function loadRecetas() {
            const response = await getAllRecetas();
            console.log(response);
            setRecetas(response.data);
        }
        loadRecetas();
       
    }, []);

    return (


        <>

            

            <Container>

                <div className="row">
            
                    <div className="col-md-2">
                        <h1>Recetas</h1>
                    </div>
                    {/*<div className="col-md-3">
                        <Link className="btn btn-info" to="/recetas-add">Agregar una nueva receta</Link>
                    </div>*/}
                </div>
                
                <div className="row">

                
                        
                    
                        {recetas.map(receta => (<div className="col-md-4 mt-3" key={receta.id_recetas} 
                                                    onClick={()=>navigate('/recetas/'+receta.id_recetas)}>
                                {/*<h1>{receta.nombre}</h1>
                                <h3>{receta.descripcion}</h3>
                                <h5>{receta.porciones}</h5>
                                <img src={receta.imagen} width="50px"/>*/}
                                
                                <Card >
                                    <Card.Img variant="top" src={receta.imagen} width="30px" height="150px"/>
                                    <Card.Body>
                                        <Card.Title>{receta.nombre_receta}</Card.Title>
                                        <Card.Text>{receta.descripcion}</Card.Text>
                                        <Card.Text>Porciones: {receta.porciones}</Card.Text>
                                        
                                        <Button variant="primary">Ver Detalles</Button>
                                    </Card.Body>
                                </Card>


                                
                            </div>
                            
                        ))}
                    

                
                    
                </div>
            </Container>

            {/*<div>
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
            </div>*/}
        </>
    );
}
