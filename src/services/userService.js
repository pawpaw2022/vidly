import http from "./httpService"
import config from "../config.json"

export function register(user){
    return http.post(config.usersApiEndPoint, {
       email: user.username,
       password: user.password, 
       name: user.name 
    })
}
