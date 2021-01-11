// deals with log-in and registration stuff
const express = require('express')
const router = express.Router();

/*
@route: GET api/users/test
@desc: tests users
@access : public
*/
router.get('/test',(req,res)=>res.json({msg:"Users Working..."}));

module.exports = router