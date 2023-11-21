import { AUTH } from '../constants/posts';

import * as api from '../api/index.js';

export const getUser = () => async (dispatch) => {
    try {
        console.log("getting user")
        const res = await api.getUser();
        //middleware is used with this route, which needs headers
        // const res = await fetch('http://localhost:5000/auth/getUser', {
        //     method: "GET",
        //     credentials: "include",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //     },
        // });
        // const data = await res.json();
        console.log("res",res)
        dispatch({type:"GET_USER",payload:res.data})   
    } catch (err) {
        console.log("error in getting user", err);
    }
}
export const signup = (formData, navigate) => async (dispatch) => {
    console.log("formdata",formData)
    try {
        const { data } = await api.signUp(formData);
        console.log("signup", data)
        alert(data.message)
        
        navigate("/")

    } catch (error) {
        console.log("err",error);
    }
};

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        
        // let actualData = { email: formData.email, password: formData.password }
        // console.log("formdata", actualData)
        const { data } = await api.signIn(formData);
        console.log("signin", data)
        alert(data.message);
        dispatch({ type: "AUTH", payload: data });
        navigate("/")
    } catch (error) {
        alert("Invalid username or password")
    }
}

export const logout = () => async (dispatch) => {
    try {
        const res = await api.logout();
        dispatch({ type: "LOGOUT", payload:res.data.message });
    } catch (err) {
       console.log(err.message)
    }
}