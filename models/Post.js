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
      ref: 'users'
  },
  username: {
    type: String
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    content: {
      type: String, 
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
  }],
  date: {
    type: Date, 
    default: Date.now()
  }
});

module.exports = Post = mongoose.model("post", postSchema);