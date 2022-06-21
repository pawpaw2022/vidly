import http from "./httpService"
import jwtDecode from "jwt-decode";


const tokenKey = "token"
const apiEndPoint = "/auth";

http.setJwt(getJwt());

export async function login(email, password){
    const {data: jwt} = await http.post(apiEndPoint, {email, password});
    localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser(){
    try { // in case of annoymous user 
        const jwt = localStorage.getItem(tokenKey); 
        return jwtDecode(jwt); 
    } catch (ex) {
        return null;
    }
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey, jwt);
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}


export default {
    login,
    getCurrentUser,
    loginWithJwt, 
    logout, 
    getJwt
}