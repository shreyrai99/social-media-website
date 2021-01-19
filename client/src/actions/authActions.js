import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//register user
export const registerUser = (formData,history) => async dispatch=>{
    try {
        const res = await axios.post('/api/users/register', formData);
        history.push('/login');     
      } catch (err) {        
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
}

// Log In User
export const loginUser = userData => async dispatch=>{
   try{
      const res = await axios.post('/api/users/login',userData);
      //save to local storage
      const { token } = res.data;
      //set token to ls
      localStorage.setItem('jwtToken',token);
      //set token to auth header
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
   }
   catch(err){
     dispatch({
       type:GET_ERRORS,
       payload: err.response.data
     })

   }
}

//Log Out User
export const logoutUser =()=> async dispatch =>{
  //remove token from local storage
  localStorage.removeItem('jwtToken');
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}

//set logged in user
export const setCurrentUser=(decoded)=>{
  return{
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

