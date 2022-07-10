import { configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from '../reducers';
import logger from 'redux-logger'



//const preloadedState = {};
const store = configureStore({
    middleware:[thunk],
    reducer: rootReducer
});

export default store;