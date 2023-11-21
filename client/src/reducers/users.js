import { AUTH, LOGOUT, GET_USER } from '../constants/posts';

const authReducer = (state = { user: null,message:"" }, action) => {
    switch (action.type) {
        case AUTH:
            return { ...state, user: action.payload.user, message: action.payload.message };
        case LOGOUT:
            return { ...state, user: null,message:action.payload };
        case GET_USER:
            return {...state,user:action.payload.user,message:action.payload.message}
        default:
            return state;
    }
};

export default authReducer;