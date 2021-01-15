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
15.1.20
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


/*
@route: GET api/posts
@desc: view all posts
@access : public
15.1.20
*/
router.get('/',async (req,res)=>{
    try{
        const posts = await Post.find().sort({date:-1}); //sort descendng order
        res.json(posts);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
})

/*
@route: GET api/posts/:id
@desc: view single post by id
@access : public
15.1.20
*/
router.get('/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id); //sort descendng order
        if(!post){
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
})


/*
@route: DELETE api/posts/:id
@desc: delete single post by id
@access : private
15.1.20
*/
router.delete('/:id',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        

        if(!post){
            return res.status(404).json({ msg: 'Post not found' });
        }
        if(post.user.toString()!==req.user.id){
            return res.status(401).json({ msg: 'You are UNAUTHORIZED' });
        }
        await post.remove();
        res.json({ msg: 'Post removed' });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error,be back later!');
    }
})

/*
@route: PUT api/posts/like/:id
@desc: LIKE a post
@access : PRIVATE
15.1.20
*/
router.put('/like/:id',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.likes.some(like=> like.user.toString()===req.user.id)){
            //user has already liked
            return res.status(400).json({ alreadyliked: 'Post already liked' });
        }
        post.likes.unshift({user:req.user.id});
        await post.save();
        return res.json(post);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error,be back soon!');
    }
})


/*
@route: PUT api/posts/unlike/:id
@desc: UNLIKE a post
@access : PRIVATE
15.1.20
*/
router.put('/unlike/:id',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.some(like=> like.user.toString()===req.user.id)){
            //user has already liked
            return res.status(400).json({ notliked: 'Post not liked by you yet!' });
        }
        post.likes = post.likes.filter(({user})=>user.toString()!==req.user.id)
        await post.save();
        return res.json(post);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error,be back soon!');
    }
})

/*
@route: POST api/posts/comment/:id
@desc: COMMENT ON A POST
@access : PRIVATE
15.1.20
*/
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    const {errors,isValid} = validatePostInput(req.body);
     if(!isValid){
         return res.status(400).json(errors);
     }
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:"Post doesnot exist"});
        }
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            user: req.user.id,
            avatar: req.body.avatar
        }
        post.comments.unshift(newComment);
        await post.save();
        res.json(post);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error, return later!');
    }
})

/*
@route: DELETE api/posts/comment/:id/:comment_id
@desc: DELETE COMMENT ON A POST
@access : PRIVATE
15.1.20
*/
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    
    try{
        const post = await Post.findById(req.params.id);
        const comment = await post.comments.find((comment)=>comment.id===req.params.comment_id)

        if(!post){
            return res.status(404).json({msg:"Post doesnot exist"});
        }
        if(!comment){
            return res.status(404).json({msg:"Comment doesnot exist"});
        }
        /**********check this****************** */
        if(comment.user.toString()!==req.user.id && post.user.toString()!==req.user.id){
            return res.status(400).json({msg:"Not Authorized to delete!"});
        }
        //owner of post can delete all comments, owner of comment can delete only his own comments
        /************check this***************** */
        post.comments = post.comments.filter(({id})=>id.toString()!==req.params.comment_id);       
        await post.save();
        res.json(post);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error, return later!');
    }
})
module.exports = router