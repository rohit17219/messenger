import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducers'; 
const rootReducers = combineReducers({
    auth:authReducer,
});
const middleware = [thunkMiddleware];
const store = createStore(rootReducers,compose(applyMiddleware(...middleware),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;
