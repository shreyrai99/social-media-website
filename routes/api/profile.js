// Deals with info,bio etc
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); // for protected profiles

//Load Validation
const validateProfileInput = require('../../validation/profile')
//load Profile model
const Profile = require('../../models/Profile');
//load User profile
const User = require('../../models/User');
/*
@route: GET api/profile/test
@desc: tests profile
@access : public
*/
router.get('/test',(req,res)=>res.json({msg:"Profiles Working..."}));


/*
@route: GET api/profile
@desc: Get current user's profile
@access : private
*/
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors = {};

    Profile.findOne({ user:req.user.id })
        .populate('user',['name','avatar','email'])
        .then(profile=>{
            if(!profile)
            {
                errors.noprofile = 'There is no profile of this user!';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err=>res.status(404).json(err));
});


/*
@route: GET api/profile/handle/:handle
@desc: Get profile by handle
@access : public
14.1.2020
*/
router.get('/handle/:handle',(req,res)=>{
    const errors = {};
    Profile.findOne({handle:req.params.handle})
    .populate('user',['name','avatar','email'])
    .then(profile=>{
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json(err));
});

/*
@route: GET api/profile/all
@desc: Get all profiles
@access : public
14.1.2020
*/
router.get('/all',(req,res)=>{
    const errors = {};
    Profile.find()
    .populate('user',['name','avatar','email'])
    .then(profiles=>{
        if(!profiles){
            errors.noprofile = 'There are NO Profiles';
            return res.status(404).json(errors);
        }
        res.json(profiles);
    })
    .catch(err=>res.status(404).json({profile: "There are no profiles currently"}));
});

/*
@route: GET api/profile/user/:user_id
@desc: Get profile by ID
@access : public
14.1.2020
*/
router.get('/user/:user_id',(req,res)=>{
    const errors = {};
    Profile.findOne({user:req.params.user_id})
    .populate('user',['name','avatar','email'])
    .then(profile=>{
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json({profile: "There is no profile for this user"}));
});

/*
@route: POST api/profile
@desc: Create or Edit user profile
@access : private
13.1.2021 continue karna yaha se...................
*/
router.post('/',passport.authenticate('jwt',{session:false}),async (req,res)=>{
   const {errors,isValid} = validateProfileInput(req.body);

   //check validity
   if(!isValid){
       return res.status(400).json(errors);
   }
   
    const profileFields = {};
   profileFields.user = req.user.id;
   if(req.body.handle) profileFields.handle = req.body.handle;
   if(req.body.company) profileFields.company = req.body.company;
   if(req.body.website) profileFields.website = req.body.website;
   if(req.body.location) profileFields.location = req.body.location;
   if(req.body.bio) profileFields.bio = req.body.bio;
   if(req.body.status) profileFields.status = req.body.status;
   if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
   //skills: split into array
   if(typeof req.body.skills !== 'undefined'){
       profileFields.skills = req.body.skills.split(',');
   }

   //social
   profileFields.social = {}
   if(req.body.youtube)profileFields.social.youtube=req.body.youtube;
   if(req.body.twitter)profileFields.social.twitter=req.body.twitter;
   if(req.body.facebook)profileFields.social.facebook=req.body.facebook;
   if(req.body.linkedin)profileFields.social.linkedin=req.body.linkedin;
   if(req.body.instagram)profileFields.social.instagram=req.body.instagram;


   //apne se
   try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(        
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }

   /*
   Profile.findOne({ user: req.user.id})
            .then(profile=>{
                
                if(profile){ //if profile already exists we edit
                    let prof = Profile.findOneAndUpdate(
                        {user:req.user.id}, 
                        { $set: profileFields}, 
                        { new: true,upsert: true, setDefaultsOnInsert: true }
                    )
                    return res.json(prof)
                }
                else{ // Create profile
                    //first check if handle exists, we dont want same handles
                    Profile.findOne({handle:profileFields.handle})
                    .then(profile=>{
                        if(profile){
                            errors.handle = 'Handle already exists!';
                            res.status(400).json(errors);
                        }

                        //save profile
                        new Profile(profileFields).save().then(profile=>res.json(profile));
                    })
                    .catch(err=>res.status(400).json('Error aa gai3!'))
                }
            })
            .catch(err=>res.status(400).json('Error aa gai4!'))
        */
});


module.exports = router;


