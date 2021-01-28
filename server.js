const express = require('express')
const mongoose = require('mongoose');
const app =express();
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const bodyParser =require('body-parser');
const passport = require('passport');
const path = require('path');

// Body Parser Middleware**************
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//************************************* */

//db config *******************************
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(()=>console.log('.....Mongodb connected.....'))
    .catch(err=>console.log(err));
// ********************************************



// Passport Middleware***********
app.use(passport.initialize())
//Passport config
require('./config/passport')(passport);
//*******************************/


const port = process.env.PORT || 5000;


// define routes ******************
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);
//********************************* */

//serve static assets if in production
if(process.env.NODE_ENV === 'production')
{
    //use static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port,()=> console.log(`....Server running on port ${port}....`));