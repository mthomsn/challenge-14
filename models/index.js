// this file will create associations between other models

// import other models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// define relationships between models
// user have many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
});

// user have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

// post has one user

// post have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

// comment has one user

// comment has one post
Comment.hasOne(Post, {
  foreignKey: 'comments',
});

// export models
module.exports = { User, Post, Comment };