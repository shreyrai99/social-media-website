import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';
class CreateProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            displaySocialInputs: false,
            handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            bio:'',
            githubusername:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            instagram:'',
            errors:{}
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const profileData={
            handle:this.state.handle,
            website:this.state.website,
            company:this.state.company,
            location:this.state.location,
            status:this.state.status,
            skills:this.state.skills,
            githubusername:this.state.githubusername,
            bio:this.state.bio,
            twitter:this.state.twitter,
            facebook:this.state.facebook,
            linkedin:this.state.linkedin,
            youtube:this.state.youtube,
            instagram:this.state.instagram,
        }
        this.props.createProfile(profileData,this.props.history);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    render() { 
        const { errors,displaySocialInputs }=this.state;
        //select option for status
        const options = [
            {label:'* Select Professional Status', value:0},
            {label:'Developer', value:'Developer'},
            {label:'Junior Developer', value:'Junior Developer'},
            {label:'Senior Developer', value:'Senior Developer'},
            {label:'Manager', value:'Manager'},
            {label:'Student or Learning', value:'Student or Learning'},
            {label:'Instructor or Teacher', value:'Instructor or Teacher'},
            {label:'Intern', value:'Intern'},
           
        ]
        let socialinputs;
        if(displaySocialInputs){
            socialinputs=(
                <div>
                    <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                    />

                    <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                    />

                    <InputGroup
                    placeholder="Instagam Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                    />                    

                    <InputGroup
                    placeholder="LinkedIn Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                    />                    

                    <InputGroup
                    placeholder="Youtube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                    />
                    
                </div>
            )
        }
        return ( 
            
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Make your Profile Stand out!
                            </p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                placeholder="Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="Your Profile Handle"
                                />


                                 <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                error={errors.status}
                                options={options}
                                info="Give us an idea of where you are at in your career"
                                />



                                <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Current Company"
                                />



                                <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Website, for example: https://www.google.com/"
                                />



                                <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="Current Location"
                                />

 
                                <TextFieldGroup
                                placeholder="* Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                />



                                <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="If you want your latest repos and a Github link, include your username"
                                />



                                <TextAreaField
                                placeholder="A short bio of yourself"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}                                
                                />
                                

                                <div className="mb-3">
                                    <button 
                                        type="button"
                                        className="btn btn-light" onClick={()=>{
                                        this.setState(prevState=>({
                                            displaySocialInputs:!prevState.displaySocialInputs
                                        }))
                                    }}>
                                        Add Social Media Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialinputs}
                                <input type="submit" value="Submit" className="btn btn-primary my-1" />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            
           
        );
    }
}

CreateProfile.propTypes={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
}

const mapStateToProps=(state)=>({
    profile:state.profile,
    errors:state.errors
})
 
export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));