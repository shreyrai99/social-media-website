import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
    onDeleteClick=(id)=>{      
      this.props.deletePost(id);
    }
    onLikeClick=(id)=>{
      this.props.addLike(id);
    }
    onUnLikeClick=(id)=>{
      this.props.removeLike(id);
    }
    findUserLike(likes){
      const { auth }=this.props;
      if(likes.filter(like=> like.user === auth.user.id).length>0)
       return true;
       return false;
    }
    render() { 
        const { post, auth, showActions }=this.props;
        return ( 
            <div className="posts mb-3">
            <div className="post bg-white p-1 my-1">
              <div>
                <Link to="#">
                  <img
                    className="round-img"
                    src={post.avatar}
                    alt=""
                  />
                  <h4>{post.name}</h4>
                </ Link>
              </div>
              <div>
                <p className="my-1">
                  {post.text}
                </p>
                 <p className="post-date">
                    Posted on {formatDate(post.date)}
                </p>

                
                {showActions?
                (<span>
                  <button type="button" className="btn btn-light" onClick={()=>this.onLikeClick(post._id)}>
                <i className={classnames("fas fa-thumbs-up",{
                  'text-info':this.findUserLike(post.likes)
                })}></i>   
                <span>{post.likes.length}</span>
                </button>
                <button type="button" className="btn btn-light" onClick={()=>this.onUnLikeClick(post._id)}>
                  <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`post/${post._id}`} className="btn btn-primary">
                  Comments <span className='comment-count'>{post.comments.length}</span>
                </Link>
                {post.user === auth.user.id? (
                <button      
                    type="button"
                    className="btn btn-danger"
                    onClick={()=>this.onDeleteClick(post._id)}
                >
                  
                <i className="fas fa-times"></i>
              </button>
              ):null}

                </span>):null}

               
              </div>
            </div>
            </div>
         );
    }
}
 
PostItem.defaultProps={
  showActions:true
}
PostItem.propTypes={
    post:PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
}
const mapStateToProps=state=>({
    auth:state.auth, //current user can delete his post
})
export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);


//onClick={this.onDeleteClick.bind(this, post._id)}