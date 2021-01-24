import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience'
import Education from './Education'
class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onDeleteClick=(e)=>{
        this.props.deleteAccount();
    }
    render() { 
        const { user }=this.props.auth;
        const { profile,loading }=this.props.profile;
        let dashboardContent;
        if(profile===null || loading){
            dashboardContent= <Spinner />;
        }
        else{
            // check if log in user has profile data
            if(Object.keys(profile).length>0){
                dashboardContent=(
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActions />
                        <br/><br/>
                        <Experience experience={profile.experience}/>
                        <br/><br/>
                        <Education education={profile.education}/>
                        {/*add experience and education} */}
                        <div style={{marginBottom:'60px'}} />
                        <button onClick={this.onDeleteClick}className="btn btn-danger">DELETE MY ACCOUNT</button>
                        
                    </div>
                )
            }else{
                // user logged in but has no profile
                dashboardContent=(
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not set up your profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-primary">
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }

        return ( 
            <div className="dashboard">
               <div className="container">
                   <div className="row">
                       <div className="col-md-12">
                           <h1 className="display-4">Dashboard</h1>
                           {dashboardContent}
                       </div>
                   </div>
               </div>
            </div>
         );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProp = state =>({
    auth: state.auth,
    profile: state.profile    
})
 
export default connect(mapStateToProp, { getCurrentProfile,deleteAccount})(Dashboard);