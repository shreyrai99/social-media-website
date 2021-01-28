import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaField from '../common/TextAreaField';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state={
            text:'',
            errors:{},

        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors:nextProps.errors
            })
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const { user }=this.props.auth;
        const { postId }=this.props;
        const newPost = {
            text: this.state.text,
            name:user.name,
            avatar:user.avatar
        }
        this.props.addComment(postId,newPost);
        this.setState({
            text:''
        })
        //console.log(`Post Submitted.... ${this.state.text}`);
    }
    render() { 
        const { errors }=this.state;
        return ( 
                  <div className="post-form">
                    <div className="bg-primary p">
                    <h3>Make a comment</h3>
                    </div>
                    <form className="form my-1" onSubmit={this.onSubmit}>
                    <TextAreaField 
                     placeholder="Write A Reply..."
                     name="text"
                     value={this.state.text}
                     onChange={this.onChange}
                     error = {this.state.errors.text}
                    />
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                    </form>
                </div>
         );
    }
}
CommentForm.propTypes={
    addComment:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired,
}
const mapStateToProps=state=>({
    auth:state.auth,
    errors:state.errors
})
 
export default connect(mapStateToProps, {  addComment })(CommentForm);