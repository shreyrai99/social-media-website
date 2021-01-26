import React, { Component } from 'react';
class ProfileAbout extends Component {
    
    render() { 
        const { profile }=this.props;
        return ( 
            <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile.user.name}'s Bio</h2>
          {profile.bio && 
          <p>
            {profile.bio}
          </p>}
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
                {profile.skills.map((skill, index) => (
                <div key={index} className='p-1'>
                <i className='fas fa-check' /> {skill}
                </div>
            ))}
          </div>
        </div>
         );
    }
}
 
export default ProfileAbout;