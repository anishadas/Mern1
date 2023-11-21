import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, SEARCH } from '../constants/posts';

import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        console.log("dt", data)
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    // console.log(searchQuery)
    try {
        const { data: { searchedData } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: SEARCH, payload: searchedData })
    } catch (error) {
        console.log(error.message)
    }
}
export const createPost = (post) => async (dispatch) => {
    try {
        console.log("create", post)
        const { data } = await api.createPost(post);
        console.log("getting", data)
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const data  = await api.likePost(id);
        console.log("like",data)
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};