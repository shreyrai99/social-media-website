import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileItem extends Component {    
     
      
    render() { 
         
          const { profile }=this.props         
          let nameDisplay;
          let avatarDisplay;
          let userID;
          let email;
          let handle;
          if(profile.user===null){
              nameDisplay='';
              avatarDisplay='';
              userID='';
              email='';
              handle='';
          }else{
              nameDisplay=profile.user.name
              avatarDisplay=profile.user.avatar
              userID=profile.user._id
              email=profile.user.email
              handle=profile.handle
          }

         
         
        
          let skillsarray;
          skillsarray=profile.skills
          
          /*
          let educationArray="Shrey"
          educationArray = profile.user.name.toString()
           
          console.log(educationArray)*/
          //console.log(profile.user)
        return ( 
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                       {/*<img src={auth.user.avatar} alt="" className="rounded-circle"/>*/}
                       <img src={avatarDisplay} alt="" className="rounded-circle"/>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                    {/*<h3>{profile.handle.toUpperCase()}</h3>*/}
                    <h3>{nameDisplay}</h3>
                     {/*<h3>{profile.user.name}</h3>*/}
                     
                     <p>
                    {profile.status} {profile.company && <span> at {profile.company}</span>}
                    </p>
                    
                    <p>
                     {profile.location && <span><small>City:</small> {profile.location}</span>}
                    </p>
                    <p>
                     {profile.website && <span><small>Website:</small> {profile.website}</span>}
                    </p>
                    <p>
                     {email && <span><small>Email:</small> {email}</span>}
                    </p>
                      <Link to={`/profile/${handle}`} className="btn btn-primary">
                            View Profile
                        </Link> 
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4 className="dark">Skill Set</h4>
                        <ul className="list-group">
                        {skillsarray.map((item,key) => {
                            return <li key={key} className="list-group-item">
                                      <i className='fas fa-check' />  {item.toUpperCase()}
                                   </li>;
                            })}
                        </ul>
                        </div>
                   {/*<div className="col-md-4 d-none d-md-block">
                        <h6>Skill Set</h6>
                        <ul className="list-group">
                            {profile.skills.map((skill,index)=>{
                                <li key={index} className="list-group-item">
                                    <i className='fas fa-check' />{skill}
                                </li>
                            })}
                        </ul>
                        </div>*/}
                </div>
            </div>
         );
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired    
};

export default ProfileItem;