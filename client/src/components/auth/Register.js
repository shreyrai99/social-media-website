import React, { Component } from 'react';
//import axios from 'axios';
import PropTypes from 'prop-types';
import classnames from 'classnames'; // allows to toggle classes (like error checking me box ko red kar dega :P)
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(){
        super()
        this.state={
            name: '',
            email: '',
            password:'',
            password2:'',
            errors: {

            }
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit = async (e)=>{
        e.preventDefault();
        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }
        this.props.registerUser(newUser,this.props.history);
        /*try{
            const res = await axios.post('/api/users/register',newUser);
            console.log(res.data);
        }
        catch(err){
            this.setState({
                errors: err.response.data
            })        
        }*/
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps){
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
               
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input type="text" placeholder="Name" name="name"  value={this.state.name} 
                    onChange={this.onChange} 
                    className={classnames('form-control form-control-lg',{'is-invalid': errors.name})}
                        />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} 
                     className={classnames('form-control form-control-lg',{'is-invalid': errors.email})}
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className={classnames('form-control form-control-lg',{'is-invalid': errors.password})}
                        minLength="3"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="3"
                        className={classnames('form-control form-control-lg',{'is-invalid': errors.password2})}
                        value={this.state.password2}
                        onChange={this.onChange}
                    />
                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
         );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=>({
    auth: state.auth,
    errors: state.errors,
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));