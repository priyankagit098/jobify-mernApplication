import axios from "axios";
import { axiosInstance } from "./axiosInstance";



// const API = axios.create({ baseURL: "http://localhost:5000"})

// API.interceptors.request.use((req) => {
// // better security purpose to increase security
//     // for every request sending token to server, in server will check valid or not if it is valid token then only
//     // send res to particular request
// if(localStorage.getItem('token')){
//          req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
//      }
//      return req;
// })



export const Register= async (payload) => {
    try {
   const response = await axiosInstance.post("/api/user/register", payload);
   return response.data;
        
    } catch (error) {
        return error.message
    }
}

export const LoginUser= async (payload) => {
    try {
   const response = await axiosInstance.post("/api/user/login-create", payload);
   return response.data;
        
    } catch (error) {
        return error.message
    }
}

export const GetCurrentUser= async () => {
    try {
   const response = await axiosInstance.get("/api/user/get-current");
   return response.data;
        
    } catch (error) {
        return error.message
    }
}