const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// import helper functions


// GET all posts
router.get('/', async (req, res) => {

  try {
    const postDBdata = await Post.findAll({
      include: [User]
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

// GET single post
router.get('/post/:id', async (req, res) => {
  
  try {
    const pData = await Post.findByPk(req.params.id, {
      include: [
        User,
      {
        modal: Comment,
        include: [User],
      }
    ]
    });

    if(!pData) { // if there is no data then send 404 error
      res.status(404).end()
    }

    const post = pData.get({ plain: true }); // otherwise format and render post data
    res.render('view-post', { post });
  }
  catch(err) {
    res.status(500).json(err);
  }
});

// GET login page
router.get('/login', (req, res) => {
  // if user is already logged in redirect to homepage
  if(req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // otherwise render login page
  res.render('login');
});

// GET signup page
router.get('/signup', (req, res) => {
  // if user is already logged in redirect to homepage
  if(req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // otherwise render signup page
  res.render('signup');
});

module.exports = router;