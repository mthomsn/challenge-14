const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// import helper functions


// GET all posts
router.get('/', async (req, res) => {

  try {
    const postDBdata = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username'],
      }]
    });

    // saving post data from db
    const posts = postDBdata.map((post) => post.get({ plain: true }));

    // render view with db data
    res.status(200)
    .render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});