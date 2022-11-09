const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// GET all user posts
router.get('/', async (req, res) => {
  try { 
    const pData = await Post.findAll({ 
      where: {
        user_id: req.session.user_id, // get all posts where user_id matches session user_id
      },
      include: [User],
    });

    const posts = pData.map((post) => post.get({ plain: true }));

    res.status(200).render('dashboard', { posts, loggedIn: req.session.loggedIn }); // render dashboard with user posts
  } catch (err) {
    res.redirect('login');
  }
});

// GET new post page
router.get('/new', (req, res) => {
  res.render('new-post');
}); 

// GET edit post page
router.get('/edit/:id', async (req, res) => {
  try {
    const pData = await Post.findByPk(req.params.id);

    if(!pData) {
      res.status(404).end();
    }

    const post = pData.get({ plain: true });

    res.render('edit-post', { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;