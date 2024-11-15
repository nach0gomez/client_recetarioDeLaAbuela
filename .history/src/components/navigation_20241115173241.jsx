import { Link, Navigate, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useAuth } from "../context/AuthContext";
import Logout from "./login/Logout";



export function Navigation() {
  const { isAuth, deleteToken } = useAuth();
  const navigate = useNavigate();

  function logout() {
    deleteToken();
    navigate('login');
  }
  

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary mb-7">
        <Navbar.Brand href="/recetas">
          <img src="http://127.0.0.1:8000/media/front/logo_titulo.png" alt="Logo" width="100%"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/recetas-add" className="btn btn-info">Agregar una nueva receta</Nav.Link>
            <NavDropdown title="Admin-Favoritos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/favoritos-add">Agregar un nuevo favorito</NavDropdown.Item>
              <NavDropdown.Item href="/favoritos">Ver favoritos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Admin-Ingredientes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/ingredientes-add">Agregar un nuevo ingrediente</NavDropdown.Item>
              <NavDropdown.Item href="/ingredientes">Ver Ingredientes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Admin-RecetaIngrediente" id="basic-nav-dropdown">
              <NavDropdown.Item href="/recetaIngrediente-add">Agregar un nuevo vinculo recetas-ingredientes</NavDropdown.Item>
              <NavDropdown.Item href="/recetaIngrediente">Ver recetas-ingredientes</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {isAuth ? (
            <Button className="btn-secondary" onClick={logout}>Logout</Button>
          ) : (
            <>
              <Nav.Link href="login"><Button className="btn-secondary mr-2">Login</Button></Nav.Link>
              <Nav.Link href="register"><Button className="btn-primary mx-2">Register</Button></Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}






{/*
import { Link } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";


export function Navigation() {

  const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (localStorage.getItem(ACCESS_TOKEN) !== null) {
        setIsAuth(true); 
      }
    }, []);

  
  const handleLogout = ()=> {
    setIsAuth(false)
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary mb-7">
        <Navbar.Brand href="/recetas">
          <img src="http://127.0.0.1:8000/media/front/logo_titulo.png" alt="Logo" width="100%"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/recetas-add" className="btn btn-info">Agregar una nueva receta</Nav.Link>
            <NavDropdown title="Admin-Favoritos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/favoritos-add">Agregar un nuevo favorito</NavDropdown.Item>
              <NavDropdown.Item href="/favoritos">Ver favoritos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Admin-Ingredientes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/ingredientes-add">Agregar un nuevo ingrediente</NavDropdown.Item>
              <NavDropdown.Item href="/ingredientes">Ver Ingredientes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Admin-RecetaIngrediente" id="basic-nav-dropdown">
              <NavDropdown.Item href="/recetaIngrediente-add">Agregar un nuevo vinculo recetas-ingredientes</NavDropdown.Item>
              <NavDropdown.Item href="/recetaIngrediente">Ver recetas-ingredientes</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {isAuth ? (
            <>
              <Nav.Link href="logout"><Button className="btn-secondary" onClick={handleLogout}>Logout</Button></Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="login"><Button className="btn-secondary">Login</Button></Nav.Link>
              <Nav.Link href="register"><Button className="btn-primary">Register</Button></Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}


  *return (
    <>
        <Navbar fixed="" expand="lg" className="bg-body-tertiary mb-7">
          {/*<Container>*
            <Navbar.Brand href="/recetas"><img src="http://127.0.0.1:8000/media/front/logo_titulo.png" alt="Girl in a jacket" width="100%"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/*<Nav.Link href="#home">Home</Nav.Link>*
                <Nav.Link href="/recetas-add" className="btn btn-info">Agregar una nueva receta</Nav.Link>
                <NavDropdown title="Admin-Favoritos" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/favoritos-add">Agregar un nuevo favorito</NavDropdown.Item>
                  <NavDropdown.Item href="/favoritos">
                    Ver favoritos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Admin-Ingredientes" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/ingredientes-add">Agregar un nuevo ingrediente</NavDropdown.Item>
                  <NavDropdown.Item href="/ingredientes">
                    Ver Ingredientes
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Admin-RecetaIngrediente" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/recetaIngrediente-add">Agregar un nuevo vinculo recetas-ingredientes</NavDropdown.Item>
                  <NavDropdown.Item href="/recetaIngrediente">
                    Ver recetas-ingredientes
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>


                <Nav.Link href="login"><Button className="btn-secondary" type="submit">Submit</Button></Nav.Link>
                <Nav.Link href="register"><Button className="btn-primary" type="submit">Register</Button></Nav.Link>

                {/*<Nav>
                {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                          <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>*
              
            </Navbar.Collapse>

          {/*</Container>

          <Form inline>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form>*
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button className="btn-secondary" type="submit">Submit</Button>
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>*

        </Navbar>

        {/*<div>
            <Link to="/recetas">
                <h1>Aplicacion de Recetas</h1>
            </Link>
            <Link to="/recetas-add">Agregar una nueva receta</Link>
            <Link to="/ingredientes">Ver Ingredientes</Link>
            <Link to="/ingredientes-add">Agregar un nuevo ingrediente</Link>
            <Link to="/favoritos">Ver favoritos</Link>
            <Link to="/favoritos-add">Agregar un nuevo favorito</Link>
            <Link to="/recetaIngrediente">Ver recetas-ingredientes</Link>
            <Link to="/recetaIngrediente-add">Agregar un nuevo vinculo recetas-ingredientes</Link>
        </div>*

        
    </>
  )
}*/}