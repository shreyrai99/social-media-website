import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import TextFieldGroup  from '../common/TextFieldGroup';
import TextAreaField  from '../common/TextAreaField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions'
class AddExperience extends Component {
    constructor(props){
        super(props);
        this.state={
            company:'', 
            title:'',
            location:'',            
            to:'',
            from:'',
            current:false,
            description:'',
            errors:{},
            disabled:false
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit = async (e)=>{
        e.preventDefault();
        const expData={
            company:this.state.company,
            title:this.state.title,
            location:this.state.location,
            to:this.state.to,
            from:this.state.from,
            current:this.state.current,
            description:this.state.description,
            
        }
        this.props.addExperience(expData,this.props.history)
    }
    onCheck=(e)=>{
        this.setState({
            disabled: !this.state.disabled,
            current:!this.state.current
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    render() { 
        const { errors }=this.state;
        return ( 
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-info">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add any job or position of responsibility you had in the past or current</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit} className="form">
                                <TextFieldGroup
                                placeholder="* Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                />




                                <TextFieldGroup
                                placeholder="* Job Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                                error={errors.title}
                                />                                

                                <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                />
                                <h6>From date</h6>                             
                                <TextFieldGroup
                                placeholder="Joining Date"
                                name="from"
                                type="date"
                                value={this.state.from}
                                onChange={this.onChange}
                                error={errors.from}
                                />
                                <h6>To date</h6>                             
                                <TextFieldGroup
                                placeholder="To"
                                name="to"
                                type="date"
                                value={this.state.to}
                                onChange={this.onChange}
                                error={errors.to}
                                disabled={this.state.disabled?'disabled':''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                </div>
                                <TextFieldGroup
                                placeholder="Job Description"
                                name="description"                                
                                value={this.state.description}
                                onChange={this.onChange}
                                error={errors.description}
                                info="Tell us about your post"
                                />
                                <input type="submit" value="Submit"
                                className="btn btn-dark btn-block mt-4"
                                 />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

         );
    }
}

AddExperience.propTypes={
    addExperience:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    profile:state.profile,
    errors:state.errors
})


export default connect(mapStateToProps,{ addExperience })(withRouter(AddExperience));