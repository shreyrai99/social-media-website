import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
    
    render() { 
        return ( 
            <div>
                <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevMedia</Link>
                </h1>
                <ul>
                    <li><Link to="/profiles">Developers</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
                </nav>
            </div>
         );
    }
}
 
export default Navbar;