import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// importamos las paginas y el form
import { RecetasForm } from './pages/RecetasForm'
import { RecetasPagina } from './pages/RecetasPagina'

// importamos los componentes
import { Navigation } from './components/navigation'
import './App.css'
import { IngredientesPagina } from './pages/IngredientesPagina'
import { IngredientesForm } from './pages/IngredientesForm'

function App() {
  return (
    <BrowserRouter> 
      <Navigation/>
      <Routes>
        <Route path='/' element={< Navigate to ="/recetas"  />} />
        <Route path='/recetas' element={<RecetasPagina/>} />
        <Route path='/recetas/:id' element={<RecetasForm/>} />
        <Route path='/recetas-add' element={<RecetasForm/>} />
        <Route path='/ingredientes' element={<IngredientesPagina/>} />
        <Route path='/ingredientes-add' element={<IngredientesForm/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
