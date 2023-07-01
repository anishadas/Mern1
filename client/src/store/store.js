import { compose, createStore, applyMiddleware,combineReducers } from 'redux'
import thunk from 'redux-thunk'
import posts from '../reducers/posts'
import users from '../reducers/users'

const Reducers=combineReducers({posts,users})
export const store = createStore(Reducers, compose(applyMiddleware(thunk)));