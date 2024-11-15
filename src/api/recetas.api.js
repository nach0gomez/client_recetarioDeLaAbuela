import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';


const recetaApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/recetas/'
});


recetaApi.interceptors.request.use(
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

export const getAllRecetas = () => recetaApi.get('/');
export const getReceta = (id) => recetaApi.get('/' + id + '/');
export const updateReceta = (id, receta) => recetaApi.put('/' + id + '/', receta);
export const createReceta = (receta) => recetaApi.post('/', receta);
export const deleteReceta = (id) => recetaApi.delete('/' + id + '/'); 
