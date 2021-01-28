import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST } from './types';

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

//Get Posts
export const getPosts = ()=>async dispatch=>{
    try{
        dispatch(setPostLoading());
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type:GET_POSTS,
            payload: {}
        })
    }
}

//LIKE a Post
export const addLike = (id)=>async dispatch=>{
    try{
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch(getPosts())
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
    }
}

//UNLIKE a Post
export const removeLike = (id)=>async dispatch=>{
    try{
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch(getPosts())
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
    }
}

//Get Single Post (by ID)
export const getPost = (id)=>async dispatch=>{
    try{
        dispatch(setPostLoading());
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type:GET_POST,
            payload: {}
        })
    }
}

//Add Comment in a post
export const addComment = (postId, commentData)=>async dispatch=>{
    try{
        const res = await axios.post(`/api/posts/comment/${postId}`,commentData);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
    }
}


//Delete Post
export const deletePost = (id)=>async dispatch=>{
    try{
        await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id //send id to reducer to delete post
        })
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
    }
}

//set loading state
export const setPostLoading = ()=>{
    return{
        type:POST_LOADING
    }
}