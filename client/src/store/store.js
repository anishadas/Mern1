import { compose, createStore, applyMiddleware,combineReducers } from 'redux'
import thunk from 'redux-thunk'
import posts from '../reducers/posts'

const Reducers=combineReducers({posts})
export const store = createStore(Reducers, compose(applyMiddleware(thunk)));