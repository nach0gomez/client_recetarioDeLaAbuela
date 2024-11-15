import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createRecetaIngrediente, updateRecetaIngrediente, getRecetaIngrediente, deleteRecetaIngrediente } from "../api/recetaIngrediente.api";
import { useEffect, useState } from "react";
import { getAllRecetas } from "../api/recetas.api"; 
import { getAllIngredientes } from "../api/ingrediente.api";  
import toast from "react-hot-toast";

export function RecetaIngredienteForm() {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    // Establece estados para las recetas e ingredientes
    const [recetas, setRecetas] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [loading, setLoading] = useState(true); 

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        
        if (params.id) {
            console.log('Modificando receta ingrediente');
            const response = await updateRecetaIngrediente(params.id, data);
            console.log(response);
            toast.success('Vinculo modificado con éxito', {
                position: "bottom-right",
                style: {
                  background: "#101010",
                  color: "#ffffff"
                }
              });
            navigate('/recetaIngrediente');
            return;
        }

        const response = await createRecetaIngrediente(data);
        console.log(response);
        toast.success('Vinculo creado con éxito', {
            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#ffffff"
            }
          });
        navigate('/recetaIngrediente');
    });

    useEffect(() => {
        async function loadData() {
            setLoading(true); 
            const recetasResponse = await getAllRecetas();
            const ingredientesResponse = await getAllIngredientes();
            setRecetas(recetasResponse.data);
            setIngredientes(ingredientesResponse.data);
            setLoading(false); 
        }
        loadData();
    }, []);

    
    useEffect(() => {
        if (params.id) {
            async function loadRecetaIngrediente() {
                const response = await getRecetaIngrediente(params.id);
                console.log(response);
                if (response && response.data) {
                    
                    setValue('id_recetas', response.data.id_recetas); 
                    setValue('id_ingredientes', response.data.id_ingredientes);
                    setValue('cantidades', response.data.cantidades);
                }
            }
            loadRecetaIngrediente();
        } else {
            reset({ id_recetas: '', id_ingredientes: '', cantidades: '' });
        }
    }, [params.id, reset, setValue]);

    if (loading) return <div>Cargando...</div>; 

    return (
        <div>
            <div className="container">
                <h1>Formulario de RecetaIngrediente</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-2">
                        <label>Receta</label>
                        <select className="form-control" {...register("id_recetas", { required: true })}>
                            <option value="">Selecciona una receta</option>
                            {recetas.map((receta) => (
                                <option key={receta.id_recetas} value={receta.id_recetas}>
                                    {receta.nombre_receta}
                                </option>
                            ))}
                        </select>
                        {errors.id_recetas && <span className="text-danger">Este campo es requerido</span>}
                    </div>

                    <div className="form-group mb-2">
                        <label>Ingrediente</label>
                        <select className="form-control" {...register("id_ingredientes", { required: true })}>
                            <option value="">Selecciona un ingrediente</option>
                            {ingredientes.map((ingrediente) => (
                                <option key={ingrediente.id_ingrediente} value={ingrediente.id_ingrediente}>
                                    {ingrediente.nombre_ingrediente}
                                </option>
                            ))}
                        </select>
                        {errors.id_ingredientes && <span className="text-danger">Este campo es requerido</span>}
                    </div>

                    <div className="form-group mb-2">
                        <label>Cantidad</label>
                        <input className="form-control" 
                            type="number" 
                            placeholder="Cantidad"  
                            {...register("cantidades", { required: true })} 
                        />
                        {errors.cantidades && <span className="text-danger">Este campo es requerido</span>}
                    </div>
                    
                    <button className="btn btn-dark" type="submit">Guardar</button>            
                </form>

                {/* Botón para eliminar si hay un ID de receta-ingrediente en los parámetros */}
                {params.id && 
                    <button  className="btn btn-danger" onClick={ async () => {
                        const confirm = window.confirm('¿Estás seguro de eliminar esta receta-ingrediente?');
                        if(confirm) {
                            const response = await deleteRecetaIngrediente(params.id);
                            console.log(response);
                            toast.success('Vinculo eliminado con éxito', {
                                position: "bottom-right",
                                style: {
                                  background: "#101010",
                                  color: "#ffffff"
                                }
                              });
                            navigate('/recetaIngrediente');
                        }
                    }} >
                        Eliminar
                    </button> 
                }
            </div>
        </div>
    );
}

export default RecetaIngredienteForm;
