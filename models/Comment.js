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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Comment = mongoose.model("comment", commentSchema);
