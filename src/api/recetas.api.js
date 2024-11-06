import axios from 'axios';

const recetaApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/recetas/'
});

export const getAllRecetas = () => recetaApi.get('/');
export const createReceta = (receta) => recetaApi.post('/', receta);
export const deleteReceta = (id) => recetaApi.delete('/' + id + '/'); 
