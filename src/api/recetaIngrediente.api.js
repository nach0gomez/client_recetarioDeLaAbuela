import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const recetaIngredienteApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/receta_ingrediente/'
});

recetaIngredienteApi.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, (error)=>{
        return Promise.reject(error)
    }
)


export const getAllRecetaIngredientes = () => recetaIngredienteApi.get('/');
export const getRecetaIngrediente = (id) => recetaIngredienteApi.get('/' + id + '/');
export const updateRecetaIngrediente = (id, recetaIngrediente) => recetaIngredienteApi.put('/' + id + '/', recetaIngrediente);
export const createRecetaIngrediente = (recetaIngrediente) => recetaIngredienteApi.post('/', recetaIngrediente);
export const deleteRecetaIngrediente = (id) => recetaIngredienteApi.delete('/' + id + '/'); 
