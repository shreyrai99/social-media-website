// for users to create posts
const express = require('express')
const router = express.Router();

/*
@route: GET api/posts/test
@desc: tests posts
@access : public
*/
router.get('/test',(req,res)=>res.json({msg:"Posts Working..."}));

module.exports = router