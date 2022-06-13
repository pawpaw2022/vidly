import http from "./httpService"
import config from "../config.json"


function movieUrl(id){
    return `${config.moviesApiEndPoint}/${id}`
}

export function getMovies() {
    return http.get(config.moviesApiEndPoint);
}
  
  
export function getMovie(id) {
    return http.get(movieUrl(id));
  }
  
export function saveMovie(movie) {

    const body = {...movie};

    if (movie._id){
        // movie._id should be removed from api
        delete body._id;
        return http.put(movieUrl(movie._id), body);         
    }

    return http.post(config.moviesApiEndPoint, body); 
}

export function deleteMovie(id) {
    return http.delete(movieUrl(id));
}
  