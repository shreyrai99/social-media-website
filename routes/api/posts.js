// for users to create posts
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const User = require('../../models/User');
//post validator
const validatePostInput = require('../../validation/post');
/*
@route: GET api/posts/test
@desc: tests posts
@access : public
*/
router.get('/test',(req,res)=>res.json({msg:"Posts Working..."}));


/*
@route: POST api/posts
@desc: create posts
@access : private
*/
router.post('/',passport.authenticate('jwt', {session:false}),async(req,res)=>{
   
     const {errors,isValid} = validatePostInput(req.body);
     if(!isValid){
         return res.status(400).json(errors);
     }
        try{
            const newPost = new Post({
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            });
            const post = await newPost.save();
            res.json(post);
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }

})


module.exports = router