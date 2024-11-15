import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createFavorito, deleteFavorito, getFavorito, updateFavorito } from "../api/favoritos.api";
import { getAllRecetas } from "../api/recetas.api";  // Importa la API de recetas
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useUser = () => {
    return { id_usuario: 1 };  // simula el id obtenido del localstorage
};

export function FavoritosForm() {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const { id_usuario } = useUser();  
    const [recetas, setRecetas] = useState([]);

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        if (params.id) {
            console.log('Modificando favorito');
            const response = await updateFavorito(params.id, data);
            console.log(response);
            toast.success('Favorito modificado', {
                position: "bottom-right",
                style: {
                  background: "#101010",
                  color: "#ffffff"
                }
              });
            navigate('/favoritos');
            
            return;
        }

        console.log('Creando favorito');
        const response = await createFavorito(data);
        console.log(response);
        toast.success('Favorito creado', {
            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#ffffff"
            }
          });
        navigate('/favoritos');
    });

    useEffect(() => {
        if (params.id) {
            async function loadFavorito() {
                const response = await getFavorito(params.id);
                console.log(response);
                setValue('id_usuario', response.data.id_usuario);
                setValue('id_recetas', response.data.id_recetas);
                setValue('comensales', response.data.comensales);
            }
            loadFavorito();
        } else {
            reset({ id_usuario: id_usuario, id_recetas: '' });
        }

        // Obtenemos todas las recetas
        async function loadRecetas() {
            const response = await getAllRecetas();
            setRecetas(response.data);
        }
        loadRecetas();
    }, [params.id, id_usuario]);

    return (
        <div>
            <div className="container">
                <h1>Formulario de Favoritos</h1>
                <form onSubmit={onSubmit}>
                    {/* id_usuario */}
                    <input
                        className="form-control mb-2"
                        type="number"
                        value={id_usuario}  
                        {...register("id_usuario", { required: true })}
                        disabled 
                    />
                    {errors.id_usuario && <span className="text-danger">Este campo es requerido</span>}

                    {/* Select para recetas */}
                    <select
                        className="form-control mb-2"
                        {...register("id_recetas", { required: true })}
                    >
                        <option value="">Selecciona una receta</option>
                        {recetas.map((receta) => (
                            <option key={receta.id_recetas} value={receta.id_recetas}>
                                {receta.nombre_receta}
                            </option>
                        ))}
                    </select>
                    {errors.id_recetas && <span className="text-danger">Este campo es requerido</span>}

                    {/* Comensales */}
                    <input
                        className="form-control mb-2"
                        type="number"
                        placeholder="Comensales"
                        {...register("comensales", { required: true })}
                    />
                    {errors.comensales && <span className="text-danger">Este campo es requerido</span>}

                    <button className="btn btn-success">Guardar</button>
                </form>

                {/* Botón para eliminar si hay un ID de favorito en los parámetros */}
                {params.id && (
                    <button
                        className="btn btn-danger"
                        onClick={async () => {
                            const confirm = window.confirm('¿Estás seguro de eliminar este favorito?');
                            if (confirm) {
                                const response = await deleteFavorito(params.id);
                                console.log(response);
                                toast.success('Favorito eliminado', {
                                    position: "bottom-right",
                                    style: {
                                      background: "#101010",
                                      color: "#ffffff"
                                    }
                                  });
                                navigate('/favoritos');
                            }
                        }}
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
}

export default FavoritosForm;
