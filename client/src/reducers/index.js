//this is root reducer
import { combineReducers } from 'redux';
import authReducer from './authReducer'; //for authentication purposes
import errorReducer from './errorReducer';




export default combineReducers({
    auth: authReducer,
    errors: errorReducer
});