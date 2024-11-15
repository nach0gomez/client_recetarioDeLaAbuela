import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const ingredienteApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/ingredientes/'
});


ingredienteApi.interceptors.request.use(
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


export const getAllIngredientes = () => ingredienteApi.get('/');
export const getIngrediente = (id) => ingredienteApi.get('/' + id + '/');
export const updateIngrediente = (id, Ingrediente) => ingredienteApi.put('/' + id + '/', Ingrediente);
export const createIngrediente = (Ingrediente) => ingredienteApi.post('/', Ingrediente);
export const deleteIngrediente = (id) => ingredienteApi.delete('/' + id + '/'); 
