import axios from 'axios';
import { ADD_POST, GET_ERRORS } from './types';

//Add Post
export const addPost = (postData)=>async dispatch=>{
    try{
        const res = await axios.post('/api/posts',postData);
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
    }
}