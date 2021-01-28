import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Landing extends Component {

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    
    render() { 
        return ( 
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                    <h1 className="x-large">Dev Media</h1>
                    <p className="lead">
                        Create a developer profile, share posts and get help from
                        other developers.                        
                    </p>
                    <p className="lead mb-3">                        
                        Get an experience of LinkedIn and Stack Overflow at a single place now ;)
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                    </div>
                </div>
            </section>
         );
    }
}

Landing.proptype = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
    auth: state.auth
})
export default connect(mapStateToProps)(Landing);