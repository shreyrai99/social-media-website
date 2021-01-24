import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import TextFieldGroup  from '../common/TextFieldGroup';
import TextAreaField  from '../common/TextAreaField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions'
class AddEducation extends Component {
    constructor(props){
        super(props);
        this.state={
            school:'', 
            fieldofstudy:'',
            degree:'',            
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
            school:this.state.school,
            fieldofstudy:this.state.fieldofstudy,
            degree:this.state.degree,
            to:this.state.to,
            from:this.state.from,
            current:this.state.current,
            description:this.state.description,
            
        }
        this.props.addEducation(expData,this.props.history)
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
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-info">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Add details about the Educational Institutions you attended</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit} className="form">
                                <TextFieldGroup
                                placeholder="* School/College Name"
                                name="school"
                                value={this.state.school}
                                onChange={this.onChange}
                                error={errors.school}
                                />




                                <TextFieldGroup
                                placeholder="* Field of Study (Like Computer Science, Molecular Biology etc)"
                                name="fieldofstudy"
                                value={this.state.fieldofstudy}
                                onChange={this.onChange}
                                error={errors.fieldofstudy}
                                />                                

                                <TextFieldGroup
                                placeholder="* Degree (Like Masters, Bachelors etc)"
                                name="degree"
                                value={this.state.degree}
                                onChange={this.onChange}
                                error={errors.degree}
                                />
                                <h6>From date</h6>                             
                                <TextFieldGroup
                                placeholder=" Joining Date"
                                name="from"
                                type="date"
                                value={this.state.from}
                                onChange={this.onChange}
                                error={errors.from}
                                />
                                <h6>To date</h6>                             
                                <TextFieldGroup
                                placeholder=" To"
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
                                        Institute where you are currently studying
                                    </label>
                                </div>
                                <TextFieldGroup
                                placeholder=" Brief Description"
                                name="description"                                
                                value={this.state.description}
                                onChange={this.onChange}
                                error={errors.description}
                                info="Tell us about Course you studied"
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

AddEducation.propTypes={
    addEducation:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    profile:state.profile,
    errors:state.errors
})


export default connect(mapStateToProps,{ addEducation })(withRouter(AddEducation));