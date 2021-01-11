// Deals with info,bio etc
const express = require('express')
const router = express.Router();

/*
@route: GET api/profile/test
@desc: tests profile
@access : public
*/
router.get('/test',(req,res)=>res.json({msg:"Profiles Working..."}));

module.exports = router