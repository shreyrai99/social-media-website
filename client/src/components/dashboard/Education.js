import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { withRouter } from 'react-router-dom'; //after deletion of experience, redirect back to home page
import formatDate from '../../utils/formatDate';
import { deleteEducation } from '../../actions/profileActions';
class Education extends Component {
    onDeleteClick(id){
        this.props.deleteEducation(id);
    }
    render() { 
        const education=this.props.education.map(exp=>(
            <tr key={exp._id}>
                <td>{exp.school}</td>
                <td>{exp.degree}</td>
                <td>{exp.fieldofstudy}</td>
                <td>{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}</td>
                {/*<td>{exp.from} - {exp.to}</td>*/}
                <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))
        return ( 
            <div>
             <h4 className="mb-4">Educational Credentials</h4>
             <table className="table">
                 <thead>
                     <tr>
                         <th>School</th>
                         <th>Degree</th>
                         <th>Field</th>
                         <th>Years</th>
                         <th></th>
                     </tr>
                     {education}
                 </thead>
             </table>
            </div>
         );
    }
}
 
Education.propTypes={
    deleteEducation:PropTypes.func.isRequired
}
//We dont need map state to prop here becuase education already got passd as property
export default connect(null, { deleteEducation })(Education);