const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    min: 1
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  },
  replies: [{
    comment: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment'
    }
  }],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Comment = mongoose.model("comment", commentSchema);
