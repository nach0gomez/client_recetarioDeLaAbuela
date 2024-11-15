import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createReceta, deleteReceta, getReceta, updateReceta } from "./../api/recetas.api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function RecetasForm() { 
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen
    const [imagePreview, setImagePreview] = useState(null); // Estado para la vista previa

    // Manejador de selección de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file)); // Crear vista previa local
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        // Crear FormData para enviar la imagen junto con los otros datos
        const formData = new FormData();
        formData.append('nombre_receta', data.nombre_receta);
        formData.append('descripcion', data.descripcion);
        formData.append('porciones', data.porciones);
        if (selectedImage) formData.append('imagen', selectedImage); // Agregar la imagen solo si está seleccionada

        if (params.id) {
            console.log('modificando receta');
            const response = await updateReceta(params.id, formData);
            console.log(response);
            navigate('/recetas');
            return;
        }

        const response = await createReceta(formData);
        console.log(response);
        toast.success('Receta Creada', {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#ffffff"
          }
        });
        navigate('/recetas');
    });

    useEffect(() => {
      if (params.id) {
        async function loadReceta() {
          const response = await getReceta(params.id);
          console.log(response);
          setValue('nombre_receta', response.data.nombre_receta);
          setValue('descripcion', response.data.descripcion);
          setValue('porciones', response.data.porciones);
          if (response.data.imagen) {
            setImagePreview(response.data.imagen); // Mostrar imagen existente en modo edición
          }
        }
        loadReceta();
      } else {
        reset({ nombre_receta: '', descripcion: '', porciones: '' });
      }
    }, [params.id]);

    return (
      <div>
        <div className="container">
          <h1>Formulario de Recetas</h1>
          <form onSubmit={onSubmit}>
              <input className="form-control mb-2" 
                type="text" 
                placeholder="nombre_receta" 
                {...register("nombre_receta", {required: true})} 
              />
              {errors.nombre_receta && <span className="text-danger">Este campo es requerido</span>}
              
              <input className="form-control mb-2" 
                type="text" 
                placeholder="descripcion"  
                {...register("descripcion", {required: true})} 
              />
              {errors.descripcion && <span className="text-danger" >Este campo es requerido</span>}
              
              <input className="form-control mb-2" 
                type="number" 
                placeholder="porciones" 
                {...register("porciones", {required: true})} 
              />
              {errors.porciones && <span className="text-danger">Este campo es requerido</span>}
              
              {/* Input de imagen y vista previa */}
              <div className="col-3">
                <input type="file" onChange={handleImageChange} accept="image/*" />
                {imagePreview && <img src={imagePreview} className="mb-2 mt-2" alt="Vista previa de la imagen" width="100" />}
                <button type="submit" className="btn btn-success d-block mb-2 mt-2 mb-2 w-100" >Guardar</button> 
              </div>
              
            
          </form>

          { params.id && 
            <div className="col-3">
            <button  className="btn btn-danger w-100" onClick={ async () => {
              const confirm = window.confirm('¿Estás seguro de eliminar esta receta?');
                if(confirm) {
                  const response = await deleteReceta(params.id);
                  console.log(response);
                  navigate('/recetas');
                  toast.success('Receta Eliminada', {
                    position: "bottom-right",
                    style: {
                      background: "#101010",
                      color: "#ffffff"
                    }
                  });
                }
               }}>
         Eliminar
       </button> 
            </div>
            
          }
        </div>
      </div>
    );
}

export default RecetasForm;
