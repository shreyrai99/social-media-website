import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
const InputGroup=({
    name,
    placeholder,
    value,    
    error,
    icon, 
    type,   
    onChange    
})=>{
    return(
        <div className="input-group mb-5">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}/>
                </span>
            </div>
            <input              
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={classnames('form-control form-control-lg',{'is-invalid': error})}                
            />
            
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}
InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    type:PropTypes.string,
    error: PropTypes.string,    
    onChange: PropTypes.func.isRequired,   
}

InputGroup.defaultProps={
    text:'text'
}

export default InputGroup;