// this file will create associations between other models

// import other models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// post has one user
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// comment belongs to one user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'Cascade',
});

// export models
module.exports = { User, Post, Comment };