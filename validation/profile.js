const Validator = require('validator');
const isEmpty  = require('./is-empty');
module.exports = function validateProfileInput(data){
    let errors = {};
    
    data.handle = !isEmpty(data.handle)? data.handle:'';
    data.status = !isEmpty(data.status)? data.status:'';
    data.skills = !isEmpty(data.skills)? data.skills:'';
    
    if(!Validator.isLength(data.handle, {min:2,max:50})){
        errors.handle = 'Handle should be between 2 and 50'
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle needed'
    }
    
    if(Validator.isEmpty(data.status)){
        errors.status = 'Status should not be empty!'
    }
    if(Validator.isEmpty(data.skills)){
        errors.skills = 'Skill Field Required'
    }
   
   if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not Valid URL';
        }
    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = 'Not Valid URL';
        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = 'Not Valid URL';
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = 'Not Valid URL';
        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = 'Not Valid URL';
        }
    }
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = 'Not Valid URL';
        }
    }
    
    
   
    return{
        errors,
        isValid: isEmpty(errors)
    }
}