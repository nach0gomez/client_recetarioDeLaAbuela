import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const FavoritosApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/favoritos/'
});

FavoritosApi.interceptors.request.use(
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


export const getAllFavoritos = () => FavoritosApi.get('/');
export const getFavorito = (id) => FavoritosApi.get('/' + id + '/');
export const updateFavorito = (id, Favoritos) => FavoritosApi.put('/' + id + '/', Favoritos);
export const createFavorito = (Favoritos) => FavoritosApi.post('/', Favoritos);
export const deleteFavorito = (id) => FavoritosApi.delete('/' + id + '/'); 
