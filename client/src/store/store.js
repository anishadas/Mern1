import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import posts from '../reducers/posts'
import users from '../reducers/users'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Reducers = combineReducers({ posts, userData:users })
// const persistedReducer = persistReducer(persistConfig, Reducers);
const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));

// const persistor = persistStore(store);

export { store };