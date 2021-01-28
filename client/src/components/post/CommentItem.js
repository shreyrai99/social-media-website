import React, { Component } from 'react';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';
class CommentItem extends Component {
    state = {  }
    render() { 
        const { comment }=this.props;
        return ( 
            <div className="posts mb-3">
            <div className="post bg-white p-1 my-1">
              <div>
                <Link to="#">
                  <img
                    className="round-img"
                    src={comment.avatar}
                    alt=""
                  />
                  <h4>{comment.name}</h4>
                </ Link>
              </div>
              <div>
                <p className="my-1">
                  {comment.text}
                </p>
                 <p className="post-date">
                    Commented on {formatDate(comment.date)}
                </p>               
              </div>
            </div>
            </div>
         );
    }
}
 
export default CommentItem;