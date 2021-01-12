const Validator = require('validator');
const isEmpty  = require('./is-empty');
module.exports = function validateRegisterInput(data){
    let errors = {};
    data.name = !isEmpty(data.name)? data.name:'';
    data.email = !isEmpty(data.email)? data.email:'';
    data.password = !isEmpty(data.password)? data.password:'';
    data.password2 = !isEmpty(data.password2)? data.password2:''; // Confirm Passowrd Part
    if(!Validator.isLength(data.name,{min: 2, max:30})){
        errors.name = 'Name should be min 2 and max 30 chars';
    }
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name Field Required';
    }
    
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is Invalid';
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email Field Required';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password Field Required';
    }
    if(!Validator.isLength(data.password, {min:3,max:30})){
        errors.password = 'Password must be atleast 3, at max 30';
    }
    if(!Validator.equals(data.password,data.password2)){
        errors.password2 = 'Password must match, retype';
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }
}