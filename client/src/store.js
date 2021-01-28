import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState={};
const middleware = [thunk];


const store = createStore(
    rootReducer,
     initialState ,
     composeWithDevTools(applyMiddleware(...middleware))
     /*compose(
         applyMiddleware(...middleware),
         window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
     )*/
     
);


export default store;