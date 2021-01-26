//shows experience and education
import React, { Component } from 'react';
import formatDate from '../../utils/formatDate';

class ProfileCreds extends Component {
    
    render() { 
        const { education, experience }=this.props;
        const expItems = experience.map(exp=>(
            <li key={exp._id} className="list-group-item">
                <h3 className="text-dark">{exp.company}</h3>
                 {formatDate(exp.from)} -  {exp.to? (formatDate(exp.to)):("Now")}
                 <p><strong>Position: </strong>{exp.title}</p>
                 {exp.location && <span><strong>City: </strong>{exp.location}</span>}
                 <br/>
                 {exp.description && <span><strong>Description: </strong>{exp.description}</span>}
            </li>
        ))

        const eduItems = education.map(edu=>(
            <li key={edu._id} className="list-group-item">
                <h3 className="text-dark">{edu.school}</h3>
                 {formatDate(edu.from)} -  {edu.to? (formatDate(edu.to)):("Now")}
                 <p><strong>Degree: </strong>{edu.degree}</p>
                 <p><strong>Field of Study: </strong>{edu.fieldofstudy}</p>                 
                 {edu.description && <span><strong>Description: </strong>{edu.description}</span>}
            </li>
        ))
        return ( 
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    {expItems.length>0?(
                        <ul className="list-group">{expItems}</ul>
                    ):(
                        <p className="text-center">No Experience Listed</p>
                    )}
                </div>

                <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    {eduItems.length>0?(
                        <ul className="list-group">{eduItems}</ul>
                    ):(
                        <p className="text-center">No Education Listed</p>
                    )}
                </div>
            </div>
         );
    }
}
 
export default ProfileCreds;