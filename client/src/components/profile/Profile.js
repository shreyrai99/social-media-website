import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions'
class Profile extends Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile===null && this.props.profile.loading){
            this.props.history.push('/not-found');
        }
    }
    render() { 
        const { profile, loading } = this.props.profile;
        let profileContent;
        if(profile===null || loading){
            profileContent=<Spinner />
        }else{
            profileContent=(
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3">
                                Back To Profiles
                            </Link>
                        </div>     
                        <div className="col-md-6" />    
                                    
                    </div>
                    <div className="mb-5">
                    <ProfileHeader profile={profile}/>
                    </div>
                    <div className="mb-5">
                    <ProfileAbout profile={profile}/>
                    </div>
                    <div className="mb-5">
                    <ProfileCreds education={profile.education} experience={profile.experience}/>
                    </div>
                    <div className="mb-5">
                    {profile.githubusername? (<ProfileGithub githubusername={profile.githubusername}/>):null}
                    </div>
                    
                </div>
            )
        }
        return (           
               
                <div className="profile-grid my-1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{profileContent}</div>
                    </div>
                </div>
                </div>
            
         );
    }
}

Profile.propTypes={
    profile:PropTypes.object.isRequired,
    getProfileByHandle:PropTypes.func.isRequired
}
 
const mapStateToProps=(state)=>({
    profile:state.profile
})
export default connect(mapStateToProps, { getProfileByHandle })(Profile);