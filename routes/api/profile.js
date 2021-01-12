// Deals with info,bio etc
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); // for protected profiles


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

module.exports = router;


module.exports = router