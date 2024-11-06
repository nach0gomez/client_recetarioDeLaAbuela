import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createReceta, deleteReceta } from "./../api/recetas.api";

export function RecetasForm() { 
  // cargamos las funciones necesarias para manejar el formulario
    const { register, handleSubmit, formState: { errors } } = useForm(); // usamos useForm para manejar el formulario y sus validaciones
    const navigate = useNavigate(); // usamos useNavigate para navegar entre las páginas
    const params = useParams(); // usamos useParams para obtener los parametros de la url

    const onsubmit = handleSubmit(async (data) => {
        console.log(data);
        const response = await createReceta(data);
        console.log(response);
        
    });

      


    return (
      <div>
        <h1>Formulario de Recetas</h1>
        <form onSubmit={onsubmit}>
            <input type="text" placeholder="nombre_receta" {...register("nombre_receta", {required: true})} />
            {errors.nombre_receta && <span>Este campo es requerido</span>}
            <input type="text" placeholder="descripcion"  {...register("descripcion", {required: true})} />
            {errors.descripcion && <span>Este campo es requerido</span>}
            <input type="number" placeholder="porciones" {...register("porciones", {required: true})} />
            {errors.porciones && <span>Este campo es requerido</span>}
            <button>Guardar</button>            
        </form>

      {/* si llega el id por params agregamos el boton para eliminar */}

      { params.id && <button onClick={ async () => {
        const confirm = window.confirm('¿Estás seguro de eliminar esta receta?');
        if(confirm) {
          // llamamos a la función de eliminar
          const response = await deleteReceta(params.id);
          console.log(response);
          navigate('/recetas');
        }
      }}>Eliminar</button> }

      </div>
    );
  }