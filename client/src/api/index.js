import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })
// API.interceptors.request.use((req) => {
//     req.headers = {
//         "Content-Type": "application/json"
//     };
//     return req;
// })
let data = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
}

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => {
    console.log("like",id)
    API.patch(`/posts/${id}/likepost`);
}
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);


export const signIn = (formData) => API.post('/auth/locallogin', formData, data);
export const signUp = (formData) => API.post('/auth/register', formData, data);
export const logout = () => API.get('/auth/logout', data);
export const getUser = () => API.get('/auth/getUser', data);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&techs=${searchQuery.techs || 'none'}`);