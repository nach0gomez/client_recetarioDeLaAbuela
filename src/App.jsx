import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// importamos las paginas y el form
import { RecetasForm } from './pages/RecetasForm'
import { RecetasPagina } from './pages/RecetasPagina'
import { IngredientesPagina } from './pages/IngredientesPagina'
import { IngredientesForm } from './pages/IngredientesForm'
import { FavoritosPagina } from './pages/FavoritosPagina'
import { FavoritosForm } from './pages/FavoritosForm'
import { RecetaIngredientePagina } from './pages/RecetaIngredientePagina'
import { RecetaIngredienteForm } from './pages/RecetaIngredienteForm'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { NoFound } from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

// importamos los componentes
import { Navigation } from './components/navigation'
// import { Navbar } from './components/navbar/navbar'
import './App.css'
import { AuthProvider } from './context/AuthContext';

import { Toaster } from "react-hot-toast"

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
  
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
  
}

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter> 
      {/* <Navbar /> */}
        <Navigation/>
        <Routes>
          {/*<Route path='/' element={< Navigate to ="/recetas"  />} />*/}
          <Route path='/recetas' element={<RecetasPagina/>} />
          <Route path='/recetas/:id' element={<ProtectedRoute><RecetasForm/></ProtectedRoute>} />
          <Route path='/recetas-add' element={<ProtectedRoute><RecetasForm/></ProtectedRoute>} />
          <Route path='/ingredientes' element={<ProtectedRoute><IngredientesPagina/></ProtectedRoute>} />
          <Route path='/ingredientes-add' element={<ProtectedRoute><IngredientesForm/></ProtectedRoute>} />
          <Route path='/ingredientes/:id' element={<ProtectedRoute><IngredientesForm/></ProtectedRoute>} />
          <Route path='/favoritos' element={<ProtectedRoute><FavoritosPagina/></ProtectedRoute>} />
          <Route path='/favoritos-add' element={<ProtectedRoute><FavoritosForm/></ProtectedRoute>} />
          <Route path='/favoritos/:id' element={<ProtectedRoute><FavoritosForm/></ProtectedRoute>} />
          <Route path='/recetaIngrediente' element={<ProtectedRoute><RecetaIngredientePagina/></ProtectedRoute>} />
          <Route path='/recetaIngrediente-add' element={<ProtectedRoute><RecetaIngredienteForm/></ProtectedRoute>} />
          <Route path='/recetaIngrediente/:id' element={<ProtectedRoute><RecetaIngredienteForm/></ProtectedRoute>} />

          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/register' element={<RegisterAndLogout/>} />

          <Route path='*' element={<NoFound/>} />

        </Routes>
        <Toaster/>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App
