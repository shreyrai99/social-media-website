import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
    
    onLogoutClick(e){
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }
    render() { 
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <ul>
              <li>
                <Link to="/profiles">Developers</Link>
              </li>
              <li>
                <Link to="/feed">Post Feed</Link>
              </li>
              <li>
                <Link to="/quiz">Mock Quiz</Link>
              </li>              
              <li>
                <Link to="/dashboard">
                  <i className="fas fa-user" />{' '}
                  <span className="hide-sm">Dashboard</span>
                </Link>
              </li>
              <li>
                <a onClick={this.onLogoutClick.bind(this)} href="#!">
                  <i className="fas fa-sign-out-alt" />{' '}
                  <span className="hide-sm">Logout</span>
                </a>
              </li>
            </ul>
          );

          const guestLinks = (
            <ul>
              <li>
                <Link to="/profiles">Developers</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          );
        return (
            <nav className="navbar bg-dark">
              <h1>
                <Link to="/">
                  <i className="fas fa-code" /> DevMedia
                </Link>
              </h1>
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            </nav>
          );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
    auth: state.auth
})
 
export default connect(mapStateToProps,{ logoutUser,clearCurrentProfile })(Navbar);