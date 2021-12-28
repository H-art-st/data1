const express = require('express')
const router = express.Router()
const passport = require('passport')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')


router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
});

router.get('/twitter/login', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/'}),
  function (req, res) {
    res.redirect('/dashboard')
  });

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
});

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
});

module.exports = router;
