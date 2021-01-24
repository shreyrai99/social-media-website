import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { withRouter } from 'react-router-dom'; //after deletion of experience, redirect back to home page
import formatDate from '../../utils/formatDate';
import { deleteExperience } from '../../actions/profileActions';
class Experience extends Component {
    onDeleteClick(id){
        this.props.deleteExperience(id);
    }
    render() { 
        const experience=this.props.experience.map(exp=>(
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}</td>
                {/*<td>{exp.from} - {exp.to}</td>*/}
                <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))
        return ( 
            <div>
             <h4 className="mb-4">Experience</h4>
             <table className="table">
                 <thead>
                     <tr>
                         <th>Company</th>
                         <th>Title</th>
                         <th>Years</th>
                         <th></th>
                     </tr>
                     {experience}
                 </thead>
             </table>
            </div>
         );
    }
}
 
Experience.propTypes={
    deleteExperience:PropTypes.func.isRequired
}
//We dont need map state to prop here becuase experience already got passd as property
export default connect(null, { deleteExperience })(Experience);