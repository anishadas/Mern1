import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, SEARCH } from '../constants/posts';

const postReducer=(posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case SEARCH:
            return action.payload;
        default:
            return posts;
    }
};

export default postReducer;