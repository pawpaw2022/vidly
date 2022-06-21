import http from "./httpService"

const apiEndPoint = "/movies";


function movieUrl(id){
    return `${apiEndPoint}/${id}`
}

export function getMovies() {
    return http.get(apiEndPoint);
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

    return http.post(apiEndPoint, body); 
}

export function deleteMovie(id) {
    return http.delete(movieUrl(id));
}
  