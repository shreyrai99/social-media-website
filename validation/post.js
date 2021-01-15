const Validator = require('validator');
const isEmpty  = require('./is-empty');
module.exports = function validatePostInput(data){
    let errors = {};
    
    data.text = !isEmpty(data.text)? data.text:'';   
    
    if(!Validator.isLength(data.text,{min:2,max:1000})){
        errors.text = 'Word limit min:1 max: 1000 characters';
    }

    if(Validator.isEmpty(data.text)){
        errors.text = 'Text Field Required';
    }   
   
    return{
        errors,
        isValid: isEmpty(errors)
    }
}