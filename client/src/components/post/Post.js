import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/postActions';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
    componentDidMount(){
        this.props.getPost(this.props.match.params.id);
    }
    render() { 
        const { post, loading }=this.props.post;
        let postContent;
        if(post ===null || loading || Object.keys(post).length===0)
        {
            postContent=<Spinner />
        }
        else{
            postContent=(
                <div>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <CommentFeed comments={post.comments}/>
                </div>
            )
        }
        // showActions removes actions like addLike, removeLike etc.
        return ( 
            
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-primary mb-3">Go Back To Feed</Link>
                            {postContent}

                            
                        </div>
                    </div>
                </div>
            
         );
    }
}

Post.propTypes={
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
}
 
const mapStateToProps=state=>({
    post:state.post
})
export default connect(mapStateToProps, { getPost })(Post);