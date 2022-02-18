const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    default: null
  },
  cloudinaryId: {
    type: String,
    default: null
  },
  caption: {
    type: String,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  hashtags: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hashtag'
    }],
    default: []
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  },
}, {
  timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;