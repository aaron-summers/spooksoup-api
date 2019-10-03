const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 2
  },
  content: {
      type: String,
      required: true,
      min: 1
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },
  username: {
    type: String
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }],
  date: {
    type: Date, 
    default: Date.now()
  }
});

module.exports = Post = mongoose.model("post", postSchema);