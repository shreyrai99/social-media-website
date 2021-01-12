// deals with log-in and registration stuff
const express = require('express')
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

//Load User model
const User = require('../../models/User')
/*
@route: GET api/users/test
@desc: tests users
@access : public
*/
router.get('/test',(req,res)=>res.json({msg:"Users Working..."}));

/*
@route: GET api/users/register
@desc: Register users
@access : public
*/
router.post('/register',(req,res)=>{
    const {errors,isValid} = validateRegisterInput(req.body);
    //check validation, empty and things like that
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            errors.email = 'Email already Registered!';
            return res.status(400).json(errors);
        }
        else{
            const avatar = gravatar.url(req.body.email,{
                s: '200', //size of image
                r: 'pg', //Rating
                d: 'mm' //default
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt, (err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user=>res.json(user))
                        .catch(err=>console.log(err));
                })
            })
        }
    })
});


/*
@route: GET api/users/login
@desc: Login user /Return JWT token
@access : public
*/
router.post('/login',(req,res)=>{
    const {errors,isValid} = validateLoginInput(req.body);
    //check validation, empty and things like that
    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;


    //find email
    User.findOne({email})
        .then(user=>{
            if(!user){
                errors.email = 'User not found!';
                return res.status(404).json(errors);
            }

            //check password
            bcrypt.compare(password,user.password)
             .then(isMatch=>{
                 if(isMatch){
                 // user matched
                 const payload = { id: user.id, name: user.name, avatar: user.avatar} // creates jwt payload

                 //sign token
                 jwt.sign(payload,keys.secretOrKey, { expiresIn: 7200}, (err,token)=>{
                    res.json({
                        success: true,
                        token: 'Bearer '+ token
                    })
                 });
                 }
                 else{
                 errors.password = "Password Incorrect";
                 return res.status(400).json(errors)
                 }
             })
        })
})


/*
@route: GET api/users/current
@desc: Return Current user
@access : private
*/
router.get('/current',passport.authenticate('jwt',{ session: false}),(req,res)=>{
    res.json({
    id:req.user.id,
    name: req.user.name,
    email: req.user.email
    })
});


module.exports = router