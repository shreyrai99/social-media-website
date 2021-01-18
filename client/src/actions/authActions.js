import axios from 'axios';
import { GET_ERRORS } from './types';

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