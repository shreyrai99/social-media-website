import React, { Component } from 'react';

class ProfileGithub extends Component {
    
    render() { 
        const { githubusername }=this.props;
        return ( 
            <div className="profile-github">
                <h2 className="text-primary my-1">
                    <i className="fab fa-github"></i> Github Profile
                </h2>
                <div className="repo bg-white p-1 my-1">
            <div>
                <h4 >Github Handle: {githubusername}</h4>
                
                </div>
                </div>
            </div>
         );
    }
}
 
export default ProfileGithub;