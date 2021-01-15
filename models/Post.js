const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      likes: [
        {
            //if user likes then his user id will go in the array so he can like only once
          user: {
            type: Schema.Types.ObjectId
          }
        }
      ],
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
})

module.exports = Post = mongoose.model('post',PostSchema);