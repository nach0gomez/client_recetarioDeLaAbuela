import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createIngrediente, deleteIngrediente, getIngrediente, updateIngrediente } from "../api/ingrediente.api.js";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function IngredientesForm() { 
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm(); // Agregamos reset para reiniciar el formulario
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        if (params.id) {
          console.log('modificando ingrediente');
          const response = await updateIngrediente(params.id, data);
          console.log(response);
          toast.success('Ingrediente actualizado', {
            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#ffffff"
            }
          });
          navigate('/ingredientes');
          return;
        }

        const response = await createIngrediente(data);
        console.log(response);
        toast.success('Ingrediente creado', {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#ffffff"
          }
        });
        navigate('/ingredientes');
    });

    // Cargar el ingrediente y limpiar el formulario cuando cambie el ID en los params
    useEffect(() => {
      if (params.id) {
        async function loadIngrediente() {
          const response = await getIngrediente(params.id);
          console.log(response);
          setValue('nombre_ingrediente', response.data.nombre_ingrediente);
        }
        loadIngrediente();
      } else {
        reset({ nombre_ingrediente: '' }); // Limpia el formulario si no hay un id en los params
      }
    }, [params.id]); // Ejecuta el useEffect cuando cambia params.id

    return (
      <div>
        <div className="container">
          <h1>Formulario de Ingrediente</h1>
          <form onSubmit={onSubmit}>
              <input className="form-control mb-2" 
                type="text" 
                placeholder="nombre_ingrediente" 
                {...register("nombre_ingrediente", { required: true })} 
              />
              {errors.nombre_ingrediente && <span className="text-danger">Este campo es requerido</span>}
              <button className="btn btn-info" >Guardar</button>            
          </form>

          { params.id && 
            <button className="btn btn-warning" onClick={async () => {
              const confirm = window.confirm('¿Estás seguro de eliminar este ingrediente?');
              if (confirm) {
                const response = await deleteIngrediente(params.id);
                console.log(response);
                toast.success('Ingrediente eliminado', {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#ffffff"
                  }
                });
                navigate('/ingredientes');
              }
            }}>
              Eliminar
            </button> 
          }
        </div>
      </div>
    );
}

export default IngredientesForm;
