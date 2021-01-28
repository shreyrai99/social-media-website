import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from 'react-router-dom';
class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors: {}
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit = async (e)=>{
        e.preventDefault();
        const userData = {            
            email:this.state.email,
            password:this.state.password
        }
       this.props.loginUser(userData);
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() { 
        const { errors }=this.state;

        return ( 
            <section className="container">
                
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        className={classnames('form-control form-control-lg',{'is-invalid': errors.email})}
                    />
                     {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        className={classnames('form-control form-control-lg',{'is-invalid': errors.password})}
                    />
                     {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
         );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
    auth: state.auth,
    errors: state.errors
})
 
export default connect(mapStateToProps, { loginUser })(Login);